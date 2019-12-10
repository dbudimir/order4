//Utilities
import React, { Component } from 'react';
import Link from 'next/link';
//Styles
import NavBar from '../../components/styles/NavBar';
//Components
import LoggedInNav from '../navigation/LoggedInNav';
import LoggedOutNav from '../navigation/LoggedOutNav';

export default class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navItems: '',
      style: {
        display: `none`
      }
    };
  }

  componentDidMount() {
    this.setState({
      isLoggedIn: localStorage.isLoggedIn
    });
    this.getStatus();
  }

  getStatus = () => {
    let userLoggedIn;
    if (localStorage.length > 0) {
      userLoggedIn = <LoggedInNav signOut={this.props.signOut} />;
    } else if (localStorage.length === 0) {
      userLoggedIn = <LoggedOutNav />;
    }
    this.setState({
      navItems: userLoggedIn
    });
  };

  openMobileMenu = () => {
    this.setState({
      style: { display: this.state.style.display === 'none' ? 'block' : 'none' }
    });
  };

  render() {
    console.log(this.state.style);
    return (
      <NavBar>
        <div class="nav-left">
          <div class="left-nav-icon"></div>
          <Link
            href={{
              pathname: '/'
            }}
            as={{ pathname: '/' }}
          >
            <a href="/">
              <h1>MEALdig</h1>
            </a>
          </Link>
          <div class="right-nav-icon" onClick={this.openMobileMenu}>
            <img src="../static/hamburger-icon.png" />
          </div>
        </div>

        <div className="menu-container" style={this.state.style}>
          <div className="menu">
            <Link
              href={{
                pathname: '/'
              }}
            >
              <a href="/">
                <span>Chains</span>
              </a>
            </Link>
            <Link
              href={{
                pathname: '/orders/all'
              }}
              as={{ pathname: `/orders/all` }}
            >
              <a href="/orders/all">
                <span>Orders</span>
              </a>
            </Link>
            {this.state.navItems}
            <Link
              href={{
                pathname: '/create-order'
              }}
              as={{ pathname: `/create-order` }}
            >
              <a href="/create-order">
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
