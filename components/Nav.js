import React, { Component } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const NavBar = styled.div`
   background: #000000;
   display: flex;
   justify-content: space-between;
   align-items: center;
   color: #ffffff;
   max-width: 100%;
   padding: 0px 24px;
   a {
      text-decoration: none;
      color: #ffffff;
   }
   h1 {
      color: #ffffff;
      text-decoration: none;
   }
   div {
      display: flex;
      span {
         margin-left: 24px;
         font-size: 18px;
      }
   }
`;

class Nav extends Component {
   handelLogOut = () => {
      this.props.logOut();
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
               <h1>QSR Orders</h1>
            </Link>

            <div>
               <Link
                  href={{
                     pathname: '/orders/all',
                  }}
                  as={{ pathname: `/orders` }}
               >
                  <span>Orders</span>
               </Link>
               <Link
                  href={{
                     pathname: '/',
                  }}
               >
                  <span>Chains</span>
               </Link>
               <Link
                  href={{
                     pathname: '/orders/[user]',
                     query: { userId: '5cfed94deedaa400045dbb3b' },
                  }}
                  as={{ pathname: `/orders/my-orders` }}
               >
                  <span>My Orders</span>
               </Link>
               {/* <Link to={`/users/${this.props.userId}`}>
                  <span>My Orders</span>
               </Link>
               <Link to="/create">
                  <span>Create an Order</span>
               </Link>
               <Link to="/login">
                  <span>Login</span>
               </Link>
               <Link to="/signup">
                  <span>Signup</span>
               </Link>
               <span onClick={this.handelLogOut} role="button" tabIndex="0">
                  Logout
               </span>{' '} */}
            </div>
         </NavBar>
      );
   }
}

export default Nav;
