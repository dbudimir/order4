import React, { Component } from 'react';

class ChipotleOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mealType: this.props.orderState.mealType,
      tortilla: this.props.orderState.tortilla,
      beans: this.props.orderState.beans,
      rice: this.props.orderState.rice,
      fillings: JSON.parse(
        JSON.stringify(this.props.orderState.fillings, function(key, value) {
          return value == null ? [] : value;
        })
      ),
      toppings: JSON.parse(
        JSON.stringify(this.props.orderState.toppings, function(key, value) {
          return value == null ? [] : value;
        })
      )
    };
  }

  componentDidMount() {
    this.setState({
      fillings: this.state.fillings.map((filling, index) => (
        <span key={`filling-${index}`}>{filling}</span>
      )),
      toppings: this.state.toppings.map((topping, index) => (
        <span key={`topping-${index}`}>{topping}</span>
      ))
    });
  }

  render() {
    const order = this.state;

    return (
      <React.Fragment>
        <p>
          Meal Type: <span>{order.mealType}</span>
        </p>
        <p>
          Beans: <span>{order.beans}</span>
        </p>
        <p>
          Rice: <span>{order.rice}</span>
        </p>
        <p>Fillings: {order.fillings}</p>
        <p>Toppings: {order.toppings}</p>
      </React.Fragment>
    );
  }
}

export default ChipotleOrder;