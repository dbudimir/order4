import React, { Component } from 'react';
import 'isomorphic-fetch';

import Head from '../components/Head';
import Layout from '../components/Layout';
import UserInfo from '../components/UserInfo';
import Chains from '../components/Chains';

class Index extends Component {
   render() {
      return (
         <div>
            <Head title="Home" />
            <Layout />
            <UserInfo />
            <Chains chains={this.props} />
         </div>
      );
   }
}

Index.getInitialProps = async () => {
   const res = await fetch('https://qsr-order-api.herokuapp.com/api/chains/');
   const data = await res.json();

   return {
      chains: data,
   };
};

export default Index;
