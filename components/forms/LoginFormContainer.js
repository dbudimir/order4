import React, { Component } from 'react';

import LoginForm from './LoginForm';
import ForgotPassword from './ForgotPassword';

class LoginFormContainer extends Component {
  constructor() {
    super();
    this.state = {
      forgotPassword: false
    };
  }

  forgotPassword = () => {
    this.setState({
      forgotPassword: true
    });
  };

  render() {
    if (this.state.forgotPassword === true) {
      return <ForgotPassword />;
    }
    return (
      <LoginForm
        resetPassword={this.forgotPassword}
        signIn={this.props.signIn}
        updateUser={this.props.updateUser}
      />
    );
  }
}

export default LoginFormContainer;