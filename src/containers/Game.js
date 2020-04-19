import React from 'react';
import Clock from './Clock';
import Bank from './Bank';
import Ledger from './Ledger';
import utils from '../utils';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPaused: false,
      date: '',
      electionDay: '',
      daysUntilElectionDay: null,
      player: {
        yearElected: null,
        isUpForElection: true,
      },
      bank: {
        currency: {
          type: 'USD',
          symbol: '$'
        },
        balances: {
          USD: 10000
        }
      },
      ledger: {
        credit: [],
        debit: [],
        index: {
          debit: {
            campaigning: {
              USD: null
            }
          }
        }
      }
    };
    this.togglePause = this.togglePause.bind(this);
    this.changeDate = this.changeDate.bind(this);
    this.submitTransactionToBank = this.submitTransactionToBank.bind(this);
    this.addEntryToLedger = this.addEntryToLedger.bind(this);
    this.indexTransactions = this.indexTransactions.bind(this);
  }

  togglePause() {
    this.setState({ isPaused: !this.state.isPaused });
  }

  changeDate({ date }) {
    let newState = this.state;
    const isElectionDay = new Date(date).getTime() === new Date(newState.electionDay).getTime();
    if (!newState.electionDay || isElectionDay) newState.electionDay = this.getNextElectionDay({ date });
    if (isElectionDay) this.holdElections()
    newState.daysUntilElectionDay = this.getDaysUntilElectionDay({ date });
    newState.date = date;
    this.setState({ date });
  }

  getDaysUntilElectionDay({ date }) {
    const currentDate = utils.game.msToDays(Date.parse(date));
    const electionDay = utils.game.msToDays(Date.parse(this.state.electionDay));
    const daysUntilElectionDay = electionDay - currentDate;
    return daysUntilElectionDay;
  }

  getNextElectionDay({ date }) {
    const currentDate = new Date(date);
    let year = currentDate.getFullYear();
    if (this.state.electionDay) year += 1;
    const novOne = `Nov 01 ${year}`;
    const msOfNovOne = Date.parse(novOne);
    const dayOfNovOne = new Date(novOne).getDay();
    const oneDay = 90000000;
    let msUntilElectionDay = oneDay;
    if      (dayOfNovOne === 0) msUntilElectionDay = oneDay * 2;
    else if (dayOfNovOne === 6) msUntilElectionDay = oneDay * 3;
    else if (dayOfNovOne === 5) msUntilElectionDay = oneDay * 4;
    else if (dayOfNovOne === 4) msUntilElectionDay = oneDay * 5;
    else if (dayOfNovOne === 3) msUntilElectionDay = oneDay * 6;
    else if (dayOfNovOne === 2) msUntilElectionDay = oneDay * 7;
    const electionDay = new Date(msOfNovOne + msUntilElectionDay).toDateString();
    return electionDay;
  }

  submitTransactionToBank({ transactionType, currencyType, amount, category }) {
    let newState = this.state;
    if (transactionType === 'credit') newState.bank.balances[currencyType] += amount;
    if (transactionType === 'debit') newState.bank.balances[currencyType] -= amount;
    this.addEntryToLedger({ transactionType, currencyType, amount, category });
    this.setState(newState);
  }

  addEntryToLedger({ transactionType, currencyType, amount, category }) {
    let newState = this.state;
    const transaction = {
      id: utils.game.uuidv4(),
      category,
      currencyType,
      amount,
      date: newState.date
    };
    newState.ledger[transactionType].push(transaction);
    this.setState(newState);
    this.indexTransactions();
  }

  indexTransactions() {
    let newState = this.state;
    const transactionIndex = {};
    Object.entries(newState.ledger).forEach(([transactionType, transactions]) => {
      if (transactionType !== 'index') transactions.forEach(t => {
        if (!transactionIndex[transactionType]) transactionIndex[transactionType] = {};
        if (!transactionIndex[transactionType][t.category]) transactionIndex[transactionType][t.category] = {};
        if (!transactionIndex[transactionType][t.category][t.currencyType]) transactionIndex[transactionType][t.category][t.currencyType] = 0;
        transactionIndex[transactionType][t.category][t.currencyType] += t.amount;
      });
    });
    newState.ledger.index = transactionIndex;
    this.setState(newState);
  }

  holdElections() {
    let newState = this.state;
    if (!newState.player.yearElected || newState.player.isUpForElection) {
      const playerWasElected = newState.ledger.index.debit.campaigning[newState.bank.currency.type] > 1000;
      if (playerWasElected) {
        newState.player.yearElected = new Date(newState.date).getFullYear();
        newState.player.isUpForElection = false;
      };
    } else if (newState.player.yearElected) {
      newState.player.isUpForElection = new Date(newState.date).getFullYear() - newState.player.yearElected === 1;
    }
    this.setState(newState);
  }

  render() {
    const game = this;
    const clockProps = { game };
    const bankProps = { game };
    const ledgerProps = { game };
    return (
      <div id="game">
        <h1>Game</h1>
        <Clock pkg={clockProps}/>
        <Bank pkg={bankProps}/>
        <Ledger pkg={ledgerProps}/>
      </div>
    );
  }
};

export default Game;