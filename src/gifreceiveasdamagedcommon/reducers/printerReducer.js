const printerReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'SET_MAC_ADDRESS':
      return Object.assign({}, state, { macAddress: payload });
    default:
      return state;
  }
};

export default printerReducer;
