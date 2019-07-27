/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const NavBar = styled.div`
   background: #ffffff;
   display: flex;
   flex-wrap: wrap;
   justify-content: space-between;
   align-items: center;
   color: #000000;
   max-width: 100%;
   padding: 12px 12px;
   font-family: Nunito, serif;

   a {
      text-decoration: none;
      color: #000000;
   }
   h1 {
      color: #000000;
      text-decoration: none;
      text-transform: capitalize;
      font-size: 36px;
      font-weight: 900;
      margin: 0px 24px 6px 0px;
   }
   .menu-container {
      overflow-x: scroll;
      overflow-y: hidden;
   }

   .menu {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 6px;
      width: 550px;
      font-weight: 700;

      span {
         font-size: 18px;
         cursor: pointer;
      }

      .create {
         font-size: 18px;
         background: #0067ff;
         color: #ffffff;
         border-radius: 20px;
         padding: 8px 16px;
         display: flex;
         align-items: center;

         img {
            margin-left: 6px;
         }
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
            <React.Fragment>
               <Link
                  href={{
                     pathname: '/user/[user]',
                     query: { userId: localStorage.userId },
                  }}
                  as={{ pathname: `/user/${localStorage.userId}` }}
               >
                  <a href={`/user/${localStorage.userId}`}>
                     <span>My Orders</span>
                  </a>
               </Link>
               <Link
                  href={{
                     pathname: '/',
                  }}
               >
                  <span onClick={this.props.signOut}>Log Out</span>
               </Link>
            </React.Fragment>
         );
      } else if (localStorage.length === 0) {
         userLoggedIn = (
            <React.Fragment>
               <Link
                  href={{
                     pathname: '/signup',
                     query: { action: 'login' },
                  }}
                  as={{ pathname: `/login` }}
               >
                  <a href="/signup">
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
            </React.Fragment>
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
               <a href="/">
                  <h1>order 4</h1>
               </a>
            </Link>
            <div className="menu-container">
               <div className="menu">
                  <Link
                     href={{
                        pathname: '/',
                     }}
                  >
                     <a href="/">
                        <span>Chains</span>
                     </a>
                  </Link>
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
                  {this.state.navItems}
                  <Link
                     href={{
                        pathname: '/create-order',
                     }}
                     as={{ pathname: `/create-order` }}
                  >
                     <a href="/create-order">
                        <span className="create">
                           Create Order
                           <img src="../static/plus.svg" alt="plus-icon" />
                        </span>
                     </a>
                  </Link>
               </div>
            </div>
         </NavBar>
      );
   }
}
