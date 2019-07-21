/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import Link from 'next/link';
import axios from 'axios';
import styled from 'styled-components';

import { FacebookShareButton, TwitterShareButton, FacebookIcon, TwitterIcon } from 'react-share';

import ChipotleOrder from './ChipotleOrder';
import AndPizzaOrder from './AndPizzaOrder';

const OrderContentContainer = styled.div`
   background-color: #ffffff;
   padding: 18px 12px;
   margin-bottom: 28px;
   flex-basis: 45%;
   border-radius: 12px;
   box-shadow: 0 5.125px 10px -1.125px rgba(0, 0, 0, 0.1);
   font-family: Roboto, sans-serif;
   display: flex;
   flex-direction: column;

   .chain {
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: center;

      .chain-logo {
         max-height: 26px;
         max-width: 120px;

         float: right;
      }

      h3 {
         text-transform: capitalize;
         margin: 0px;
      }
   }

   h2 {
      text-transform: capitalize;
   }

   .description {
      margin-top: 12px;
      font-weight: 400;
      border-bottom: 2px solid #eeeef1;
      padding-bottom: 12px;
      font-size: 18px;
   }

   .order-content {
      flex-grow: 100;
   }

   span {
      display: inline-block;
      background-color: #eeeef1;
      padding: 1px 4px;
      border-radius: 4px;
      margin: 0 0 4px 4px;
   }

   .tag-row {
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: flex-end;

      .tags {
         border-top: 2px solid #eeeef1;
         padding: 12px 0px 0px 0px;
         margin: 0px;
         text-transform: capitalize;
      }

      .actions {
         display: flex;
      }

      .actions > * {
         margin-left: 8px;
      }
   }
`;

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
                     title={`Check out ${this.state.orderName} at ${this.state.chainName}. https://order4.dbudi.now.sh/${this.props.orderID}`}
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
