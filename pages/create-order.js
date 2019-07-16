import React, { Component } from 'react';
import Link from 'next/link';

import Layout from '../components/Layout';
import CreateOrderForm from '../components/forms/CreateOrderForm';

class CreateOrder extends Component {
   render() {
      return (
         <div>
            <Layout />
            <CreateOrderForm />
            <form>
               <h2>Create Your Order</h2>
               <span className="label">Chain Name</span>
               <select onChange={this.updateState} className="text-input" name="chainName">
                  <option value="" disabled selected>
                     Select a chain
                  </option>
                  <option value="Chipotle">Chipotle</option>
                  <option value="&pizza">&pizza</option>
               </select>
               {/* <Link to={`/create/${this.state.chainName}`}>
                  <p className="button" name="submit" type="submit">
                     {' '}
                     Next{' '}
                  </p>
               </Link> */}
            </form>
            <p>testing create order</p>
         </div>
      );
   }
}

export default CreateOrder;
