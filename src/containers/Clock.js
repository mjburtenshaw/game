import React from 'react';
import { Button } from 'react-bootstrap';

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ticker: null
    };
    this.initializeClock = this.initializeClock.bind(this);
    this.pauseClock = this.pauseClock.bind(this);
    this.resumeClock = this.resumeClock.bind(this);
    this.tick = this.tick.bind(this);
    this.startTicker = this.startTicker.bind(this);
    this.stopTicker = this.stopTicker.bind(this);
  }

  componentDidMount() {
    this.initializeClock();
    this.startTicker();
  }

  initializeClock() {
    const newDate = new Date('October 1, 2020').toDateString();
    this.props.pkg.game.changeDate({ date: newDate });
  }

  pauseClock() {
    this.stopTicker();
    this.props.pkg.game.togglePause();
  }

  resumeClock() {
    this.startTicker();
    this.props.pkg.game.togglePause();
  }

  tick() {
    const { game } = this.props.pkg;
    const oldDate = Date.parse(game.state.date);
    const oneDay = 90000000;
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
    const pauseButton = <Button onClick={event => this.pauseClock({ event })}>Pause</Button>;
    const resumeButton = <Button onClick={event => this.resumeClock({ event })}>Resume</Button>;
    const pauseResumeButton = game.state.isPaused ? resumeButton : pauseButton;
    return (
      <div id="game-clock">
        <h2>Date</h2>
        <p>{game.state.date}</p>
        {pauseResumeButton}
        <h2>Days Until Election Day</h2>
        {game.state.daysUntilElectionDay}
      </div>
    );
  }

  componentWillUnmount() {
    this.stopTicker();
  }
};

export default Clock;