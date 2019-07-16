import React, { Component } from 'react';

import CreateChipotleOrder from './chain-forms/CreateChipotleOrder';
import CreateAndPizzOrder from './chain-forms/CreateAndPizzaOrderForm';

class CreateOrderForm extends Component {
   constructor() {
      super();
      this.state = {};
   }

   updateState = event => {
      const { target } = event;
      const { value } = target;
      const { name } = target;

      this.setState({
         [name]: value,
      });
   };

   render() {
      let currentOrderCreate;
      // if (router.asPath === '/create-order/chipotle') {
      //    currentOrderCreate = <CreateChipotleOrder {...props} chainName={this.state.chainName} />;
      // } else if (router.asPath === '/create-order/chipotle') {
      //    currentOrderCreate = <CreateAndPizzOrder {...props} chainName={this.state.chainName} />;
      // }

      return <div>{currentOrderCreate}</div>;
   }
}

export default CreateOrderForm;
