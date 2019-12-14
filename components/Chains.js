import React, { Component } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import OrderContent from './order-content/OrderContent';

const ChainContent = styled.div`
  position: relative;
`;

const ChainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 1024px;
  max-width: 94%;
  margin: 40px auto 120px;

  a {
    color: #0067ff;
    text-decoration: none;
    font-family: Nunito;

    h2 {
      font-size: 36px;
      border-bottom: 4px solid;
      padding-bottom: 12px;
      font-weight: 800;
    }
  }

  .fade-bar {
    position: absolute;
    background-color: #000000;
    height: calc(100% - 120px);
    width: 32px;
    right: 0;
    background: -moz-linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(0, 0, 0, 0) 100%);
    background: -webkit-gradient(
      linear,
      left top,
      right top,
      color-stop(0%, rgba(0, 0, 0, 0)),
      color-stop(100%, rgba(255, 255, 255, 1))
    );
    background: -webkit-linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(0, 0, 0, 0) 100%);
    background: -o-linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(0, 0, 0, 0) 100%);
    background: -ms-linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(0, 0, 0, 0) 100%);
    background: linear-gradient(270deg, rgba(255, 255, 255, 1) 0%, rgba(0, 0, 0, 0) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#000000', endColorstr='#FFFFFF',GradientType=1 );
  }

  .chain-row {
    display: flex;
    flex-direction: row;
    overflow-x: scroll;
    overflow-y: hidden;
    padding-left: 8px;

    .order-content-container {
      text-decoration: none;
      min-width: 360px;
      margin-right: 24px;
      display: inline-flex;

      .order-name {
        margin-bottom: 12px;
      }

      .description {
        margin-top: 0px;
        font-size: 16px;
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
      chains: []
    };
  }

  render() {
    const chainOrders = this.props.chains;
    const chainRows = chainOrders.map((chain, chainsIndex) => {
      const orders = chain.orders.map((order, ordersIndex) => {
        if (
          chain.name === order.chainName &&
          order.orderName !== null &&
          order.orderName !== undefined &&
          order.orderName.includes('test') !== true &&
          order.orderName.includes('Test') !== true &&
          Object.keys(order).length > 4
        ) {
          return <OrderContent orderID={order._id} key={chain.name + ' - ' + ordersIndex} />;
        }
      });
      return (
        <ChainContent key={chainsIndex}>
          <Link
            href={{
              pathname: '/chains/[name]',
              query: { chainName: chain.name }
            }}
            as={{ pathname: `/chains/${chain.name}` }}
          >
            <a href={`/chains${chain.name}`}>
              <h2 className="chain-name">{chain.name}</h2>
            </a>
          </Link>
          <div className="fade-bar"></div>
          <div className="chain-row">{orders}</div>
        </ChainContent>
      );
    });

    return <ChainContainer>{chainRows}</ChainContainer>;
  }
}

export default Chains;
