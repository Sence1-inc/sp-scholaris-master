import React from 'react';
import { Routes, Route } from 'react-router-dom';
import WelcomePage from './containers/WelcomePage/WelcomePage';
import TeaserStudent from './containers/TeaserPage/TeaserStudent';
import TeaserProvider from './containers/TeaserPage/TeaserProvider';
import PrivacyConsentPage from './containers/PrivacyConsentPage/PrivacyConsentPage';
import TermsAndConditionsPage from './containers/TermsAndConditionsPage/TermsAndConditionsPage';
import PageNotFoundPage from './containers/PageNotFoundPage/PageNotFoundPage';
import SearchResultsPage from './containers/SearchResultsPage/SearchResultsPage';
import ScrollToTop from './ScrollToTop';

function App() {
  return (
      <>
      <ScrollToTop/>
      <Routes>
        <Route path='/' element={<WelcomePage />} />
        <Route path='/student' element={<TeaserStudent />} />
        <Route path='/provider' element={<TeaserProvider />} />
        <Route path='/search-result' element={<SearchResultsPage/>}/>
        <Route path="/privacy-consent" element={<PrivacyConsentPage />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditionsPage />} />
        <Route path="*" element={<PageNotFoundPage />} />
      </Routes>
      </>
  );
}

export default App;
