import React from 'react';
import { Button } from 'react-bootstrap';

class Bank extends React.Component {
  render() {
    const { game } = this.props.pkg;
    const { currency, balances } = game.state.bank;
    const fundraiseButton = <Button onClick={event => game.submitTransactionToBank({ event, transactionType: 'credit', currencyType: currency.type, amount: 100, category: 'fundraising' })}>Raise Funds +100</Button>;
    const campaignButton = <Button onClick={event => game.submitTransactionToBank({ event, transactionType: 'debit', currencyType: currency.type, amount: 100, category: 'campaigning' })}>Campaign -100</Button>;
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