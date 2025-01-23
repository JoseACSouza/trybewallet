/* eslint-disable react/jsx-max-depth */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeExpense } from '../redux/actions';

class Table extends Component {
  deleteClick = (id) => {
    const { dispatch, expenses } = this.props;
    dispatch(removeExpense(expenses.filter((expense) => expense.id !== id)));
  };

  render() {
    const { expenses } = this.props;
    return (
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-cyan-600 font-bold">
            <tr>
              <th scope="col" className="px-6 py-3">
                Descrição
              </th>
              <th scope="col" className="px-6 py-3">
                Tag
              </th>
              <th scope="col" className="px-6 py-3">
                Método de pagamento
              </th>
              <th scope="col" className="px-6 py-3">
                Valor
              </th>
              <th scope="col" className="px-6 py-3">
                Moeda
              </th>
              <th scope="col" className="px-6 py-3">
                Câmbio utilizado
              </th>
              <th scope="col" className="px-6 py-3">
                Valor convertido
              </th>
              <th scope="col" className="px-6 py-3">
                Moeda de conversão
              </th>
              <th scope="col" className="px-6 py-3">
                Editar/Excluir
              </th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={ expense.id } className="bg-white border-b">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  {expense.description}
                </th>
                <td className="px-6 py-4">{expense.tag}</td>
                <td className="px-6 py-4">{expense.method}</td>
                <td className="px-6 py-4">{parseFloat(expense.value).toFixed(2)}</td>
                <td
                  className="px-6 py-4"
                >
                  {expense.exchangeRates[expense.currency].name}
                </td>
                <td className="px-6 py-4">
                  {parseFloat(expense.exchangeRates[expense.currency].ask).toFixed(2)}
                </td>
                <td className="px-6 py-4">
                  {((expense.exchangeRates[expense.currency].ask * expense.value)
                    .toFixed(2))}
                </td>
                <td className="px-6 py-4">Real</td>
                <td className="px-6 py-4">
                  <button
                    type="button"
                    data-testid="delete-btn"
                    className="p-1 text-sm bg-red-500 text-gray-800 rounded-lg"
                    onClick={ () => this.deleteClick(expense.id) }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(
    PropTypes.shape(
      PropTypes.string.isRequired,
    ).isRequired,
  ).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
