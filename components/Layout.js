import React, { Component } from 'react';
import Head from 'next/head';
import Nav from './Nav';

class Layout extends Component {
   render() {
      return (
         <div>
            <Head></Head>
            <Nav />
            <style jsx global>{`
               body {
                  margin: 0px;
               }
            `}</style>
         </div>
      );
   }
}

export default Layout;
