import React, { Component } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';

function Chains() {
   const router = useRouter();
   const { slug } = router.query;

   return (
      <div>
         <Layout />
         return <p>My Chain: {slug}</p>
      </div>
   );
}

export default Chains;
