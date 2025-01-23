/* eslint-disable react/jsx-max-depth */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userLogin } from '../redux/actions';
import logo from '../imgs/logo.png';

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
      <div className="w-screen h-screen flex justify-center items-center">
        <div className="flex-col shadow-2xl border-2 border-slate-200 rounded">
          <form className="max-w-sm m-2 p-2 mb-4">
            <img
              src={ logo }
              alt="trybe-wallet-logo"
            />
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block mb-1 text-sm font-medium text-gray-900"
              >
                Seu email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="exemplo@exemplo.com.br"
                data-testid="email-input"
                onChange={ this.onChange }
                value={ email }
                className="bg-gray-50 border border-gray-300 text-gray-900
                  text-sm rounded-lg focus:ring-blue-500
                  focus:border-blue-500 block w-full p-2.5"
                required
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="password"
                className="block mb-1 text-sm font-medium text-gray-900"
              >
                Sua senha
              </label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Password"
                data-testid="password-input"
                onChange={ this.onChange }
                value={ password }
                className="bg-gray-50 border border-gray-300 text-gray-900
                  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500
                  block w-full p-2.5"
                required
              />
            </div>
            <button
              type="button"
              disabled={ isDisabled }
              onClick={ this.onClick }
              className="text-white bg-green-trybe hover:bg-green-600
                focus:ring-4 focus:outline-none focus:ring-green-300
                w-full font-medium rounded-lg text-sm px-5 py-2.5 text-center
                block disabled:bg-gray-300"
            >
              Entrar
            </button>
          </form>
        </div>
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
