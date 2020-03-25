import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Form from '../styles/Form';

import ErrorMessage from './ErrorMessage';

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: props.password,
      passwordConfirm: '',
      formErrors: {
        password: '',
        confirmPassword: '',
      },
      passwordValid: false,
      confirmPasswordValid: false,
    };
  }

  componentDidMount = () => {
    const { password } = this.props;
    this.setState({
      password,
    });
  };

  onSubmit = event => {
    const { signIn, updateUser, updateAction } = this.props;
    const { password } = this.state;
    event.preventDefault();

    const url = window.location.href;
    const token = url.substring(url.indexOf('=') + 1);

    const newPassword = {
      password,
      token,
    };

    axios.post(`${process.env.api_key}/api/email/confirm-token`, { newPassword }).then(response => {
      signIn(response.data.userName, response.data.email, response.data.userId, true);
      const user = {
        userFullName: response.data.userFullName,
        userName: response.data.userName,
        email: response.data.email,
        userId: response.data.userId,
      };
      updateUser(user);
      if (window.location.pathname !== '/reset-password') {
        updateAction('');
      }
    });
  };

  confirmPasswordReset = state => {
    axios
      .post(`${process.env.api_key}/api/email/send-confirm`, {
        ...state,
      })
      .then(response => {
        console.log(response);
      });
  };

  updateState = event => {
    const { target } = event;
    const { value } = target;
    const { name } = target;

    this.setState(
      {
        [name]: value,
      },
      () => {
        this.validateFields(name, value);
      }
    );
  };

  validateFields(fieldName, value) {
    const { state } = this;
    const { formErrors } = this.state;
    let { passwordValid } = this.state;
    let { confirmPasswordValid } = this.state;

    switch (fieldName) {
      case 'password':
        passwordValid = value.length >= 7;
        formErrors.password = passwordValid ? '' : 'Minimum seven characters.';
        break;
      case 'passwordConfirm':
        confirmPasswordValid = state.password === state.passwordConfirm;
        formErrors.confirmPassword = confirmPasswordValid ? '' : 'The passwords do not match.';
        break;
      default:
        break;
    }

    this.setState({
      formErrors,
      passwordValid,
      confirmPasswordValid,
    });
  }

  render() {
    ResetPassword.propTypes = {
      password: PropTypes.string,
      signIn: PropTypes.func,
      updateUser: PropTypes.func,
      updateAction: PropTypes.func,
    };

    const thisUser = this.state;
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
              value={thisUser.password || ''}
              type="password"
              placeholder="Password"
            />
            <ErrorMessage message={thisUser.formErrors.password} state={thisUser} />
            <div className="form-input-label">
              <span>Re-enter Your New Password</span>
            </div>
            <input
              name="passwordConfirm"
              onChange={this.updateState}
              value={thisUser.passwordConfirm || ''}
              type="password"
              placeholder="Re-enter password"
            />
            <ErrorMessage message={thisUser.formErrors.confirmPassword} state={this.state} />
            <input name="submit" onClick={this.onSubmit} type="submit" value="Save Password" />
          </form>
        </div>
      </Form>
    );
  }
}

export default ResetPassword;
