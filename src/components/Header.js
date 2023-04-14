import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, summ } = this.props;
    return (
      <div>
        <p data-testid="email-field">{ email }</p>
        <p data-testid="total-field">{ summ }</p>
        <p data-testid="header-currency-field">BRL</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  summ: state.wallet.summ,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  summ: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
