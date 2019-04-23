import * as constants from '../constants';
import * as types from '../actions/types';

const userReducer = (state = constants.userState, action) => {
  switch (action.type) {
    case types.USER_UPDATE:
      return Object.assign({}, action.user);
    case types.EXIT_APP:
      return Object.assign({}, constants.userState);
    case types.CLEAR_PRE_LABEL_DATA:
      return {};
    default:
      return state;
  }
};

export default userReducer;
