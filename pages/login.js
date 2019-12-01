import React, { useContext } from 'react';
import styled from 'styled-components';

import Layout from '../components/Layout';
import UserContext from '../components/UserContext';
import LoginFormContainer from '../components/forms/LoginFormContainer';

const PageContainer = styled.div`
  background-color: #f7f7f7;
  height: 100vh;
`;

function Login({ updateUser = () => {} }) {
  const userStatus = useContext(UserContext);

  return (
    <PageContainer>
      <Layout />
      <LoginFormContainer signIn={userStatus.signIn} updateUser={updateUser} />
    </PageContainer>
  );
}

export default Login;
