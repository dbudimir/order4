import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Layout from '../components/sitewide/Layout';
import UserContext from '../components/UserContext';
import LoginFormContainer from '../components/forms/LoginFormContainer';

const PageContainer = styled.div`
  background-color: #f7f7f7;
  height: 100vh;
`;

const Login = ({ updateUser = () => {} }) => {
  const userStatus = useContext(UserContext);

  Login.propTypes = {
    updateUser: PropTypes.func,
  };

  return (
    <PageContainer>
      <Layout />
      <LoginFormContainer signIn={userStatus.signIn} updateUser={updateUser} />
    </PageContainer>
  );
};

export default Login;
