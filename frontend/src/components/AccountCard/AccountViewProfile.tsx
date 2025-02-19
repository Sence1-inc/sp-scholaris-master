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
import React, { SyntheticEvent, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import axiosInstance from '../../axiosConfig'
import { useSnackbar } from '../../context/SnackBarContext'
import { initializeUser } from '../../redux/reducers/UserReducer'
import { useAppSelector } from '../../redux/store'
import { Profile, User } from '../../redux/types'
import profileTheme from '../../styles/profileTheme'
import AccountCard from './AccountCard'

/**
 * @interface ProfileData
 * @description Represents the profile data for the user.
 * @property {Profile} profile - The profile data for the user.
 */
export interface ProfileData {
  profile: Profile
}

/**
 * @type PhAddress
 * @description Represents the profile data for the user.
 * @property {number} id - The id of the address.
 * @property {string} city - The city of the address.
 * @property {string} province - The province of the address.
 * @property {string} region - The region of the address.
 */
type PhAddress = {
  id: number
  city: string
  province: string
  region: string
}

const AccountViewProfile: React.FC = () => {
  const dispatch = useDispatch()
  const user: User = useAppSelector((state) => state.user)
  const { showMessage } = useSnackbar()
  const [providerName, setProviderName] = useState<string>('')
  const [phAddresses, setPhAddresses] = useState<PhAddress[] | []>([])
  const [selectedPhAddress, setSelectedPhAddress] = useState<PhAddress | null>(
    null
  )
  const [details, setDetails] = useState<string>('')
  const [link, setLink] = useState<string>('')
  const [isEditting, setIsEditting] = useState<boolean>(false)

  /**
   * @function useEffect
   * @description Fetches the profile data of the user.
   * @param {User} user - The user object.
   * @returns {void}
   */
  useEffect(() => {
    if (user) {
      setProviderName(user.profile?.scholarship_provider?.provider_name ?? '')
      setSelectedPhAddress(user.profile?.ph_address ?? null)
      setDetails(user?.profile?.description ?? '')
      setLink(user?.profile?.scholarship_provider?.provider_link ?? '')
    }
    // eslint-disable-next-line
  }, [user])

  /**
   * @function handleSave
   * @description Saves the profile data of the user.
   * @returns {void}
   */
  const handleSave = async () => {
    const data = {
      provider_link: link,
      provider_name: providerName,
      user_id: user.id,
      ph_address_id: selectedPhAddress?.id,
      description: details,
    }

    try {
      const api = user.profile?.id
        ? await axiosInstance.put(
            `/api/v1/scholarship_provider_profiles/${user.profile?.id}`,
            data,
            { withCredentials: true }
          )
        : await axiosInstance.post(
            '/api/v1/scholarship_provider_profiles',
            data,
            { withCredentials: true }
          )
      const response = api
      showMessage('Successfully saved!', 'success')
      dispatch(initializeUser({ ...user, profile: response.data.profile }))
    } catch (error: any) {
      if (error) {
        showMessage(error.response.data.message, 'success')
      }
    }
  }

  /**
   * @function useEffect
   * @description Fetches the ph addresses of the user.
   * @returns {void}
   */
  useEffect(() => {
    // Fetch the ph addresses
    const getPhAddresses = async () => {
      try {
        const response = await axiosInstance.get('/api/v1/ph_addresses', {
          withCredentials: true,
        })
        if (response) {
          setPhAddresses(response.data)
        }
      } catch (error: any) {
        showMessage(error.response.data.error, 'error')
      }
    }

    getPhAddresses()
    // eslint-disable-next-line
  }, [])

  /**
   * @function handleAddressChange
   * @description Handles the address change of the user.
   * @param {React.ChangeEvent<HTMLInputElement>} e - The event object.
   * @param {PhAddress | null} value - The selected address value.
   * @returns {void}
   */
  const handleAddressChange = (_e: SyntheticEvent<Element, Event>, value: PhAddress | null) => {
    setSelectedPhAddress(value)
  }

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
                onChange={(_e: SyntheticEvent<Element, Event>, value: PhAddress | null) =>
                  handleAddressChange(_e, value)
                }
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
      {(!user?.parent_id ||
        (user?.parent_id &&
          user?.parent_id !== Number(process.env.REACT_PARENT_ID))) && (
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
              id="edit-provider-account"
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
      )}
    </AccountCard>
  )
}

export default AccountViewProfile
