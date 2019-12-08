import React, { Component } from 'react';
import 'isomorphic-fetch';

import Layout from '../components/Layout';
import Search from '../components/Search';
import Chains from '../components/Chains';

class Index extends Component {
  componentDidMount() {
    console.log(this.props);
  }
  render() {
    return (
      <div>
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
