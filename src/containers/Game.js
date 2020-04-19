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
        index: {}
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
    this.setState({ date });
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