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
    this.state = { ...props };
  }

  render() {
    const allOrders = this.state;
    const orderCard = allOrders.orders.map((order, index) => (
      <OrderContent orderID={order._id} key={index} />
    ));

    return (
      <React.Fragment>
        <NextSeo title={`Custom orders created by ${allOrders.fullName}`} />
        <Layout />
        <H1>{`Custom orders created by ${allOrders.fullName}`}</H1>
        <OrderContainer className="order-content-container">{orderCard}</OrderContainer>
      </React.Fragment>
    );
  }
}

export async function getServerSideProps(context) {
  const res = await fetch(`${process.env.api_key}/api/users/${context.query.user}`);
  const data = await res.json();

  return {
    props: {
      orders: data[0].orders,
      fullName: data[0].userFullName,
      userId: context.query.user,
    },
  };
}

export default User;
