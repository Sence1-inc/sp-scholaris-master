import {
  Autocomplete,
  Box,
  Button,
  ButtonGroup,
  FormControl,
  FormGroup,
  InputLabel,
  TextField,
  Typography,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import axiosInstance from '../../axiosConfig'
import { initializeProfile } from '../../redux/reducers/ProfileReducer'
import { useAppSelector } from '../../redux/store'
import { Profile } from '../../redux/types'
import profileTheme from '../../styles/profileTheme'
import CustomSnackbar from '../CustomSnackbar/CustomSnackbar'
import AccountCard from './AccountCard'

export interface ProfileData {
  profile: Profile
}

type PhAddress = {
  id: number
  city: string
  province: string
  region: string
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
  const [phAddresses, setPhAddresses] = useState<PhAddress[] | []>([])
  const [selectedPhAddress, setSelectedPhAddress] = useState<PhAddress | null>(
    null
  )
  const [details, setDetails] = useState<string>('')
  const [link, setLink] = useState<string>('')
  const [isEditting, setIsEditting] = useState<boolean>(false)
  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

  useEffect(() => {
    if (profile) {
      setProviderName(profile.scholarship_provider?.provider_name ?? '')
      setSelectedPhAddress(profile.ph_address)
      setDetails(profile?.description ?? '')
      setLink(profile?.scholarship_provider.provider_link ?? '')
    }
  }, [profile])

  const handleSave = async () => {
    const data = {
      provider_link: link,
      provider_name: providerName,
      user_id: user.id,
      ph_address_id: selectedPhAddress?.id,
      description: details,
    }

    try {
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
      handleSetSuccessMessage('Successfully saved!')
      handleSetErrorMessage('')
      handleSetIsSnackbarOpen(true)
      dispatch(initializeProfile({ ...response.data.profile }))
    } catch (error) {
      if (error) {
        handleSetIsSnackbarOpen(true)
        handleSetSuccessMessage('')
        handleSetErrorMessage('Error saving details')
      }
    }
  }

  useEffect(() => {
    const getPhAddresses = async () => {
      try {
        const response = await axiosInstance.get('/api/v1/ph_addresses', {
          withCredentials: true,
        })
        if (response) {
          setPhAddresses(response.data)
        }
      } catch (error: any) {
        setIsSnackbarOpen(true)
        setErrorMessage(error.response.data.error)
      }
    }

    getPhAddresses()
  }, [])

  const handleAddressChange = (e: any, value: any) => {
    setSelectedPhAddress(value)
  }

  return (
    <AccountCard
      heading="Account View Profile"
      subHeading="Check and edit your organization account information"
    >
      <CustomSnackbar
        errorMessage={errorMessage}
        isSnackbarOpen={isSnackbarOpen}
        handleSetIsSnackbarOpen={(value) => setIsSnackbarOpen(value)}
      />
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
          <Typography sx={profileTheme.text.textRegular}>
            {selectedPhAddress
              ? `${selectedPhAddress?.city}, ${selectedPhAddress?.province}, ${selectedPhAddress?.region}`
              : ''}
          </Typography>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <FormControl fullWidth>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={phAddresses}
                getOptionLabel={(option: PhAddress) =>
                  `${option.city}, ${option.province}, ${option.region}`
                }
                value={selectedPhAddress}
                onChange={handleAddressChange}
                renderOption={(props, option) => (
                  <li {...props} key={option.id}>
                    {option.city}, {option.province}, {option.region}
                  </li>
                )}
                renderInput={(params) => (
                  <TextField sx={{ padding: '0' }} {...params} fullWidth />
                )}
                fullWidth
                ListboxProps={{ style: { maxHeight: 150 } }}
              />
            </FormControl>
          </Box>
        )}
      </Box>
      <FormGroup sx={profileTheme.form.formStyle}>
        <InputLabel htmlFor="account-details" sx={profileTheme.form.formLabel}>
          Provider Details
        </InputLabel>
        {isEditting ? (
          <TextField
            id="account-details"
            value={details}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setDetails(e.target.value)
            }
            sx={profileTheme.form.formInput}
            minRows={6}
            multiline
          />
        ) : (
          <Typography sx={profileTheme.text.textRegular}>{details}</Typography>
        )}
      </FormGroup>
      <FormGroup>
        <InputLabel htmlFor="account-link">Organization Link</InputLabel>
        {isEditting ? (
          <TextField
            id="account-link"
            value={link}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setLink(e.target.value)
            }
            sx={profileTheme.form.formInput}
          />
        ) : (
          <Typography sx={profileTheme.text.textRegular}>{link}</Typography>
        )}
        <Typography variant="subtitle1">
          {link
            ? 'This is the link where students can learn more about your organization.'
            : 'Please provide a link where students can learn more about your organization.'}
        </Typography>
      </FormGroup>
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
