// store.js
import { createStore } from 'redux';

// Initial state
const initialState = {
  responseData: null,
};

// Reducer function
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_RESPONSE_DATA':
      return { ...state, responseData: action.payload };
    default:
      return state;
  }
};

// Create Redux store
const store = createStore(reducer);

export default store;
