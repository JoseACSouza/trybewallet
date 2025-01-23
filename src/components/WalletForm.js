import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrenciesThunk, fetchExchangeRatesSuccsessThunk } from '../redux/actions';

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
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

  sendButton = () => {
    const { value, description, currency, method, tag } = this.state;
    const { expenses, dispatch } = this.props;
    const id = expenses.length;
    dispatch(fetchExchangeRatesSuccsessThunk({
      id,
      value,
      description,
      currency,
      method,
      tag,
    }));
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  };

  render() {
    const {
      value, description, method, currency, tag,
    } = this.state;
    const {
      currencies, isLoading,
    } = this.props;
    return (
      <div
        className="bg-cyan-800 flex justify-evenly p-4 items-center border-b-4
        shadow-md"
      >
        <label>
          <input
            type="number"
            data-testid="value-input"
            value={ value }
            placeholder="Valor"
            onChange={ this.onChange }
            className="p-1 rounded bg-slate-100"
            name="value"
          />
        </label>
        <label>
          <input
            data-testid="description-input"
            value={ description }
            placeholder="Descrição"
            onChange={ this.onChange }
            className="p-1 rounded bg-slate-100"
            name="description"
          />
        </label>
        <select
          data-testid="currency-input"
          value={ currency }
          onChange={ this.onChange }
          className="p-1 rounded bg-slate-100"
          name="currency"
        >
          {
            isLoading ? <option>Carregando...</option> : (
              currencies
                .map((element) => <option key={ element }>{ element }</option>)
            )
          }
        </select>
        <select
          data-testid="method-input"
          value={ method }
          onChange={ this.onChange }
          className="p-1 rounded bg-slate-100"
          name="method"
        >
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>
        <select
          data-testid="tag-input"
          value={ tag }
          onChange={ this.onChange }
          className="p-1 rounded bg-slate-100"
          name="tag"
        >
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </select>
        <button
          type="button"
          onClick={ this.sendButton }
          className="p-1 bg-blue-500 rounded text-md"
        >
          Adicionar despesa
        </button>
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
  expenses: PropTypes.arrayOf(
    PropTypes.shape(PropTypes.string.isRequired).isRequired,
  ).isRequired,
};

const mapStateToProps = (state) => ({
  isLoading: state.wallet.isLoading,
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(WalletForm);
