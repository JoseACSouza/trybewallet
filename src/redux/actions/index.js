import { fetchCurrency } from '../../services/currenciesAPI';

// Coloque aqui suas actions
export const USER_LOGIN = 'USER_LOGIN';
export const FETCH_CURRENCIES_REQUEST = 'FETCH_CURRENCIES_REQUEST';
export const FETCH_CURRENCIES_SUCCSESS = 'FETCH_CURRENCIES_SUCCSESS';
export const FETCH_CURRENCIES_FAILURE = 'FETCH_CURRENCIES_FAILURE';

export const userLogin = (email) => ({
  type: USER_LOGIN,
  payload: {
    email,
  },
});

const fetchCurrenciesRequest = () => ({
  type: FETCH_CURRENCIES_REQUEST,
});

const fetchCurrenciesSuccsess = (currencies) => ({
  type: FETCH_CURRENCIES_SUCCSESS,
  payload: {
    currencies,
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
