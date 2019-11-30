/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import 'isomorphic-fetch';

import { NextSeo } from 'next-seo';

import styled from 'styled-components';
import TagPage from '../../components/styles/TagPage';

import Layout from '../../components/Layout';
import OrderContent from '../../components/order-content/OrderContent';

const OrderContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  h3 {
    text-transform: capitalize;
  }
`;

class Tag extends Component {
  constructor(props) {
    super(props);
    this.state = { orders: [] };
  }

  render() {
    const orderCard = this.props.orders.map((order, index) => (
      <OrderContent orderID={order._id} key={index} />
    ));

    return (
      <div>
        <NextSeo
          title={`The Best ${this.props.tag.charAt(0).toUpperCase() +
            this.props.tag.slice(1)} Custom Meal Orders`}
          description={`Check out the most popular ${this.props.tag} custom meal orders at fast-casual restaurants. Or, submit your own custom order and share it with your friends.`}
        />
        <Layout />
        <TagPage className="tag-order-container">
          <h1>The most popular {this.props.tag} custom orders.</h1>
          <OrderContainer>{orderCard}</OrderContainer>
        </TagPage>
      </div>
    );
  }
}

Tag.getInitialProps = async ({ query }) => {
  const res = await fetch(`https://qsr-order-api.herokuapp.com/api/orders/tag/${query.tag}`);
  const data = await res.json();

  return {
    orders: data,
    tag: query.tag
  };
};

export default Tag;
