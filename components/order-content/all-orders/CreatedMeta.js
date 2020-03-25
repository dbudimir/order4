import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Moment from 'react-moment';

export default class CreatedMeta extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    CreatedMeta.propTypes = {
      userData: PropTypes.object,
      dateCreated: PropTypes.string,
    };

    const { userData, dateCreated } = this.props;

    const orderUserName = userData.length === 0 ? 'unknown' : userData[0].userName;

    return (
      <div className="created-by">
        <p>
          Created by{' '}
          <Link
            href={{
              pathname: `/user/[user]`,
              query: { user: orderUserName },
            }}
            as={{ pathname: `/user/${orderUserName}` }}
          >
            <a href={`/user/${orderUserName}`}>
              <span>{orderUserName}</span>
            </a>
          </Link>{' '}
          <span>{userData.length === 0 ? '' : <Moment fromNow>{dateCreated}</Moment>}</span>
        </p>
      </div>
    );
  }
}
