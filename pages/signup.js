import React, { useContext } from 'react';

import { useRouter } from 'next/router';

import Head from '../components/Head';
import Layout from '../components/Layout';
import UserContext from '../components/UserContext';
import SignupForm from '../components/forms/SignupForm';
import LoginForm from '../components/forms/LoginForm';

function Signup({ updateUser = () => {} }) {
  const router = useRouter();
  const userStatus = useContext(UserContext);

  let currentForm;
  if (router.asPath === '/login') {
    currentForm = <LoginForm signIn={userStatus.signIn} updateUser={updateUser} />;
  } else {
    currentForm = <SignupForm signIn={userStatus.signIn} updateUser={updateUser} />;
  }

  return (
    <div>
      <Head />
      <Layout />
      {currentForm}
    </div>
  );
}

export default Signup;
