//Utilities
import React, { Component } from 'react';
import Link from 'next/link';

export default class LoggedInNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navItems: ''
    };
  }

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
        <Link
          href={{
            pathname: '/'
          }}
        >
          <span onClick={this.props.signOut}>
            <a href="/">Log Out</a>
          </span>
        </Link>
      </React.Fragment>
    );
  }
}
