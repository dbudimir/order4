import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import TagForm from '../TagForm';

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
         user: {},
      };
   }

   updateState = async event => {
      const { target } = event;
      const { value } = target;
      const { name } = target;

      await this.setState({
         order: {
            ...this.state.order,
            [name]: value,
         },
      });
      this.props.setOrderDetails(this.state.order);
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

   updateTags = newTags => {
      console.log(newTags);
      this.setState(prevState => ({
         order: {
            tags: newTags,
         },
      }));
      this.props.setOrderDetails(this.state.order);
   };

   render() {
      return (
         <div>
            <Form>
               <h3>Give it a name...</h3>

               <span className="label">Name It</span>
               <p>Give your order a fun name (ex. "The Foil Buster", "The Big Cheese")</p>
               <input onChange={this.updateState} className="text-input" name="orderName" />

               <span className="label">Description</span>
               <p>Give your order a short description</p>
               <input onChange={this.updateState} className="text-input" name="description" />

               <br />
               <TagForm setTags={this.updateTags} />
               <br />
               <button
                  onClick={this.props.toggleSubmitConfirmation}
                  className="button"
                  name="submit"
                  type="submit"
               >
                  Submit Order
               </button>
            </Form>
         </div>
      );
   }
}

export default SubmitOrder;
