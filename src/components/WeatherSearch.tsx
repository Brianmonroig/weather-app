import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeather, fetchForecast } from '../redux/weatherSlice';
import { RootState } from '../redux/store';
import { FaSearchLocation } from 'react-icons/fa';  // Importing the search icon
import { useNavigate } from 'react-router-dom';  // Importing useHistory for navigation

const WeatherSearch: React.FC = () => {
  const [city, setCity] = useState('');
  const dispatch = useDispatch();
  const weather = useSelector((state: RootState) => state.weather);
  const history = useNavigate();

  const handleSearch = async () => {
    if (city.trim() === '') {
      alert('Please enter a city name.');
      return;
    }
    await dispatch(fetchWeather(city));
    await dispatch(fetchForecast(city));
    history.push('/forecast');  // Navigate to the forecast page after searching
  };

  return (
    <div className="p-4">
      {/* Search Bar */}
      <div className="flex justify-center items-center">
        <div className="relative w-full md:w-1/2">
          <FaSearchLocation className="absolute left-3 top-2.5 text-blue-600" size={20} />
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city"
            className="border pl-10 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <button
          onClick={handleSearch}
          className="ml-2 p-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Search
        </button>
      </div>

      {/* Show loading, error, or weather data based on state */}
      {weather.loading && <p className="text-center mt-4">Loading...</p>}
      {weather.error && <p className="text-center mt-4 text-red-600">{weather.error}</p>}

      {/* Display the current weather */}
      {weather.data && (
        <div className="mt-8 text-center">
          <h2 className="text-2xl font-bold text-indigo-700">{weather.data.name}, {weather.data.sys.country}</h2>
          <p className="text-lg text-blue-700 capitalize flex items-center justify-center mt-2">
            <FaSearchLocation className="text-yellow-500 mr-2" size={24} />
            {weather.data.weather[0].description}
          </p>
          <div className="mt-4">
            <p className="text-3xl font-bold text-yellow-500">Temperature: {weather.data.main.temp}°C</p>
            <p className="text-xl text-blue-700">Feels Like: {weather.data.main.feels_like}°C</p>
            <p className="text-xl text-blue-700">Humidity: {weather.data.main.humidity}%</p>
            <p className="text-xl text-blue-700">Wind Speed: {weather.data.wind.speed} m/s</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherSearch;
