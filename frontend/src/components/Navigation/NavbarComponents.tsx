import { Button, List, ListItem, Typography, Box } from '@mui/material'
import React, { ReactElement, useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import instance, { initialUserState } from '../../axiosConfig'
import {
  ADMIN_ROLE_ID,
  PROVIDER_ROLE_ID,
  STUDENT_ROLE_ID,
  USER_TYPES,
} from '../../constants/constants'
import { initializeIsAuthenticated } from '../../redux/reducers/IsAuthenticatedReducer'
import { initializeUser } from '../../redux/reducers/UserReducer'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { User } from '../../redux/types'
import CTAButton from '../CustomButton/CTAButton'
import profileTheme from '../../styles/profileTheme';
import LoggedinIcon from '../../public/images/loggedin.svg';
import LoginIcon from '../../public/images/login.svg';
import SearchIcon from '../../public/images/search.svg';
import LogoutIcon from '../../public/images/logout.svg';


interface AuthenticatedUserProps {
  user: User
}

const AuthenticatedProvider: React.FC<AuthenticatedUserProps> = ({
  user,
}) => {
  const navigate = useNavigate();

  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <List sx={profileTheme.navigation.mainNavLists}>
      <ListItem sx={profileTheme.navigation.mainNavListItem}>
        <Typography
          component={Link}
          to="/provider/survey"
          sx={profileTheme.navigation.mainNavListItemLink}
        >
        Survey
        </Typography>
      </ListItem>
      <ListItem sx={profileTheme.navigation.mainNavListItem}>
        <Typography
          component={Link}
          to="/provider/dashboard"
          sx={profileTheme.navigation.mainNavListItemLink}
        >
        Dashboard
        </Typography>
      </ListItem>
      {!user.parent_id && (
        <ListItem sx={profileTheme.navigation.mainNavListItem}>
          <Typography
            component={Link}
            to="/provider/accounts"
            sx={profileTheme.navigation.mainNavListItemLink}
          >
          Accounts
          </Typography>
        </ListItem>
      )}
      <ListItem sx={profileTheme.navigation.mainNavListItem}>
        <Typography
          component={Link}
          to="/provider/applications"
          sx={profileTheme.navigation.mainNavListItemLink}
        >
        Applications
        </Typography>
      </ListItem>
      <Box sx={profileTheme.navigation.mainNavDivider} />
      <ListItem disablePadding>
        <CTAButton
          loading={false}
          handleClick={() =>
            navigate(
              `/provider/account/${user?.scholarship_provider?.id}/view-profile`
            )
          }
          label={windowWidth > 1024 || windowWidth < 900 ? `${user.first_name}` : ''}
          icon={LoggedinIcon}
          styles={profileTheme.navigation.mainNavLoggedInButton}
          id="provider-profile"
        />
      </ListItem>
    </List>
  )
}

const AuthenticatedStudent: React.FC<AuthenticatedUserProps> = ({
  user,
}) => {
  const navigate = useNavigate();

  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  return (
    <List sx={profileTheme.navigation.mainNavLists}>
      <ListItem sx={profileTheme.navigation.mainNavListItem}>
        <Typography
          component={Link}
          to={`/student/survey`}
          sx={profileTheme.navigation.mainNavListItemLink}
        >
          Survey
        </Typography>
      </ListItem>
      <ListItem sx={profileTheme.navigation.mainNavListItem}>
        <Typography
          component={Link}
          to={`/articles`}
          sx={profileTheme.navigation.mainNavListItemLink}
        >
          Articles
        </Typography>
      </ListItem>
      <ListItem sx={profileTheme.navigation.mainNavListItem}>
        <Typography
          variant="body1"
          component={Link}
          to="/student/applications"
          sx={profileTheme.navigation.mainNavListItemLink}
        >
          Applications
        </Typography>
      </ListItem>
      <ListItem disablePadding>
        <CTAButton
          icon={SearchIcon}
          loading={false}
          handleClick={() => navigate(`/scholarships`)}
          label={windowWidth > 1024 || windowWidth < 900 ? "Search Scholarships" : ''}
          styles={profileTheme.navigation.mainNavSearchButton}
          id="search-scholarships"
        />
      </ListItem>
      {windowWidth > 900 && <Box sx={profileTheme.navigation.mainNavDivider} />}
      <ListItem disablePadding>
        <CTAButton
          loading={false}
          handleClick={() => navigate(`/student/account`)}
          label={windowWidth > 1024 || windowWidth < 900 ? `${user.first_name}` : ''}
          icon={LoggedinIcon}
          styles={profileTheme.navigation.mainNavLoggedInButton}
          id="student-profile"
        />
      </ListItem>
    </List>
  )
}

