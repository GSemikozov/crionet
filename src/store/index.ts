import { configureStore } from '@reduxjs/toolkit';
import countriesReducer from './slices/countriesSlice';
import weatherReducer from './slices/weatherSlice';

export const store = configureStore({
  reducer: {
    countries: countriesReducer,
    weather: weatherReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
