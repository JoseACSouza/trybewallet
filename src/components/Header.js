import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import dollar from '../imgs/dollarBill.svg';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    console.log(email);
    return (
      <div
        className="flex justify-between p-2 px-4 items-center border-b-4"
      >
        <img alt="Simbolo de dinheiro" src={ dollar } className="w-14 h-14" />
        <div className="flex">
          <p
            data-testid="email-field"
            className="font-bold text-slate-600 mr-14"
          >
            { email }
          </p>
          <p data-testid="total-field" className="font-bold text-slate-600">
            {
              expenses
                .reduce((acc, curr) => acc + (Number(curr
                  .value) * Number(curr.exchangeRates[curr.currency].ask)), 0)
                .toFixed(2)
            }
          </p>
          <p
            data-testid="header-currency-field"
            className="mx-1 font-bold text-slate-600"
          >
            BRL
          </p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(
    PropTypes.shape(PropTypes.string.isRequired).isRequired,
  ).isRequired,
};

export default connect(mapStateToProps)(Header);
