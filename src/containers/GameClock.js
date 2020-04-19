import React from 'react';
import { Button } from 'react-bootstrap';

class GameClock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameDate: '',
      ticker: null,
    };
    this.initializeGameClock = this.initializeGameClock.bind(this);
    this.pauseGameClock = this.pauseGameClock.bind(this);
    this.resumeGameClock = this.resumeGameClock.bind(this);
    this.tick = this.tick.bind(this);
    this.startTicker = this.startTicker.bind(this);
    this.stopTicker = this.stopTicker.bind(this);
  }

  componentDidMount() {
    this.initializeGameClock();
    this.startTicker();
  }

  initializeGameClock() {
    let newState = this.state;
    newState.gameDate = new Date('January 1, 2020').toDateString();
    this.setState(newState);
  }

  pauseGameClock() {
    this.stopTicker();
    this.props.pkg.game.togglePause();
  }

  resumeGameClock() {
    this.startTicker();
    this.props.pkg.game.togglePause();
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
    const pauseButton = <Button onClick={event => this.pauseGameClock({ event })}>Pause</Button>;
    const resumeButton = <Button onClick={event => this.resumeGameClock({ event })}>Resume</Button>;
    const pauseResumeButton = this.props.pkg.game.state.isPaused ? resumeButton : pauseButton;
    return (
      <div id="game-clock">
        <h2>Date</h2>
        <p>{gameDate}</p>
        {pauseResumeButton}
      </div>
    );
  }

  componentWillUnmount() {
    this.stopTicker();
  }
};

export default GameClock;