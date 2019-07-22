import React, { useContext, useEffect } from 'react';

import styled from 'styled-components';

import Head from 'next/head';
import { initGA, logPageView } from '../utils/analytics';
import Nav from './Nav';

import UserContext from './UserContext';

const Navbar = styled.div`
   position: sticky;
   top: 0px;
`;

export default function Layout() {
   const userStatus = useContext(UserContext);

   useEffect(() => {
      if (!window.GA_INITIALIZED) {
         initGA();
         window.GA_INITIALIZED = true;
      }
      logPageView();
   });

   const signOut = e => {
      e.preventDefault();
      userStatus.signOut();
   };

   return (
      <Navbar>
         <Head></Head>
         <Nav signOut={signOut} />
      </Navbar>
   );
}
