import React from 'react';
import App, { Container } from 'next/app';
import Router from 'next/router';
import UserContext from '../components/UserContext';

export default class MyApp extends App {
   constructor(props) {
      super(props);
      this.state = {
         userName: '',
         email: '',
         userId: '',
         isLoggedIn: '',
      };
   }

   static async getInitialProps({ Component, router, ctx }) {
      let pageProps = {};

      if (Component.getInitialProps) {
         pageProps = await Component.getInitialProps(ctx);
      }

      return { pageProps };
   }

   componentDidMount = () => {
      const user = localStorage;
      this.setState({
         user,
      });
      console.log(this.state);
   };

   signIn = (userName, email, userId, isLoggedIn) => {
      this.setState({
         userName,
         email,
         userId,
         isLoggedIn,
      });
      localStorage.setItem('username', userName);
      localStorage.setItem('email', email);
      localStorage.setItem('userId', userId);
      localStorage.setItem('isLoggedIn', isLoggedIn);
      Router.push('/');
   };

   signOut = () => {
      console.log('logging out now');
      this.setState({
         userName: '',
         email: '',
         userId: '',
         isLoggedIn: false,
      });
      localStorage.clear();
   };

   render() {
      const { Component, pageProps } = this.props;

      return (
         <Container>
            <UserContext.Provider
               value={{
                  userName: this.state.userName,
                  userEmail: this.state.email,
                  userId: this.state.userId,
                  isLoggedIn: this.state.isLoggedIn,
                  signIn: this.signIn,
                  signOut: this.signOut,
               }}>
               <Component {...pageProps} />
            </UserContext.Provider>
         </Container>
      );
   }
}
