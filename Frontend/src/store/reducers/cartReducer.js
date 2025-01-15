const initialState = {
    quantities: {},
  };
  
  const cartReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'INCREMENT_QUANTITY':
        return {
          ...state,
          quantities: {
            ...state.quantities,
            [action.payload]: (state.quantities[action.payload] || 0) + 1,
          },
        };
      case 'DECREMENT_QUANTITY':
        return {
          ...state,
          quantities: {
            ...state.quantities,
            [action.payload]: Math.max((state.quantities[action.payload] || 0) - 1, 0),
          },
        };
      default:
        return state;
    }
  };
  
  export default cartReducer;
  