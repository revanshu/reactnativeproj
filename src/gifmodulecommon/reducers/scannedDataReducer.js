import * as types from '../actions/types';
/**
 * {
 *  'scannedData':{
 *       value: '1212',
 *       page: 'LANDING_SCREEN'
 *    }
 * }
 */

const initialState = {
  value: null,
};

const scannedDataReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.ADD_SCANNED_DATA:
      return {
        value: payload,
      };
    case types.CLEAR_PRE_LABEL_DATA:
      return {};
    default:
      return state;
  }
};

export default scannedDataReducer;
