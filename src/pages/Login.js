import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userLogin } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      isDisabled: true,
    };
  }

  onChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value,
    }, this.isDisabled);
  };

  isDisabled = () => {
    const { email, password } = this.state;
    const passwordLength = 6;
    if (
      (email.includes('@') && email.includes('.com'))
      && password.length >= passwordLength) {
      this.setState({
        isDisabled: false,
      });
    } else {
      this.setState({
        isDisabled: true,
      });
    }
  };

  onClick = () => {
    const { dispatch, history } = this.props;
    const { email } = this.state;
    history.push('/carteira');
    dispatch(userLogin(email));
  };

  render() {
    const { email, password, isDisabled } = this.state;
    return (
      <div>
        <label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            data-testid="email-input"
            onChange={ this.onChange }
            value={ email }
          />
        </label>
        <label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            data-testid="password-input"
            onChange={ this.onChange }
            value={ password }
          />
        </label>
        <button type="button" disabled={ isDisabled } onClick={ this.onClick }>
          Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps)(Login);
