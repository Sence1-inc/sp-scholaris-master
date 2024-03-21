import React from 'react';
import { Typography, Box } from '@mui/material';
import AccountCard from './AccountCard';
import { ProviderData } from '../../redux/types'
import profileTheme from '../../styles/profileTheme';

interface ProviderDataProps {
  provider: ProviderData | null
}

const AccountViewProfile: React.FC<ProviderDataProps> = ({ provider }) => {
  return (
    provider && (
    <AccountCard heading='Account View Profile' subHeading='Check and edit your organization account information'>
      <Box sx={profileTheme.box.boxContentStyle}>
        <Typography sx={profileTheme.heading.titleHeading2}>Account Name:</Typography>
        <Typography sx={profileTheme.text.textRegular}>{provider.scholarship_provider && provider.scholarship_provider.provider_name}</Typography>
      </Box>
      <Box sx={profileTheme.box.boxContentStyle}>
        <Typography sx={profileTheme.heading.titleHeading2}>Address:</Typography>
        <Typography sx={profileTheme.text.textRegular}>{`${provider.city && provider?.city.city_name}, ${provider.province && provider.province.province_name}, ${provider.region && provider.region.region_name}`}</Typography>
      </Box>
      <Box>
        <Typography sx={profileTheme.heading.titleHeading2}>Provider Type:</Typography>
        <Typography sx={profileTheme.text.textRegular}>{provider.provider_type}</Typography>
      </Box>
    </AccountCard>)
  )
}

export default AccountViewProfile;