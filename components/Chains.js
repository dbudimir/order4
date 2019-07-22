import React, { Component } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import OrderContent from './order-content/OrderContent';

const ChainContainer = styled.div`
   display: flex;
   flex-direction: column;
   width: 1024px;
   max-width: 94%;
   margin: 60px auto;

   a {
      color: #0067ff;
      text-decoration: none;
      font-family: Roboto;

      h2 {
         font-size: 36px;
         border-bottom: 4px solid;
         padding-bottom: 12px;
      }
   }

   .chain-row {
      display: flex;
      flex-direction: row;
      overflow-x: scroll;
      overflow-y: hidden;
      padding-left: 8px;

      .order-content-container {
         text-decoration: none;
         min-width: 260px;
         margin-right: 24px;
         display: inline-flex;

         .order-name {
            margin-bottom: 12px;
         }

         .description {
            margin-top: 0px;
         }

         .order-content {
            font-size: 14px;
         }
      }
   }
`;

class Chains extends Component {
   constructor() {
      super();
      this.state = {
         chains: [],
      };
   }

   render() {
      const chainOrders = this.props.chains.chains;
      const chainRows = chainOrders.map((chain, index) => {
         console.log(chain);
         const orders = chain.orders.map((order, index) => {
            if (
               chain.name === order.chainName &&
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
               <Link
                  href={{
                     pathname: '/chains/[name]',
                     query: { chainName: chain.name },
                  }}
                  as={{ pathname: `/chains/${chain.name}` }}
               >
                  <a href={`/chains${chain.name}`}>
                     <h2 className="chain-name">{chain.name}</h2>
                  </a>
               </Link>
               <div className="chain-row">{orders}</div>
            </div>
         );
      });

      return <ChainContainer>{chainRows}</ChainContainer>;
   }
}

export default Chains;
