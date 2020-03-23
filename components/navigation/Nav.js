// Utilities
import React, { Component } from 'react';
import Link from 'next/link';
// Styles
import NavBar from '../styles/NavBar';
// Components
import LoggedInNav from './LoggedInNav';
import LoggedOutNav from './LoggedOutNav';

export default class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navItems: '',
      width: 0,
      height: 0,
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

  updateDimensions = () => {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight,
      style: {
        display: window.innerWidth > 768 ? 'block' : 'none',
      },
    });
  };

  getStatus = () => {
    let userLoggedIn;
    if (localStorage.length > 0) {
      userLoggedIn = <LoggedInNav signOut={this.props.signOut} />;
    } else if (localStorage.length === 0) {
      userLoggedIn = <LoggedOutNav />;
    }
    this.setState({
      navItems: userLoggedIn,
    });
  };

  openMobileMenu = () => {
    const displayValue = this.state.style.display === 'none' ? 'block' : 'none';
    this.setState({
      style: { display: displayValue },
    });
  };

  render() {
    return (
      <NavBar>
        <div className="nav-left">
          <div className="left-nav-icon"></div>
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
          <div className="right-nav-icon" onClick={this.openMobileMenu}>
            <img src="../static/hamburger-icon.png" style={this.state.imgStyle} />
          </div>
        </div>

        <div className="menu-container" style={this.state.style}>
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
            {this.state.navItems}
            <Link
              href={{
                pathname: '/create-order',
              }}
              as={{ pathname: `/create-order` }}
            >
              <a>
                <span className="create">
                  Create Order
                  <img src="/static/plus.svg" alt="plus-icon" />
                </span>
              </a>
            </Link>
          </div>
        </div>
      </NavBar>
    );
  }
}
