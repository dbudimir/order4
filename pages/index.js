import React, { Component } from 'react';
import 'isomorphic-fetch';
import Layout from '../components/Layout';
import Chains from '../components/Chains';

class Index extends Component {
   render() {
      return (
         <div>
            <Layout />
            <Chains chains={this.props} />
         </div>
      );
   }
}

Index.getInitialProps = async function() {
   const res = await fetch('https://qsr-order-api.herokuapp.com/api/chains/');
   const data = await res.json();

   return {
      chains: data,
   };
};

export default Index;
