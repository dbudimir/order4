import React, { Component } from 'react';
import 'isomorphic-fetch';

import { NextSeo } from 'next-seo';

import Layout from '../components/Layout';
import Search from '../components/Search';
import Chains from '../components/Chains';

class Index extends Component {
  render() {
    return (
      <div>
        <NextSeo
          title={`MealDig | Custom fast-casual meal orders.`}
          description={`Discover popular meals and custom orders at your favorite fast-casual dining spots.`}
        />
        <Layout />
        <Search />
        <Chains chains={this.props.chains} />
      </div>
    );
  }
}

Index.getInitialProps = async () => {
  const res = await fetch(process.env.api_key + `/api/chains/Chipotle`);
  const data = await res.json();

  const res2 = await fetch(process.env.api_key + '/api/chains/&pizza');
  const data2 = await res2.json();

  return {
    chains: [data, data2]
  };
};

export default Index;
