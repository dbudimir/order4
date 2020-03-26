/* eslint-disable react/prop-types */

// Utilities
import React, { Component } from 'react';
import { NextSeo } from 'next-seo';
import 'isomorphic-fetch';

// Styles
import TagPage from '../../../components/styles/TagPage';

// Components
import Layout from '../../../components/Layout';
import Footer from '../../../components/Footer';
import RightColumn from '../../../components/RightColumn';
import OrderContent from '../../../components/order-content/OrderContent';

class Tag extends Component {
  constructor(props) {
    super(props);
    this.state = { ...props };
  }

  render() {
    const allOrders = this.state;
    const cleanTag = allOrders.tag.replace(/-/g, ' ');
    const orderCard = allOrders.orders.map((order, index) => (
      <OrderContent orderID={order._id} key={index} />
    ));
    const pageURL = `https://mealdig.com/chains/${allOrders.name}/${cleanTag}`;

    return (
      <div>
        <NextSeo
          title={`The Best ${allOrders.tag.charAt(0).toUpperCase() +
            allOrders.tag.slice(1)} Orders at ${allOrders.name.charAt(0).toUpperCase() +
            allOrders.name.slice(1)}`}
          description={`Check out the most popular ${cleanTag} custom orders at ${allOrders.name}. Or, submit your own custom order and share it with your friends.`}
          canonical={pageURL}
          openGraph={{
            url: pageURL,
            title: `The Best ${allOrders.tag.charAt(0).toUpperCase() +
              allOrders.tag.slice(1)} Orders at ${allOrders.name.charAt(0).toUpperCase() +
              allOrders.name.slice(1)}`,
            description: `Check out the most popular ${cleanTag} custom orders at ${allOrders.name}. Or, submit your own custom order and share it with your friends.`,
            site_name: 'MealDig',
          }}
        />

        <Layout />
        <TagPage className="tag-order-container">
          <div className="background-image-container"></div>
          <div className="content-container">
            <div className="col-left">
              <div className="headline-container">
                <h1>
                  {`The most popular
                  ${cleanTag.charAt(0).toUpperCase() + cleanTag.slice(1)} custom meals at
                  ${allOrders.name.charAt(0).toUpperCase() + allOrders.name.slice(1)}`}
                </h1>
              </div>
              <div className="order-list">{orderCard}</div>
            </div>
            <RightColumn tag={allOrders.tag} chainName={allOrders.name} />
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
  const res = await fetch(`${process.env.api_key}/api/orders/chain/${lookup}`);
  const data = await res.json();

  return {
    props: {
      orders: data,
      name: context.query.name,
      tag: context.query.tag,
      full: context.query,
    },
  };
}

export default Tag;
