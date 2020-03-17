/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import Link from 'next/link';
import axios from 'axios';

import OrderContentContainer from '../styles/OrderContentContainer';

// Components pulling innformaton relevent to all chains
import ActionBar from './all-orders/ActionBar';
import CreatedMeta from './all-orders/CreatedMeta';
import OrderTags from './all-orders/OrderTags';

// Components pulling innformaton relevent to a specific chain
import ChainLogo from './chain-specific/ChainLogo';
import ChainContent from './chain-specific/ChainContent';

class OrderContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
      userData: []
    };
  }

  componentDidMount() {
    if (this.props.orderState === undefined) {
      axios
        .get(process.env.api_key + `/api/orders/id/${this.props.orderID}`)
        .then(res => {
          const { data } = res;
          this.setState({
            orderId: data[0]._id,
            orderDescription: data[0].description,
            orderContent: data[0].orderContent[0],
            tags: data[0].tags,
            favoriteCount: data[0].favoriteCount,
            usersFavorited: data[0].usersFavorited,
            orderName: data[0].orderName,
            chainName: data[0].chainName,
            createdAt: data[0].createdAt,
            userData: data[0].users
          });
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      const { order, chainName } = this.props.orderState;
      this.setState({
        orderDescription: order.description,
        orderContent: order,
        tags: JSON.parse(
          JSON.stringify(order.tags, function(key, value) {
            return value == null ? [] : value;
          })
        ),
        orderName: order.orderName,
        chainName
      });
    }
  }

  render() {
    return (
      <OrderContentContainer className="order-content-container">
        <div className="order-data">
          <ChainLogo chainName={this.state.chainName} />
          <div className="order-info">
            <h2 className="order-name">{this.state.orderName}</h2>
            <p className="description">{this.state.orderDescription}</p>
          </div>
          <ChainContent chainName={this.state.chainName} orderState={this.state.orderContent} />
          <div className="order-meta">
            <OrderTags chainName={this.state.chainName} tags={this.state.tags} />
            <CreatedMeta userData={this.state.userData} dateCreated={this.state.createdAt} />
          </div>
        </div>

        <ActionBar
          key={this.state.orderId}
          favoriteCount={this.state.favoriteCount}
          orderId={this.state.orderId}
          usersFavorited={this.state.usersFavorited}
        />
      </OrderContentContainer>
    );
  }
}

export default OrderContent;
