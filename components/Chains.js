import React, { Component } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const ChainContainer = styled.div`
   display: flex;

   a {
      width: 50%;
   }

   h3 {
      font-size: 32px;
   }
`;

class Chains extends Component {
   constructor() {
      super();
      this.state = {
         chains: [],
      };
   }

   componentDidMount() {}

   render() {
      const { chains } = this.props.chains;
      const chainCard = chains.map((chain, index) => (
         <Link
            href={`/chains?slug=${chain.name.replace('&', 'and')}`}
            as={`/chains/${chain.name.replace('&', 'and')}`}
         >
            <h3>{chain.name}</h3>
         </Link>
      ));
      return (
         <ChainContainer>
            <div>{chainCard}</div>
         </ChainContainer>
      );
   }
}

export default Chains;
