import React, { useContext, useEffect } from 'react';
import UserContext from './UserContext';

import styled from 'styled-components';

import Nav from './navigation/Nav';

const GlobalLayout = styled.div`
  position: sticky;
  top: 0px;
  z-index: 10;

  .feedback-icon {
    position: fixed;
    bottom: 10px;
    left: 10px;
    background: #ffffff;
    border-radius: 100%;
    box-shadow: 0 11px 40px 0 rgba(0, 0, 0, 0.25), 0 2px 10px 0 rgba(0, 0, 0, 0.12);

    img {
      padding: 3px;
      display: block;
    }
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
