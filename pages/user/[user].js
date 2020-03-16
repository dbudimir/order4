/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import 'isomorphic-fetch';
import { NextSeo } from 'next-seo';

import styled from 'styled-components';

import Layout from '../../components/Layout';
import OrderContent from '../../components/order-content/OrderContent';

const H1 = styled.h1`
  max-width: 1024px;
  margin: 60px auto 48px;
  padding: 0px 12px;
  font-family: Roboto, sans-serif;
  font-size: 42px;
  font-weight: 800;
`;

const OrderContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 1024px;
  margin: 60px auto;

  .order-content-container {
    flex-basis: 100%;
  }
`;

class User extends Component {
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
        <NextSeo title={`Custom orders created by ${this.props.fullName}`} />
        <Layout />
        <H1>{`Custom orders created by ${this.props.fullName}`}</H1>
        <OrderContainer className="order-content-container">{orderCard}</OrderContainer>
      </div>
    );
  }
}

User.getInitialProps = async ({ req, query }) => {
  const res = await fetch(process.env.api_key + `/api/users/${query.user}`);
  const data = await res.json();

  return {
    orders: data[0].orders,
    fullName: data[0].userFullName,
    userId: query.user
  };
};

export default User;
