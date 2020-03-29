// Utilities
import React, { Component } from 'react';
import Link from 'next/link';

export default class LoggedOutNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // navItems: ''
    };
  }

  render() {
    return (
      <>
        <Link
          href={{
            pathname: '/login',
            query: { action: 'login' },
          }}
          as={{ pathname: `/login` }}
        >
          <a href="/login">
            <span>Log In</span>
          </a>
        </Link>

        <Link
          href={{
            pathname: '/signup',
            query: { action: 'signup' },
          }}
          as={{ pathname: `/signup` }}
        >
          <a href="/signup">
            <span>Sign Up</span>
          </a>
        </Link>
      </>
    );
  }
}
