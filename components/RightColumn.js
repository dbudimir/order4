// Utilities
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

export default class RightColumn extends Component {
  render() {
    RightColumn.propTypes = {
      tag: PropTypes.string,
      chainName: PropTypes.string,
    };

    const { tag, chainName } = this.props;
    const toTitleCase = function(str) {
      str = str.toLowerCase().split(' ');
      for (let i = 0; i < str.length; i++) {
        str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
      }
      return str.join(' ');
    };

    const tagName = tag.replace(/-/g, ' ');
    const capitalTagName = toTitleCase(tagName);
    const chainNameLower = toTitleCase(chainName);

    return (
      <div className="col-right">
        <Link
          href={{
            pathname: `/tags/[tag]`,
          }}
          as={{ pathname: `/tags/${tag}` }}
        >
          <a href={`/tags/${tag}`}>
            <div className="more-tag-cta">
              <span>See more popular {capitalTagName} custom orders at other restaurants.</span>
            </div>
          </a>
        </Link>
        <Link
          href={{
            pathname: `/chains/[name]`,
          }}
          as={{ pathname: `/chains/${chainName}` }}
        >
          <a href={`/chains/${chainName}`}>
            <div className="more-chain-cta">
              <span>See more popular custom meals at {chainNameLower}</span>
              <img
                src="/static/chain-logos/square/chipotle-square-logo.png"
                alt={`${chainName} Square Logo`}
              />
            </div>
          </a>
        </Link>
        <div className="signup-cta">
          <span className="cta-text">
            Create and share your favorite <br /> {capitalTagName} orders on MEALdig.
          </span>
          <Link
            href={{
              pathname: '/create-order',
            }}
            as={{ pathname: '/create-order' }}
          >
            <a href="/create-order">
              <span className="create">Create Order</span>
            </a>
          </Link>
          <Link
            href={{
              pathname: '/signup',
            }}
            as={{ pathname: '/signup' }}
          >
            <a href="/signup">
              <span className="signup">Sign Up</span>
            </a>
          </Link>
        </div>
      </div>
    );
  }
}
