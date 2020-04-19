import React from 'react';
import { Button } from 'react-bootstrap';

class Bank extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currency: {
        type: 'USD',
        symbol: '$'
      },
      balances: {
        USD: 10000
      }
    };
    this.credit = this.credit.bind(this);
  }

  credit({ type, amount }) {
    let newState = this.state;
    newState.balances[type] += amount;
    this.setState(newState);
  }

  render() {
    const { currency, balances } = this.state;
    const fundraiseButton = <Button onClick={event => this.credit({ event, type: currency.type, amount: 100 })}>Raise Funds +100</Button>
    return (
      <div id="bank">
        <h2>Bank</h2>
        <p>{currency.symbol}{balances[currency.type]}</p>
        {fundraiseButton}
      </div>
    );
  }
};

export default Bank;