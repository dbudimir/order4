/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import Link from 'next/link';
import axios from 'axios';
import Moment from 'react-moment';

import OrderContentContainer from '../styles/OrderContentContainer';

import ActionBar from './ActionBar';

import ChipotleOrder from './ChipotleOrder';
import AndPizzaOrder from './AndPizzaOrder';

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
    let chainLogo;
    let chainOrderContent;
    let orderUserName =
      this.state.userData.length === 0 ? 'unknown' : this.state.userData[0].userName;

    if (this.state.chainName === 'Chipotle') {
      chainLogo = (
        <img
          className="chain-logo"
          src="../../static/chain-logos/chipotle-logo.png"
          alt="chipotle-logo"
        />
      );
      chainOrderContent = <ChipotleOrder orderState={this.state.orderContent} />;
    } else if (this.state.chainName === '&pizza') {
      chainLogo = (
        <img
          className="chain-logo"
          src="../../static/chain-logos/and-pizza-logo.png"
          alt="and-pizza-logo"
        />
      );
      chainOrderContent = <AndPizzaOrder orderState={this.state.orderContent} />;
    }

    const tags = this.state.tags.map((tag, index) => (
      <Link
        key={`tag-${index}`}
        href={{
          pathname: `/chains/[name]/[tag]`,
          query: { chainName: this.state.chainName.toLowerCase(), tag: tag }
        }}
        as={{ pathname: `/chains/${this.state.chainName.toLowerCase()}/${tag}` }}
      >
        <a href={`/chains/${this.state.chainName.toLowerCase()}/${tag}`}>
          <span key={`tag-${index}`}>{tag.replace(/-/g, ' ')}</span>
        </a>
      </Link>
    ));

    return (
      <OrderContentContainer className="order-content-container">
        <div className="order-data">
          <div className="chain">
            {/* <h3>{this.state.chainName}</h3> */}
            {chainLogo}
            <div className="created-by">
              <p>
                Created by
                <Link
                  href={{
                    pathname: `/user/[user]`,
                    query: { user: orderUserName }
                  }}
                  as={{ pathname: `/user/${orderUserName}` }}
                >
                  <a href={`/user/${orderUserName}`}>
                    <span> {orderUserName} </span>
                  </a>
                </Link>
                <span>
                  {this.state.userData.length === 0 ? (
                    ''
                  ) : (
                    <Moment fromNow>{this.state.createdAt}</Moment>
                  )}
                </span>
              </p>
            </div>
          </div>
          <h2 className="order-name">{this.state.orderName}</h2>
          <p className="description">{this.state.orderDescription}</p>
          {chainOrderContent}
          <div className="tag-row">
            <div className="tags">{tags}</div>
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
