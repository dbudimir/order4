// Utilities
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ErrorBar = styled.div`
  width: 100%;
  max-width: 100%;
  background-color: hsl(0, 100%, 93%);
  color: hsl(0, 75%, 35%);
  font-family: Nunito;
  padding: 18px 12px;
  font-size: 16px;
  text-align: center;
  position: absolute;
`;

class ErrorMessageBar extends Component {
  render() {
    ErrorMessageBar.propTypes = {
      message: PropTypes.string,
    };

    const { props } = this;
    return (
      <div>
        <ErrorBar>
          <span>{props.message}</span>
        </ErrorBar>
      </div>
    );
  }
}

export default ErrorMessageBar;
