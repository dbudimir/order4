/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import 'isomorphic-fetch';
import axios from 'axios';

import { NextSeo } from 'next-seo';
import Link from 'next/link';

import styled from 'styled-components';

import Layout from '../../../components/Layout';

const AccountSettingsContainer = styled.div`
  max-width: 1024px;
  margin: 60px auto 48px;
  font-family: Roboto, sans-serif;

  h1 {
    font-size: 42px;
    font-weight: 800;
  }

  .item-container {
    margin-bottom: 12px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;

    .item-title {
      width: 100%;
      font-weight: 600;
      margin-bottom: 6px;
    }

    input {
      margin-right: 24px;
    }
  }

  .save-button {
    border: 1px solid #000000;
    padding: 12px 6px;
    text-align: center;
    cursor: pointer;
  }
`;

class AccountSettings extends Component {
  constructor(props) {
    super(props);
    this.state = { ...props.data[0] };
  }

  updateState = event => {
    const { target } = event;
    const { value } = target;
    const { name } = target;

    this.setState({
      [name]: value
    });
  };

  saveUserSettings = () => {
    const reqBody = this.state;

    axios
      .post(process.env.api_key + `/api/users/update-user`, {
        ...reqBody
      })
      .then(response => console.log(response));
  };

  render() {
    let user = this.state;
    let createdDate = new Date(user.createdAt);
    console.log(user);

    return (
      <React.Fragment>
        <NextSeo title={`Profile for ${user.userFullName}`} />
        <Layout />
        <AccountSettingsContainer>
          <h1>{`Profile for ${user.userFullName}`}</h1>
          <div className="item-container">
            <span className="item-title">Name:</span>
            <input
              name="userFullName"
              onChange={this.updateState}
              type="text"
              placeholder="Enter new name"
            />
            <div className="updated-value"> {user.userFullName}</div>
          </div>

          <div className="item-container">
            <span className="item-title">User Name:</span>
            <input
              name="userName"
              onChange={this.updateState}
              type="text"
              placeholder="Enter new username"
            />
            <div className="updated-value"> {user.userName}</div>
          </div>

          <div className="item-container">
            <span className="item-title">Email</span>
            <input
              name="email"
              onChange={this.updateState}
              type="text"
              placeholder="Enter new email"
            />
            <div className="updated-value"> {user.email}</div>
          </div>

          <div>User was created on {createdDate.toString()}</div>
          <div>See all {user.orders.length} orders</div>
          <hr />
          <div className="save-button" onClick={this.saveUserSettings}>
            Save settings
          </div>
        </AccountSettingsContainer>
      </React.Fragment>
    );
  }
}

export async function getServerSideProps(context) {
  let data;
  if (context.query.user.length === 24) {
    const res = await fetch(process.env.api_key + `/api/users/id/${context.query.user}`);
    data = await res.json();
  } else {
    const res = await fetch(process.env.api_key + `/api/users/${context.query.user}`);
    data = await res.json();
  }

  return {
    //  props: { data }
    props: { data }
  };
}

export default AccountSettings;
