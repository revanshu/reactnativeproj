import { combineReducers } from 'redux';

import userReducer from './userReducer';
import scannedDataReducer from './scannedDataReducer';

const reducers = (state = {}, action = {} ) => {
  return state;
}

const moduleCombinedReducer = combineReducers({
  module: reducers,
  user: userReducer,
  scannedData: scannedDataReducer,
});

export default moduleCombinedReducer;