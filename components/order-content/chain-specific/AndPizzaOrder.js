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
      )
    };
  }

  componentDidMount() {
    this.setState({
      sauces: this.state.sauces.map((sauce, index) => <span key={`sauce-${index}`}>{sauce}</span>), // prettier-ignore
      cheeses: this.state.cheeses.map((cheese, index) => (<span key={`cheese-${index}`}>{cheese}</span>)), // prettier-ignore
      finishes: this.state.finishes.map((finish, index) => (<span key={`finish-${index}`}> {finish}</span>)), // prettier-ignore
      proteins: this.state.proteins.map((protein, index) => (<span key={`protein-${index}`}>{protein}</span>)), // prettier-ignore
      veggies: this.state.veggies.map((veg, index) => <span key={`veg-${index}`}>{veg}</span>) // prettier-ignore
    });
  }

  render() {
    return (
      <React.Fragment>
        <p>
          Dough: <span>{this.state.dough}</span>
        </p>
        <p>Sauce: {this.state.sauces}</p>
        <p>Cheese: {this.state.cheeses}</p>
        <p>Finishes: {this.state.finishes}</p>
        <p>Proteins: {this.state.proteins}</p>
        <p>Veggies: {this.state.veggies}</p>
      </React.Fragment>
    );
  }
}

export default AndPizzaOrder;
