import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import { getCapitalWeather } from '@/api/weather';
import { Country } from '@/types';

interface WeatherData {
  temperature: number;
  description: string;
  icon: string;
}

interface WeatherState {
  data: WeatherData | null;
  isLoading: boolean;
  error: string | null;
  currentCapital: string | null;
}

const initialState: WeatherState = {
  data: null,
  isLoading: false,
  error: null,
  currentCapital: null,
};

export const fetchWeatherByCapital = createAsyncThunk(
  'weather/fetchByCapital',
  async (capital: Country['capital']) => {
    const weatherData = await getCapitalWeather(capital);
    return weatherData;
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    clearWeather: (state) => {
      state.data = null;
      state.error = null;
      state.currentCapital = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherByCapital.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
        state.currentCapital = action.meta.arg || '';
      })
      .addCase(fetchWeatherByCapital.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchWeatherByCapital.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch weather data';
      });
  },
});

// Selectors
const selectWeatherState = (state: { weather: WeatherState }) => state.weather;

export const selectWeatherData = createSelector(
  [selectWeatherState],
  (weather) => weather.data
);

export const selectWeatherLoading = createSelector(
  [selectWeatherState],
  (weather) => weather.isLoading
);

export const selectWeatherError = createSelector(
  [selectWeatherState],
  (weather) => weather.error
);

export const selectCurrentCapital = createSelector(
  [selectWeatherState],
  (weather) => weather.currentCapital
);

export const { clearWeather } = weatherSlice.actions;

export default weatherSlice.reducer;
