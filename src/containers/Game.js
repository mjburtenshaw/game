import React from 'react';
import GameClock from './GameClock';
import Bank from './Bank';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPaused: false
    };
    this.togglePause = this.togglePause.bind(this);
  }

  togglePause() {
    let newState = this.state;
    newState.isPaused = !newState.isPaused;
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