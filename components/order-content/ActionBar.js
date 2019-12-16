import React, { Component } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { FacebookShareButton, TwitterShareButton, FacebookIcon, TwitterIcon } from 'react-share';

import UserContext from '../UserContext';

export default class ActionBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favoritesClass: 'favorites',
      orderId: props.orderId,
      favoriteCount: props.favoriteCount,
      loggedInUserFavorite: false
    };
  }

  componentDidMount() {
    console.log(this.props);
    if (
      this.props.usersFavorited !== undefined &&
      this.props.usersFavorited.includes(localStorage.userId)
    ) {
      this.setState(
        {
          favoritesClass: 'favorites svg-clicked',
          orderId: this.props.orderID,
          favoriteCount: this.props.favoriteCount,
          loggedInUserFavorite: true
        },
        () => {
          console.log(this.state);
        }
      );
    }
  }

  favoriteUnfavorite = (apiURL, updateCount, favoriteClass) => {
    console.log(this.state.loggedInUserFavorite);
    this.setState(
      {
        favoritesClass: favoriteClass,
        loggedInUserFavorite: this.state.loggedInUserFavorite === true ? false : true,
        favoriteCount: updateCount
      },
      () => {
        console.log(this.state);
      }
    );

    const reqBody = { userId: localStorage.userId, orderId: this.props.orderId };
    axios
      .post(process.env.api_key + apiURL, { ...reqBody })
      .then(res => {})
      .catch(err => {
        console.log(err);
      });
  };

  handleFavoriteClick = e => {
    if (this.state.loggedInUserFavorite) {
      // Add favorite
      this.favoriteUnfavorite(`/api/orders/unfavorite`, this.state.favoriteCount - 1, 'favorites');
    } else if (localStorage.isLoggedIn === true) {
      // Remove favorite
      this.favoriteUnfavorite(
        `/api/orders/favorite`,
        this.state.favoriteCount + 1,
        'favorites svg-clicked'
      );
    } else {
      console.log('pleae create an account to favortie order');
    }
  };

  render() {
    let showModal;

    return (
      <div className="user-actions">
        <div className={this.state.favoritesClass} onClick={this.handleFavoriteClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke="#1774ff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-star"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>

          <span className="like-count">{this.state.favoriteCount}</span>
        </div>
        <TwitterShareButton
          url={`https://mealdig.com/orders/${this.props.orderID}`}
          title={`Check out ${this.state.orderName} at ${this.state.chainName}. https://mealdig.com/orders/${this.props.orderID}`}
          hashtags={this.state.tags}
        >
          <TwitterIcon size={24} round />
        </TwitterShareButton>
        <FacebookShareButton
          url={`https://mealdig.com/orders/${this.props.orderID}`}
          quote={`Check out ${this.state.orderName} at ${this.state.chainName}. https://mealdig.com/orders/${this.props.orderID}`}
        >
          <FacebookIcon size={24} round />
        </FacebookShareButton>
        <div>
          <Link
            href={{
              pathname: '/orders/[usider]',
              query: { id: this.props.orderID }
            }}
            as={{ pathname: `/orders/${this.props.orderID}` }}
          >
            <a href={`/orders/${this.props.orderID}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-external-link"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </a>
          </Link>
        </div>
      </div>
    );
  }
}
