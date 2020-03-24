import React, { Component } from 'react';
import Link from 'next/link';

export default class RightColumn extends Component {
  render() {
    const toTitleCase = function(str) {
      str = str.toLowerCase().split(' ');
      for (let i = 0; i < str.length; i++) {
        str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
      }
      return str.join(' ');
    };

    const tagName = this.props.tag.replace(/-/g, ' ');
    const capitalTagName = toTitleCase(tagName);
    const chainName = toTitleCase(this.props.chainName);

    return (
      <div className="col-right">
        <Link
          href={{
            pathname: `/tags/[tag]`,
          }}
          as={{ pathname: `/tags/${this.props.tag}` }}
        >
          <a href={`/tags/${this.props.tag}`}>
            <div className="more-tag-cta">
              <span>See more popular {capitalTagName} custom orders at other restaurants.</span>
            </div>
          </a>
        </Link>
        <Link
          href={{
            pathname: `/chains/[name]`,
          }}
          as={{ pathname: `/chains/${this.props.chainName}` }}
        >
          <a href={`/chains/${this.props.chainName}`}>
            <div className="more-chain-cta">
              <span>See more popular custom meals at {chainName}</span>
              <img src="/static/chain-logos/square/chipotle-square-logo.png" />
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
