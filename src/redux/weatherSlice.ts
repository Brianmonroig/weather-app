import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the shape of the weather state
interface WeatherState {
  city: string | null;    // Holds the city name
  data: any | null;       // Holds the current weather data
  forecast: any[] | null; // Holds the 5-day forecast data
  loading: boolean;       // Tracks whether data is being loaded
  error: string | null;   // Holds any error messages
}

// Initial state for the weather slice
const initialState: WeatherState = {
  city: null,
  data: null,
  forecast: null,
  loading: false,
  error: null,
};

// Async thunk for fetching the current weather data
export const fetchWeather = createAsyncThunk(
  'weather/fetchWeather',
  async (city: string) => {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9d244d87ea47549e002a28125b280ce7&units=metric`
      );    
    return { city, data: response.data };  // Return the weather data with city name
  }
);

// Async thunk for fetching the 5-day weather forecast
export const fetchForecast = createAsyncThunk(
  'weather/fetchForecast',
  async (city: string) => {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=9d244d87ea47549e002a28125b280ce7&units=metric`
    );
    return { city, list: response.data.list };  // Return the forecast data with city name
  }
);

// Creating the weather slice
const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.city = action.payload.city;  // Store the city name
        state.data = action.payload.data;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch weather data';
      })
      .addCase(fetchForecast.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchForecast.fulfilled, (state, action) => {
        state.loading = false;
        state.city = action.payload.city;  // Ensure the city name is also stored here
        state.forecast = action.payload.list;
      })
      .addCase(fetchForecast.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch forecast data';
      });
  },
});

export default weatherSlice.reducer;
