import * as types from './types';

// const changeSavedPrinter = printerType => ({ type: 'PRINTER_CHANGE', payload: printerType });

const changeSavedPrinter = printerType => (dispatch) => {
  console.log('action creator, savedprinter');
  dispatch({ type: 'PRINTER_CHANGE', payload: printerType });
  // setTimeout(() => {
  //   dispatch({ type: 'TEST_CHANGE_NAME' });
  // }, 0);
};

export default changeSavedPrinter;
