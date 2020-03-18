/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import axios from 'axios';

import { ModalContainer, OrderContentContainer } from '../styles/OrderContentContainer';

// Components pulling innformaton relevent to all chains
import ActionBar from './all-orders/ActionBar';
import CreatedMeta from './all-orders/CreatedMeta';
import OrderTags from './all-orders/OrderTags';

// Components pulling innformaton relevent to a specific chain
import ChainLogo from './chain-specific/ChainLogo';
import ChainContent from './chain-specific/ChainContent';

class OrderContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
      userData: [],
      orderContentModal: false
    };
  }

  componentDidMount() {
    if (this.props.orderState === undefined) {
      axios
        .get(process.env.api_key + `/api/orders/id/${this.props.orderID}`)
        .then(res => {
          const { data } = res;
          this.setState({
            orderId: data[0]._id,
            orderDescription: data[0].description,
            orderContent: data[0].orderContent[0],
            tags: data[0].tags,
            favoriteCount: data[0].favoriteCount,
            usersFavorited: data[0].usersFavorited,
            orderName: data[0].orderName,
            chainName: data[0].chainName,
            createdAt: data[0].createdAt,
            userData: data[0].users
          });
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      const { order, chainName } = this.props.orderState;
      this.setState({
        orderDescription: order.description,
        orderContent: order,
        tags: JSON.parse(
          JSON.stringify(order.tags, function(key, value) {
            return value == null ? [] : value;
          })
        ),
        orderName: order.orderName,
        chainName
      });
    }
  }

  openOrderModal = e => {
    window.history.pushState('object or string', 'Title', `/orders/${this.state.orderId}`);
    e.stopPropagation();
    this.setState(prevState => ({
      orderContentModal: !prevState.orderContentModal
    }));
  };

  closeOrderModal = e => {
    e.stopPropagation();
    this.setState(prevState => ({
      orderContentModal: !prevState.orderContentModal
    }));
  };

  render() {
    let chainRowModalDisplay =
      this.state.orderContentModal === true ? 'modal-container-true' : 'modal-container';

    return (
      <ModalContainer onClick={e => this.closeOrderModal(e)}>
        <div className={chainRowModalDisplay}>
          <OrderContentContainer className="order-content-container">
            <div className="title-bar">
              <div>
                <p>CLOSE</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-x-circle"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="15" y1="9" x2="9" y2="15"></line>
                  <line x1="9" y1="9" x2="15" y2="15"></line>
                </svg>
              </div>
            </div>
            {/* Everything left of the action bar */}
            <div className="order-data">
              {/* Pulls in the correct logo */}
              <ChainLogo chainName={this.state.chainName} onClick={e => this.openOrderModal(e)} />

              {/* Pulls in user enterted title and description */}
              <div className="order-info" onClick={e => this.openOrderModal(e)}>
                <h2 className="order-name">{this.state.orderName}</h2>
                <p className="description">{this.state.orderDescription}</p>
              </div>

              {/* Pulls in conntent specific to this chain */}
              <div className="order-content" onClick={e => this.openOrderModal(e)}>
                <ChainContent
                  chainName={this.state.chainName}
                  orderState={this.state.orderContent}
                />
              </div>

              {/* Pulls in tags, user created and date created */}
              <div className="order-meta ">
                <OrderTags chainName={this.state.chainName} tags={this.state.tags} />
                <CreatedMeta userData={this.state.userData} dateCreated={this.state.createdAt} />
              </div>
            </div>

            {/* Where a user can take action on the order. */}

            <ActionBar
              key={this.state.orderId}
              favoriteCount={this.state.favoriteCount}
              orderId={this.state.orderId}
              usersFavorited={this.state.usersFavorited}
            />
          </OrderContentContainer>
        </div>
      </ModalContainer>
    );
  }
}

export default OrderContent;
