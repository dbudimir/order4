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
  }
`;

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = { order: [] };
  }

  render() {
    const orderCard = this.props.order.map((order, index) => (
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

Orders.getInitialProps = async ({ query }) => {
  const res = await fetch(process.env.api_key + `/api/orders/id/${query.id}`);
  const data = await res.json();

  return {
    order: data,
    orderId: query.id
  };
};

export default Orders;
