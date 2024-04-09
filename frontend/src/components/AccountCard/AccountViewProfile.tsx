import { Box, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Profile } from '../../redux/types'
import profileTheme from '../../styles/profileTheme'
import AccountCard from './AccountCard'

interface ProfileProps {
  profile: Profile | null
}

const AccountViewProfile: React.FC<ProfileProps> = ({ profile }) => {
  const [providerName, setProviderName] = useState<string>('')
  const [cityName, setCityName] = useState<string>('')
  const [provinceName, setProvinceName] = useState<string>('')
  const [regionName, setRegionName] = useState<string>('')
  const [providerType, setProviderType] = useState<string>('')
  const [isEditting, setIsEditting] = useState<boolean>(false)

  useEffect(() => {
    if (profile) {
      setProviderName(profile.scholarship_provider.provider_name)
      setCityName(profile.city.city_name)
      setProvinceName(profile.province.province_name)
      setRegionName(profile.region.region_name)
      setProviderType(profile.provider_type)
    }
  }, [profile])

  return (
    <AccountCard
      heading="Account View Profile"
      subHeading="Check and edit your organization account information"
      handleEdit={(edit) => setIsEditting(edit)}
      isEditting={isEditting}
    >
      <Box sx={profileTheme.box.boxContentStyle}>
        <Typography sx={profileTheme.heading.titleHeading2}>
          Account Name:
        </Typography>
        {!isEditting ? (
          <Typography sx={profileTheme.text.textRegular}>
            {providerName}
          </Typography>
        ) : (
          <TextField
            variant="outlined"
            value={providerName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setProviderName(e.target.value)
            }
          />
        )}
      </Box>
      <Box sx={profileTheme.box.boxContentStyle}>
        <Typography sx={profileTheme.heading.titleHeading2}>
          Address:
        </Typography>
        {!isEditting ? (
          <Typography
            sx={profileTheme.text.textRegular}
          >{`${cityName}, ${provinceName}, ${regionName}`}</Typography>
        ) : (
          <Box>
            <TextField
              variant="outlined"
              value={cityName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCityName(e.target.value)
              }
            />
            <TextField
              variant="outlined"
              value={provinceName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setProvinceName(e.target.value)
              }
            />
            <TextField
              variant="outlined"
              value={regionName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setRegionName(e.target.value)
              }
            />
          </Box>
        )}
      </Box>
      <Box>
        <Typography sx={profileTheme.heading.titleHeading2}>
          Provider Type:
        </Typography>
        {!isEditting ? (
          <Typography sx={profileTheme.text.textRegular}>
            {providerType}
          </Typography>
        ) : (
          <TextField
            variant="outlined"
            value={providerType}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setProviderType(e.target.value)
            }
          />
        )}
      </Box>
    </AccountCard>
  )
}

export default AccountViewProfile
