/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import 'isomorphic-fetch';

import { NextSeo } from 'next-seo';

import TagPage from '../../../components/styles/TagPage';

import Layout from '../../../components/Layout';
import Footer from '../../../components/Footer';
import RightColumn from '../../../components/RightColumn';
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
            <RightColumn tag={this.props.tag} chainName={this.props.name} />
          </div>
        </TagPage>
        <Footer />
      </div>
    );
  }
}
export async function getServerSideProps(context) {
  const chainUpper = context.query.name.charAt(0).toUpperCase() + context.query.name.slice(1);
  const lookup = `${chainUpper}/${context.query.tag}`;
  const res = await fetch(process.env.api_key + `/api/orders/chain/${lookup}`);
  const data = await res.json();

  return {
    props: {
      orders: data,
      name: context.query.name,
      tag: context.query.tag,
      full: context.query
    }
  };
}

export default Tag;
