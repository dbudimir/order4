import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Components
import ChipotleOrder from './ChipotleOrder';
import AndPizzaOrder from './AndPizzaOrder';

class ChainContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props,
    };
  }

  render() {
    ChainContent.propTypes = {
      chainName: PropTypes.string,
      orderState: PropTypes.object,
    };

    const { chainName, orderState } = this.props;

    let chainOrderContent;
    if (chainName === 'Chipotle') {
      chainOrderContent = <ChipotleOrder orderState={orderState} />;
    } else if (chainName === '&pizza') {
      chainOrderContent = <AndPizzaOrder orderState={orderState} />;
    }
    return <>{chainOrderContent}</>;
  }
}

export default ChainContent;
