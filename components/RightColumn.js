import React, { Component } from 'react';
import Link from 'next/link';

export default class RightColumn extends Component {
  render() {
    var toTitleCase = function(str) {
      str = str.toLowerCase().split(' ');
      for (var i = 0; i < str.length; i++) {
        str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
      }
      return str.join(' ');
    };

    let tagName = this.props.tag.replace(/-/g, ' ');
    let capitalTagName = toTitleCase(tagName);
    let chainName = toTitleCase(this.props.chainName);

    console.log(tagName);

    return (
      <div className="coP-right">
        <Link
          href={{
            pathname: `/tags/${this.props.tag}e`
          }}
          as={{ pathname: `/tags/${this.props.tag}` }}
        >
          <a href={`/tags/${this.props.tag}`}>
            <div className="more-tag-cta">
              <span>See more popular {capitalTagName} custom orders at other chains.</span>
            </div>
          </a>
        </Link>
        <Link
          href={{
            pathname: `/chains/${this.props.chainName}e`
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
              pathname: '/create-order'
            }}
            as={{ pathname: '/create-order' }}
          >
            <a href="/create-order">
              <span className="create">Create Order</span>
            </a>
          </Link>
          <Link
            href={{
              pathname: '/signup'
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
