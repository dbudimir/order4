import React, { Component } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import OrderContent from './order-content/OrderContent';

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

  .chain-row {
    display: flex;
    overflow: auto;
    padding-left: 4px;

    .modal-container {
      .order-content-container {
        margin: 0 24px 12px 0;
        height: 540px;
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
    console.log(this.props.chains);
    const chainOrders = this.props.chains;
    const chainRows = chainOrders.map((chain, chainsIndex) => {
      const orders = chain.map((order, ordersIndex) => {
        return <OrderContent orderID={order._id} key={chain.name + ' - ' + ordersIndex} />;
      });

      return (
        <div key={chainsIndex}>
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
          <div className="chain-row">{orders}</div>
        </div>
      );
    });

    return <ChainContainer>{chainRows}</ChainContainer>;
  }
}

export default Chains;
