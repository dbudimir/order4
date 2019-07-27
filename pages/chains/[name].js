/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import Link from 'next/link';
import { withRouter } from 'next/router';

import Head from '../../components/Head';
import Layout from '../../components/Layout';

class Chains extends Component {
   static getInitialProps({ query }) {
      return { chainName: query.chain };
   }

   render() {
      const { router } = this.props;

      return (
         <div>
            <Head />
            <Layout />
            <h1>Chain: {router.query.name}</h1>
            <Link href="/">
               <a>Go back to the list of posts</a>
            </Link>
         </div>
      );
   }
}

export default withRouter(Chains);
