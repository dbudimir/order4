// Utilities
import React, { Component } from 'react';
import { NextSeo } from 'next-seo';
import fetch from 'isomorphic-fetch';

// Style
import PageContent from '../components/styles/Home';

// Components
import Layout from '../components/sitewide/Layout';
import Footer from '../components/sitewide/Footer';
import Search from '../components/Search';
import ChainButtons from '../components/ChainButtons';
import Chains from '../components/Chains';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = { ...props };
  }

  render() {
    const { chains } = this.state;

    const chainNames = [];
    chains.map(chain => chainNames.push(chain[0].chainName));

    // Start function that generates row for each chain
    const chainRows = chains.map((chain, chainsIndex) => (
      <Chains chain={chain} index={chainsIndex} />
    ));

    return (
      <div>
        <NextSeo
          title="MealDig | The custom food order database."
          description="Discover popular meals and custom food orders at your favorite fast-casual dining spots."
        />
        <Layout />
        <Search />
        <PageContent>
          <ChainButtons chainNames={chainNames} />
          {chainRows}
        </PageContent>
        <Footer />
      </div>
    );
  }
}

// Serverside get props
export async function getServerSideProps() {
  const res = await fetch(`${process.env.api_key}/api/chains/Chipotle`);
  const data = await res.json();

  const res2 = await fetch(`${process.env.api_key}/api/chains/&pizza`);
  const data2 = await res2.json();

  const chainsList = [data.orders, data2.orders];

  const cleanList = chainsList.map(chain =>
    chain.filter(
      order =>
        order.orderName !== null &&
        order.orderName !== undefined &&
        order.orderName.includes('test') !== true &&
        order.orderName.includes('Test') !== true &&
        order.tags.length > 0 &&
        Object.keys(order).length > 4
    )
  );

  return {
    props: { chains: cleanList },
  };
}

export default Index;
