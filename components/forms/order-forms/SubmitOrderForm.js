import React, { Component } from 'react';
import styled from 'styled-components';

import TagForm from '../TagForm';

const Form = styled.div`
  .label {
    margin-top: 12px;
    font-weight: 800;
  }
  span {
    display: block;
  }
`;

class SubmitOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }

  updateState = event => {
    const { target } = event;
    const { value } = target;
    const { name } = target;

    this.setState({
      order: {
        ...this.state.order,
        [name]: value
      }
    });
    this.props.setOrderDetails(this.state.order);
  };

  updateUserState = event => {
    const { target } = event;
    const { value } = target;
    const { name } = target;

    this.setState({
      user: {
        [name]: value
      }
    });
  };

  updateTags = newTags => {
    console.log(newTags);
    this.setState(
      {
        order: {
          tags: newTags
        }
      },
      () => {
        this.props.setOrderDetails(this.state.order);
      }
    );
  };

  render() {
    return (
      <div>
        <Form>
          <div className="submit-order">
            <h3>Add details...</h3>
            <span className="field-label">
              Name Your Order (ex. "The Belly Buster", "The Big Cheese")
            </span>
            <input
              onChange={this.updateState}
              className="text-input"
              name="orderName"
              placeholder="Name your order"
            />
            <span className="field-label">Short Description</span>
            <textarea
              onChange={this.updateState}
              className="text-input"
              name="description"
              rows="4"
            />
            <span className="field-label">Add Tags</span>
            <span>Type in your tags and press enter to confirm.</span>
            <TagForm setTags={this.updateTags} />
            <br />
            <button
              onClick={this.props.toggleSubmitConfirmation}
              className="button"
              name="submit"
              type="submit"
            >
              Submit Order
            </button>
          </div>
        </Form>
      </div>
    );
  }
}

export default SubmitOrder;
