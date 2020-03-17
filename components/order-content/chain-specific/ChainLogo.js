import React, { Component } from 'react';

class ChainLogo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chainName: props.chainName,
      orderContent: props.orderState
    };
  }

  render() {
    let chainLogo;
    if (this.props.chainName === 'Chipotle') {
      chainLogo = (
        <img
          className="chain-logo"
          src="../../static/chain-logos/chipotle-logo.png"
          alt="chipotle-logo"
        />
      );
    } else if (this.props.chainName === '&pizza') {
      chainLogo = (
        <img
          className="chain-logo"
          src="../../static/chain-logos/and-pizza-logo.png"
          alt="and-pizza-logo"
        />
      );
    }
    return <React.Fragment>{chainLogo}</React.Fragment>;
  }
}

export default ChainLogo;
