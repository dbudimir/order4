import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Error = styled.div`
  color: red;
  margin-bottom: 12px;
  font-weight: 400;
  margin: -12px auto 12px;
  line-height: 1.25;
  font-size: 14px;
`;

class ErrorMessage extends Component {
  render() {
    ErrorMessage.propTypes = {
      message: PropTypes.string,
    };

    const { message } = this.props;
    return (
      <Error className="error-message">
        <p>{message}</p>
      </Error>
    );
  }
}

export default ErrorMessage;
