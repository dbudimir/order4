import React, { Component } from 'react';

class AndPizzaOrder extends Component {
   constructor(props) {
      super(props);
      this.state = {
         dough: this.props.orderState.dough,
         sauces: JSON.parse(
            JSON.stringify(this.props.orderState.sauce, function(key, value) {
               return value == null ? [] : value;
            })
         ),
         cheeses: JSON.parse(
            JSON.stringify(this.props.orderState.cheese, function(key, value) {
               return value == null ? [] : value;
            })
         ),
         finishes: JSON.parse(
            JSON.stringify(this.props.orderState.finishes, function(key, value) {
               return value == null ? [] : value;
            })
         ),
         proteins: JSON.parse(
            JSON.stringify(this.props.orderState.proteins, function(key, value) {
               return value == null ? [] : value;
            })
         ),
         veggies: JSON.parse(
            JSON.stringify(this.props.orderState.veggies, function(key, value) {
               return value == null ? [] : value;
            })
         ),
      };
   }

   componentDidMount() {
      this.setState({
         sauces: this.state.sauces.map(sauce => <span>{sauce}</span>),
         cheeses: this.state.cheeses.map(cheese => <span>{cheese}</span>),
         finishes: this.state.finishes.map(finish => <span> {finish}</span>),
         proteins: this.state.proteins.map(protein => <span>{protein}</span>),
         veggies: this.state.veggies.map(veg => <span>{veg}</span>),
      });
   }

   render() {
      return (
         <div className="order-content">
            <p>
               Dough: <span>{this.state.dough}</span>
            </p>
            <p>Sauce: {this.state.sauces}</p>
            <p>Cheese: {this.state.cheeses}</p>
            <p>Finishes: {this.state.finishes}</p>
            <p>Proteins: {this.state.proteins}</p>
            <p>Veggies: {this.state.veggies}</p>
         </div>
      );
   }
}

export default AndPizzaOrder;
