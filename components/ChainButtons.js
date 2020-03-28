// Utilities
import React, { Component } from 'react';
import styled from 'styled-components';

// Components
import ChainLogo from './order-content/chain-specific/ChainLogo';

// Styles
const ChainButtonContainer = styled.div`
  width: 96%;
  max-width: 1024px;
  margin: 60px auto 0;
  display: flex;
  justify-content: flex-start;

  .chain-button {
    background: #ffffff;
    width: max-content;
    margin-right: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
    transition-timing-function: ease-in-out;
    transition-duration: 0.25s;

    &:hover {
      transform: scale(1.05);
    }

    .chain-logo {
      padding: 32px;
    }

    img {
      max-height: 30px;
      margin: 0 auto;
    }

    span {
      font-family: Nunito;
      font-weight: 600;
      font-size: 18px;
      padding: 32px;
    }
  }
`;

// Container buttons for chains.
class ChainButtons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props,
    };
  }

  render() {
    ChainButtons.propTypes = {};

    const { chainNames } = this.state;

    const buttons = chainNames.map(chainName => (
      <div className="chain-button">
        <ChainLogo chainName={chainName} />
      </div>
    ));

    return (
      <ChainButtonContainer>
        {buttons}
        <div className="chain-button">
          <span>More coming soon...</span>
        </div>
      </ChainButtonContainer>
    );
  }
}

export default ChainButtons;
