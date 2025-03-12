import { Box } from '@mui/material'
import Cookies from 'js-cookie'
import React, { Suspense, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { SnackbarProvider } from './context/SnackBarContext'
import { useAppSelector } from './redux/store'
import { User } from './redux/types'

// Lazy load components and pages
const Disclaimer = React.lazy(() => import('./components/Disclaimer/Disclaimer'))
const ErrorBoundary = React.lazy(() => import('./components/ErrorBoundary/ErrorBoundary'))
const Footer = React.lazy(() => import('./components/Footer/Footer'))
const Navbar = React.lazy(() => import('./components/Navigation/Navbar'))
const AdminPrivate = React.lazy(() => import('./components/PrivateRoute/AdminPrivateRoute'))
const PrivateRoute = React.lazy(() => import('./components/PrivateRoute/PrivateRoute'))
const ProviderPrivate = React.lazy(() => import('./components/PrivateRoute/ProviderPrivateRoute'))
const StudentPrivate = React.lazy(() => import('./components/PrivateRoute/StudentPrivateRoute'))
const ScrollToTop = React.lazy(() => import('./components/ScrollToTop/ScrollToTop'))

const AccountManagementPage = React.lazy(() => import('./containers/AccountManagementPage/AccountManagementPage'))
const AddScholarshipViaCSVPage = React.lazy(() => import('./containers/AddScholarshipViaCSVPage/AddScholarshipViaCSVPage'))
const ApplicationsManagementPage = React.lazy(() => import('./containers/ApplicationsManagementPage/ApplicationsManagementPage'))
const StudentApplicationsManagementPage = React.lazy(() => import('./containers/ApplicationsManagementPage/StudentApplicationsManagementPage'))
const ArticleDetailPage = React.lazy(() => import('./containers/ArticleDetailPage/ArticleDetailPage'))
const ArticleListPage = React.lazy(() => import('./containers/ArticleListPage/ArticleListPage'))
const ArticleSearchListPage = React.lazy(() => import('./containers/ArticleListPage/ArticleSearchListPage'))
const BookmarksPage = React.lazy(() => import('./containers/BookmarksPage/BookmarksPage'))
const PageNotFoundPage = React.lazy(() => import('./containers/PageNotFoundPage/PageNotFoundPage'))
const PrivacyConsentPage = React.lazy(() => import('./containers/PrivacyConsentPage/PrivacyConsentPage'))
const ProviderProfile = React.lazy(() => import('./containers/ProfilesPage/ProviderProfile/ProviderProfile'))
const ProviderDashboardPage = React.lazy(() => import('./containers/ProviderDashboardPage/ProviderDashboardPage'))
const ScholarshipDetailsPage = React.lazy(
  () => import('./containers/ScholarshipDetailsPage/ScholarshipDetailsPage')
    .then(module => ({ default: module.ScholarshipDetailsPage }))
);
const ScholarshipEditorPage = React.lazy(() => import('./containers/ScholarshipEditorPage/ScholarshipEditorPage'))
const ScholarshipManagement = React.lazy(() => 
  import('./containers/ScholarshipManagement/ScholarshipManagement')
)
const SearchResultsPage = React.lazy(() => import('./containers/SearchResultsPage/SearchResultsPage').then(module => ({
  default: module.SearchResultsPage,
})))
const SignInPage = React.lazy(() => import('./containers/SignInPage/SignInPage'))
const SignUpPage = React.lazy(() => import('./containers/SignUpPage/SignUpPage'))
const StudentDashboardPage = React.lazy(() => import('./containers/StudentDashboardPage/StudentDashboardPage'))
const SurveyPage = React.lazy(() => import('./containers/SurveyPage/SurveyPage'))
const TeaserProvider = React.lazy(() => import('./containers/TeaserPage/TeaserProvider'))
const TeaserStudent = React.lazy(() => import('./containers/TeaserPage/TeaserStudent'))
const TermsAndConditionsPage = React.lazy(() => import('./containers/TermsAndConditionsPage/TermsAndConditionsPage'))
const ThankYouPage = React.lazy(() => import('./containers/ThankYouPage/ThankYouPage'))
const VerifyEmailPage = React.lazy(() => import('./containers/VerifyEmailPage/VerifyEmailPage'))
const WelcomePage = React.lazy(() => import('./containers/WelcomePage/WelcomePage'))

/**
 * @component StudentRoutes
 * @description Handles routing for student-specific pages and features
 * @returns {JSX.Element} Student route configuration
 */
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
/**
 * @component AdminRoutes
 * @description Handles routing for admin-specific pages
 * @returns {JSX.Element} Admin route configuration
 */
const AdminRoutes: React.FC = () => (
  <Routes>
    <Route
      path="/scholarships"
      element={<AdminPrivate component={ScholarshipManagement} />}
    />
    <Route path="*" element={<PageNotFoundPage />} />
  </Routes>
)

/**
 * @interface ProviderRoutesProps
 * @description Props for the ProviderRoutes component
 * @property {boolean} [isParent] - Indicates if the provider is a parent account (optional, defaults to false)
 */
interface ProviderRoutesProps {
  isParent?: boolean
}

/**
 * @component ProviderRoutes
 * @description Handles routing for provider-specific pages and features
 * @param {ProviderRoutesProps} props - Component props
 * @param {boolean} [props.isParent=false] - Flag indicating if the provider is a parent account
 * @returns {JSX.Element} Provider route configuration
 */
const ProviderRoutes: React.FC<ProviderRoutesProps> = ({ isParent = false }) => (
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

/**
 * @component App
 * @description Root component of the application that handles routing and layout.
 * Features include:
 * - Global layout structure with navbar, content area, and footer
 * - Route management for different user types (student, provider, admin)
 * - Error boundary implementation
 * - Lazy loading of components
 * - Last visited path tracking (excluding certain routes)
 * @returns {JSX.Element} The main application component
 */
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
      <Suspense 
      // fallback={<div>Loading...</div>}
      >
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
      </Suspense>
    </SnackbarProvider>
  )
}

export default App
