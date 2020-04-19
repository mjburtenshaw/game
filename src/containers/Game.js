import React from 'react';
import GameClock from './GameClock';
import Bank from './Bank';
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
        debit: []
      }
    };
    this.togglePause = this.togglePause.bind(this);
    this.changeDate = this.changeDate.bind(this);
    this.submitTransactionToBank = this.submitTransactionToBank.bind(this);
    this.addEntryToLedger = this.addEntryToLedger.bind(this);
  }

  togglePause() {
    this.setState({ isPaused: !this.state.isPaused });
  }

  changeDate({ date }) {
    this.setState({ date });
  }

  submitTransactionToBank({ transactionType, currencyType, amount }) {
    let newState = this.state;
    if (transactionType === 'credit') newState.bank.balances[currencyType] += amount;
    if (transactionType === 'debit') newState.bank.balances[currencyType] -= amount;
    this.addEntryToLedger({ transactionType, currencyType, amount });
    this.setState(newState);
  }

  addEntryToLedger({ transactionType, currencyType, amount }) {
    let newState = this.state;
    const transaction = {
      id: utils.game.uuidv4(),
      type: currencyType,
      amount,
      date: newState.date
    };
    newState.ledger[transactionType].push(transaction);
    this.setState(newState);
  }

  render() {
    const game = this;
    const gameClockProps = { game };
    const bankProps = { game };
    return (
      <div id="game">
        <h1>Game</h1>
        <GameClock pkg={gameClockProps}/>
        <Bank pkg={bankProps}/>
      </div>
    );
  }
};

export default Game;