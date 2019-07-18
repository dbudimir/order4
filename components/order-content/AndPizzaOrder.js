import React, { Component } from 'react';

class AndPizzaOrder extends Component {
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
         sauces: this.state.orderContent.sauce.map(sauce => <span>{sauce}</span>),
         cheeses: this.state.orderContent.cheese.map(cheese => <span>{cheese}</span>),
         finishes: this.state.orderContent.finishes.map(finish => <span> {finish}</span>),
         proteins: this.state.orderContent.proteins.map(protein => <span>{protein}</span>),
         veggies: this.state.orderContent.veggies.map(veg => <span>{veg}</span>),
      });
   }

   render() {
      const order = this.state.orderContent;
      return (
         <div>
            <p>
               Dough: <span>{order.dough}</span>
            </p>
            <p>Suace: {this.state.sauces}</p>
            <p>Cheese: {this.state.cheeses}</p>
            <p>Finishes: {this.state.finishes}</p>
            <p>Proteins: {this.state.proteins}</p>
            <p>Veggies: {this.state.veggies}</p>
         </div>
      );
   }
}

export default AndPizzaOrder;
