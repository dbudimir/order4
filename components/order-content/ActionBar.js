import React, { Component } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { FacebookShareButton, TwitterShareButton, FacebookIcon, TwitterIcon } from 'react-share';

export default class ActionBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favoritesClass: 'favorites',
      orderId: props.orderId,
      favoriteCount: props.favoriteCount,
      loggedInUserFavorite: null
    };
  }

  componentDidMount() {
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
        () => {}
      );
    }
  }

  favoriteUnfavorite = (apiURL, updateCount, favoriteClass) => {
    this.setState(
      {
        favoritesClass: favoriteClass,
        loggedInUserFavorite: this.state.loggedInUserFavorite === true ? false : true,
        orderId: this.props.orderId,
        favoriteCount: updateCount
      },
      () => {}
    );

    let reqBody = { userId: localStorage.userId, orderId: this.props.orderId };

    axios
      .post(process.env.api_key + apiURL, { ...reqBody })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleFavoriteClick = e => {
    if (localStorage.isLoggedIn === 'true') {
      if (this.state.loggedInUserFavorite === false || this.state.loggedInUserFavorite === null) {
        // Add favorite
        this.favoriteUnfavorite(
          `/api/orders/favorite`,
          this.state.favoriteCount + 1,
          'favorites svg-clicked'
        );
      } else if (this.state.isLoggedInUserFavorite !== false) {
        // Remove favorite
        this.favoriteUnfavorite(
          `/api/orders/unfavorite`,
          this.state.favoriteCount - 1,
          'favorites'
        );
      }
    } else {
      alert('Please create an account to favortie order.');
    }
  };

  render() {
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
          url={`https://mealdig.com/orders/${this.props.orderId}`}
          title={`Check out ${this.state.orderName} at ${this.state.chainName}. https://mealdig.com/orders/${this.props.orderId}`}
          hashtags={this.state.tags}
        >
          <TwitterIcon size={24} round />
        </TwitterShareButton>
        <FacebookShareButton
          url={`https://mealdig.com/orders/${this.props.orderId}`}
          quote={`Check out ${this.state.orderName} at ${this.state.chainName}. https://mealdig.com/orders/${this.props.orderId}`}
        >
          <FacebookIcon size={24} round />
        </FacebookShareButton>
        <div>
          <Link
            href={{
              pathname: '/orders/[usider]',
              query: { id: this.props.orderId }
            }}
            as={{ pathname: `/orders/${this.props.orderId}` }}
          >
            <a href={`/orders/${this.props.orderId}`}>
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
