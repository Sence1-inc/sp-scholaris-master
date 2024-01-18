import React from 'react';
import { Routes, Route } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage/WelcomePage';
import HomePage from './pages/HomePage';

function App() {
  return (
    <Routes>
      <Route path='/' element={<WelcomePage />} />
      <Route path='/home' element={<HomePage />} />
    </Routes>
  );
}

export default App;
