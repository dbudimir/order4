import React, { Component } from 'react';

class ChipotleOrder extends Component {
   constructor(props) {
      super(props);
      this.state = {
         orderContent: JSON.parse(
            JSON.stringify(this.props.state, function(key, value) {
               return value == null ? [] : value;
            })
         ),
      };
   }

   componentDidMount() {
      this.setState({
         fillings: this.state.orderContent.fillings.map(filling => (
            <span>{filling}</span>
         )),
         toppings: this.state.orderContent.toppings.map(topping => (
            <span> {topping}</span>
         )),
      });
   }

   render() {
      const order = this.state.orderContent;

      return (
         <div>
            <p>
               Meal Type: <span>{order.mealType}</span>
            </p>
            <p>
               Beans: <span>{order.beans}</span>
            </p>
            <p>
               Rice: <span>{order.rice}</span>
            </p>
            <p>Fillings: {this.state.fillings}</p>
            <p>Toppings: {this.state.toppings}</p>
         </div>
      );
   }
}

export default ChipotleOrder;
