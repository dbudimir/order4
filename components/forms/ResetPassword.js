import React, { Component } from 'react';
import axios from 'axios';

import Form from '../styles/Form';
import styled from 'styled-components';

import ErrorMessage from './ErrorMessage';

const ErrorBar = styled.div`
  width: 100%;
  background-color: hsl(0, 100%, 93%);
  color: hsl(0, 75%, 35%);
  font-family: Nunito;
  padding: 18px 12px;
  font-size: 16px;
  text-align: center;
`;

class ResetPassword extends Component {
  constructor() {
    super();
    this.state = {
      userId: '',
      password: '',
      passwordConfirm: '',
      formErrors: {
        password: '',
        confirmPassword: ''
      },
      passwordValid: false,
      confirmPasswordValid: false,
      allValid: false
    };
  }

  componentDidMount = () => {
    this.setState({
      password: this.props.password,
      isLoggedIn: false
    });
  };

  updateState = event => {
    const { target } = event;
    const { value } = target;
    const { name } = target;

    this.setState(
      {
        [name]: value
      },
      () => {
        this.validateFields(name, value);
      }
    );
  };

  validateFields(fieldName, value) {
    const { formErrors } = this.state;
    let { passwordValid } = this.state;
    let { confirmPasswordValid } = this.state;

    switch (fieldName) {
      case 'password':
        passwordValid = value.length >= 7;
        formErrors.password = passwordValid ? '' : 'Minimum seven characters.';
        break;
      case 'passwordConfirm':
        confirmPasswordValid = this.state.password === this.state.passwordConfirm;
        formErrors.confirmPassword = confirmPasswordValid ? '' : 'The passwords do not match.';
        break;
      default:
        break;
    }

    this.setState(
      {
        formErrors,
        passwordValid,
        confirmPasswordValid
      },
      this.validateAll
    );
  }

  validateAll() {
    this.setState({
      allValid: this.state.confirmPasswordValid
    });
  }

  confirmPasswordReset = state => {
    axios
      .post(process.env.api_key + `/api/email/send-confirm`, {
        ...state
      })
      .then(response => {
        console.log(response);
      });
  };

  onSubmit = async event => {
    event.preventDefault();
    const { state } = this;

    console.log(state);
    let url = window.location.href;
    let token = url.substring(url.indexOf('=') + 1);

    let newPassword = {
      password: state.password,
      token: token
    };

    axios.post(process.env.api_key + `/api/email/confirm-token`, { newPassword }).then(response => {
      console.log(response);
      this.setState({
        isLoggedIn: true,
        userId: response.data.userId
      });
      this.props.signIn(response.data.userName, response.data.email, response.data.userId, true);
      const user = {
        userFullName: response.data.userFullName,
        userName: response.data.userName,
        email: response.data.email,
        userId: response.data.userId
      };
      this.props.updateUser(user);
      if (window.location.pathname !== '/reset-password') {
        this.props.updateAction('');
      }
    });
  };

  render() {
    return (
      <Form className="form">
        <div className="reset-password-form">
          <h3>Change Password</h3>
          <div className="new-password-info">
            <span>In order to protect your account, make sure your password:</span>
            <ul>
              <li>Is longer than 7 characters</li>
              <li>Does not match or contain your username, e.g. 'username123'</li>
            </ul>
          </div>
          <form>
            <div className="form-input-label">
              <span>Create a New Password</span>
            </div>
            <input
              name="password"
              onChange={this.updateState}
              value={this.state.password || ''}
              type="password"
              placeholder="Password"
            />
            <ErrorMessage message={this.state.formErrors.password} state={this.state} />
            <div className="form-input-label">
              <span>Re-enter Your New Password</span>
            </div>
            <input
              name="passwordConfirm"
              onChange={this.updateState}
              value={this.state.passwordConfirm || ''}
              type="password"
              placeholder="Re-enter password"
            />
            <ErrorMessage message={this.state.formErrors.confirmPassword} state={this.state} />
            <input name="submit" onClick={this.onSubmit} type="submit" value="Save Password" />
          </form>
        </div>
      </Form>
    );
  }
}

export default ResetPassword;
