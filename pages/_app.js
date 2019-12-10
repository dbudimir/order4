import React from 'react';
import App from 'next/app';
import Router from 'next/router';
import UserContext from '../components/UserContext';

import TagManager from 'react-gtm-module';
const tagManagerArgs = {
  gtmId: 'GTM-KGFF5HN'
};

import { NextSeo } from 'next-seo';

export default class MyApp extends App {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      email: '',
      userId: '',
      isLoggedIn: '',
      nextAction: ''
    };
  }

  componentDidMount = () => {
    TagManager.initialize(tagManagerArgs);
    const user = localStorage;
    this.setState({
      user
    });
  };

  signIn = (userName, email, userId, isLoggedIn) => {
    this.setState({
      userName,
      email,
      userId,
      isLoggedIn
    });
    localStorage.setItem('username', userName);
    localStorage.setItem('email', email);
    localStorage.setItem('userId', userId);
    localStorage.setItem('isLoggedIn', isLoggedIn);
    if (window.location.pathname !== '/create-order') {
      Router.push('/');
    }
  };

  signOut = () => {
    this.setState({
      userName: '',
      email: '',
      userId: '',
      isLoggedIn: false
    });
    localStorage.clear();
    Router.reload('/');
  };

  switchNextAction = nextAction => this.setState({ nextAction });

  render() {
    const { Component, pageProps } = this.props;

    return (
      <React.Fragment>
        <NextSeo
          title="MealDig | Custom fast-casual meals."
          description="This example uses more of the available config options."
          canonical="https://mealdig.com/"
          openGraph={{
            url: 'https://www.url.ie/a',
            title: 'Open Graph Title',
            description: 'Open Graph Description',
            images: [
              {
                url: 'https://www.example.ie/og-image-01.jpg',
                width: 800,
                height: 600,
                alt: 'Og Image Alt'
              },
              {
                url: 'https://www.example.ie/og-image-02.jpg',
                width: 900,
                height: 800,
                alt: 'Og Image Alt Second'
              },
              { url: 'https://www.example.ie/og-image-03.jpg' },
              { url: 'https://www.example.ie/og-image-04.jpg' }
            ],
            site_name: 'SiteName'
          }}
          twitter={{
            handle: '@handle',
            site: '@site',
            cardType: 'summary_large_image'
          }}
        />

        <UserContext.Provider
          value={{
            userName: this.state.userName,
            userEmail: this.state.email,
            userId: this.state.userId,
            isLoggedIn: this.state.isLoggedIn,
            nextAction: this.state.nextAction,
            signIn: this.signIn,
            signOut: this.signOut,
            switchNextAction: this.switchNextAction
          }}
        >
          <Component {...pageProps} />
        </UserContext.Provider>
      </React.Fragment>
    );
  }
}
