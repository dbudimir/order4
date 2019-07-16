import React, { Component, useContext } from 'react';

import { useRouter } from 'next/router';

import Layout from '../components/Layout';
import UserContext from '../components/UserContext';
import SignupForm from '../components/forms/SignupForm';
import LoginForm from '../components/forms/LoginForm';

function Signup() {
   const router = useRouter();
   const userStatus = useContext(UserContext);

   let currentForm;
   if (router.asPath === '/login') {
      currentForm = <LoginForm signIn={userStatus.signIn} />;
   } else {
      currentForm = <SignupForm signIn={userStatus.signIn} />;
   }

   return (
      <div>
         <Layout />
         {currentForm}
      </div>
   );
}

export default Signup;
