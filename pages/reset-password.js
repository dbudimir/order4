import React, { useContext } from 'react';
import styled from 'styled-components';

import Layout from '../components/Layout';
import UserContext from '../components/UserContext';
import ResetPasswordForm from '../components/forms/ResetPassword';

const PageContainer = styled.div`
  background-color: #f7f7f7;
  height: 100vh;
`;

function ResetPassword({ updateUser = () => {} }) {
  const userStatus = useContext(UserContext);

  return (
    <PageContainer>
      <Layout />
      <ResetPasswordForm signIn={userStatus.signIn} updateUser={updateUser} />
    </PageContainer>
  );
}

export default ResetPassword;
