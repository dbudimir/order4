/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import 'isomorphic-fetch';
import axios from 'axios';

import { NextSeo } from 'next-seo';
import Link from 'next/link';

import styled from 'styled-components';

import Layout from '../../../components/Layout';

const H1 = styled.h1`
  max-width: 1024px;
  margin: 60px auto 48px;
  padding: 0px 12px;
  font-family: Roboto, sans-serif;
  font-size: 42px;
  font-weight: 800;
`;

class AccountSettings extends Component {
  constructor(props) {
    super(props);
    this.state = { ...props.data[0] };
  }

  updateState = event => {
    console.log(this.state);
    const { target } = event;
    const { value } = target;
    const { name } = target;

    this.setState({
      [name]: value
    });
  };

  saveUserSettings = () => {
    const reqBody = this.state;
    console.log(reqBody);
    axios
      .post(process.env.api_key + `/api/users/update-user`, {
        ...reqBody
      })
      .then(response => console.log(response));
  };

  render() {
    let user = this.state;
    console.log(user);
    return (
      <React.Fragment>
        <NextSeo title={`Profile for ${user.userFullName}`} />
        <Layout />
        <H1>{`Profile for ${user.userFullName}`}</H1>
        <div>Name: {user.userFullName}</div>
        <div>Username: {user.userName}</div>
        <div>Email: {user.email}</div>
        <div>See all {user.orders.length} orders</div>
        <hr />
        <input
          name="userName"
          onChange={this.updateState}
          type="text"
          placeholder="Enter your email"
        />
        <div onClick={this.saveUserSettings}>Save settings</div>
      </React.Fragment>
    );
  }
}

export async function getServerSideProps(context) {
  const res = await fetch(process.env.api_key + `/api/users/${context.query.user}`);
  const data = await res.json();

  return {
    props: { data }
  };
}

export default AccountSettings;
