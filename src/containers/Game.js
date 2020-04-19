import React from 'react';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameDate: new Date('January 1, 2020').toDateString()
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
};

export default Game;