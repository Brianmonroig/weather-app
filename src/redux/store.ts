import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from './weatherSlice';

const store = configureStore({
  reducer: {
    weather: weatherReducer, // Añadir el weatherReducer aquí
  },
});

export default store;

// Este tipo representa el estado completo del store de Redux
export type RootState = ReturnType<typeof store.getState>;
