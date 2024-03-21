import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Container, Typography, Box } from '@mui/material'
import AccountSideBar from '../../../components/AccountCard/AccountSideBar';
import AccountViewProfile from '../../../components/AccountCard/AccountViewProfile';
import AccountProfile from '../../../components/AccountCard/AccountProfile';
import AccountSecurity from '../../../components/AccountCard/AccountSecurity';
import AccountSettings from '../../../components/AccountCard/AccountSettings';
import AccountClose from '../../../components/AccountCard/AccountClose';
import useGetProviderData from '../../../hooks/useGetProviderData';
import { useAppSelector } from '../../../redux/store'
import { ProviderData } from '../../../redux/types'
import profileTheme from '../../../styles/profileTheme';

interface Results {
  provider: ProviderData
}

interface ProviderUser {
  id?: number | undefined,
  provider_name?: string | undefined,
  user_id?: number | undefined
}

const ProviderProfile: React.FC = () => {
  const [activeContent, setActiveContent] = useState<string | undefined>('');
  const { id, lastRoute } = useParams();
  const { getProviderData } = useGetProviderData();
  const result = useAppSelector((state) => state.provider) as Results
  const [providerData, setProviderData] = useState<ProviderData | null>(null);
  const [providerUserData, setProviderUserData] = useState<ProviderUser | null>(null);

  useEffect(() => {
    if(lastRoute) {
      setActiveContent(lastRoute);
    }
  }, [lastRoute])

  useEffect(() => {
    getProviderData(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setProviderData(result.provider)
  }, [result.provider])

  useEffect(() => {
    if(providerData) {
      setProviderUserData(providerData.scholarship_provider)
    }
  }, [providerData])

  return (
    <Box sx={profileTheme.container.rootContainer}>
      <Container>
        <Typography sx={profileTheme.heading.mainHeading}>Account Profile</Typography>
        <Box sx={profileTheme.container.mainContainer}>
          <AccountSideBar activeContent={activeContent} setActiveContent={setActiveContent} id={id} provider={providerUserData}/>
          { activeContent && lastRoute === 'view-profile' && <AccountViewProfile provider={providerData} />}
          { activeContent && lastRoute === 'account-profile' && <AccountProfile provider={providerData}  />}
          { activeContent && lastRoute === 'account-security' && <AccountSecurity />}
          {/* { activeContent && lastRoute === 'account-subscription' && <AccountSubscription />} */}
          { activeContent && lastRoute === 'account-settings' && <AccountSettings />}
          { activeContent && lastRoute === 'close-account' && <AccountClose />}
        </Box>
      </Container>
    </Box>
  )
}

export default ProviderProfile;