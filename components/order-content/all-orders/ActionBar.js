/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import axios from 'axios';
import { FacebookShareButton, TwitterShareButton, FacebookIcon, TwitterIcon } from 'react-share';

export default class ActionBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props,
      favoritesClass: 'favorites',
      favoriteCount: props.favoriteCount,
      loggedInUserFavorite: null,
    };
  }

  componentDidMount() {
    const { usersFavorited, favoriteCount } = this.props;
    if (usersFavorited !== undefined && usersFavorited.includes(localStorage.userId)) {
      this.setState(
        {
          favoritesClass: 'favorites svg-clicked',
          favoriteCount,
          loggedInUserFavorite: true,
        },
        () => {}
      );
    }
  }

  favoriteUnfavorite = (apiURL, updateCount, favoriteClass) => {
    const { loggedInUserFavorite, orderId } = this.state;

    this.setState(
      {
        favoritesClass: favoriteClass,
        loggedInUserFavorite: loggedInUserFavorite !== true,
        favoriteCount: updateCount,
      },
      () => {}
    );

    const reqBody = { userId: localStorage.userId, orderId };

    axios
      .post(process.env.api_key + apiURL, { ...reqBody })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleFavoriteClick = () => {
    const { loggedInUserFavorite, isLoggedInUserFavorite, favoriteCount } = this.state;

    if (localStorage.isLoggedIn === 'true') {
      if (loggedInUserFavorite === false || loggedInUserFavorite === null) {
        // Add favorite
        this.favoriteUnfavorite(`/api/orders/favorite`, favoriteCount + 1, 'favorites svg-clicked');
      } else if (isLoggedInUserFavorite !== false) {
        // Remove favorite
        this.favoriteUnfavorite(`/api/orders/unfavorite`, favoriteCount - 1, 'favorites');
      }
    } else {
      alert('Please create an account to favortie order.');
    }
  };

  render() {
    ActionBar.propTypes = {
      favoriteCount: PropTypes.number,
      usersFavorited: PropTypes.string,
      orderId: PropTypes.string,
    };

    const { orderId } = this.props;
    const { favoritesClass, favoriteCount, orderName, chainName, tags } = this.state;
    return (
      <div className="user-actions">
        <div className={favoritesClass} onClick={this.handleFavoriteClick}>
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

          <span className="like-count">{favoriteCount}</span>
        </div>
        <TwitterShareButton
          url={`https://mealdig.com/orders/${orderId}`}
          title={`Check out ${orderName} at ${chainName}. https://mealdig.com/orders/${orderId}`}
          hashtags={tags}
        >
          <TwitterIcon size={24} round />
        </TwitterShareButton>
        <FacebookShareButton
          url={`https://mealdig.com/orders/${orderId}`}
          quote={`Check out ${orderName} at ${chainName}. https://mealdig.com/orders/${orderId}`}
        >
          <FacebookIcon size={24} round />
        </FacebookShareButton>
        <div>
          <Link
            href={{
              pathname: '/orders/[id]',
              query: { id: orderId },
            }}
            as={{ pathname: `/orders/${orderId}` }}
          >
            <a href={`/orders/${orderId}`}>
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
