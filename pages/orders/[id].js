/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import 'isomorphic-fetch';

import styled from 'styled-components';

import Layout from '../../components/Layout';
import OrderContent from '../../components/order-content/OrderContent';

const OrderContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 1024px;
  margin: 60px auto;

  .order-content-container {
    flex-basis: 100%;

    .order-data {
      .description {
        display: block;
        mask-image: unset;
      }
    }
  }
`;

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = { ...props };
  }

  render() {
    const allOrders = this.props;
    const orderCard = allOrders.order.map((order, index) => (
      <OrderContent orderID={order._id} key={index} />
    ));

    return (
      <div>
        <Layout />
        <OrderContainer>{orderCard}</OrderContainer>
      </div>
    );
  }
}

export async function getServerSideProps(context) {
  const res = await fetch(`${process.env.api_key}/api/orders/id/${context.query.id}`);
  const data = await res.json();

  return {
    props: { order: data, orderId: context.query.id },
  };
}

export default Orders;
