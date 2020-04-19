import React from 'react';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameDate: '',
      ticker: null,
    };
    this.startGameClock = this.startGameClock.bind(this);
    this.tick = this.tick.bind(this);
    this.startTicker = this.startTicker.bind(this);
    this.stopTicker = this.stopTicker.bind(this);
  }

  componentDidMount() {
    this.startGameClock();
    this.startTicker();
  }

  startGameClock() {
    let newState = this.state;
    newState.gameDate = new Date('January 1, 2020').toDateString();
    this.setState(newState);
  }

  tick() {
    let newState = this.state;
    const oldDate = Date.parse(newState.gameDate);
    const oneDay = 86400000;
    const newDate = new Date(oldDate + oneDay).toDateString();
    newState.gameDate = newDate;
    this.setState(newState);
  }

  startTicker() {
    let newState = this.state;
    newState.ticker = setInterval(this.tick, 1000);
    this.setState(newState);
  }

  stopTicker() {
    let newState = this.state;
    if (newState.ticker) {
      clearInterval(newState.ticker);
      newState.ticker = null;
      this.setState(newState);
    };
  }

  render() {
    const { gameDate } = this.state;
    return (
      <div id="game">
        <h1>Game</h1>
        <h2>Date</h2>
        <p>{gameDate}</p>
      </div>
    );
  }

  componentWillUnmount() {
    this.stopTicker();
  }
};

export default Game;