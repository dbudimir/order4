/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import Link from 'next/link';
import { withRouter } from 'next/router';

import styled from 'styled-components';

import { NextSeo } from 'next-seo';
import Layout from '../../components/Layout';

const ChainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 1024px;
  max-width: 94%;
  margin: 40px auto 120px;

  h1 {
    color: rgb(0, 103, 255);
    font-family: Nunito;
  }
`;

class Chains extends Component {
  static getInitialProps({ query }) {
    return { chainName: query.chain };
  }

  render() {
    const { router } = this.props;

    return (
      <div>
        <NextSeo
          title={`Custom meal orders at ${router.query.name} | MealDig`}
          description={`Explore the most popular custom meal orders at ${router.query.name}. | MealDig`}
        />
        <Layout />
        <ChainContainer>
          <h1>Chain: {router.query.name}</h1>
        </ChainContainer>
        <Link href="/">
          <a>Go back to the list of posts</a>
        </Link>
      </div>
    );
  }
}

export default withRouter(Chains);
