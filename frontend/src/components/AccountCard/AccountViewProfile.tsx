import React from 'react';
import { Typography, Box } from '@mui/material';
import AccountCard from './AccountCard';
import { ProviderData } from '../../redux/types'

interface ProviderDataProps {
  provider: ProviderData | null
}

const AccountViewProfile: React.FC<ProviderDataProps> = ({ provider }) => {
  return (
    provider && (
    <AccountCard heading='Account View Profile' subHeading='Check and edit your organization account information'>
      <Box sx={theme.boxStyle}>
        <Typography sx={theme.headingStyle}>Account Name:</Typography>
        <Typography sx={theme.textStyle}>{provider.scholarship_provider && provider.scholarship_provider.provider_name}</Typography>
      </Box>
      <Box sx={theme.boxStyle}>
        <Typography sx={theme.headingStyle}>Address:</Typography>
        <Typography sx={theme.textStyle}>{`${provider.city && provider?.city.city_name}, ${provider.province && provider.province.province_name}, ${provider.region && provider.region.region_name}`}</Typography>
      </Box>
      <Box>
        <Typography sx={theme.headingStyle}>Provider Type:</Typography>
        <Typography sx={theme.textStyle}>{provider.provider_type}</Typography>
      </Box>
    </AccountCard>)
  )
}

export default AccountViewProfile;


const theme = {
  boxStyle: {
    width: '100%',
    marginBottom: 4,
  },
  headingStyle: {
    fontFamily: 'Roboto',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#002147',
  },
  textStyle: {
    fontFamily: 'Roboto',
    fontSize: 20,
    fontWeight: 'regular',
    color: '#767676',
  },
}