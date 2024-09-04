import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-blue-600 text-white p-4">
      <nav className="container mx-auto flex justify-between">
        <Link to="/" className="text-xl font-bold">
          Weather App
        </Link>
        <Link to="/forecast" className="text-lg">
          Forecast
        </Link>
      </nav>
    </header>
  );
};

export default Header;
