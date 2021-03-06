/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */

// Utilities
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

// Styles
import NavBar from '../../styles/NavBar';

// Components
import LoggedInNav from './LoggedInNav';
import LoggedOutNav from './LoggedOutNav';

export default class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navItems: '',
      style: {
        display: ``,
      },
      imgStyle: {
        filter: `hue-rotate(${Math.floor(Math.random() * (180 - 0 + 1)) + 0}deg)`,
      },
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
    this.getStatus();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  getStatus = () => {
    const { props } = this;
    let userLoggedIn;
    if (localStorage.length > 0) {
      userLoggedIn = <LoggedInNav signOut={props.signOut} />;
    } else if (localStorage.length === 0) {
      userLoggedIn = <LoggedOutNav />;
    }
    this.setState({
      navItems: userLoggedIn,
    });
  };

  openMobileMenu = () => {
    const { state } = this;
    const displayValue = state.style.display === 'none' ? 'block' : 'none';
    this.setState({
      style: { display: displayValue },
    });
  };

  render() {
    Nav.propTypes = {
      signOut: PropTypes.func,
    };

    const { state } = this;
    return (
      <NavBar>
        <div className="nav-left">
          <div className="left-nav-icon" />
          <Link
            href={{
              pathname: '/',
            }}
            as={{ pathname: '/' }}
          >
            <a>
              <h1>MEALdig</h1>
            </a>
          </Link>
          <div className="right-nav-icon" role="menuitem" onClick={this.openMobileMenu}>
            <img
              src="https://mealdig.com/static/hamburger-icon.png"
              style={state.imgStyle}
              alt="Menu Icon"
            />
          </div>
        </div>

        <div className="menu-container" style={state.style}>
          <div className="menu">
            <Link
              href={{
                pathname: '/',
              }}
            >
              <a>
                <span>Chains</span>
              </a>
            </Link>
            <Link
              href={{
                pathname: '/orders/all',
              }}
              as={{ pathname: `/orders/all` }}
            >
              <a>
                <span>Orders</span>
              </a>
            </Link>
            {state.navItems}
            <Link
              href={{
                pathname: '/create-order',
              }}
              as={{ pathname: `/create-order` }}
            >
              <a>
                <span className="create">
                  Create Order
                  <img src="/static/plus.svg" alt="Plus Icon" />
                </span>
              </a>
            </Link>
          </div>
        </div>
      </NavBar>
    );
  }
}
