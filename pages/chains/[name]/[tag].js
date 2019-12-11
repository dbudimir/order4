/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import 'isomorphic-fetch';

import { NextSeo } from 'next-seo';

import styled from 'styled-components';
import TagPage from '../../../components/styles/TagPage';

import Layout from '../../../components/Layout';
import OrderContent from '../../../components/order-content/OrderContent';

class Tag extends Component {
  constructor(props) {
    super(props);
    this.state = { orders: [] };
  }

  render() {
    let cleanTag = this.props.tag.replace(/-/g, ' ');
    const orderCard = this.props.orders.map((order, index) => (
      <OrderContent orderID={order._id} key={index} />
    ));

    return (
      <div>
        <NextSeo
          title={`The Best ${this.props.tag.charAt(0).toUpperCase() +
            this.props.tag.slice(1)} Orders at ${this.props.name.charAt(0).toUpperCase() +
            this.props.name.slice(1)}`}
          description={`Check out the most popular ${cleanTag} custom orders at ${this.props.name}. Or, submit your own custom order and share it with your friends.`}
        />
        <Layout />
        <TagPage className="tag-order-container">
          <div className="background-image-container"></div>
          <div className="content-container">
            <div className="col-left">
              <div className="headline-container">
                <h1>
                  {`The most popular
                  ${cleanTag.charAt(0).toUpperCase() + cleanTag.slice(1)} custom orders at
                  ${this.props.name.charAt(0).toUpperCase() + this.props.name.slice(1)}`}
                </h1>
              </div>
              <div className="order-list">{orderCard}</div>
            </div>
            <div className="col-right">
              <div className="more-tag-cta">
                <span>Check all the most popular {this.props.tag} on MEALdig.</span>
              </div>
              <div className="more-chain-cta">
                <span>See more popular custom meals at {this.props.name}</span>
              </div>
              <div className="signup-cta">
                <span>Submit your favorite custom meals today.</span>
              </div>
            </div>
          </div>
        </TagPage>
      </div>
    );
  }
}

Tag.getInitialProps = async ({ query }) => {
  const chainUpper = query.name.charAt(0).toUpperCase() + query.name.slice(1);
  const lookup = `${chainUpper}/${query.tag}`;
  const res = await fetch(process.env.api_key + `/api/orders/chain/${lookup}`);
  const data = await res.json();

  return {
    orders: data,
    name: query.name,
    tag: query.tag,
    full: query
  };
};

export default Tag;
