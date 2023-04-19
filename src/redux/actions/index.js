import { fetchCurrency } from '../../services/currenciesAPI';

// Coloque aqui suas actions
export const USER_LOGIN = 'USER_LOGIN';
export const FETCH_CURRENCIES_REQUEST = 'FETCH_CURRENCIES_REQUEST';
export const FETCH_CURRENCIES_SUCCSESS = 'FETCH_CURRENCIES_SUCCSESS';
export const FETCH_CURRENCIES_FAILURE = 'FETCH_CURRENCIES_FAILURE';
export const FETCH_EXCHANGE_RATES_SUCCSESS = 'FETCH_EXCHANGE_RATES_SUCCSESS';
export const EXPENSES_ADD_INFO = 'EXPENSES_ADD_INFO';
export const SUMMATION = 'SUMMATION';
export const ATT_EXPENSES = 'ATT_EXPENSES';
export const REMOVE_EXPENSE = 'REMOVE_EXPENSES';

export const userLogin = (email) => ({
  type: USER_LOGIN,
  payload: {
    email,
  },
});

export const attExpenses = (expenses) => ({
  type: ATT_EXPENSES,
  payload: {
    expenses,
  },
});

export const removeExpense = (expenses) => ({
  type: REMOVE_EXPENSE,
  payload: {
    expenses,
  },
});

const fetchCurrenciesRequest = () => ({
  type: FETCH_CURRENCIES_REQUEST,
});

const fetchCurrenciesSuccsess = (currencies) => ({
  type: FETCH_CURRENCIES_SUCCSESS,
  payload: {
    currencies: Object.keys(currencies).filter((currency) => currency !== 'USDT'),
  },
});

const fetchCurrenciesFailure = (error) => ({
  type: FETCH_CURRENCIES_REQUEST,
  payload: {
    error,
  },
});

export const fetchCurrenciesThunk = () => async (dispatch) => {
  try {
    dispatch(fetchCurrenciesRequest());
    const currencies = await fetchCurrency();
    dispatch(fetchCurrenciesSuccsess(currencies));
  } catch (error) {
    dispatch(fetchCurrenciesFailure(error));
  }
};

const fetchExchangeRatesSuccsess = (
  currencies,
  { id, value, description, currency, method, tag },
) => ({
  type: FETCH_EXCHANGE_RATES_SUCCSESS,
  payload: {
    id,
    value,
    description,
    currency,
    method,
    tag,
    exchangeRates: currencies,
  },
});

export const fetchExchangeRatesSuccsessThunk = (
  { id, value, description, currency, method, tag },
) => async (dispatch) => {
  try {
    dispatch(fetchCurrenciesRequest());
    const currencies = await fetchCurrency();
    dispatch(fetchExchangeRatesSuccsess(
      currencies,
      { id,
        value,
        description,
        currency,
        method,
        tag },
    ));
  } catch (error) {
    dispatch(fetchCurrenciesFailure(error));
  }
};
