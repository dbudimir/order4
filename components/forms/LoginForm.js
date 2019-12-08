//Utilities
import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
//Styles
import Form from '../styles/Form';
//Components
import ErrorMessageBar from './ErrorMessageBar';
import ErrorMessage from './ErrorMessage';

class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      userId: '',
      email: '',
      password: '',
      formErrors: {
        email: '',
        password: ''
      },
      emailValid: false,
      passwordValid: false,
      allValid: false,
      credentialValidation: {
        emailMatch: true,
        passwordMatch: true
      },
      isLoggedIn: '',
      forgotPassword: false
    };
  }

  componentDidMount = () => {
    this.setState({
      email: this.props.email,
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

  validateFields = (fieldName, value) => {
    const { formErrors } = this.state;
    let { emailValid } = this.state;
    let { passwordValid } = this.state;

    switch (fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        formErrors.email = emailValid ? '' : 'Please use a valid email address.';
        break;
      case 'password':
        passwordValid = value.length >= 7;
        formErrors.password = passwordValid ? '' : 'Minimum seven characters.';
        break;
      default:
        break;
    }

    this.setState(
      {
        formErrors,
        emailValid,
        passwordValid
      },
      this.validateAll
    );
  };

  validateAll = () => {
    this.setState({
      allValid: this.state.emailValid && this.state.passwordValid
    });
  };

  forgotPassword = () => {
    this.props.resetPassword();
  };

  onSubmit = async event => {
    event.preventDefault();
    const { state } = this;
    const creds = { email: state.email, password: state.password };

    axios
      .post(process.env.api_key + `/api/users/login`, {
        ...creds
      })
      .then(response => {
        if (response.data.passwordMatch === false) {
          this.setState({
            credentialValidation: {
              passwordMatch: false
            }
          });
        } else if (response.data.emailMatch === false) {
          this.setState({
            credentialValidation: {
              emailMatch: false
            }
          });
        } else {
          this.setState({
            isLoggedIn: true,
            userId: response.data.userId
          });
          this.props.signIn(
            response.data.userName,
            response.data.email,
            response.data.userId,
            true
          );
          const user = {
            userFullName: response.data.userFullName,
            userName: response.data.userName,
            email: response.data.email,
            userId: response.data.userId
          };
          this.props.updateUser(user);
          if (window.location.pathname !== ('/login' || '/signup')) {
            this.props.updateAction('');
          }
        }
      });
  };

  render() {
    let errorBar;
    if (this.state.credentialValidation.emailMatch === false) {
      errorBar = (
        <ErrorMessageBar message={'Sorry! There is no MealDig user with that email address.'} />
      );
    } else if (this.state.credentialValidation.passwordMatch === false) {
      errorBar = <ErrorMessageBar message={'The email and password combination is incorrect.'} />;
    }

    return (
      <React.Fragment>
        {errorBar}
        <Form className="form">
          <div className="login-form">
            <h3>Log In</h3>
            <div className="form-input-label">
              <span>Email</span>
            </div>
            <input
              name="email"
              onChange={this.updateState}
              value={this.state.email || ''}
              type="text"
              placeholder="Enter your email"
            />
            <ErrorMessage message={this.state.formErrors.email} state={this.state} />
            <div className="form-input-label">
              <span>Password</span>
              <span className="forgot-password" onClick={this.forgotPassword}>
                Forgot Password?
              </span>
            </div>

            <input
              name="password"
              onChange={this.updateState}
              value={this.state.password || ''}
              type="password"
              placeholder="Enter your password"
            />
            <ErrorMessage message={this.state.formErrors.password} state={this.state} />
            <input name="submit" onClick={this.onSubmit} type="submit" value="Log In" />
            <span className="sign-up-now">
              Don't have an account?
              <a href="/signup"> Sign up now.</a>
            </span>
          </div>
        </Form>
      </React.Fragment>
    );
  }
}

export default LoginForm;
