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

   render() {
      const { chains } = this.props.chains;
      const chainCard = chains.map((chain, index) => (
         <Link href="/chains/[name]" as={`/chains/${chain.name}`} key={index}>
            <a href={`/chains${chain.name}`}>
               <ChainContainer>
                  <h3>{chain.name}</h3>
               </ChainContainer>
            </a>
         </Link>
      ));
      return <div>{chainCard}</div>;
   }
}

export default Chains;
