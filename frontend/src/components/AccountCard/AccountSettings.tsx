import { Box, Button, FormGroup, InputLabel, TextField } from '@mui/material'
import { AxiosResponse } from 'axios'
import React from 'react'
import axiosInstance from '../../axiosConfig'
import {
  ErrorResponse,
  SuccessResponse,
} from '../../components/Newsletter/Newsletter'
import { useAppSelector } from '../../redux/store'
import { ctaButtonStyle } from '../../styles/globalStyles'
import profileTheme from '../../styles/profileTheme'
import AccountCard from './AccountCard'

interface AccountSettingsProps {
  handleSetIsSnackbarOpen: (value: boolean) => void
  handleSetSuccessMessage: (value: string) => void
  handleSetErrorMessage: (value: string) => void
  handleSetWarningMessage: (value: string) => void
}

const AccountSettings: React.FC<AccountSettingsProps> = ({
  handleSetIsSnackbarOpen,
  handleSetSuccessMessage,
  handleSetWarningMessage,
  handleSetErrorMessage,
}) => {
  const user = useAppSelector((state) => state.persistedReducer.user)

  const handleSubscribe: (
    e: React.MouseEvent<HTMLButtonElement>
  ) => void = async (e) => {
    e.preventDefault()

    try {
      const response: AxiosResponse<SuccessResponse | ErrorResponse> =
        await axiosInstance.post(`api/v1/subscribers/restore`, { id: 1 })

      if (response.status === 200) {
        const successData = response.data as SuccessResponse
        handleSetSuccessMessage(successData.message)
        handleSetErrorMessage('')
        handleSetIsSnackbarOpen(true)
      } else {
        const errorData = response.data as ErrorResponse
        handleSetIsSnackbarOpen(true)
        handleSetSuccessMessage('')
        handleSetErrorMessage(
          `Error: ${errorData.error}. ${errorData.details.join(' ')}`
        )
      }
    } catch (error) {
      handleSetIsSnackbarOpen(true)
      handleSetSuccessMessage('')
      handleSetErrorMessage('Error Subscribing. Please try again.')
    }
  }

  return (
    <AccountCard
      heading="Account Settings"
      subHeading="Edit your account billing and subscription in here"
    >
      <FormGroup sx={profileTheme.form.formStyle}>
        <InputLabel htmlFor="account-name" sx={profileTheme.form.formLabel}>
          Newsletter Email
        </InputLabel>
        <TextField
          disabled
          id="account-name"
          value={user.email_address}
          sx={profileTheme.form.formInput}
        />
        <Box sx={profileTheme.box.boxBodyStyle2}>
          <Button
            variant="contained"
            sx={ctaButtonStyle}
            onClick={handleSubscribe}
          >
            Subscribe
          </Button>
          <Button
            variant="contained"
            sx={ctaButtonStyle}
            onClick={(e: any) => {
              handleSetSuccessMessage('')
              handleSetErrorMessage('')
              handleSetIsSnackbarOpen(true)
              handleSetWarningMessage('Are you sure you want to unsubscribe?')
            }}
          >
            Unsubscribe
          </Button>
        </Box>
      </FormGroup>
    </AccountCard>
  )
}

export default AccountSettings
