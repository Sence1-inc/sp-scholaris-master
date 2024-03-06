import { Box } from '@mui/material'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Disclaimer from './components/Disclaimer/Disclaimer'
import Footer from './components/Footer/Footer'
import Navbar from './components/Navigation/Navbar'
import ScrollToTop from './components/ScrollToTop/ScrollToTop'
import PageNotFoundPage from './containers/PageNotFoundPage/PageNotFoundPage'
import PrivacyConsentPage from './containers/PrivacyConsentPage/PrivacyConsentPage'
import { ScholarshipDetailsPage } from './containers/ScholarshipDetailsPage/ScholarshipDetailsPage'
import { SearchResultsPage } from './containers/SearchResultsPage/SearchResultsPage'
import SurveyPage from './containers/SurveyPage/SurveyPage'
import TeaserProvider from './containers/TeaserPage/TeaserProvider'
import TeaserStudent from './containers/TeaserPage/TeaserStudent'
import TermsAndConditionsPage from './containers/TermsAndConditionsPage/TermsAndConditionsPage'
import ThankYouPage from './containers/ThankYouPage/ThankYouPage'
import WelcomePage from './containers/WelcomePage/WelcomePage'
import SignInPage from './containers/SignInPage/SignInPage'

const StudentRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<TeaserStudent />} />
    <Route path="survey" element={<SurveyPage user_type="student" />} />
    <Route path="*" element={<PageNotFoundPage />} />
  </Routes>
)

const ProviderRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<TeaserProvider />} />
    <Route path="survey" element={<SurveyPage user_type="provider" />} />
    <Route path="*" element={<PageNotFoundPage />} />
  </Routes>
)

const App: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        position: 'relative',
      }}
    >
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/student/*" element={<StudentRoutes />} />
        <Route path="/provider/*" element={<ProviderRoutes />} />
        <Route
          path="/scholarships"
          element={<SearchResultsPage isASection={false} />}
        />
        <Route path="/privacy-consent" element={<PrivacyConsentPage />} />
        <Route
          path="/terms-and-conditions"
          element={<TermsAndConditionsPage />}
        />
        <Route path="/thank-you" element={<ThankYouPage />} />
        <Route path='/sign-in' element={<SignInPage/>}/>
        <Route path="*" element={<PageNotFoundPage />} />
      </Routes>
    </Box>
  )
}

export default App
