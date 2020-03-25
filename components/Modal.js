import React, { Component } from 'react';
import styled from 'styled-components';

const ModalContainer = styled.div`
  height: 200px;
  width: 200px;
`;

export default class Modal extends Component {
  render() {
    return (
      <ModalContainer>
        <div className="modal-box">
          <p>Make sure to sign up</p>
        </div>
      </ModalContainer>
    );
  }
}
