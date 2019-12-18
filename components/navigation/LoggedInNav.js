//Utilities
import React, { Component } from 'react';
import Router from 'next/router';
import Link from 'next/link';

export default class LoggedInNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navItems: ''
    };
  }

  handleSignOut = e => {
    this.props.signOut(e);
    window.location.replace('/');

    //  Router.push('/');
  };

  render() {
    return (
      <React.Fragment>
        <Link
          href={{
            pathname: '/user/[user]',
            query: { userId: localStorage.userId }
          }}
          as={{ pathname: `/user/${localStorage.userId}` }}
        >
          <a href={`/user/${localStorage.userId}`}>
            <span>My Orders</span>
          </a>
        </Link>
        <Link href="/">
          <span onClick={this.handleSignOut}>
            <a>Log Out</a>
          </span>
        </Link>
      </React.Fragment>
    );
  }
}
