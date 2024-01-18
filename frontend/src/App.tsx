import React from 'react';
import { Routes, Route } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage/WelcomePage';

function App() {
  return (
    <Routes>
      <Route path='/' element={<WelcomePage />} />
    </Routes>
  );
}

export default App;
