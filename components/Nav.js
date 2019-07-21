/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const NavBar = styled.div`
   background: #ffffff;
   display: flex;
   justify-content: space-between;
   align-items: baseline;
   color: #000000;
   max-width: 100%;
   padding: 0px 24px;
   font-family: Roboto, serif;

   a {
      text-decoration: none;
      color: #000000;
   }
   h1 {
      color: #000000;
      text-decoration: none;
      text-transform: uppercase;

      font-weight: 900;
   }
   div {
      display: flex;
      span {
         margin-left: 24px;
         font-size: 18px;
      }
   }
`;

export default class Nav extends Component {
   constructor(props) {
      super(props);
      this.state = {
         navItems: '',
      };
   }

   componentDidMount() {
      this.setState({
         isLoggedIn: localStorage.isLoggedIn,
      });
      this.getStatus();
   }

   getStatus = () => {
      let userLoggedIn;
      if (localStorage.length > 0) {
         userLoggedIn = (
            <div>
               <Link
                  href={{
                     pathname: '/user/[user]',
                     query: { userId: localStorage.userId },
                  }}
                  as={{ pathname: `/user/${localStorage.userId}` }}
               >
                  <span>My Orders</span>
               </Link>
               <Link
                  href={{
                     pathname: '/',
                  }}
               >
                  <span onClick={this.props.signOut}>Log Out</span>
               </Link>
            </div>
         );
      } else if (localStorage.length === 0) {
         userLoggedIn = (
            <div>
               <Link
                  href={{
                     pathname: '/signup',
                     query: { action: 'login' },
                  }}
                  as={{ pathname: `/login` }}
               >
                  <span>Log In</span>
               </Link>
               <Link
                  href={{
                     pathname: '/signup',
                     query: { action: 'signup' },
                  }}
                  as={{ pathname: `/signup` }}
               >
                  <span>Sign Up</span>
               </Link>
            </div>
         );
      }
      this.setState({
         navItems: userLoggedIn,
      });
   };

   render() {
      return (
         <NavBar>
            <Link
               href={{
                  pathname: '/',
               }}
               as={{ pathname: '/' }}
            >
               <h1>order 4</h1>
            </Link>

            <div className="menu">
               <Link
                  href={{
                     pathname: '/orders/all',
                  }}
                  as={{ pathname: `/orders/all` }}
               >
                  <a href="/orders/all">
                     <span>Orders</span>
                  </a>
               </Link>
               <Link
                  href={{
                     pathname: '/',
                  }}
               >
                  <a href="/">
                     <span>Chains</span>
                  </a>
               </Link>
               {this.state.navItems}
               <Link
                  href={{
                     pathname: '/create-order',
                     query: { userId: '5cfed94deedaa400045dbb3b' },
                  }}
                  as={{ pathname: `/create-order` }}
               >
                  <span>Create an Order</span>
               </Link>
            </div>
         </NavBar>
      );
   }
}
