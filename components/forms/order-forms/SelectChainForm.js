// Utilities
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SelectChainForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...props };
  }

  updateState = e => {
    const { setChain } = this.props;
    const { target } = e;
    const { value } = target;
    const { name } = target;
    this.setState({
      [name]: value,
    });
    setChain(e.target.value);
  };

  render() {
    SelectChainForm.propTypes = {
      setChain: PropTypes.func,
    };

    return (
      <div className="select-chain">
        <form>
          <h3>Select a restaurant...</h3>
          <div className="select-container">
            <select onChange={this.updateState} className="text-input" name="chainName">
              <option value="" disabled selected>
                Select Chain
              </option>
              <option value="Chipotle">Chipotle</option>
              <option value="&pizza">&pizza</option>
            </select>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-arrow-down"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <polyline points="19 12 12 19 5 12"></polyline>
            </svg>
          </div>
        </form>
      </div>
    );
  }
}

export default SelectChainForm;
