import React from "react";
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.tsx';
import Forecast from './pages/Forecast.tsx';
import NotFound from './pages/NotFound.tsx';
import Header from './components/Header';

const App: React.FC = () => {
  return(
    <div className="min-h-screen bg-blue-100">
      <Header />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/forecast" element={<Forecast/>}/>
        <Route path="*" element={<NotFound/>}/>

      </Routes>

    </div>

  );
};

export default App;