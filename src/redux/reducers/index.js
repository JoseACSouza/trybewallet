import { combineReducers } from 'redux';
import userReduce from './user';
import walletReduce from './wallet';

// Configure os seus reducers.
// ATENÇÃO: você obrigatoriamente tem que utilizar as chaves "user" e "wallet" no seu estado global

const rootReducer = combineReducers({
  user: userReduce,
  wallet: walletReduce,
});

export default rootReducer;