// store.js
import { createStore } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Action types
export const SET_RESPONSE_DATA = 'SET_RESPONSE_DATA';
export const CLEAR_RESPONSE_DATA = 'CLEAR_RESPONSE_DATA';

// Initial state
const initialState = {
  responseData: null,
};

// Reducer function
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_RESPONSE_DATA:
      return { ...state, responseData: action.payload };
    case CLEAR_RESPONSE_DATA:
      return { ...state, responseData: null };
    default:
      return state;
  }
};

// Actions
export const setResponseData = (data) => ({
  type: SET_RESPONSE_DATA,
  payload: data,
});

export const clearResponseData = () => ({
  type: CLEAR_RESPONSE_DATA,
});

// Initialize store
const store = createStore(reducer);

// Retrieve user data from AsyncStorage on app launch
const initializeApp = async () => {
  try {
    const userData = await AsyncStorage.getItem('userData');
    if (userData) {
      const parsedData = JSON.parse(userData);
      store.dispatch(setResponseData(parsedData));
    }
  } catch (error) {
    console.error('Error initializing app:', error);
  }
};

initializeApp();

export default store;
