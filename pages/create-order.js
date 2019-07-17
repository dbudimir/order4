import React, { Component } from 'react';

import Layout from '../components/Layout';
import CreateChipotleOrder from '../components/forms/chain-forms/CreateChipotleOrder';
import CreateAndPizzOrder from '../components/forms/chain-forms/CreateAndPizzaOrderForm';
import SelectChainForm from '../components/forms/order-forms/SelectChainForm';
import SubmitOrder from '../components/forms/order-forms/SubmitOrderForm';

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

   submitOrder = event => {
      const { state } = this;
      event.preventDefault();
      console.log(this.state);
      // if (this.state.order.orderName === null) {
      //    alert('Please name your order');
      // } else {
      //    axios.post('https://qsr-order-api.herokuapp.com/api/user-order/create/', { ...state });
      //    alert('Nice!');
      // }
   };

   render() {
      let orderForm;
      if (this.state.chainName === 'Chipotle') {
         orderForm = <CreateChipotleOrder setOrder={this.updateOrder} />;
      }
      if (this.state.chainName === '&pizza') {
         orderForm = <CreateAndPizzOrder setOrder={this.updateOrder} />;
      }

      let submitOrder;
      if (this.state.order.submitOrder === true) {
         submitOrder = (
            <SubmitOrder setOrderDetails={this.updateOrderDetails} submitOrder={this.submitOrder} />
         );
      }

      return (
         <div>
            <Layout />
            <SelectChainForm setChain={this.updateChain} />
            {orderForm}
            {submitOrder}
         </div>
      );
   }
}

export default CreateOrder;
