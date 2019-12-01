import React, { Component } from 'react';
import axios from 'axios';

import Form from '../styles/Form';

import ErrorMessage from './ErrorMessage';

class ForgotPassword extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      formErrors: {
        email: ''
      },
      emailValid: false,
      allValid: false,
      isLoggedIn: ''
    };
  }

  componentDidMount = () => {
    this.setState({
      email: this.props.email,
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

    switch (fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        formErrors.email = emailValid ? '' : 'Please use a valid email address.';
        break;
      default:
        break;
    }

    this.setState(
      {
        formErrors,
        emailValid
      },
      this.validateAll
    );
  };

  validateAll = () => {
    this.setState({
      allValid: this.state.emailValid
    });
  };

  onSubmit = async event => {
    event.preventDefault();
    axios
      //  .get(`https://qsr-order-api.herokuapp.com/api/email/${this.state.email}`);
      .get(`http://localhost:8040/api/email/${this.state.email}`)
      .then(response => {
        console.log(response);
      });
    //  axios
    //    // .post('https://qsr-order-api.herokuapp.com/api/email/send/', {
    //    //   ...state
    //    // })
    //    .post('http://localhost:8040/api/email/send', {
    //      ...state
    //    })
    //    .then(response => {
    //      console.log(response);
    //      this.props.signIn(response.data.userName, response.data.email, response.data.userId, true);
    //      const user = {
    //        userFullName: response.data.userFullName,
    //        userName: response.data.userName,
    //        email: response.data.email,
    //        userId: response.data.userId
    //      };
    //      this.props.updateUser(user);
    //      if (window.location.pathname !== ('/login' || '/signup')) {
    //        this.props.updateAction('');
    //      }
    //    });
  };

  render() {
    return (
      <Form className="form">
        <div className="login-form">
          <h3>Recover Password</h3>
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

          <input name="submit" onClick={this.onSubmit} type="submit" value="Get Recovery Link" />
          <span className="sign-up-now">
            Don't have an account?
            <a href="/signup"> Sign up now.</a>
          </span>
        </div>
      </Form>
    );
  }
}

export default ForgotPassword;
