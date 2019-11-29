/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import shuffle from 'shuffle-array';
import 'isomorphic-fetch';

import styled from 'styled-components';

import Head from '../../components/Head';
import Layout from '../../components/Layout';
import OrderContent from '../../components/order-content/OrderContent';

const H1 = styled.h1`
  max-width: 1024px;
  margin: 60px auto 48px;
  padding: 0px 12px;
  font-family: Roboto, sans-serif;
  font-size: 42px;
  font-weight: 900;
`;

const OrderContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 1024px;
  margin: 0 auto;
  padding: 0 12px;

  h3 {
    text-transform: capitalize;
  }
`;

class Orders extends Component {
  render() {
    const { orders } = this.props;
    shuffle(orders);
    const orderCard = orders.map((order, index) => {
      if (
        order.orderName !== null &&
        order.orderName !== undefined &&
        order.orderName.includes('test') !== true &&
        order.orderName.includes('Test') !== true &&
        Object.keys(order).length > 4
      ) {
        return <OrderContent orderID={order._id} key={index} />;
      }
    });

    return (
      <div>
        <Head title="All Orders" />
        <Layout />
        <H1>Popular Orders</H1>
        <OrderContainer className="order-container">{orderCard}</OrderContainer>
      </div>
    );
  }
}

Orders.getInitialProps = async () => {
  const res = await fetch('https://qsr-order-api.herokuapp.com/api/orders/');
  const data = await res.json();
  return {
    orders: data
  };
};

export default Orders;
