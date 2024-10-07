import { Button, List, ListItem, Typography } from '@mui/material'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { STUDENT_ROLE_ID } from '../../constants/constants'
import { User } from '../../redux/types'
import CTAButton from '../CustomButton/CTAButton'

interface AuthenticatedProviderProps {
  user: User
}

const AuthenticatedProvider: React.FC<AuthenticatedProviderProps> = ({
  user,
}) => {
  const navigate = useNavigate()
  return (
    <List
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: 4,
      }}
    >
      <ListItem sx={{ width: 'auto' }}>
        <Typography
          variant="body1"
          component={Link}
          to="/provider/survey"
          sx={{ color: 'common.white', textDecoration: 'none' }}
        >
          Survey
        </Typography>
      </ListItem>
      <ListItem sx={{ width: 'auto' }}>
        <Typography
          variant="body1"
          component={Link}
          to="/provider/dashboard"
          sx={{ color: 'common.white', textDecoration: 'none' }}
        >
          Dashboard
        </Typography>
      </ListItem>
      {!user.parent_id && (
        <ListItem sx={{ width: 'auto' }}>
          <Typography
            variant="body1"
            component={Link}
            to="/provider/accounts"
            sx={{ color: 'common.white', textDecoration: 'none' }}
          >
            Accounts
          </Typography>
        </ListItem>
      )}
      <ListItem disablePadding sx={{ width: 'auto' }}>
        <CTAButton
          loading={false}
          handleClick={() =>
            navigate(
              `/provider/account/${user?.scholarship_provider?.id}/view-profile`
            )
          }
          label="Profile"
          styles={{ whiteSpace: 'nowrap', backgroundColor: 'primary.light' }}
          id="provider-profile"
        />
      </ListItem>
    </List>
  )
}

const AuthenticatedStudent = () => {
  const navigate = useNavigate()
  return (
    <List
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: 4,
      }}
    >
      <ListItem disablePadding sx={{ width: 'auto' }}>
        <CTAButton
          loading={false}
          handleClick={() => navigate(`/student/account`)}
          label="Profile"
          styles={{ whiteSpace: 'nowrap', backgroundColor: 'primary.light' }}
          id="student-profile"
        />
      </ListItem>
    </List>
  )
}

interface AuthenticatedProps {
  user: User
  pathname: string
}

export const Authenticated: React.FC<AuthenticatedProps> = ({
  user,
  pathname,
}) => {
  return pathname.includes('/student') || user.role_id === STUDENT_ROLE_ID ? (
    <AuthenticatedStudent />
  ) : (
    <AuthenticatedProvider user={user} />
  )
}

interface UnauthenticatedProps {
  userType: string
}

export const Unauthenticated: React.FC<UnauthenticatedProps> = ({
  userType,
}) => {
  const navigate = useNavigate()
  return (
    <List
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: 3,
      }}
    >
      <ListItem sx={{ width: 'auto' }}>
        <Typography
          variant="body1"
          component={Button}
          onClick={() => {
            const fabButton = document.getElementById(`fab-button-${userType}`)

            if (fabButton) {
              fabButton.click()
            }
          }}
          sx={{
            padding: 0,
            color: 'common.white',
            textDecoration: 'none',
            textTransform: 'capitalize',
          }}
        >
          Newsletter
        </Typography>
      </ListItem>
      <ListItem sx={{ width: 'auto' }}>
        <Typography
          variant="body1"
          component={Link}
          to={`/${userType}/survey`}
          sx={{ color: 'common.white', textDecoration: 'none' }}
        >
          Survey
        </Typography>
      </ListItem>
      <ListItem sx={{ minWidth: 'auto' }}>
        <Typography
          variant="body1"
          component={Link}
          to={`/sign-up`}
          sx={{ color: 'common.white', textDecoration: 'none' }}
        >
          Sign Up
        </Typography>
      </ListItem>
      <ListItem disablePadding>
        <CTAButton
          loading={false}
          handleClick={() => navigate(`/scholarships`)}
          label="Search Scholarships"
          styles={{ whiteSpace: 'nowrap' }}
          id="search-scholarships"
        />
      </ListItem>
    </List>
  )
}
