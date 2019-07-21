/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import shuffle from 'shuffle-array';
import 'isomorphic-fetch';

import styled from 'styled-components';

import Head from '../../components/Head';
import Layout from '../../components/Layout';
import OrderContent from '../../components/order-content/OrderContent';

const OrderContainer = styled.div`
   display: flex;
   flex-direction: row;
   flex-wrap: wrap;
   justify-content: space-around;
   max-width: 1024px;
   margin: 0 auto;
   padding: 0 12px;
   margin-top: 60px;

   h3 {
      text-transform: capitalize;
   }
`;

class Orders extends Component {
   render() {
      const { orders } = this.props;
      shuffle(orders);
      const orderCard = orders.map((order, index) => {
         // const orderSize = JSON.stringify(order.orderContent[0]).length;
         if (
            order.orderName !== null &&
            order.orderName !== undefined &&
            Object.keys(order).length > 4
         ) {
            return <OrderContent orderID={order._id} key={index} />;
         }
      });

      return (
         <div>
            <Head title="All Orders" />
            <Layout />
            <h1>Popular Orders</h1>
            <OrderContainer>{orderCard}</OrderContainer>
         </div>
      );
   }
}

Orders.getInitialProps = async () => {
   const res = await fetch('https://qsr-order-api.herokuapp.com/api/orders/');
   const data = await res.json();
   return {
      orders: data,
   };
};

export default Orders;
