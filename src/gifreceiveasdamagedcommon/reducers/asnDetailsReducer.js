import asnDetailModel from '../models/asnDetailModel';

const reducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'GET_ASN_SUCCESS':
      return Object.assign({}, state, asnDetailModel(payload));
    default:
      return state;
  }
};

export default reducer;
