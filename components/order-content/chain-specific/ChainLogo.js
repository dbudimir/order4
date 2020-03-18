import React, { Component } from 'react';
import Link from 'next/link';

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
    return (
      <React.Fragment>
        <Link
          href={{
            pathname: '/chains/[name]',
            query: { chainName: this.props.chainName }
          }}
          as={{ pathname: `/chains/${this.props.chainName}` }}
        >
          <a href={`/chains${this.props.chainName}`}>{chainLogo}</a>
        </Link>
      </React.Fragment>
    );
  }
}

export default ChainLogo;
