//Utilities
import React, { Component } from 'react';
import styled from 'styled-components';
//Styles

//Components

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
    return (
      <div>
        <ErrorBar>
          <span>{this.props.message}</span>
        </ErrorBar>
      </div>
    );
  }
}

export default ErrorMessageBar;
