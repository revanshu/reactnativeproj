import { combineReducers } from 'redux';

import userReducer from './userReducer';
import scannedDataReducer from './scannedDataReducer';

const reducers = (state = {}) => state;

const moduleCombinedReducer = combineReducers({
  module: reducers,
  user: userReducer,
  scannedData: scannedDataReducer,
});

export default moduleCombinedReducer;
