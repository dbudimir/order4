import React, { useContext, useEffect } from 'react';

import styled from 'styled-components';

import Nav from './navigation/Nav';

import UserContext from './UserContext';

const GlobalLayout = styled.div`
  .navbar {
    position: sticky;
    top: 0px;
    z-index: 10;
  }

  .feedback-icon {
    position: fixed;
    bottom: 12px;
    right: 12px;
  }
`;

export default function Layout() {
  const userStatus = useContext(UserContext);

  const signOut = e => {
    e.preventDefault();
    userStatus.signOut();
  };

  return (
    <GlobalLayout>
      <div className="navbar">
        <Nav signOut={signOut} />
      </div>
      <div className="feedback-icon">
        <img src="/static/icons/info.svg" />
      </div>
    </GlobalLayout>
  );
}
