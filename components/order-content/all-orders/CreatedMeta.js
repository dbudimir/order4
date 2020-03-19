import React, { Component } from 'react';
import Link from 'next/link';
import Moment from 'react-moment';

export default class CreatedMeta extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    let orderUserName =
      this.props.userData.length === 0 ? 'unknown' : this.props.userData[0].userName;

    return (
      <div className="created-by">
        <p>
          Created by{' '}
          <Link
            href={{
              pathname: `/user/[user]`,
              query: { user: orderUserName }
            }}
            as={{ pathname: `/user/${orderUserName}` }}
          >
            <a href={`/user/${orderUserName}`}>
              <span>{orderUserName}</span>
            </a>
          </Link>{' '}
          <span>
            {this.props.userData.length === 0 ? (
              ''
            ) : (
              <Moment fromNow>{this.props.dateCreated}</Moment>
            )}
          </span>
        </p>
      </div>
    );
  }
}
