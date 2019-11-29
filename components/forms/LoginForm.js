import React, { Component } from 'react';
import Link from 'next/link';
import axios from 'axios';

import Form from '../styles/Form';

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
      isLoggedIn: ''
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

  onSubmit = async event => {
    event.preventDefault();
    const { state } = this;
    axios
      .post('https://qsr-order-api.herokuapp.com/api/users/login/', {
        ...state
      })
      // .post('http://localhost:8040/api/users/login/', {
      //    ...state,
      // })
      .then(response => {
        localStorage.token = response.data.token;
        this.setState({
          isLoggedIn: true,
          userId: response.data.userId
        });
        this.props.signIn(response.data.userName, this.state.email, response.data.userId, true);
        const user = {
          userFullName: response.data.userFullName,
          userName: response.data.userName,
          email: this.state.email,
          userId: response.data.userId
        };
        this.props.updateUser(user);
        this.props.updateAction('');
      });
  };

  render() {
    return (
      <div className="form">
        <Form className="login-form">
          <h3>Log In</h3>
          <input
            name="email"
            onChange={this.updateState}
            value={this.state.email}
            type="text"
            placeholder="Enter your email"
          />
          <ErrorMessage message={this.state.formErrors.email} state={this.state} />
          <input
            name="password"
            onChange={this.updateState}
            value={this.state.password}
            type="password"
            placeholder="Enter your password"
          />
          <ErrorMessage message={this.state.formErrors.password} state={this.state} />
          <input name="submit" onClick={this.onSubmit} type="submit" value="Log In" />
          <span className="sign-up-now">
            Don't have an account?{' '}
            <Link to="/signup">
              <a href="/signup">Sign up now.</a>
            </Link>
          </span>
        </Form>
      </div>
    );
  }
}

export default LoginForm;
