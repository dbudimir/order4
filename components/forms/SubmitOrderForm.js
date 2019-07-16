import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Form = styled.div`
   .label {
      margin-top: 12px;
      font-weight: 800;
   }
   span {
      display: block;
   }
`;

class SubmitOrder extends Component {
   constructor(props) {
      super(props);
      this.state = {
         order: this.props,
         user: {},
      };
   }

   updateState = event => {
      const { target } = event;
      const { value } = target;
      const { name } = target;

      this.setState({
         order: {
            ...this.state.order,
            [name]: value,
         },
      });
   };

   updateUserState = event => {
      const { target } = event;
      const { value } = target;
      const { name } = target;

      this.setState({
         user: {
            [name]: value,
         },
      });
   };

   submitOrder = event => {
      const { state } = this;
      event.preventDefault();
      if (this.state.order.orderName === null) {
         alert('Please name your order');
      } else {
         axios.post('https://qsr-order-api.herokuapp.com/api/user-order/create/', { ...state });
         alert('Nice!');
      }
   };

   render() {
      console.log(this.state.order);
      return (
         <div>
            <Form>
               <h2>Create Your Order</h2>

               <span className="label">Name It</span>
               <p>Give your order a fun name (ex. "The Foil Buster", "The Big Cheese")</p>
               <input onChange={this.updateState} className="text-input" name="orderName" />

               <span className="label">Description</span>
               <p>Give your order a short description</p>
               <input onChange={this.updateState} className="text-input" name="description" />

               <span className="label">Your Name</span>
               <p>Enter your name to save your order</p>
               <input onChange={this.updateUserState} className="text-input" name="userFullName" />
               <br />
               <br />
               <button onClick={this.submitOrder} className="button" name="submit" type="submit">
                  {' '}
                  Submit{' '}
               </button>
            </Form>
         </div>
      );
   }
}

export default SubmitOrder;
