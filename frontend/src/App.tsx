import React from 'react';
import { Routes, Route } from 'react-router-dom';
import WelcomePage from './containers/WelcomePage/WelcomePage';
import TeaserStudent from './containers/TeaserPage/TeaserStudent';
import TeaserProvider from './containers/TeaserPage/TeaserProvider';
import PrivacyConsentPage from './containers/PrivacyConsentPage/PrivacyConsentPage';
import TermsAndConditionsPage from './containers/TermsAndConditionsPage/TermsAndConditionsPage';
import PageNotFoundPage from './containers/PageNotFoundPage/PageNotFoundPage';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import { SearchResultsPage } from './containers/SearchResultsPage/SearchResultsPage';
import ThankYouPage from './containers/ThankYouPage/ThankYouPage';

const StudentRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<TeaserStudent />} />
    <Route path="survey" element={<SurveyPage user_type="student" />} />
    <Route path="*" element={<PageNotFoundPage />} />
  </Routes>
);

const ProviderRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<TeaserProvider />} />
    <Route path="survey" element={<SurveyPage user_type="provider" />} />
    <Route path="*" element={<PageNotFoundPage />} />
  </Routes>
);

const App: React.FC = () => {
  return (
    <div className="App">
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/student/*" element={<StudentRoutes />} />
        <Route path="/provider/*" element={<ProviderRoutes />} />
        <Route path="/scholarships" element={<SearchResultsPage isASection={false} />} />
        <Route path="/privacy-consent" element={<PrivacyConsentPage />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditionsPage />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
        <Route path="*" element={<PageNotFoundPage />} />
      </Routes>
    </div>
  );
};

export default App;