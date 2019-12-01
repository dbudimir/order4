import React, { useContext } from 'react';
import styled from 'styled-components';

import Layout from '../components/Layout';
import UserContext from '../components/UserContext';
import SignupForm from '../components/forms/SignupForm';

const PageContainer = styled.div`
  background-color: #f7f7f7;
  height: 100vh;
`;

function Signup({ updateUser = () => {} }) {
  const userStatus = useContext(UserContext);

  return (
    <PageContainer>
      <Layout />
      <SignupForm signIn={userStatus.signIn} updateUser={updateUser} />
    </PageContainer>
  );
}

export default Signup;
