/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { AdminPanel, ModalContainer, OrderContentContainer } from '../styles/OrderContentContainer';

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
      orderContentModal: false,
    };
  }

  componentDidMount() {
    const { props } = this;

    if (props.orderState === undefined) {
      axios
        .get(`${process.env.api_key}/api/orders/id/${props.orderID}`)
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
            userData: data[0].users,
            accessLevel: localStorage.accessLevel,
          });
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      const { order, chainName } = props.orderState;
      this.setState({
        orderDescription: order.description,
        orderContent: order,
        tags: JSON.parse(
          JSON.stringify(order.tags, function(key, value) {
            return value == null ? [] : value;
          })
        ),
        orderName: order.orderName,
        chainName,
        accessLevel: localStorage.accessLevel,
      });
    }
  }

  deleteOrder = () => {
    const { props } = this;

    axios
      .delete(`${process.env.api_key}/api/orders/delete/${props.orderID}`)
      .then(res => {
        console.log('sucessfully deleted');
      })
      .catch(err => {
        console.log(err);
      });
  };

  openOrderModal = e => {
    const { state } = this;

    window.history.pushState('object or string', 'Title', `/orders/${state.orderId}`);
    e.stopPropagation();
    this.setState(prevState => ({
      orderContentModal: !prevState.orderContentModal,
    }));
  };

  closeOrderModal = e => {
    window.history.pushState('object or string', 'Title', '/');
    e.stopPropagation();
    this.setState({
      orderContentModal: false,
    });
  };

  render() {
    OrderContent.propTypes = {
      orderState: PropTypes.object,
      orderID: PropTypes.string,
    };

    const { state } = this;

    const chainRowModalDisplay =
      state.orderContentModal === true ? 'modal-container-true' : 'modal-container';

    let adminPanel;
    if (state.accessLevel === 'admin' && state.orderContentModal === true) {
      adminPanel = (
        <AdminPanel>
          <span onClick={this.deleteOrder} role="button">
            DELETE ORDER
          </span>
        </AdminPanel>
      );
    }

    return (
      <>
        {adminPanel}
        <ModalContainer
          className="order-content-container-outer"
          onClick={e => this.closeOrderModal(e)}
        >
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
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-x-circle"
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
                <ChainLogo chainName={state.chainName} onClick={e => this.openOrderModal(e)} />

                {/* Pulls in user enterted title and description */}
                <div className="order-info" role="button" onClick={e => this.openOrderModal(e)}>
                  <h2 className="order-name">{state.orderName}</h2>
                  <p className="description">{state.orderDescription}</p>
                </div>

                {/* Pulls in conntent specific to this chain */}
                <div className="order-content" role="button" onClick={e => this.openOrderModal(e)}>
                  <ChainContent chainName={state.chainName} orderState={state.orderContent} />
                </div>

                {/* Pulls in tags, user created and date created */}
                <div className="order-meta ">
                  <OrderTags chainName={state.chainName} tags={state.tags} />
                  <CreatedMeta userData={state.userData} dateCreated={state.createdAt} />
                </div>
              </div>

              {/* Where a user can take action on the order. */}
              <ActionBar
                key={state.orderId}
                favoriteCount={state.favoriteCount}
                orderId={state.orderId}
                usersFavorited={state.usersFavorited}
              />
            </OrderContentContainer>
          </div>
        </ModalContainer>
      </>
    );
  }
}

export default OrderContent;
