import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { WiDaySunny, WiCloud, WiRain, WiSnow, WiThunderstorm } from 'react-icons/wi';

const Forecast: React.FC = () => {
  const weather = useSelector((state: RootState) => state.weather);

  // Check if the forecast data and city are available
  if (!weather.forecast || !weather.city) {
    return (
      <div className="text-center p-6">
        <p className="text-red-500 text-lg font-semibold">No forecast available. Please search for a city first.</p>
      </div>
    );
  }

  // Filter the forecast data to get one entry per day
  const dailyForecasts = weather.forecast.filter((forecast, index, self) =>
    index === self.findIndex((f) => new Date(f.dt * 1000).getDate() === new Date(forecast.dt * 1000).getDate())
  );

  // Function to map weather descriptions to icons
  const getWeatherIcon = (description: string) => {
    switch (description) {
      case 'clear sky':
        return <WiDaySunny className="text-yellow-500" size={36} />;
      case 'few clouds':
      case 'scattered clouds':
      case 'broken clouds':
        return <WiCloud className="text-gray-500" size={36} />;
      case 'rain':
      case 'shower rain':
        return <WiRain className="text-blue-500" size={36} />;
      case 'snow':
        return <WiSnow className="text-blue-300" size={36} />;
      case 'thunderstorm':
        return <WiThunderstorm className="text-yellow-700" size={36} />;
      default:
        return <WiCloud className="text-gray-500" size={36} />;
    }
  };

  return (
    <div className="text-center p-6">
      <h2 className="text-3xl font-bold mb-6 text-indigo-800">5-Day Weather Forecast for {weather.city}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dailyForecasts.map((forecast, index) => (
          <div key={index} className="p-6 bg-blue-50 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-center">
            <p className="text-lg font-semibold text-indigo-700">{new Date(forecast.dt * 1000).toLocaleDateString()}</p>
            <div className="flex items-center justify-center mt-2">
              {getWeatherIcon(forecast.weather[0].description)}
              <p className="text-gray-600 capitalize ml-2">{forecast.weather[0].description}</p>
            </div>
            <p className="text-xl font-bold text-yellow-500 mt-2">Temp: {forecast.main.temp}°C</p>
            <p className="text-blue-700 mt-1">{`Min: ${forecast.main.temp_min}°C / Max: ${forecast.main.temp_max}°C`}</p>
            <p className="text-blue-700 mt-1">{`Humidity: ${forecast.main.humidity}%`}</p>
            <p className="text-blue-700 mt-1">{`Wind: ${forecast.wind.speed} m/s`}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
