import React, { Component } from 'react';
import styled from 'styled-components';

import Form from '../components/styles/CreateOrderForm';

import Head from '../components/Head';
import Layout from '../components/Layout';
import CreateChipotleOrder from '../components/forms/chain-forms/CreateChipotleOrder';
import CreateAndPizzOrder from '../components/forms/chain-forms/CreateAndPizzaOrderForm';
import SelectChainForm from '../components/forms/order-forms/SelectChainForm';
import SubmitOrder from '../components/forms/order-forms/SubmitOrderForm';
import SubmitConfirmation from '../components/forms/SubmitConfirmation';

const CHAIN_CHIPOTLE = 'Chipotle';
const CHAIN_ANDPIZZA = '&pizza';

const FormHeader = styled.h2`
   font-size: 48px;
   font-family: Roboto, serif;
   margin: 0 12px 32px;
`;

class CreateOrder extends Component {
   constructor() {
      super();
      this.state = {
         chainName: '',
         order: {},
         user: {},
      };
   }

   updateChain = chain => {
      this.setState(prevState => ({
         ...prevState,
         chainName: chain,
      }));
   };

   updateOrder = order => {
      this.setState(prevState => ({
         ...prevState,
         order,
      }));
   };

   updateOrderDetails = orderDetails => {
      this.setState(prevState => ({
         ...prevState,
         order: { ...this.state.order, ...orderDetails },
      }));
   };

   updateUser = user => {
      this.setState(prevState => ({
         ...prevState,
         user,
      }));
   };

   toggleSubmitConfirmation = event => {
      this.setState(prevState => ({
         ...prevState,
         orderSubmitted: !prevState.orderSubmitted,
      }));
   };

   render() {
      let orderForm;
      if (this.state.chainName === CHAIN_CHIPOTLE) {
         orderForm = <CreateChipotleOrder setOrder={this.updateOrder} />;
      }
      if (this.state.chainName === CHAIN_ANDPIZZA) {
         orderForm = <CreateAndPizzOrder setOrder={this.updateOrder} />;
      }

      let submitOrder;
      if (this.state.chainName !== '') {
         submitOrder = (
            <SubmitOrder
               setOrderDetails={this.updateOrderDetails}
               toggleSubmitConfirmation={this.toggleSubmitConfirmation}
            />
         );
      }

      let submitConfirmation;
      if (this.state.orderSubmitted === true) {
         submitConfirmation = (
            <SubmitConfirmation
               orderState={this.state}
               toggleSubmitConfirmation={this.toggleSubmitConfirmation}
               updateUser={this.updateUser}
            />
         );
      }

      return (
         <div>
            <Head />
            <Layout />
            <Form>
               <FormHeader>Create Your Order</FormHeader>
               <SelectChainForm setChain={this.updateChain} />
               {orderForm}
               {submitOrder}
               {submitConfirmation}
            </Form>
         </div>
      );
   }
}

export default CreateOrder;
