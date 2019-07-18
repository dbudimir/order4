/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import axios from 'axios';
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
   constructor(props) {
      super(props);
      this.state = { orders: [] };
   }

   componentDidMount() {
      if (this.props.userId === '') {
         const id = window.location.pathname.replace('/user/', '');
         axios.get(`https://qsr-order-api.herokuapp.com/api/users/${id}`).then(response => {
            this.setState({ orders: response.data[0].orders });
         });
      } else {
         this.setState({ orders: this.props.orders });
      }
   }

   render() {
      console.log(this.state);

      const orderCard = this.state.orders.map((order, index) => (
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

   return {
      orders: data[0].orders,
      userId: id,
   };
};

export default Orders;
