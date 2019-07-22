import React, { Component } from 'react';
import 'isomorphic-fetch';

import Head from '../components/Head';
import Layout from '../components/Layout';
import Chains from '../components/Chains';

class Index extends Component {
   render() {
      return (
         <div>
            <Head title="Home" />
            <Layout />
            <Chains chains={this.props} />
         </div>
      );
   }
}

Index.getInitialProps = async () => {
   const res = await fetch(`https://qsr-order-api.herokuapp.com/api/chains/Chipotle`);
   const data = await res.json();

   const res2 = await fetch(`https://qsr-order-api.herokuapp.com/api/chains/&pizza`);
   const data2 = await res2.json();

   return {
      chains: [data, data2],
   };
};

export default Index;
