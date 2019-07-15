import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import ChipotleOrder from './ChipotleOrder';
import AndPizzaOrder from './AndPizzaOrder';

const OrderContentContainer = styled.div`
   background-color: #ffffff;
   padding: 0px 18px;
   margin-bottom: 24px;
   flex-basis: 27%;
   border-radius: 12px;
   box-shadow: 0 5.125px 10px -1.125px rgba(0, 0, 0, 0.1);
   h3 {
      text-transform: capitalize;
      margin-bottom: 0px;
   }
   .description {
      margin-top: 12px;
      font-weight: 400;
      border-bottom: 2px solid #eeeef1;
      padding-bottom: 6px;
   }
   span {
      display: inline-block;
      background-color: #eeeef1;
      padding: 1px 4px;
      border-radius: 4px;
      margin: 0 0 4px 4px;
   }
`;

class OrderContent extends Component {
   constructor() {
      super();
      this.state = {
         orderContent: [],
      };
   }

   componentDidMount() {
      axios
         .get(
            `https://qsr-order-api.herokuapp.com/api/orders/id/${this.props.orderID}`
         )
         .then(res => {
            const { data } = res;
            this.setState({
               orderDescription: data[0].description,
               orderContent: data[0].orderContent[0],
               orderName: data[0].orderName,
               chainName: data[0].chainName,
               timestamp: data[0].timestamp,
            });
         })
         .catch(err => {
            console.log(err);
         });
   }

   componentDidUpdate() {
      if (this.state.orderName === null) {
         this.setState({
            orderName: 'unnamed order',
         });
      }
   }

   render() {
      let chainOrderContent = '';

      if (this.state.chainName === 'Chipotle') {
         chainOrderContent = <ChipotleOrder state={this.state.orderContent} />;
      } else if (this.state.chainName === '&pizza') {
         chainOrderContent = <AndPizzaOrder state={this.state.orderContent} />;
      }

      return (
         <OrderContentContainer>
            <p>{this.state.chainName}</p>
            <h3>{this.state.orderName}</h3>
            <p className="description">{this.state.orderDescription}</p>
            {chainOrderContent}
         </OrderContentContainer>
      );
   }
}

export default OrderContent;
