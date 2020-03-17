import React, { Component } from 'react';

import ChipotleOrder from './ChipotleOrder';
import AndPizzaOrder from './AndPizzaOrder';

class ChainContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chainName: props.chainName,
      orderContent: props.orderState
    };
  }

  render() {
    let chainOrderContent;
    if (this.props.chainName === 'Chipotle') {
      chainOrderContent = <ChipotleOrder orderState={this.props.orderState} />;
    } else if (this.props.chainName === '&pizza') {
      chainOrderContent = <AndPizzaOrder orderState={this.props.orderState} />;
    }
    return <React.Fragment>{chainOrderContent}</React.Fragment>;
  }
}

export default ChainContent;
