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
      existingUser: true,
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

  sendRecoveryEmail = state => {
    axios
      .post(process.env.api_key + `/api/email/send`, {
        ...state
      })
      .then(response => {
        console.log(response);
      });
  };

  onSubmit = async event => {
    event.preventDefault();
    const { state } = this;
    axios.post(process.env.api_key + `/api/email/`, { ...state }).then(response => {
      if (!response.data.message) {
        response.data.location = process.env.api_key;

        this.sendRecoveryEmail(response);
      } else {
        this.setState({
          existingUser: false
        });
      }
    });
  };

  render() {
    let errorBar;
    switch (this.state.existingUser) {
      case true:
        errorBar = '';
        break;
      case false:
        errorBar = (
          <ErrorBar>
            <span>Sorry! There is no MealDig user with that email address. </span>
          </ErrorBar>
        );
        break;
      default:
        break;
    }
    return (
      <React.Fragment>
        {errorBar}
        <Form className="form">
          <div className="forgot-password-form">
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
      </React.Fragment>
    );
  }
}

export default ForgotPassword;
