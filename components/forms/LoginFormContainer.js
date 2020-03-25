// Utilities
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Components
import LoginForm from './LoginForm';
import ForgotPassword from './ForgotPassword';

class LoginFormContainer extends Component {
  constructor() {
    super();
    this.state = {
      forgotPassword: false,
    };
  }

  forgotPassword = () => {
    this.setState({
      forgotPassword: true,
    });
  };

  render() {
    LoginFormContainer.propTypes = {
      signIn: PropTypes.func,
      updateUser: PropTypes.func,
    };

    const { signIn, updateUser } = this.props;
    const { forgotPassword } = this.state;
    if (forgotPassword === true) {
      return <ForgotPassword />;
    }
    return (
      <LoginForm resetPassword={this.forgotPassword} signIn={signIn} updateUser={updateUser} />
    );
  }
}

export default LoginFormContainer;
