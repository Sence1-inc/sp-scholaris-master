import React from 'react';
import { Routes, Route } from 'react-router-dom';
import WelcomePage from './containers/WelcomePage/WelcomePage';
import TeaserStudent from './containers/TeaserPage/TeaserStudent';
import TeaserProvider from './containers/TeaserPage/TeaserProvider';
import PrivacyConsentPage from './containers/PrivacyConsentPage/PrivacyConsentPage';
import TermsAndConditionsPage from './containers/TermsAndConditionsPage/TermsAndConditionsPage';
import PageNotFoundPage from './containers/PageNotFoundPage/PageNotFoundPage';


function App() {
  return (
    <Routes>
      <Route path='/' element={<WelcomePage />} />
      <Route path='/student' element={<TeaserStudent />} />
      <Route path='/provider' element={<TeaserProvider />} />
      <Route path="/privacy-consent" element={<PrivacyConsentPage />} />
      <Route path="/terms-and-conditions" element={<TermsAndConditionsPage />} />
      <Route path="*" element={<PageNotFoundPage />} />
    </Routes>
  );
}

export default App;
