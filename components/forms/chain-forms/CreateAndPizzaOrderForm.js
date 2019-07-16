import React, { Component } from 'react';
import styled from 'styled-components';

class CreateAndPizzOrder extends Component {
   constructor() {
      super();
      this.state = {
         chain: '&pizza',
      };
   }

   render() {
      return (
         <div>
            <p>testing pizza</p>
         </div>
      );
   }
}

export default CreateAndPizzOrder;
