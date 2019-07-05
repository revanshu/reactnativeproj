const reducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'PRINTER_CHANGE':
      console.log('reducer, savedprinter');
      return Object.assign({}, state, { printerType: payload });
    default:
      return state;
  }
};

export default reducer;
