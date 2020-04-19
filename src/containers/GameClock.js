import React from 'react';
import { Button } from 'react-bootstrap';

class GameClock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ticker: null
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
    const newDate = new Date('January 1, 2020').toDateString();
    this.props.pkg.game.changeDate({ date: newDate });
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
    const { game } = this.props.pkg;
    const oldDate = Date.parse(game.state.date);
    const oneDay = 86400000;
    const newDate = new Date(oldDate + oneDay).toDateString();
    game.changeDate({ date: newDate });
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
    const { game } = this.props.pkg;
    const pauseButton = <Button onClick={event => this.pauseGameClock({ event })}>Pause</Button>;
    const resumeButton = <Button onClick={event => this.resumeGameClock({ event })}>Resume</Button>;
    const pauseResumeButton = game.state.isPaused ? resumeButton : pauseButton;
    return (
      <div id="game-clock">
        <h2>Date</h2>
        <p>{game.state.date}</p>
        {pauseResumeButton}
      </div>
    );
  }

  componentWillUnmount() {
    this.stopTicker();
  }
};

export default GameClock;