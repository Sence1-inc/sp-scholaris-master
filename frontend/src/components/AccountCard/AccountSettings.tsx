import { Box, FormGroup, InputLabel, TextField } from '@mui/material'
import Alert from '@mui/material/Alert'
import { AxiosResponse } from 'axios'
import React, { useEffect, useState } from 'react'
import axiosInstance from '../../axiosConfig'
import {
  ErrorResponse,
  SuccessResponse,
} from '../../components/Newsletter/Newsletter'
import { useAppSelector } from '../../redux/store'
import profileTheme from '../../styles/profileTheme'
import Button from '../Button/Button'
import AccountCard from './AccountCard'

const AccountSettings: React.FC = () => {
  const user = useAppSelector((state) => state.persistedReducer.user)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [alertMessage, setAlertMessage] = useState<string>('')

  useEffect(() => {
    if (alertMessage || errorMessage) {
      setTimeout(() => {
        setAlertMessage('')
        setErrorMessage('')
      }, 4000)
    }
  }, [alertMessage, errorMessage])

  const handleSubscribe: (
    e: React.MouseEvent<HTMLButtonElement>
  ) => void = async (e) => {
    e.preventDefault()

    try {
      const response: AxiosResponse<SuccessResponse | ErrorResponse> =
        await axiosInstance.post(`api/v1/subscribers/restore`, { id: 1 })

      if (response.status === 200) {
        const successData = response.data as SuccessResponse
        setAlertMessage(successData.message)
      } else {
        const errorData = response.data as ErrorResponse
        setErrorMessage(
          `Error: ${errorData.error}. ${errorData.details.join(' ')}`
        )
      }
    } catch (error) {
      setErrorMessage('Error Subscribing. Please try again.')
    }
  }

  const handleUnsubscribe: (
    e: React.MouseEvent<HTMLButtonElement>
  ) => void = async (e) => {
    e.preventDefault()

    try {
      const response: AxiosResponse<SuccessResponse | ErrorResponse> =
        await axiosInstance.post(
          `api/v1/subscribers/soft_delete`,
          { id: 1 },
          { withCredentials: true }
        )

      if (response.status === 200) {
        const successData = response.data as SuccessResponse
        setAlertMessage(successData.message)
      } else {
        const errorData = response.data as ErrorResponse
        setErrorMessage(
          `Error: ${errorData.error}. ${errorData.details.join(' ')}`
        )
      }
    } catch (error: any) {
      if (error.response.status === 404) {
        setErrorMessage('Email already unsubscribed.')
      } else {
        setErrorMessage('Error Unsubscribing. Please try again.')
      }
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
        {alertMessage ? (
          <Alert sx={{ marginTop: 2 }} severity="success">
            {alertMessage}
          </Alert>
        ) : (
          errorMessage && (
            <Alert sx={{ marginTop: 2 }} severity="error">
              {errorMessage}
            </Alert>
          )
        )}
        <Box sx={profileTheme.box.boxBodyStyle2}>
          <Button handleClick={handleSubscribe}>Subscribe</Button>
          <Button handleClick={handleUnsubscribe}>Unsubscribe</Button>
        </Box>
      </FormGroup>
    </AccountCard>
  )
}

export default AccountSettings
