/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { FacebookShareButton, TwitterShareButton, FacebookIcon, TwitterIcon } from 'react-share';
import OrderContentContainer from '../styles/OrderContentContainer';

import ChipotleOrder from './ChipotleOrder';
import AndPizzaOrder from './AndPizzaOrder';

class OrderContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: []
    };
  }

  async componentDidMount() {
    if (this.props.orderState === undefined) {
      await axios
        .get(process.env.api_key + `/api/orders/id/${this.props.orderID}`)
        .then(res => {
          const { data } = res;
          this.setState({
            orderDescription: data[0].description,
            orderContent: data[0].orderContent[0],
            tags: data[0].tags,
            orderName: data[0].orderName,
            chainName: data[0].chainName,
            createdAt: data[0].createdAt
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
    console.log(this.state);

    let chainLogo;
    let chainOrderContent;

    if (this.state.chainName === 'Chipotle') {
      chainLogo = (
        <img className="chain-logo" src="../../static/chipotle-logo.png" alt="chipotle-logo" />
      );
      chainOrderContent = <ChipotleOrder orderState={this.state.orderContent} />;
    } else if (this.state.chainName === '&pizza') {
      chainLogo = (
        <img className="chain-logo" src="../../static/and-pizza-logo.png" alt="and-pizza-logo" />
      );
      chainOrderContent = <AndPizzaOrder orderState={this.state.orderContent} />;
    }

    const tags = this.state.tags.map((tag, index) => (
      <Link
        href={{
          pathname: `/chains/${this.state.chainName.toLowerCase()}/${tag}`
        }}
        as={{ pathname: `/chains/${this.state.chainName.toLowerCase()}/${tag}` }}
      >
        <a href={`/chains/${this.state.chainName.toLowerCase()}/${tag}`}>
          <span key={index}>{tag.replace(/-/g, ' ')}</span>
        </a>
      </Link>
    ));

    return (
      <OrderContentContainer className="order-content-container">
        <div className="chain">
          <h3>{this.state.chainName}</h3>
          {chainLogo}
        </div>
        <h2 className="order-name">{this.state.orderName}</h2>
        <p className="description">{this.state.orderDescription}</p>
        {chainOrderContent}
        <div className="tag-row">
          <div className="tags">{tags}</div>
          <div className="actions">
            <TwitterShareButton
              url={`https://mealdig.com/orders/${this.props.orderID}`}
              title={`Check out ${this.state.orderName} at ${this.state.chainName}. https://mealdig.com/orders/${this.props.orderID}`}
              hashtags={this.state.tags}
            >
              <TwitterIcon size={24} round />
            </TwitterShareButton>
            <FacebookShareButton
              url={`https://mealdig.com/orders/${this.props.orderID}`}
              quote={`Check out ${this.state.orderName} at ${this.state.chainName}. https://mealdig.com/orders/${this.props.orderID}`}
            >
              <FacebookIcon size={24} round />
            </FacebookShareButton>
            <div>
              <Link
                href={{
                  pathname: '/orders/[usider]',
                  query: { id: this.props.orderID }
                }}
                as={{ pathname: `/orders/${this.props.orderID}` }}
              >
                <a href={`/orders/${this.props.orderID}`}>
                  <img src="../../static/external-link.svg" alt="link-out-icon" />
                </a>
              </Link>
            </div>
          </div>
        </div>
      </OrderContentContainer>
    );
  }
}

export default OrderContent;
