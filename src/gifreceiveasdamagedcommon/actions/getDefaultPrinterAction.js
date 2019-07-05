import axios from 'axios';
import * as types from './types';

const getDefaultPrinter = () => async (dispatch, getState) => {
  try {
    const result = await getDefaultPrinterService();
    dispatch({
      type: 'GET_DEFAULT_PRINTER_SUCCESS',
      payload: result,
    });
  } catch (e) {
    console.log('error', e);
  }
};

const changeNameTest = () => {
  console.log('action creator, change name');
  return {
    type: 'TEST_CHANGE_NAME',
  };
};

const getDefaultPrinterService = async () => {
  const result = await axios.get('http://localhost:8080/getDefaultPrinter');
  return result.data.defaultPrinter;
};

export { getDefaultPrinter, changeNameTest };
