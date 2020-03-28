import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

class ChainLogo extends Component {
  constructor(props) {
    super(props);
    this.state = { ...props };
  }

  componentDidMount() {
    //  console.log(this.state);
  }

  render() {
    ChainLogo.propTypes = {
      chainName: PropTypes.string,
    };

    const { chainName } = this.state;
    let chainLogo;
    if (chainName === 'Chipotle') {
      chainLogo = (
        <img
          className="chain-logo"
          src="../../static/chain-logos/chipotle-logo.png"
          alt="Chipotle Logo"
        />
      );
    } else if (chainName === '&pizza') {
      chainLogo = (
        <img
          className="chain-logo"
          src="../../static/chain-logos/and-pizza-logo.png"
          alt="&pizza Logo"
        />
      );
    }

    const lowerCaseChainName = chainName === undefined ? '' : chainName.toLowerCase();

    return (
      <>
        <Link
          href={{
            pathname: '/chains/[name]',
            query: { lowerCaseChainName },
          }}
          as={{ pathname: `/chains/${lowerCaseChainName}` }}
        >
          <a href={`/chains/${lowerCaseChainName}`}>{chainLogo}</a>
        </Link>
      </>
    );
  }
}

export default ChainLogo;
