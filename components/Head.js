import React, { Component } from 'react';
import NextHead from 'next/head';

const defaultDescription = '';
const defaultOGURL = '';
const defaultOGImage = '';

class Head extends Component {
   render() {
      console.log(this.props.title);
      return (
         <NextHead>
            <meta charSet="UTF-8" />
            <title className="next-head">{this.props.title || ''}</title>
            <meta name="description" content={this.props.description || defaultDescription} />
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
               content="QGQHndVahNquANX0j-ntmMNLiI8CeVlK2mbyEm6L42o"
            />
            <meta property="og:url" content={this.props.url || defaultOGURL} />
            <meta property="og:title" content={this.props.title || ''} />
            <meta
               property="og:description"
               content={this.props.description || defaultDescription}
            />
            <meta name="twitter:site" content={this.props.url || defaultOGURL} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:image" content={this.props.ogImage || defaultOGImage} />
            <meta property="og:image" content={this.props.ogImage || defaultOGImage} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
         </NextHead>
      );
   }
}

export default Head;
