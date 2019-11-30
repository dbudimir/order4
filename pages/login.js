import React, { useContext } from 'react';

import Layout from '../components/Layout';
import UserContext from '../components/UserContext';
import LoginForm from '../components/forms/LoginForm';

function Login({ updateUser = () => {} }) {
  const userStatus = useContext(UserContext);

  return (
    <div>
      <Layout />
      <LoginForm signIn={userStatus.signIn} updateUser={updateUser} />;
    </div>
  );
}

export default Login;
