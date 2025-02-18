import { Box } from '@mui/material'
import Cookies from 'js-cookie'
import React, { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Disclaimer from './components/Disclaimer/Disclaimer'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'
import Footer from './components/Footer/Footer'
import Navbar from './components/Navigation/Navbar'
import AdminPrivate from './components/PrivateRoute/AdminPrivateRoute'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'
import ProviderPrivate from './components/PrivateRoute/ProviderPrivateRoute'
import StudentPrivate from './components/PrivateRoute/StudentPrivateRoute'
import ScrollToTop from './components/ScrollToTop/ScrollToTop'
import AccountManagementPage from './containers/AccountManagementPage/AccountManagementPage'
import AddScholarshipViaCSVPage from './containers/AddScholarshipViaCSVPage/AddScholarshipViaCSVPage'
import ApplicationsManagementPage from './containers/ApplicationsManagementPage/ApplicationsManagementPage'
import StudentApplicationsManagementPage from './containers/ApplicationsManagementPage/StudentApplicationsManagementPage'
import ArticleDetailPage from './containers/ArticleDetailPage/ArticleDetailPage'
import ArticleListPage from './containers/ArticleListPage/ArticleListPage'
import ArticleSearchListPage from './containers/ArticleListPage/ArticleSearchListPage'
import BookmarksPage from './containers/BookmarksPage/BookmarksPage'
import PageNotFoundPage from './containers/PageNotFoundPage/PageNotFoundPage'
import PrivacyConsentPage from './containers/PrivacyConsentPage/PrivacyConsentPage'
import ProviderProfile from './containers/ProfilesPage/ProviderProfile/ProviderProfile'
import ProviderDashboardPage from './containers/ProviderDashboardPage/ProviderDashboardPage'
import { ScholarshipDetailsPage } from './containers/ScholarshipDetailsPage/ScholarshipDetailsPage'
import ScholarshipEditorPage from './containers/ScholarshipEditorPage/ScholarshipEditorPage'
import ScholarshipManagement from './containers/ScholarshipManagement/ScholarshipManagement'
import { SearchResultsPage } from './containers/SearchResultsPage/SearchResultsPage'
import SignInPage from './containers/SignInPage/SignInPage'
import SignUpPage from './containers/SignUpPage/SignUpPage'
import StudentDashboardPage from './containers/StudentDashboardPage/StudentDashboardPage'
import SurveyPage from './containers/SurveyPage/SurveyPage'
import TeaserProvider from './containers/TeaserPage/TeaserProvider'
import TeaserStudent from './containers/TeaserPage/TeaserStudent'
import TermsAndConditionsPage from './containers/TermsAndConditionsPage/TermsAndConditionsPage'
import ThankYouPage from './containers/ThankYouPage/ThankYouPage'
import VerifyEmailPage from './containers/VerifyEmailPage/VerifyEmailPage'
import WelcomePage from './containers/WelcomePage/WelcomePage'
import { SnackbarProvider } from './context/SnackBarContext'
import { useAppSelector } from './redux/store'
import { User } from './redux/types'

const StudentRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<TeaserStudent />} />
    <Route path="survey" element={<SurveyPage user_type="student" />} />
    <Route
      path="/applications"
      element={<StudentPrivate component={StudentApplicationsManagementPage} />}
    />
    <Route
      path="/account"
      element={<StudentPrivate component={StudentDashboardPage} />}
    />
    <Route
      path="/bookmarks"
      element={<StudentPrivate component={BookmarksPage} />}
    />
    <Route path="*" element={<PageNotFoundPage />} />
  </Routes>
)

const AdminRoutes: React.FC = () => (
  <Routes>
    <Route
      path="/scholarships"
      element={<AdminPrivate component={ScholarshipManagement} />}
    />
    <Route path="*" element={<PageNotFoundPage />} />
  </Routes>
)

interface ProviderRoutesProps {
  isParent?: boolean
}

const ProviderRoutes: React.FC<ProviderRoutesProps> = ({
  isParent = false,
}) => (
  <Routes>
    <Route
      path="/dashboard"
      element={<ProviderPrivate component={ProviderDashboardPage} />}
    />
    {isParent && (
      <Route
        path="/accounts"
        element={<ProviderPrivate component={AccountManagementPage} />}
      />
    )}
    <Route
      path="/applications"
      element={<ProviderPrivate component={ApplicationsManagementPage} />}
    />
    <Route path="/" element={<TeaserProvider />} />
    <Route path="survey" element={<SurveyPage user_type="provider" />} />
    <Route
      path="account/:id/:lastRoute"
      element={<ProviderPrivate component={ProviderProfile} />}
    />
    <Route path="*" element={<PageNotFoundPage />} />
  </Routes>
)

const App: React.FC = () => {
  const user: User = useAppSelector((state) => state.user)
  const location = useLocation()

  useEffect(() => {
    const excludedPaths = [
      '/scholarships',
      '/student/survey',
      '/provider/survey',
    ]

    if (!excludedPaths.includes(location.pathname)) {
      Cookies.set('lastVisited', location.pathname)
    }
  }, [location.pathname])

  return (
    <SnackbarProvider>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          position: 'relative',
        }}
      >
        <ScrollToTop />
        <Navbar />
        <ErrorBoundary>
          <Box sx={{ flexGrow: 1, postion: 'absolute' }}>
            <Routes>
              <Route path="/" element={<WelcomePage />} />
              <Route path="/student/*" element={<StudentRoutes />} />
              <Route
                path="/provider/*"
                element={<ProviderRoutes isParent={!user.parent_id} />}
              />
              <Route path="/admin/*" element={<AdminRoutes />} />
              <Route
                path="/scholarships"
                element={<SearchResultsPage isASection={false} />}
              />
              <Route
                path="/scholarships/:id"
                element={<ScholarshipDetailsPage isASection={false} />}
              />
              <Route
                path="/scholarships/:id/update"
                element={<PrivateRoute component={ScholarshipEditorPage} />}
              />
              <Route
                path="/scholarships/create"
                element={<PrivateRoute component={ScholarshipEditorPage} />}
              />
              <Route path="/privacy-consent" element={<PrivacyConsentPage />} />
              <Route
                path="/terms-and-conditions"
                element={<TermsAndConditionsPage />}
              />
              <Route path="/thank-you" element={<ThankYouPage />} />
              <Route path="/sign-in" element={<SignInPage />} />
              <Route path="/sign-up" element={<SignUpPage />} />
              <Route
                path="/verify-email/:token"
                element={<VerifyEmailPage />}
              />
              <Route path="/articles" element={<ArticleListPage />} />
              <Route path="/articles/:slug" element={<ArticleDetailPage />} />
              <Route
                path="/articles/search/:keyword"
                element={<ArticleSearchListPage />}
              />
              <Route path="*" element={<PageNotFoundPage />} />
              <Route
                path="/scholarships/create/upload"
                element={<PrivateRoute component={AddScholarshipViaCSVPage} />}
              />
            </Routes>
          </Box>
        </ErrorBoundary>
        <Disclaimer />
        <Footer />
      </Box>
    </SnackbarProvider>
  )
}

export default App
