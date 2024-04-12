import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { City, Profile, Province, Region } from '../../redux/types'
import profileTheme from '../../styles/profileTheme'
import AccountCard from './AccountCard'
import axiosInstance from '../../axiosConfig'
import { useAppSelector } from '../../redux/store'
import { useDispatch } from 'react-redux'
import { initializeProfile } from '../../redux/reducers/ProfileReducer'

export interface ProfileData {
  profile: Profile
}

const AccountViewProfile: React.FC = () => {
  const dispatch = useDispatch()
  const user = useAppSelector((state) => state.user)
  const data = useAppSelector((state) => state.profile)
  const { profile } = data as ProfileData
  const [providerName, setProviderName] = useState<string>('')
  const [cityName, setCityName] = useState<string>('')
  const [provinceName, setProvinceName] = useState<string>('')
  const [regionName, setRegionName] = useState<string>('')
  const [cityId, setCityId] = useState<number | null>(null)
  const [provinceId, setProvinceId] = useState<number | null>(null)
  const [regionId, setRegionId] = useState<number | null>(null)
  const [providerType, setProviderType] = useState<string>('')
  const [isEditting, setIsEditting] = useState<boolean>(false)
  const [cities, setCities] = useState<City[] | []>([])
  const [provinces, setProvinces] = useState<Province[] | []>([])
  const [regions, setRegions] = useState<Region[] | []>([])

  useEffect(() => {
    if (profile) {
      setProviderName(profile.scholarship_provider.provider_name)
      setCityName(profile.city.city_name)
      setProvinceName(profile.province.province_name)
      setRegionName(profile.region.region_name)
      setCityId(profile.city.id)
      setProvinceId(profile.province.id)
      setRegionId(profile.region.id)
      setProviderType(profile.provider_type)
    }
  }, [profile])

  const handleSave = async () => {
    const data = {
      provider_link: profile.scholarship_provider.provider_link,
      provider_name: providerName,
      region_id: regionId,
      province_id: provinceId,
      city_id: cityId,
      user_id: user.id,
    }

    try {
      const response = await axiosInstance.put(
        `/api/v1/scholarship_provider_profiles/${profile.id}`,
        data
      )
      dispatch(initializeProfile({ ...response.data.profile }))
    } catch (error) {
      console.log(error)
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
        console.log('Error in fetching cities : ', error)
      }
    }

    const getProvinces = async () => {
      try {
        const response = await axiosInstance.get('/api/v1/provinces')
        if (response) {
          setProvinces(response.data)
        }
      } catch (error) {
        console.log('Error in fetching provinces : ', error)
      }
    }

    const getRegions = async () => {
      try {
        const response = await axiosInstance.get('/api/v1/regions')
        if (response) {
          setRegions(response.data)
        }
      } catch (error) {
        console.log('Error in fetching regions : ', error)
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
          >{`${cityName}, ${provinceName}, ${regionName}`}</Typography>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            <FormControl fullWidth sx={{ paddingTop: '40px' }}>
              <InputLabel
                variant="standard"
                sx={{
                  top: '8px',
                  fontSize: '24px',
                  fontWeight: '700',
                }}
              >
                City
              </InputLabel>
              <Select
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
              <InputLabel
                variant="standard"
                sx={{
                  top: '-28px',
                  fontSize: '24px',
                  fontWeight: '700',
                }}
              >
                Province
              </InputLabel>
              <Select
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
              <InputLabel
                variant="standard"
                sx={{
                  top: '-30px',
                  fontSize: '24px',
                  fontWeight: '700',
                }}
              >
                Region
              </InputLabel>
              <Select
                fullWidth
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={regionId?.toString()}
                sx={{ textAlign: 'left' }}
                // label="Region"
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
            <Button
              sx={{ borderRadius: '32px' }}
              variant="contained"
              color="secondary"
              onClick={handleSave}
            >
              Save
            </Button>
          </ButtonGroup>
        )}
      </Box>
    </AccountCard>
  )
}

export default AccountViewProfile
