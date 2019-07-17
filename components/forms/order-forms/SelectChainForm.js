import React, { Component } from 'react';

class SelectChainForm extends Component {
   constructor(props) {
      super(props);
      this.state = {};
   }

   updateState = async event => {
      const { target } = event;
      const { value } = target;
      const { name } = target;
      await this.setState({
         [name]: value,
      });
      this.props.setChain(this.state.chainName);
   };

   render() {
      return (
         <div>
            <form>
               <h2>Create Your Order</h2>
               <h3>Select a Restaurant</h3>
               <span className="label">Chain Name</span>
               <select onChange={this.updateState} className="text-input" name="chainName">
                  <option value="" disabled selected>
                     Select a chain
                  </option>
                  <option value="Chipotle">Chipotle</option>
                  <option value="&pizza">&pizza</option>
               </select>
            </form>
         </div>
      );
   }
}

export default SelectChainForm;
