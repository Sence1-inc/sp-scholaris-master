import { Button, List, ListItem, Typography, Box, useMediaQuery, useTheme } from '@mui/material'
import React, { ReactElement, useState, useEffect, memo, useCallback } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import instance from '../../axiosConfig'
import {
  ADMIN_ROLE_ID,
  PROVIDER_ROLE_ID,
  STUDENT_ROLE_ID,
  USER_TYPES,
} from '../../constants/constants'
import { initializeIsAuthenticated } from '../../redux/reducers/IsAuthenticatedReducer'
import { initializeUser, initialUserState } from '../../redux/reducers/UserReducer'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { User } from '../../redux/types'
import CTAButton from '../CustomButton/CTAButton'
import profileTheme from '../../styles/profileTheme'
import LoggedinIcon from '../../public/images/loggedin.svg'
import LoginIcon from '../../public/images/login.svg'
import SearchIcon from '../../public/images/search.svg'
import LogoutIcon from '../../public/images/logout.svg'

interface AuthenticatedUserProps {
  user: User
}

const AuthenticatedProvider = memo<AuthenticatedUserProps>(({ user }) => {
  const navigate = useNavigate()
  const theme = useTheme()
  const isDesktop = useMediaQuery('(min-width:1025px)')
  const isMobile = useMediaQuery('(max-width:899px)')
  const showLabel = isDesktop || isMobile

  const handleProfileClick = useCallback(() => {
    navigate(`/provider/account/${user?.scholarship_provider?.id}/view-profile`)
  }, [navigate, user?.scholarship_provider?.id])

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
          to={`/articles/`}
          sx={profileTheme.navigation.mainNavListItemLink}
        >
          Articles
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
          handleClick={handleProfileClick}
          label={showLabel ? user.first_name : ''}
          icon={LoggedinIcon}
          styles={profileTheme.navigation.mainNavLoggedInButton}
          id="provider-profile"
        />
      </ListItem>
    </List>
  )
})

const AuthenticatedStudent = memo<AuthenticatedUserProps>(({ user }) => {
  const navigate = useNavigate()
  const theme = useTheme()
  const isDesktop = useMediaQuery('(min-width:1025px)')
  const isMobile = useMediaQuery('(max-width:899px)')
  const showLabel = isDesktop || isMobile

  const handleSearchClick = useCallback(() => {
    navigate('/scholarships')
  }, [navigate])

  const handleProfileClick = useCallback(() => {
    navigate('/student/account')
  }, [navigate])

  return (
    <List sx={profileTheme.navigation.mainNavLists}>
      <ListItem sx={profileTheme.navigation.mainNavListItem}>
        <Typography
          component={Link}
          to="/student/survey"
          sx={profileTheme.navigation.mainNavListItemLink}
        >
          Survey
        </Typography>
      </ListItem>
      <ListItem sx={profileTheme.navigation.mainNavListItem}>
        <Typography
          component={Link}
          sx={profileTheme.navigation.mainNavListItemLink}
        >
          Articles
        </Typography>
      </ListItem>
      <ListItem sx={profileTheme.navigation.mainNavListItem}>
        <Typography
          component={Link}
          to="/student/bookmarks"
          sx={profileTheme.navigation.mainNavListItemLink}
        >
          Bookmarks
        </Typography>
      </ListItem>
      <ListItem sx={profileTheme.navigation.mainNavListItem}>
        <Typography
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
          handleClick={handleSearchClick}
          label={showLabel ? "Search Scholarships" : ''}
          styles={profileTheme.navigation.mainNavSearchButton}
          id="search-scholarships"
        />
      </ListItem>
      {!isMobile && <Box sx={profileTheme.navigation.mainNavDivider} />}
      <ListItem disablePadding>
        <CTAButton
          loading={false}
          handleClick={handleProfileClick}
          label={showLabel ? user.first_name : ''}
          icon={LoggedinIcon}
          styles={profileTheme.navigation.mainNavLoggedInButton}
          id="student-profile"
        />
      </ListItem>
    </List>
  )
})

const AuthenticatedAdmin = memo(() => {
  const user = useAppSelector((state) => state.user)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const logout = useCallback(async () => {
    try {
      await instance.post('/api/v1/logout', {
        email: user.email_address,
      })
      dispatch(initializeIsAuthenticated(false))
      dispatch(initializeUser(initialUserState))
      navigate('/sign-in', { replace: true })
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }, [dispatch, navigate, user.email_address])

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
})

interface AuthenticatedProps {
  user: User
}

export const Authenticated = memo<AuthenticatedProps>(({ user }): ReactElement<any, any> | null => {
  switch (user.role_id) {
    case STUDENT_ROLE_ID:
      return <AuthenticatedStudent user={user} />
    case PROVIDER_ROLE_ID:
      return <AuthenticatedProvider user={user} />
    case ADMIN_ROLE_ID:
      return <AuthenticatedAdmin />
    default:
      return null
  }
})

interface UnauthenticatedProps {
  userType: keyof typeof USER_TYPES
}

export const Unauthenticated = memo<UnauthenticatedProps>(({ userType }) => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const theme = useTheme()
  const isDesktop = useMediaQuery('(min-width:1025px)')
  const isMobile = useMediaQuery('(max-width:899px)')
  const showLabel = isDesktop || isMobile

  const handleSearchClick = useCallback(() => {
    navigate('/scholarships')
  }, [navigate])

  const handleLoginClick = useCallback(() => {
    navigate('/sign-in')
  }, [navigate])

  const handleNewsletterClick = useCallback(() => {
    const fabButton = document.getElementById(`fab-button-${userType}`)
    if (fabButton) {
      fabButton.click()
    }
  }, [userType])

  return (
    <List sx={profileTheme.navigation.mainNavLists}>
      {(pathname === '/provider' || pathname === '/student') && (
        <ListItem sx={profileTheme.navigation.mainNavListItem}>
          <Typography
            component={Button}
            onClick={handleNewsletterClick}
            sx={profileTheme.navigation.mainNavListItemLink}
          >
            Newsletter
          </Typography>
        </ListItem>
      )}
      <ListItem sx={profileTheme.navigation.mainNavListItem}>
        <Typography
          component={Link}
          sx={profileTheme.navigation.mainNavListItemLink}
        >
          Articles
        </Typography>
      </ListItem>
      <ListItem disablePadding>
        <CTAButton
          icon={SearchIcon}
          loading={false}
          handleClick={handleSearchClick}
          label={showLabel ? "Search Scholarships" : ''}
          styles={profileTheme.navigation.mainNavSearchButton}
          id="search-scholarships"
        />
      </ListItem>
      <ListItem disablePadding>
        <Typography
          component={Link}
          to="/sign-up"
          sx={profileTheme.navigation.mainNavListSignUp}
        >
          <Box component="span" sx={profileTheme.navigation.mainNavListSignUpSpan}>It's free</Box>
          Sign Up
        </Typography>
      </ListItem>
      {!isMobile && <Box sx={profileTheme.navigation.mainNavDivider} />}
      <ListItem disablePadding>
        <CTAButton
          icon={LoginIcon}
          loading={false}
          handleClick={handleLoginClick}
          label={showLabel ? "Login" : ''}
          styles={profileTheme.navigation.mainNavLoginButton}
          id="login-button"
        />
      </ListItem>
    </List>
  )
})