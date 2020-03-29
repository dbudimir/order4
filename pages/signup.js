import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Layout from '../components/sitewide/Layout';
import UserContext from '../components/UserContext';
import SignupForm from '../components/forms/SignupForm';

const PageContainer = styled.div`
  background-color: #f7f7f7;
  height: 100vh;
`;

function Signup({ updateUser = () => {} }) {
  const userStatus = useContext(UserContext);

  Signup.propTypes = {
    updateUser: PropTypes.func,
  };

  return (
    <PageContainer>
      <Layout />
      <SignupForm signIn={userStatus.signIn} updateUser={updateUser} />
    </PageContainer>
  );
}

export default Signup;
