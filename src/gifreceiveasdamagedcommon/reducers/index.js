import { combineReducers } from 'redux';

import userReducer from './userReducer';
import scannedDataReducer from './scannedDataReducer';
import asnDetailReducer from './asnDetailsReducer';
import defaultPrinterReducer from './defaultPrinterReducer';
import savedPrinterReducer from './savedPrinterReducer';
import printerReducer from './printerReducer';

const reducers = combineReducers({
  asnDetail: asnDetailReducer,
  defaultPrinter: defaultPrinterReducer,
  savedPrinter: savedPrinterReducer,
});

const moduleCombinedReducer = combineReducers({
  receiveasdamaged: reducers,
  user: userReducer,
  scannedData: scannedDataReducer,
  printer: printerReducer,
});

export default moduleCombinedReducer;
