/* eslint-disable react/prop-types */
import React, { Component } from 'react';

import 'isomorphic-fetch';

import styled from 'styled-components';

import Layout from '../../../components/Layout';
import OrderContent from '../../../components/order-content/OrderContent';

const OrderContainer = styled.div`
   display: flex;
   flex-direction: row;
   flex-wrap: wrap;
   justify-content: space-between;
   h3 {
      text-transform: capitalize;
   }
`;

class Tag extends Component {
   constructor(props) {
      super(props);
      this.state = { orders: [] };
   }

   render() {
      console.log(this.props);
      const orderCard = this.props.orders.map((order, index) => (
         <OrderContent orderID={order._id} key={index} />
      ));

      return (
         <div>
            <Layout />
            <h1>
               The most popular {this.props.tag} orders at {this.props.name}
            </h1>
            <OrderContainer>{orderCard}</OrderContainer>
         </div>
      );
   }
}

Tag.getInitialProps = async ({ query }) => {
   const lookup = `${query.name}/${query.tag}`;
   const res = await fetch(`https://qsr-order-api.herokuapp.com/api/orders/chain/${lookup}`);
   const data = await res.json();

   return {
      orders: data,
      name: query.name,
      tag: query.tag,
   };
};

export default Tag;
