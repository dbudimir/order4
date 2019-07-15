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
   constructor() {
      super();
      this.state = {
         orders: [],
      };
   }

   static getInitialProps = async function() {
      const res = await fetch(
         'https://qsr-order-api.herokuapp.com/api/orders/'
      );
      const data = await res.json();
      return {
         orders: data,
      };
   };

   render() {
      console.log('now rendering');
      console.log(this.props.url.asPath);
      const { orders } = this.props;
      const orderCard = orders.map((order, index) => (
         <OrderContent orderID={order._id} key={index} />
      ));

      return (
         <div>
            <Layout />
            {/* <h2>{this.props.match.params.chain} Orders</h2> */}
            <OrderContainer>{orderCard}</OrderContainer>
         </div>
      );
   }
}

export default Orders;
