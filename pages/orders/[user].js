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
   h3 {
      text-transform: capitalize;
   }
`;

class Orders extends Component {
   render() {
      // const { router } = this.props;
      console.log('now rendering');
      console.log(this.props);

      const { orders } = this.props;
      const orderCard = orders.map((order, index) => (
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
   const id = (await query.userId) === undefined ? '' : query.userId;
   const res = await fetch(`https://qsr-order-api.herokuapp.com/api/users/${id}`);
   const data = await res.json();
   console.log(data);
   return {
      orders: data[0].orders,
      userId: query.userId,
   };
};

export default Orders;
