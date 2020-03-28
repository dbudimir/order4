import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ChipotleOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mealType: props.orderState.mealType,
      tortilla: props.orderState.tortilla,
      beans: props.orderState.beans,
      rice: props.orderState.rice,
      fillings: JSON.parse(
        JSON.stringify(props.orderState.fillings, function(key, value) {
          return value == null ? [] : value;
        })
      ),
      toppings: JSON.parse(
        JSON.stringify(props.orderState.toppings, function(key, value) {
          return value == null ? [] : value;
        })
      ),
    };
  }

  componentDidMount() {
    const { fillings, toppings } = this.state;

    this.setState({
      fillings: fillings.map((filling, index) => <span key={`filling-${index}`}>{filling}</span>),
      toppings: toppings.map((topping, index) => <span key={`topping-${index}`}>{topping}</span>),
    });
  }

  render() {
    ChipotleOrder.propTypes = {
      orderState: PropTypes.object,
    };

    const order = this.state;
    return (
      <>
        <p>
          Meal Type: <span>{order.mealType}</span>
        </p>
        <p>
          Tortilla: <span>{order.tortilla}</span>
        </p>
        <p>
          Beans: <span>{order.beans}</span>
        </p>
        <p>
          Rice: <span>{order.rice}</span>
        </p>
        <p>Fillings: {order.fillings}</p>
        <p>Toppings: {order.toppings}</p>
      </>
    );
  }
}

export default ChipotleOrder;
