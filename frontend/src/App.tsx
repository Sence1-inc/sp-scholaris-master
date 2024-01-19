import React from 'react';
import { Routes, Route } from 'react-router-dom';
import WelcomePage from './containers/WelcomePage/WelcomePage';
import TeaserStudent from './containers/TeaserPage/TeaserStudent';
import TeaserProvider from './containers/TeaserPage/TeaserProvider';


function App() {
  return (
    <Routes>
      <Route path='/' element={<WelcomePage />} />
      <Route path='/student' element={<TeaserStudent />} />
      <Route path='/provider' element={<TeaserProvider />} />
    </Routes>
  );
}

export default App;
