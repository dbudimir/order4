import React, { Component } from 'react';
import { NextSeo } from 'next-seo';
import fetch from 'isomorphic-fetch';

import Layout from '../components/Layout';
import Footer from '../components/Footer';
import Search from '../components/Search';
import Chains from '../components/Chains';

class Index extends Component {
  render() {
    let chainName = '';
    const chainOrders = this.props.chains;

    // Start function that generates row for each chain
    const chainRows = chainOrders.map((chain, chainsIndex) => {
      chainName = chain[0].chainName;
      return <Chains chain={chain} index={chainsIndex} />;
    });

    return (
      <div>
        <NextSeo
          title={`MealDig | The custom food order database.`}
          description={`Discover popular meals and custom food orders at your favorite fast-casual dining spots.`}
        />
        <Layout />
        <Search />
        {chainRows}
        <Footer />
      </div>
    );
  }
}

export async function getServerSideProps(context) {
  const res = await fetch(process.env.api_key + `/api/chains/Chipotle`);
  const data = await res.json();

  const res2 = await fetch(process.env.api_key + '/api/chains/&pizza');
  const data2 = await res2.json();

  let chainsList = [data.orders, data2.orders];

  let cleanList = chainsList.map(chain =>
    chain.filter(order => {
      return (
        order.orderName !== null &&
        order.orderName !== undefined &&
        order.orderName.includes('test') !== true &&
        order.orderName.includes('Test') !== true &&
        order.tags.length > 0 &&
        Object.keys(order).length > 4
      );
    })
  );

  return {
    props: { chains: cleanList }
  };
}

export default Index;
