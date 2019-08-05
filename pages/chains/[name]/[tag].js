/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import 'isomorphic-fetch';

import styled from 'styled-components';
import TagPage from '../../../components/styles/TagPage';

import Head from '../../../components/Head';
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
      const orderCard = this.props.orders.map((order, index) => (
         <OrderContent orderID={order._id} key={index} />
      ));

      return (
         <div>
            <Head
               title={`The Best ${this.props.tag.charAt(0).toUpperCase() +
                  this.props.tag.slice(1)} Orders at ${this.props.name.charAt(0).toUpperCase() +
                  this.props.name.slice(1)}`}
               description={`Check out the most popular ${this.props.tag} custom orders at ${this.props.name}. Or, submit your own custom order and share it with your friends.`}
            />
            <Layout />
            <TagPage className="tag-order-container">
               <h1>
                  {`The most popular
                  ${this.props.tag.charAt(0).toUpperCase() + this.props.tag.slice(1)} orders at
                  ${this.props.name.charAt(0).toUpperCase() + this.props.name.slice(1)}`}
               </h1>
               <OrderContainer>{orderCard}</OrderContainer>
            </TagPage>
         </div>
      );
   }
}

Tag.getInitialProps = async ({ query }) => {
   const chainUpper = query.name.charAt(0).toUpperCase() + query.name.slice(1);
   const lookup = `${chainUpper}/${query.tag}`;
   const res = await fetch(`https://qsr-order-api.herokuapp.com/api/orders/chain/${lookup}`);
   const data = await res.json();

   return {
      orders: data,
      name: query.name,
      tag: query.tag,
   };
};

export default Tag;
