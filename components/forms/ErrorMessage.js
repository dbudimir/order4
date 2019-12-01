import React, { Component } from 'react';
import styled from 'styled-components';

const Error = styled.div`
  color: red;
  margin-bottom: 12px;
  font-weight: 400;
  margin: -12px auto 12px;
  line-height: 1.25;
`;

class ErrorMessage extends Component {
  render() {
    return (
      <Error className="error-message">
        <p>{this.props.message}</p>
      </Error>
    );
  }
}

export default ErrorMessage;
