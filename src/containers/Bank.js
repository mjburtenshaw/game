import React from 'react';

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
  }

  render() {
    const { currency, balances } = this.state;
    return (
      <div id="bank">
        <h2>Bank</h2>
        <p>{currency.symbol}{balances[currency.type]}</p>
      </div>
    );
  }
};

export default Bank;