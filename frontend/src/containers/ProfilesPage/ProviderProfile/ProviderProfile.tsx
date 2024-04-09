import { Box, Container, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import AccountClose from '../../../components/AccountCard/AccountClose'
import AccountProfile from '../../../components/AccountCard/AccountProfile'
import AccountSecurity from '../../../components/AccountCard/AccountSecurity'
import AccountSettings from '../../../components/AccountCard/AccountSettings'
import AccountSideBar from '../../../components/AccountCard/AccountSideBar'
import AccountViewProfile from '../../../components/AccountCard/AccountViewProfile'
import useGetProfile from '../../../hooks/useGetProfile'
import { useAppSelector } from '../../../redux/store'
import { ProviderData, ScholarshipProvider, User } from '../../../redux/types'
import profileTheme from '../../../styles/profileTheme'

interface Results {
  provider: ProviderData
}

interface ProviderUser {
  id?: number | undefined
  provider_name?: string | undefined
  user_id?: number | undefined
}

const ProviderProfile: React.FC = () => {
  const [activeContent, setActiveContent] = useState<string | undefined>('')
  const { id, lastRoute } = useParams()
  const data: any = useAppSelector((state) => state.profile)
  const { getProfile } = useGetProfile()
  // const result = useAppSelector((state) => state.provider) as Results
  const user = useAppSelector((state) => state.user) as User
  // const [providerData, setProviderData] = useState<User | null>(null);
  // const [providerUserData, setProviderUserData] = useState<ProviderUser | null>(null);
  // const [profile, setProfile] = useState<Profile | null>(null)
  // const [provider, setProvider] = useState<ScholarshipProvider | null>(null)
  console.log('PROF', data)
  // useEffect(() => {
  //   if(lastRoute) {
  //     setActiveContent(lastRoute);
  //   }
  // }, [lastRoute])

  // useEffect(() => {
  //   getProfile(user.id as number)
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  // useEffect(() => {
  //   if (user) {
  //     // setProviderData(user)
  //   }
  // }, [user])

  // useEffect(() => {
  //   if(profile) {
  //     setProviderUserData(user.scholarship_provider)
  //   }
  // }, [profile])
  console.log(data)
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
            <AccountViewProfile profile={data.profile} />
          )}
          {activeContent && lastRoute === 'account-profile' && (
            <AccountProfile profile={data.profile} />
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
