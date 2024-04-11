import { Box, Container, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import AccountClose from '../../../components/AccountCard/AccountClose'
import AccountProfile from '../../../components/AccountCard/AccountProfile'
import AccountSecurity from '../../../components/AccountCard/AccountSecurity'
import AccountSettings from '../../../components/AccountCard/AccountSettings'
import AccountSideBar from '../../../components/AccountCard/AccountSideBar'
import AccountViewProfile from '../../../components/AccountCard/AccountViewProfile'
import { useAppSelector } from '../../../redux/store'
import { ScholarshipProvider } from '../../../redux/types'
import profileTheme from '../../../styles/profileTheme'

const ProviderProfile: React.FC = () => {
  const [activeContent, setActiveContent] = useState<string>('view-profile')
  const { id, lastRoute } = useParams()
  const data: any = useAppSelector((state) => state.persistedReducer.profile)

  return (
    <Box sx={profileTheme.container.rootContainer}>
      <Container>
        <Typography sx={profileTheme.heading.mainHeading}>
          Account Profile
        </Typography>
        <Box sx={profileTheme.container.mainContainer}>
          <AccountSideBar
            activeContent={activeContent}
            setActiveContent={setActiveContent}
            id={id}
            provider={data.profile.scholarship_provider as ScholarshipProvider}
          />
          {activeContent && lastRoute === 'view-profile' && (
            <AccountViewProfile />
          )}
          {activeContent && lastRoute === 'account-profile' && (
            <AccountProfile />
          )}
          {activeContent && lastRoute === 'account-security' && (
            <AccountSecurity />
          )}
          {/* { activeContent && lastRoute === 'account-subscription' && <AccountSubscription />} */}
          {activeContent && lastRoute === 'account-settings' && (
            <AccountSettings />
          )}
          {activeContent && lastRoute === 'close-account' && <AccountClose />}
        </Box>
      </Container>
    </Box>
  )
}

export default ProviderProfile
