import axios from 'axios';
import * as types from './types';

const getASN = () => async (dispatch, getState) => {
  try {
    const result = await getASNService();
    dispatch({
      type: 'GET_ASN_SUCCESS',
      payload: result,
    });
  } catch (e) {
    console.log('error', e);
  }
};

const getASNService = async () => {
  const result = await axios.get('http://localhost:8080/getASN');
  return result.data.order;
};

export default getASN;
