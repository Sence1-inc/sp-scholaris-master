import {
  Box,
  Button,
  ButtonGroup,
  FormGroup,
  InputLabel,
  TextField,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import axiosInstance from '../../axiosConfig'
import { initializeProfile } from '../../redux/reducers/ProfileReducer'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import profileTheme from '../../styles/profileTheme'
import AccountCard from './AccountCard'
import { ProfileData } from './AccountViewProfile'

const AccountProfile: React.FC = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.user)
  const data = useAppSelector((state) => state.profile)
  const { profile } = data as ProfileData
  const [isEditting, setIsEditting] = useState<boolean>(false)
  const [details, setDetails] = useState<string>('')
  const [link, setLink] = useState<string>('')

  const handleSave = async () => {
    const data = {
      provider_name: profile?.scholarship_provider?.provider_name ?? '',
      description: details,
      provider_link: link,
      user_id: user.id,
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

      dispatch(initializeProfile({ ...response.data.profile }))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (Object.keys(profile).length > 0) {
      setDetails(profile?.description ?? '')
      setLink(profile?.scholarship_provider.provider_link ?? '')
    }
  }, [profile])
  return (
    <AccountCard
      heading="Account Profile"
      subHeading="Edit your account profile and change your profile contents and image here."
    >
      <FormGroup sx={profileTheme.form.formStyle}>
        <InputLabel htmlFor="account-details" sx={profileTheme.form.formLabel}>
          Account Details
        </InputLabel>
        <TextField
          disabled={!isEditting}
          id="account-details"
          value={details}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setDetails(e.target.value)
          }
          sx={profileTheme.form.formInput}
        />
      </FormGroup>
      <FormGroup>
        <InputLabel htmlFor="account-link">Organization Link</InputLabel>
        <TextField
          disabled={!isEditting}
          id="account-link"
          value={link}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setLink(e.target.value)
          }
          sx={profileTheme.form.formInput}
        />
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

export default AccountProfile
