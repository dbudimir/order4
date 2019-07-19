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
      this.state = { order: [] };
   }

   componentDidMount() {
      if (this.props.orderId === '') {
         const id = window.location.pathname.replace('/orders/', '');
         axios.get(`https://qsr-order-api.herokuapp.com/api/orders/id/${id}`).then(response => {
            this.setState({ order: response.data });
         });
      } else {
         this.setState({ order: this.props.order });
      }
   }

   render() {
      console.log(this.props.order);
      const orderCard = this.state.order.map((order, index) => (
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
   const id = (await query.orderId) === undefined ? '' : `id/${query.orderId}`;
   const res = await fetch(`https://qsr-order-api.herokuapp.com/api/orders/${id}`);
   const data = await res.json();

   return {
      order: data,
      orderId: id,
   };
};

export default Orders;
