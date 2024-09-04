import React from "react";
import WeatherSearch from '../components/WeatherSearch';
import { WiDaySunny } from 'react-icons/wi';  // Importing weather icon
import { FaSearchLocation } from 'react-icons/fa';  // Importing location search icon

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-400 to-blue-300 p-6">
      <h1 className="text-4xl font-extrabold text-indigo-800 text-center flex items-center space-x-2">
        <WiDaySunny className="text-yellow-500" />  {/* Adding sun icon */}
        <span>Weather App</span>
      </h1>
      <p className="text-lg text-blue-100 text-center mt-4 flex items-center justify-center space-x-2">
        <FaSearchLocation />  {/* Adding search location icon */}
        <span>Search for a city to get the current weather</span>
      </p>
      <div className="mt-8 w-full max-w-md">
        <WeatherSearch />
      </div>
    </div>
  );
};

export default Home;
