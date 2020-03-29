import React from 'react';
import App from 'next/app';
import Router from 'next/router';

import TagManager from 'react-gtm-module';

import { NextSeo } from 'next-seo';
import UserContext from '../components/UserContext';

const tagManagerArgs = {
  gtmId: 'GTM-KGFF5HN',
};

export default class MyApp extends App {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      email: '',
      userId: '',
      accessLevel: '',
      isLoggedIn: '',
      nextAction: '',
    };
  }

  componentDidMount = () => {
    TagManager.initialize(tagManagerArgs);
    const user = localStorage;
    this.setState({
      user,
    });
  };

  signIn = (userName, email, userId, accessLevel, isLoggedIn) => {
    this.setState({
      userName,
      email,
      userId,
      accessLevel,
      isLoggedIn,
    });
    localStorage.setItem('username', userName);
    localStorage.setItem('email', email);
    localStorage.setItem('userId', userId);
    localStorage.setItem('accessLevel', accessLevel);
    localStorage.setItem('isLoggedIn', isLoggedIn);
    if (window.location.pathname !== '/create-order') {
      Router.push('/');
    }
  };

  signOut = async () => {
    this.setState(
      {
        userName: '',
        email: '',
        userId: '',
        isLoggedIn: false,
      },
      () => {
        localStorage.clear();
        Router.push('/');
      }
    );
  };

  switchNextAction = nextAction => this.setState({ nextAction });

  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <NextSeo
          title="MealDig | Custom fast-casual meals."
          description="Discover new meals and custom orders at your favorite fast-casual dining spots. Select a chain and search for a meal type to get started."
          canonical="https://mealdig.com/"
          openGraph={{
            url: 'https://mealdig.com/',
            title: 'MealDig | Custom fast-casual meals.',
            description:
              'Discover new meals and custom orders at your favorite fast-casual dining spots. Select a chain and search for a meal type to get started.',
            images: [
              {
                url: 'https://www.example.ie/og-image-01.jpg',
                width: 800,
                height: 600,
                alt: 'Og Image Alt',
              },
              {
                url: 'https://www.example.ie/og-image-02.jpg',
                width: 900,
                height: 800,
                alt: 'Og Image Alt Second',
              },
            ],
            site_name: 'MealDig',
          }}
          twitter={{
            handle: '@mealdig',
            site: '',
            cardType: 'summary_large_image',
          }}
        />

        <UserContext.Provider
          value={{
            userName: this.state.userName,
            userEmail: this.state.email,
            userId: this.state.userId,
            accessLevel: this.state.accessLevel,
            isLoggedIn: this.state.isLoggedIn,
            nextAction: this.state.nextAction,
            signIn: this.signIn,
            signOut: this.signOut,
            switchNextAction: this.switchNextAction,
          }}
        >
          <Component {...pageProps} />
        </UserContext.Provider>
      </>
    );
  }
}
