import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import axiosInstance from '../../axiosConfig'
import { initializeProfile } from '../../redux/reducers/ProfileReducer'
import { useAppSelector } from '../../redux/store'
import { City, Profile, Province, Region } from '../../redux/types'
import profileTheme from '../../styles/profileTheme'
import CTAButton from '../CustomButton/CTAButton'
import AccountCard from './AccountCard'

export interface ProfileData {
  profile: Profile
}

interface AccountViewProfileProps {
  handleSetIsSnackbarOpen: (value: boolean) => void
  handleSetSuccessMessage: (value: string) => void
  handleSetErrorMessage: (value: string) => void
}

const AccountViewProfile: React.FC<AccountViewProfileProps> = ({
  handleSetIsSnackbarOpen,
  handleSetSuccessMessage,
  handleSetErrorMessage,
}) => {
  const dispatch = useDispatch()
  const user = useAppSelector((state) => state.persistedReducer.user)
  const data = useAppSelector((state) => state.persistedReducer.profile)
  const { profile } = data as ProfileData
  const [providerName, setProviderName] = useState<string>('')
  const [cityName, setCityName] = useState<string>('')
  const [provinceName, setProvinceName] = useState<string>('')
  const [regionName, setRegionName] = useState<string>('')
  const [cityId, setCityId] = useState<number | null>(null)
  const [provinceId, setProvinceId] = useState<number | null>(null)
  const [regionId, setRegionId] = useState<number | null>(null)
  const [isEditting, setIsEditting] = useState<boolean>(false)
  const [cities, setCities] = useState<City[] | []>([])
  const [provinces, setProvinces] = useState<Province[] | []>([])
  const [regions, setRegions] = useState<Region[] | []>([])
  const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false)

  useEffect(() => {
    if (profile) {
      setProviderName(profile.scholarship_provider?.provider_name ?? '')
      setCityName(profile.city?.city_name ?? '')
      setProvinceName(profile.province?.province_name ?? '')
      setRegionName(profile.region?.region_name ?? '')
      setCityId(profile.city?.id ?? null)
      setProvinceId(profile.province?.id ?? null)
      setRegionId(profile.region?.id ?? null)
    }
  }, [profile])

  const handleSave = async () => {
    const data = {
      provider_link: profile?.scholarship_provider?.provider_link ?? '',
      provider_name: providerName,
      region_id: regionId,
      province_id: provinceId,
      city_id: cityId,
      user_id: user.id,
    }

    try {
      setIsButtonLoading(true)
      const api = profile.id
        ? await axiosInstance.put(
            `/api/v1/scholarship_provider_profiles/${profile.id}`,
            data,
            { withCredentials: true }
          )
        : await axiosInstance.post(
            '/api/v1/scholarship_provider_profiles',
            data,
            { withCredentials: true }
          )
      const response = api
      setIsButtonLoading(false)
      handleSetSuccessMessage('Successfully saved!')
      handleSetErrorMessage('')
      handleSetIsSnackbarOpen(true)
      dispatch(initializeProfile({ ...response.data.profile }))
    } catch (error) {
      setIsButtonLoading(false)
      if (error) {
        handleSetIsSnackbarOpen(true)
        handleSetSuccessMessage('')
        handleSetErrorMessage('Error saving details')
      }
    }
  }

  useEffect(() => {
    const getCities = async () => {
      try {
        const response = await axiosInstance.get('/api/v1/cities')
        if (response) {
          setCities(response.data)
        }
      } catch (error) {
        if (error) {
          console.log('Error in fetching cities : ', error)
        }
      }
    }

    const getProvinces = async () => {
      try {
        const response = await axiosInstance.get('/api/v1/provinces')
        if (response) {
          setProvinces(response.data)
        }
      } catch (error) {
        if (error) {
          console.log('Error in fetching provinces : ', error)
        }
      }
    }

    const getRegions = async () => {
      try {
        const response = await axiosInstance.get('/api/v1/regions')
        if (response) {
          setRegions(response.data)
        }
      } catch (error) {
        if (error) {
          console.log('Error in fetching regions : ', error)
        }
      }
    }

    getCities()
    getProvinces()
    getRegions()
  }, [])

  return (
    <AccountCard
      heading="Account View Profile"
      subHeading="Check and edit your organization account information"
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
          >{`${cityName} ${provinceName} ${regionName}`}</Typography>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <FormControl fullWidth>
              <Typography variant="h6">City</Typography>
              <Select
                displayEmpty
                fullWidth
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={cityId?.toString()}
                sx={{ textAlign: 'left' }}
                label="City"
                onChange={(e: SelectChangeEvent) =>
                  setCityId(Number(e.target.value))
                }
              >
                {cities.map((item: City) => {
                  return (
                    <MenuItem key={item.id} value={item.id.toString()}>
                      {item.city_name}
                    </MenuItem>
                  )
                })}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <Typography variant="h6">Province</Typography>
              <Select
                displayEmpty
                fullWidth
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={provinceId?.toString()}
                sx={{ textAlign: 'left' }}
                label="Province"
                onChange={(e: SelectChangeEvent) =>
                  setProvinceId(Number(e.target.value))
                }
              >
                {provinces.map((item: Province) => {
                  return (
                    <MenuItem key={item.id} value={item.id}>
                      {item.province_name}
                    </MenuItem>
                  )
                })}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <Typography variant="h6">Region</Typography>
              <Select
                displayEmpty
                fullWidth
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={regionId?.toString()}
                sx={{ textAlign: 'left' }}
                onChange={(e: SelectChangeEvent) =>
                  setRegionId(Number(e.target.value))
                }
              >
                {regions.map((item: Region) => {
                  return (
                    <MenuItem key={item.id} value={item.id}>
                      {item.region_name}
                    </MenuItem>
                  )
                })}
              </Select>
            </FormControl>
          </Box>
        )}
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          p: 4,
        }}
      >
        {!isEditting ? (
          <Button
            sx={{ borderRadius: '32px' }}
            variant="contained"
            onClick={() => setIsEditting(true)}
          >
            Edit
          </Button>
        ) : (
          <ButtonGroup>
            <Button
              sx={{ borderRadius: '32px' }}
              variant="contained"
              onClick={() => setIsEditting(false)}
            >
              Cancel
            </Button>
            <CTAButton
              label="Save"
              handleClick={handleSave}
              loading={isButtonLoading}
              styles={{ borderRadius: '32px' }}
            />
            {/* <Button
              sx={{ borderRadius: '32px' }}
              variant="contained"
              color="secondary"
              onClick={handleSave}
            >
              Save
            </Button> */}
          </ButtonGroup>
        )}
      </Box>
    </AccountCard>
  )
}

export default AccountViewProfile