const AuthnticatedAdmin = () => {
  const user = useAppSelector((state) => state.persistedReducer.user)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const logout = async () => {
    await instance.post('/api/v1/logout', {
      email: user.email_address,
    })
    dispatch(initializeIsAuthenticated(false))
    dispatch(initializeUser(initialUserState))
    navigate('/sign-in')
  }

  return (
    <List sx={profileTheme.navigation.mainNavLists}>
      <ListItem sx={profileTheme.navigation.mainNavListItem}>
        <Typography
          component={Link}
          to="/admin/scholarships"
          sx={profileTheme.navigation.mainNavListItemLink}
        >
          Scholarships
        </Typography>
      </ListItem>
      <Box sx={profileTheme.navigation.mainNavDivider} />
      <ListItem disablePadding>
        <CTAButton
          loading={false}
          handleClick={logout}
          label="Logout"
          icon={LogoutIcon}
          styles={profileTheme.navigation.mainNavLogoutButton}
          id="logout-button"
        />
      </ListItem>
    </List>
  )
}

interface AuthenticatedProps {
  user: User
}

export const Authenticated: React.FC<AuthenticatedProps> = ({
  user,
}): ReactElement<any, any> | null => {
  switch (user.role_id) {
    case STUDENT_ROLE_ID:
      return <AuthenticatedStudent user={user} />
    case PROVIDER_ROLE_ID:
      return <AuthenticatedProvider user={user} />
    case ADMIN_ROLE_ID:
      return <AuthnticatedAdmin />
    default:
      return null
  }
}

interface UnauthenticatedProps {
  userType: keyof typeof USER_TYPES
}

export const Unauthenticated: React.FC<UnauthenticatedProps> = ({
  userType,
}) => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <List sx={profileTheme.navigation.mainNavLists}>
      {(pathname === '/provider' || pathname === '/student') && (
        <ListItem sx={profileTheme.navigation.mainNavListItem}>
          <Typography
            component={Button}
            onClick={() => {
              const fabButton = document.getElementById(
                `fab-button-${userType}`
              )

              if (fabButton) {
                fabButton.click()
              }
            }}
            sx={profileTheme.navigation.mainNavListItemLink}
          >
            Newsletter
          </Typography>
        </ListItem>
      )}
      <ListItem sx={profileTheme.navigation.mainNavListItem}>
        <Typography
          component={Link}
          to={`/articles`}
          sx={profileTheme.navigation.mainNavListItemLink}
        >
          Articles
        </Typography>
      </ListItem>
      <ListItem disablePadding>
        <CTAButton
          icon={SearchIcon}
          loading={false}
          handleClick={() => navigate(`/scholarships`)}
          label={windowWidth > 1024 || windowWidth < 900 ? "Search Scholarships" : ''}
          styles={profileTheme.navigation.mainNavSearchButton}
          id="search-scholarships"
        />
      </ListItem>
      <ListItem sx={profileTheme.navigation.mainNavListSignUp}>
        <Typography
          component={Link}
          to={`/sign-up`}
          sx={profileTheme.navigation.mainNavListItemLink}
        >
          <Box component="span" sx={profileTheme.navigation.mainNavListSignUpSpan}>Sign up is free</Box>
          Sign Up
        </Typography>
      </ListItem>
      {windowWidth > 900 && <Box sx={profileTheme.navigation.mainNavDivider} />}
      <ListItem disablePadding>
        <CTAButton
          icon={LoginIcon}
          loading={false}
          handleClick={() => navigate(`/sign-in`)}
          label={windowWidth > 1024 || windowWidth < 900 ? "Login" : ''}
          styles={profileTheme.navigation.mainNavLoginButton}
          id="login-button"
        />
      </ListItem>
    </List>
  )
}
