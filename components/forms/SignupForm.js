import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Form from '../styles/Form';
import ErrorMessage from './ErrorMessage';

class SignupForm extends Component {
  constructor() {
    super();
    this.state = {
      userId: '',
      userFullName: '',
      userName: '',
      email: '',
      password: '',
      passwordConfirm: '',
      formErrors: {
        userName: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
      userNameValid: false,
      emailValid: false,
      passwordValid: false,
      confirmPasswordValid: false,
      allValid: false,
    };
  }

  componentDidMount = () => {
    const { userName, email, password } = this.props;
    this.setState({
      userFullName: '',
      userName,
      email,
      password,
      isLoggedIn: false,
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

  onSubmit = async event => {
    event.preventDefault();

    const { signIn, updateUser } = this.props;
    const { state } = this;

    axios
      .post(`${process.env.api_key}/api/users/signup`, {
        ...state,
      })
      .then(response => {
        this.setState({
          isLoggedIn: true,
          userId: response.data._id,
        });
        signIn(response.data.userName, response.data.email, response.data._id, true);
        const user = {
          userFullName: response.data.userFullName,
          userName: response.data.userName,
          email: response.data.email,
          userId: response.data._id,
        };
        updateUser(user);
        console.log(window.location.pathname);
        //   if (window.location.pathname !== ('/login' || '/signup')) {
        //     this.props.updateAction('');
        //   }
      });
  };

  validateFields(fieldName, value) {
    let {
      formErrors,
      password,
      userNameValid,
      emailValid,
      passwordValid,
      confirmPasswordValid,
      passwordConfirm,
    } = this.state;

    switch (fieldName) {
      case 'userName':
        userNameValid = value.length >= 1 && value.length <= 20;
        formErrors.userName = userNameValid ? '' : 'Enter a valid user name (20 characters max)';
        break;
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        formErrors.email = emailValid ? '' : 'Please use a valid email address.';
        break;
      case 'password':
        passwordValid = value.length >= 7;
        formErrors.password = passwordValid ? '' : 'Minimum seven characters.';
        break;
      case 'passwordConfirm':
        confirmPasswordValid = password === passwordConfirm;
        formErrors.confirmPassword = confirmPasswordValid ? '' : 'The passwords do not match.';
        break;
      default:
        break;
    }

    this.setState(
      {
        formErrors,
        userNameValid,
        emailValid,
        passwordValid,
        confirmPasswordValid,
      },
      this.validateAll
    );
  }

  validateAll() {
    const { userNameValid, emailValid, passwordValid, confirmPasswordValid } = this.state;

    this.setState({
      allValid: emailValid && passwordValid && confirmPasswordValid && userNameValid,
    });
  }

  render() {
    SignupForm.propTypes = {
      email: PropTypes.string,
      password: PropTypes.string,
      userName: PropTypes.string,
      signIn: PropTypes.func,
      updateUser: PropTypes.func,
    };

    const { userFullName, userName, email, password, passwordConfirm, formErrors } = this.state;

    return (
      <Form className="form">
        <div className="signup-form">
          <h3>Sign Up</h3>
          <form>
            <div className="form-input-label">
              <span>Name</span>
            </div>
            <input
              name="userFullName"
              onChange={this.updateState}
              value={userFullName || ''}
              type="text"
              placeholder="Enter your full name"
            />
            <ErrorMessage />
            <div className="form-input-label">
              <span>User Name</span>
            </div>
            <input
              name="userName"
              onChange={this.updateState}
              value={userName || ''}
              type="text"
              placeholder="Enter a username"
            />
            <ErrorMessage message={formErrors.userName} state={this.state} />
            <div className="form-input-label">
              <span>Email</span>
            </div>
            <input
              name="email"
              onChange={this.updateState}
              value={email || ''}
              type="text"
              placeholder="Email"
            />
            <ErrorMessage message={formErrors.email} state={this.state} />
            <div className="form-input-label">
              <span>Create Password</span>
            </div>
            <input
              name="password"
              onChange={this.updateState}
              value={password || ''}
              type="password"
              placeholder="Password"
            />
            <ErrorMessage message={formErrors.password} state={this.state} />
            <div className="form-input-label">
              <span>Confirm Password</span>
            </div>
            <input
              name="passwordConfirm"
              onChange={this.updateState}
              value={passwordConfirm || ''}
              type="password"
              placeholder="Re-enter password"
            />
            <ErrorMessage message={formErrors.confirmPassword} state={this.state} />
            <input name="submit" onClick={this.onSubmit} type="submit" value="Sign Up" />
          </form>
        </div>
      </Form>
    );
  }
}

export default SignupForm;
