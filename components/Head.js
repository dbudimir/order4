import React, { Component } from 'react';
import NextHead from 'next/head';

class Head extends Component {
  render() {
    return (
      <NextHead>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" sizes="192x192" href="/static/touch-icon.png" />
        <link rel="apple-touch-icon" href="/static/touch-icon.png" />
        <link rel="mask-icon" href="/static/favicon-mask.svg" color="#49B882" />
        <link rel="icon" href="/static/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,500i,700,900&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Nunito:300,400,600,700,800,900&display=swap"
        />
        <meta
          name="google-site-verification"
          content="0tikEBJv6jfDzlVrMSFJmAOFrQCMM0c47FLBfIyeck4"
        />
      </NextHead>
    );
  }
}

export default Head;
