import React, { Component } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import ChainRow from './ChainRow';

const ChainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 1024px;
  max-width: 94%;
  margin: 40px auto 120px;

  .chain-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
    border-bottom: 4px solid #0067ff;
  }

  a {
    color: #0067ff;
    text-decoration: none;
    font-family: Nunito;

    h2 {
      font-size: 36px;
      font-weight: 800;
      margin: 12px 0;
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

const SortOrder = styled.div`
  position: relative;
  width: max-content;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding: 4px 0;
  font-family: Nunito;
  font-size: 16px;

  span {
    border: none;
    font-weight: 700;
    margin-right: 6px;
  }

  .sort-select {
    display: flex;
    align-items: center;
    background: #eeeef1;
    padding: 2px 8px;
    border-radius: 5px;

    &:hover {
      background: #dfe2e4;
      cursor: pointer;
    }

    select {
      -webkit-appearance: none;
      border: none;
      background: transparent;
      font-family: Nunito;
      font-size: 16px;
      cursor: pointer;
    }

    svg {
      width: 16px;
      margin-left: 4px;
    }
  }
`;

class Chains extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chains: [],
      sortOrder: 'popular'
    };
  }

  sortOrders = e => {
    this.setState({
      sortOrder: e.target.value
    });
  };

  render() {
    let chainName = this.props.chain[0].chainName;
    return (
      <ChainContainer>
        <div className="chain-header">
          <Link
            href={{
              pathname: '/chains/[name]',
              query: { chainName: chainName }
            }}
            as={{ pathname: `/chains/${chainName}` }}
          >
            <a href={`/chains/${chainName}`}>
              <h2 className="chain-name">{chainName}</h2>
            </a>
          </Link>
          <SortOrder>
            <span>Sort by:</span>
            <div className="sort-select">
              <select onChange={e => this.sortOrders(e)} name="sort-orders" ref="order-select">
                <option value="popular">Most Popular</option>
                <option value="recent">Most Recent</option>
                <option value="oldest">Oldest</option>
              </select>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-arrow-down"
              >
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <polyline points="19 12 12 19 5 12"></polyline>
              </svg>
            </div>
          </SortOrder>
        </div>
        <ChainRow chainRow={this.props.chain} sortOrder={this.state.sortOrder} />
      </ChainContainer>
    );
  }
}

export default Chains;
