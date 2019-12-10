import React, { useContext, useEffect } from 'react';

import styled from 'styled-components';

import Nav from './navigation/Nav';

import UserContext from './UserContext';

const Navbar = styled.div`
  position: sticky;
  top: 0px;
  z-index: 10;
`;

export default function Layout() {
  const userStatus = useContext(UserContext);

  const signOut = e => {
    e.preventDefault();
    userStatus.signOut();
  };

  return (
    <Navbar>
      <Nav signOut={signOut} />
    </Navbar>
  );
}
