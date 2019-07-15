import { Component } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';

class Chains extends Component {
   static getInitialProps({ query }) {
      return { chainName: query.chain };
   }

   render() {
      console.log(this.props);
      return (
         <div>
            <Layout />
            <h1>Post: {this.props.chainName}</h1>
            <Link href="/">
               <a>Go back to the list of posts</a>
            </Link>
         </div>
      );
   }
}

export default Chains;
