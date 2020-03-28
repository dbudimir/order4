/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

// Utilities
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

export default class LoggedInNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // navItems: '',
    };
  }

  handleSignOut = e => {
    const { signOut } = this.props;

    signOut(e);
    window.location.replace('/');

    //  Router.push('/');
  };

  render() {
    LoggedInNav.propTypes = {
      signOut: PropTypes.func,
    };

    return (
      <>
        <Link
          href={{
            pathname: '/user/[user]',
            query: { userId: localStorage.username },
          }}
          as={{ pathname: `/user/${localStorage.username}` }}
        >
          <a href={`/user/${localStorage.username}`}>
            <span>My Orders</span>
          </a>
        </Link>
        <Link href="/">
          <span onClick={this.handleSignOut}>
            <a>Log Out</a>
          </span>
        </Link>
      </>
    );
  }
}
