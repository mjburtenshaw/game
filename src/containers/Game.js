import React from 'react';
import GameClock from './GameClock';
import Bank from './Bank';

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
      }
    };
    this.togglePause = this.togglePause.bind(this);
    this.changeDate = this.changeDate.bind(this);
    this.creditBank = this.creditBank.bind(this);
    this.debitBank = this.debitBank.bind(this);
  }

  togglePause() {
    this.setState({ isPaused: !this.state.isPaused });
  }

  changeDate({ date }) {
    this.setState({ date });
  }

  creditBank({ type, amount }) {
    let newState = this.state;
    newState.bank.balances[type] += amount;
    this.setState(newState);
  }

  debitBank({ type, amount }) {
    let newState = this.state;
    newState.bank.balances[type] -= amount;
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