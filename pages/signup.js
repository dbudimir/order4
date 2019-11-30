import React, { useContext } from 'react';

import Layout from '../components/Layout';
import UserContext from '../components/UserContext';
import SignupForm from '../components/forms/SignupForm';

function Signup({ updateUser = () => {} }) {
  const userStatus = useContext(UserContext);

  return (
    <div>
      <Layout />
      <SignupForm signIn={userStatus.signIn} updateUser={updateUser} />;
    </div>
  );
}

export default Signup;
