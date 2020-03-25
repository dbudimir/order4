/* eslint-disable class-methods-use-this */

// Utilities
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Components
import OrderContent from './order-content/OrderContent';

class ChainRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // sortedOrders: [],
      // sortOrder: this.props.sortOrder,
    };
  }

  sortPopular(a, b) {
    const favesA = a.props.favoriteCount;
    const favesB = b.props.favoriteCount;
    let comparison = 0;
    if (favesA > favesB) {
      comparison = -1;
    } else if (favesA < favesB) {
      comparison = +1;
    }
    return comparison;
  }

  sortRecent(a, b) {
    const createdA = a.props.createdDate;
    const createdB = b.props.createdDate;
    let comparison = 0;
    if (createdA > createdB) {
      comparison = -1;
    } else if (createdA < createdB) {
      comparison = +1;
    }
    return comparison;
  }

  sortOldest(a, b) {
    const createdA = a.props.createdDate;
    const createdB = b.props.createdDate;
    let comparison = 0;
    if (createdA > createdB) {
      comparison = +1;
    } else if (createdA < createdB) {
      comparison = -1;
    }
    return comparison;
  }

  render() {
    ChainRow.propTypes = {
      chainRow: PropTypes.array,
      sortOrder: PropTypes.string,
    };

    const { chainRow, sortOrder } = this.props;

    const orders = chainRow.map((order, ordersIndex) => (
      <OrderContent
        orderID={order._id}
        favoriteCount={order.favoriteCount}
        createdDate={order.createdAt}
        key={`${chainRow[0].chainName} - ${ordersIndex}`}
      />
    ));

    switch (sortOrder) {
      case 'popular':
        orders.sort(this.sortPopular);
        break;
      case 'recent':
        orders.sort(this.sortRecent);
        break;
      case 'oldest':
        orders.sort(this.sortOldest);
        break;
      default:
        break;
    }

    return <div className="chain-row">{orders}</div>;
  }
}

export default ChainRow;
