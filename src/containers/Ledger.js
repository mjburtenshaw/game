import React from 'react';

class Ledger extends React.Component {
  render() {
    const { game } = this.props.pkg;
    const { ledger, bank } = game.state;
    const tables = Object.entries(ledger.index).map(([transactionType, categories]) => {
      const tableTitle = transactionType.charAt(0).toUpperCase() + transactionType.slice(1);
      const tableHeaders = [];
      const tableData = [];
      Object.entries(categories).forEach(([category, currencyType]) => {
        const tableHeading = category.charAt(0).toUpperCase() + category.slice(1);
        tableHeaders.push(<th key={`${category}-heading`}>{tableHeading}</th>);
        tableData.push(<td key={`${category}-data`}>{currencyType[bank.currency.type]}</td>)
      });
      return (
        <div key={transactionType}>
          <h3>{tableTitle}</h3>
          <table>
            <thead>
              <tr>
                {tableHeaders}
              </tr>
            </thead>
            <tbody>
              <tr>
                {tableData}
              </tr>
            </tbody>
          </table>
        </div>
      );
    });
    return (
      <div id="ledger">
        <h2>Ledger</h2>
        {tables}
      </div>
    );
  }
};

export default Ledger;