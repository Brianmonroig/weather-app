import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from './weatherSlice';

const store = configureStore({
  reducer: {
    weather: weatherReducer, // Add the weather reducer here
  },
});

export default store;
