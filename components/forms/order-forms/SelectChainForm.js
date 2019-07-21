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
         <div className="select-chain">
            <form>
               <h3>Select a restaurant...</h3>
               <select onChange={this.updateState} className="text-input" name="chainName">
                  <option value="" disabled selected>
                     Select Restaurant
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
