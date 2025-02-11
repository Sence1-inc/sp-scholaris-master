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
import axiosInstance, { CustomApiError } from '../../axiosConfig'
import { useSnackbar } from '../../context/SnackBarContext'
import { initializeUser } from '../../redux/reducers/UserReducer'
import { useAppSelector } from '../../redux/store'
import { Profile, User } from '../../redux/types'
import profileTheme from '../../styles/profileTheme'
import HelperText from '../HelperText/HelperText'
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
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

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
            data
          )
        : await axiosInstance.post(
            '/api/v1/scholarship_provider_profiles',
            data
          )
      const response = api
      showMessage('Successfully saved!', 'success')
      dispatch(initializeUser({ ...user, profile: response.data.profile }))
    } catch (error) {
      if (error instanceof CustomApiError) {
        showMessage(error.message, 'error')
        const formattedErrors = Object.fromEntries(
          Object.entries(error.response?.data ?? {}).map(([key, value]) => [
            key,
            Array.isArray(value) ? value[0] : value
          ])
        )
        setErrors(formattedErrors)
      }
    }
  }

  /**
   * @function loadAddresses
   * @description Loads the addresses of the user.
   * @param {string} searchQuery - The search query.
   * @returns {void}
   */
  const loadAddresses = async (searchQuery: string) => {
    try {
      setLoading(true)
      const response = await axiosInstance.get('/api/v1/ph_addresses', {
        params: {
          search: searchQuery,
          per_page: 20
        }
      })
      if (response?.data) {
        setPhAddresses(response.data)
      }
    } catch (error) {
      if (error instanceof CustomApiError) {
        showMessage(error.response?.data?.error ?? 'An error occurred', 'error')
      }
    } finally {
      setLoading(false)
    }
  }

  /**
   * @function handleAddressChange
   * @description Handles the address change of the user.
   * @param {React.SyntheticEvent} _event - The event object.
   * @param {PhAddress | null} value - The selected address value.
   * @returns {void}
   */
  const handleAddressChange = (
    _event: React.SyntheticEvent,
    value: PhAddress | null
  ) => {
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
                open={open}
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}
                loading={loading}
                disablePortal
                options={phAddresses}
                getOptionLabel={(option: PhAddress) =>
                  `${option.city}, ${option.province}, ${option.region}`
                }
                value={selectedPhAddress}
                onChange={handleAddressChange}
                onInputChange={(_, newInputValue) => {
                  if (newInputValue.length >= 3) {
                    loadAddresses(newInputValue)
                  }
                }}
                renderOption={(props, option) => (
                  <li {...props} key={option.id}>
                    {option.city}, {option.province}, {option.region}
                  </li>
                )}
                renderInput={(params) => (
                  <TextField 
                    {...params} 
                    fullWidth
                    placeholder="Type at least 3 characters to search"
                  />
                )}
                ListboxProps={{ style: { maxHeight: 250 } }}
              />
              {errors.ph_address && <HelperText error={`Address ${errors.ph_address}`} />}
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
