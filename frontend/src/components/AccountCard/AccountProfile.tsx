import {
  Box,
  Button,
  ButtonGroup,
  FormGroup,
  InputLabel,
  TextField,
  Typography,
} from '@mui/material'
import React from 'react'
import axiosInstance, { CustomApiError } from '../../axiosConfig'
import { initializeUser } from '../../redux/reducers/UserReducer'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import profileTheme from '../../styles/profileTheme'
import AccountCard from './AccountCard'
import { ProfileData } from './AccountViewProfile'

interface AccountProfileProps {
  handleSetIsSnackbarOpen: (value: boolean) => void
  handleSetSuccessMessage: (value: string) => void
  handleSetErrorMessage: (value: string) => void
}

interface ProfileFormData {
  details: string
  link: string
}

const AccountProfile: React.FC<AccountProfileProps> = ({
  handleSetIsSnackbarOpen,
  handleSetSuccessMessage,
  handleSetErrorMessage,
}) => {
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.user)
  const { profile } = useAppSelector((state) => state.profile) as ProfileData
  
  const [isEditing, setIsEditing] = React.useState(false)
  const [formData, setFormData] = React.useState<ProfileFormData>({
    details: '',
    link: ''
  })

  const handleInputChange = (field: keyof ProfileFormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value
    }))
  }

  const handleSave = async () => {
    const payload = {
      provider_name: profile?.scholarship_provider?.provider_name ?? '',
      description: formData.details,
      provider_link: formData.link,
      user_id: user.id,
    }

    try {
      const endpoint = profile.id 
        ? `/api/v1/scholarship_provider_profiles/${profile.id}`
        : '/api/v1/scholarship_provider_profiles'
      
      const method = profile.id ? 'put' : 'post'
      const response = await axiosInstance[method](endpoint, payload)

      dispatch(initializeUser({ ...user, profile: response.data.profile }))
      handleSetSuccessMessage('Successfully saved!')
      handleSetErrorMessage('')
      handleSetIsSnackbarOpen(true)
      setIsEditing(false)
    } catch (error) {
      if (error instanceof CustomApiError) {
        handleSetSuccessMessage('')
        handleSetErrorMessage(error.response?.data?.message)
        handleSetIsSnackbarOpen(true)
      }
    }
  }

  const renderTextField = (
    id: string,
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    multiline?: boolean
  ) => (
    <TextField
      id={id}
      value={value}
      onChange={onChange}
      sx={profileTheme.form.formInput}
      minRows={multiline ? 6 : undefined}
      multiline={multiline}
    />
  )

  React.useEffect(() => {
    if (Object.keys(profile).length > 0) {
      setFormData({
        details: profile?.description ?? '',
        link: profile?.scholarship_provider.provider_link ?? ''
      })
    }
  }, [profile])

  return (
    <AccountCard
      heading="Account Profile"
      subHeading="Edit your account profile and change your profile contents and image here."
    >
      <FormGroup sx={profileTheme.form.formStyle}>
        <InputLabel htmlFor="account-details" sx={profileTheme.form.formLabel}>
          Provider Details
        </InputLabel>
        {isEditing ? (
          renderTextField('account-details', formData.details, handleInputChange('details'), true)
        ) : (
          <Typography sx={profileTheme.text.textRegular}>{formData.details}</Typography>
        )}
      </FormGroup>

      <FormGroup>
        <InputLabel htmlFor="account-link">Organization Link</InputLabel>
        {isEditing ? (
          renderTextField('account-link', formData.link, handleInputChange('link'))
        ) : (
          <Typography sx={profileTheme.text.textRegular}>{formData.link}</Typography>
        )}
        <Typography variant="subtitle1">
          {formData.link
            ? 'This is the link where students can learn more about your organization.'
            : 'Please provide a link where students can learn more about your organization.'}
        </Typography>
      </FormGroup>

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', p: 4 }}>
        {!isEditing ? (
          <Button
            sx={{ borderRadius: '32px' }}
            variant="contained"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </Button>
        ) : (
          <ButtonGroup>
            <Button
              sx={{ borderRadius: '32px' }}
              variant="contained"
              onClick={() => setIsEditing(false)}
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
