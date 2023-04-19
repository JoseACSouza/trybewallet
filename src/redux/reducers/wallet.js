import {
  FETCH_CURRENCIES_FAILURE,
  FETCH_CURRENCIES_REQUEST,
  FETCH_CURRENCIES_SUCCSESS,
  FETCH_EXCHANGE_RATES_SUCCSESS,
  ATT_EXPENSES,
  REMOVE_EXPENSE,
} from '../actions';
// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
  isLoading: false,
  error: '',
};

const walletReduce = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FETCH_CURRENCIES_REQUEST: {
    return {
      ...state,
      isLoading: true,
    };
  }
  case FETCH_CURRENCIES_SUCCSESS: {
    return {
      ...state,
      isLoading: false,
      currencies: action.payload.currencies,
    };
  }
  case FETCH_CURRENCIES_FAILURE: {
    return {
      ...state,
      isLoading: false,
      error: action.payload.error,
    };
  }
  case FETCH_EXCHANGE_RATES_SUCCSESS: {
    return {
      ...state,
      isLoading: false,
      expenses: [...state.expenses, {
        id: action.payload.id,
        value: action.payload.value,
        description: action.payload.description,
        currency: action.payload.currency,
        method: action.payload.method,
        tag: action.payload.tag,
        exchangeRates: action.payload.exchangeRates,
      }],
    }; }
  case REMOVE_EXPENSE: {
    return {
      ...state,
      expenses: [...action.payload.expenses],
    };
  }
  case ATT_EXPENSES: {
    return {
      ...state,
      expenses: [...state.expenses, action.payload.expenses],
    };
  }
  default: return state;
  }
};

export default walletReduce;
