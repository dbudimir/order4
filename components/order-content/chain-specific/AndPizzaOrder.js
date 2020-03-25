import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AndPizzaOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dough: props.orderState.dough,
      sauces: JSON.parse(
        JSON.stringify(props.orderState.sauce, function(key, value) {
          return value == null ? [] : value;
        })
      ),
      cheeses: JSON.parse(
        JSON.stringify(props.orderState.cheese, function(key, value) {
          return value == null ? [] : value;
        })
      ),
      finishes: JSON.parse(
        JSON.stringify(props.orderState.finishes, function(key, value) {
          return value == null ? [] : value;
        })
      ),
      proteins: JSON.parse(
        JSON.stringify(props.orderState.proteins, function(key, value) {
          return value == null ? [] : value;
        })
      ),
      veggies: JSON.parse(
        JSON.stringify(props.orderState.veggies, function(key, value) {
          return value == null ? [] : value;
        })
      ),
    };
  }

  componentDidMount() {
    const { sauces, cheeses, finishes, proteins, veggies } = this.state;
    this.setState({
      sauces: sauces.map((sauce, index) => <span key={`sauce-${index}`}>{sauce}</span>), // prettier-ignore
      cheeses: cheeses.map((cheese, index) => (<span key={`cheese-${index}`}>{cheese}</span>)), // prettier-ignore
      finishes: finishes.map((finish, index) => (<span key={`finish-${index}`}> {finish}</span>)), // prettier-ignore
      proteins: proteins.map((protein, index) => (<span key={`protein-${index}`}>{protein}</span>)), // prettier-ignore
      veggies: veggies.map((veg, index) => <span key={`veg-${index}`}>{veg}</span>) // prettier-ignore
    });
  }

  render() {
    AndPizzaOrder.propTypes = {
      orderState: PropTypes.object,
    };

    const { dough, sauces, cheeses, finishes, proteins, veggies } = this.state;
    return (
      <React.Fragment>
        <p>
          Dough: <span>{dough}</span>
        </p>
        <p>Sauce: {sauces}</p>
        <p>Cheese: {cheeses}</p>
        <p>Finishes: {finishes}</p>
        <p>Proteins: {proteins}</p>
        <p>Veggies: {veggies}</p>
      </React.Fragment>
    );
  }
}

export default AndPizzaOrder;
