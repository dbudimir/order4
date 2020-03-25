import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

class ChainLogo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    ChainLogo.propTypes = {
      chainName: PropTypes.string,
    };

    const { chainName } = this.props;
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
    return (
      <React.Fragment>
        <Link
          href={{
            pathname: '/chains/[name]',
            query: { chainName },
          }}
          as={{ pathname: `/chains/${chainName}` }}
        >
          <a href={`/chains${chainName}`}>{chainLogo}</a>
        </Link>
      </React.Fragment>
    );
  }
}

export default ChainLogo;
