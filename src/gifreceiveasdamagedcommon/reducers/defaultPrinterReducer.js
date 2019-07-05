const reducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'GET_DEFAULT_PRINTER_SUCCESS':
      return Object.assign({}, state, payload);
    case 'TEST_CHANGE_NAME':
      console.log('reducer, changename');
      return Object.assign({}, state, { name: 'TEST' });
    default:
      return state;
  }
};

export default reducer;
