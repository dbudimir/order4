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
         nextAction: '',
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
      if (window.location.pathname !== '/create-order') {
         Router.push('/');
      }
   };

   signOut = async () => {
      await this.setState({
         userName: '',
         email: '',
         userId: '',
         isLoggedIn: false,
      });
      await localStorage.clear();
      Router.push('/');
   };

   switchNextAction = nextAction => this.setState({ nextAction });

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
                  nextAction: this.state.nextAction,
                  signIn: this.signIn,
                  signOut: this.signOut,
                  switchNextAction: this.switchNextAction,
               }}
            >
               <Component {...pageProps} />
            </UserContext.Provider>
         </Container>
      );
   }
}
