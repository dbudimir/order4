import React, { Component, useContext } from 'react';
import Head from 'next/head';
import Nav from './Nav';

import UserContext from './UserContext';

export default function Layout() {
   const userStatus = useContext(UserContext);

   const signOut = e => {
      e.preventDefault();
      userStatus.signOut();
   };

   return (
      <div>
         <Head></Head>
         <Nav signOut={signOut} />
      </div>
   );
}
