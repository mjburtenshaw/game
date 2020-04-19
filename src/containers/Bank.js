import React from 'react';
import { Button } from 'react-bootstrap';

class Bank extends React.Component {
  render() {
    const { game } = this.props.pkg;
    const { currency, balances } = game.state.bank;
    const fundraiseButton = <Button onClick={event => game.creditBank({ event, type: currency.type, amount: 100 })}>Raise Funds +100</Button>;
    const campaignButton = <Button onClick={event => game.debitBank({ event, type: currency.type, amount: 100 })}>Campaign -100</Button>;
    return (
      <div id="bank">
        <h2>Bank</h2>
        <p>{currency.symbol}{balances[currency.type]}</p>
        {fundraiseButton}
        {campaignButton}
      </div>
    );
  }
};

export default Bank;