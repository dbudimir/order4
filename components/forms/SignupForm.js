import React, { Component } from 'react';
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
        confirmPassword: ''
      },
      userNameValid: false,
      emailValid: false,
      passwordValid: false,
      confirmPasswordValid: false,
      allValid: false
    };
  }

  componentDidMount = () => {
    this.setState({
      userFullName: '',
      userName: this.props.userName,
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

  onSubmit = async event => {
    event.preventDefault();
    const { state } = this;
    console.log(this.state);
    axios
      .post('https://qsr-order-api.herokuapp.com/api/users/signup/', {
        ...state
      })
      // .post('http://localhost:8040/api/users/signup', {
      //   ...state
      // })
      .then(response => {
        this.setState({
          isLoggedIn: true,
          userId: response.data._id
        });
        this.props.signIn(response.data.userName, response.data.email, response.data._id, true);
        const user = {
          userFullName: response.data.userFullName,
          userName: response.data.userName,
          email: response.data.email,
          userId: response.data._id
        };
        this.props.updateUser(user);
        if (window.location.pathname !== ('/login' || '/signup')) {
          this.props.updateAction('');
        }
      });
  };

  validateFields(fieldName, value) {
    const { formErrors } = this.state;
    let { userNameValid } = this.state;
    let { emailValid } = this.state;
    let { passwordValid } = this.state;
    let { confirmPasswordValid } = this.state;

    switch (fieldName) {
      case 'userName':
        userNameValid = value.length >= 1;
        formErrors.userName = userNameValid ? '' : 'Please enter a valid user name';
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
        confirmPasswordValid = this.state.password === this.state.passwordConfirm;
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
        confirmPasswordValid
      },
      this.validateAll
    );
  }

  validateAll() {
    this.setState({
      allValid:
        this.state.emailValid &&
        this.state.passwordValid &&
        this.state.confirmPasswordValid &&
        this.state.userNameValid
    });
  }

  render() {
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
              value={this.state.userFullName || ''}
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
              value={this.state.userName || ''}
              type="text"
              placeholder="Enter a username"
            />
            <ErrorMessage message={this.state.formErrors.userName} state={this.state} />
            <div className="form-input-label">
              <span>Email</span>
            </div>
            <input
              name="email"
              onChange={this.updateState}
              value={this.state.email || ''}
              type="text"
              placeholder="Email"
            />
            <ErrorMessage message={this.state.formErrors.email} state={this.state} />
            <div className="form-input-label">
              <span>Create Password</span>
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
              <span>Confirm Password</span>
            </div>
            <input
              name="passwordConfirm"
              onChange={this.updateState}
              value={this.state.passwordConfirm || ''}
              type="password"
              placeholder="Re-enter password"
            />
            <ErrorMessage message={this.state.formErrors.confirmPassword} state={this.state} />
            <input name="submit" onClick={this.onSubmit} type="submit" value="Sign Up" />
          </form>
        </div>
      </Form>
    );
  }
}

export default SignupForm;
