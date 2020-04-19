import React from 'react';
import GameClock from './GameClock';

class Game extends React.Component {
  render() {
    return (
      <div id="game">
        <h1>Game</h1>
        <GameClock/>
      </div>
    );
  }
};

export default Game;