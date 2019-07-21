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
         tags: [],
         chainOrderContent: '',
      };
   }

   async componentDidMount() {
      if (this.props.orderState === undefined) {
         await axios
            .get(`https://qsr-order-api.herokuapp.com/api/orders/id/${this.props.orderID}`)
            .then(res => {
               const { data } = res;
               this.setState({
                  orderDescription: data[0].description,
                  orderContent: data[0].orderContent[0],
                  tags: data[0].tags,
                  orderName: data[0].orderName,
                  chainName: data[0].chainName,
                  createdAt: data[0].createdAt,
               });
            })
            .catch(err => {
               console.log(err);
            });
      } else {
         const { order, chainName } = this.props.orderState;

         await this.setState({
            orderDescription: order.description,
            orderContent: order,
            tags: JSON.parse(
               JSON.stringify(order.tags, function(key, value) {
                  return value == null ? [] : value;
               })
            ),
            orderName: order.orderName,
            chainName,
         });
      }
      this.getChain();
   }

   getChain = () => {
      if (this.state.chainName === 'Chipotle') {
         this.setState({
            chainOrderContent: <ChipotleOrder orderState={this.state.orderContent} />,
         });
      } else if (this.state.chainName === '&pizza') {
         this.setState({
            chainOrderContent: <AndPizzaOrder orderState={this.state.orderContent} />,
         });
      }
   };

   render() {
      let chainLogo;
      if (this.state.chainName === 'Chipotle') {
         chainLogo = (
            <img className="chain-logo" src="../../static/chipotle-logo.png" alt="chipotle-logo" />
         );
      } else if (this.state.chainName === '&pizza') {
         chainLogo = (
            <img
               className="chain-logo"
               src="../../static/and-pizza-logo.png"
               alt="and-pizza-logo"
            />
         );
      }

      const tags = this.state.tags.map(tag => <span>{tag}</span>);

      return (
         <OrderContentContainer className="order-content-container">
            <div className="chain">
               <h3>{this.state.chainName}</h3>
               {chainLogo}
            </div>
            <h2 className="order-name">{this.state.orderName}</h2>
            <p className="description">{this.state.orderDescription}</p>
            {this.state.chainOrderContent}
            <div className="tag-row">
               <p className="tags">{tags}</p>
               <div className="actions">
                  <TwitterShareButton
                     url={`/orders/${this.props.orderID}`}
                     title={`Check out ${this.state.orderName} at ${this.state.chainName}. https://order4.dbudi.now.sh/orders/${this.props.orderID}`}
                     hashtags={this.state.tags}
                  >
                     <TwitterIcon size={24} round />
                  </TwitterShareButton>
                  <FacebookShareButton url={`/orders/${this.props.orderID}`}>
                     <FacebookIcon size={24} round />
                  </FacebookShareButton>
                  <Link
                     href={{
                        pathname: '/orders/[usider]',
                        query: { id: this.props.orderID },
                     }}
                     as={{ pathname: `/orders/${this.props.orderID}` }}
                  >
                     <a href={`/orders/${this.props.orderID}`}>
                        <img src="../../static/external-link.svg" alt="link-out-icon" />
                     </a>
                  </Link>
               </div>
            </div>
         </OrderContentContainer>
      );
   }
}

export default OrderContent;
