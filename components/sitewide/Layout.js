import React, { useContext } from 'react';
import styled from 'styled-components';
import UserContext from '../UserContext';

import Nav from './navigation/Nav';
import Feedback from './Feedback';

const GlobalLayout = styled.div`
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

  const updateFeedbackModal = () => {
    localStorage.setItem('feedBackPopUpSeen', true);
  };

  return (
    <GlobalLayout>
      <div className="navbar">
        <Nav signOut={signOut} />
      </div>
      <Feedback updateFeedbackModal={updateFeedbackModal} />
    </GlobalLayout>
  );
}
