import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrenciesThunk } from '../redux/actions';

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      describe: '',
      selectedCurrency: 'USD',
      payment: 'Dinheiro',
      category: 'Alimentação',
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrenciesThunk());
  }

  onChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const {
      value, describe, payment, selectedCurrency, category,
    } = this.state;
    const {
      currencies, isLoading,
    } = this.props;
    return (
      <div>
        <label>
          <input
            data-testid="value-input"
            value={ value }
            onChange={ this.onChange }
            name="value"
          />
        </label>
        <label>
          <input
            data-testid="description-input"
            value={ describe }
            onChange={ this.onChange }
            name="describe"
          />
        </label>
        <select
          data-testid="currency-input"
          value={ selectedCurrency }
          onChange={ this.onChange }
          name="selectedCurrency"
        >
          {
            isLoading ? <option>Carregando...</option> : (
              currencies
                .map((currency) => <option key={ currency }>{ currency }</option>)
            )
          }
        </select>
        <select
          data-testid="method-input"
          value={ payment }
          onChange={ this.onChange }
          name="payment"
        >
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>
        <select
          data-testid="tag-input"
          value={ category }
          onChange={ this.onChange }
          name="category"
        >
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </select>
      </div>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(
    PropTypes.string.isRequired,
  ).isRequired,
  isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isLoading: state.wallet.isLoading,
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps)(WalletForm);
