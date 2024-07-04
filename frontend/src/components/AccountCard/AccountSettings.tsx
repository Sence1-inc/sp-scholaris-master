import { Box, Button, FormGroup, InputLabel, TextField } from '@mui/material'
import React from 'react'
import { useParams } from 'react-router-dom'
import axiosInstance from '../../axiosConfig'
import { initializeSubscirber } from '../../redux/reducers/SubscriberReducer'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { ctaButtonStyle } from '../../styles/globalStyles'
import profileTheme from '../../styles/profileTheme'
import AccountCard from './AccountCard'

interface AccountSettingsProps {
  handleSetIsSnackbarOpen: (value: boolean) => void
  handleSetSuccessMessage: (value: string) => void
  handleSetErrorMessage: (value: string) => void
  handleSetWarningMessage: (value: string) => void
  handleSetInfoMessage: (value: string) => void
}

const AccountSettings: React.FC<AccountSettingsProps> = ({
  handleSetIsSnackbarOpen,
  handleSetSuccessMessage,
  handleSetWarningMessage,
  handleSetInfoMessage,
  handleSetErrorMessage,
}) => {
  const user = useAppSelector((state) => state.persistedReducer.user)
  const { id } = useParams()
  const dispatch = useAppDispatch()

  const handleSubscribe: (
    e: React.MouseEvent<HTMLButtonElement>
  ) => void = async (e) => {
    e.preventDefault()

    try {
      const subscriber = await axiosInstance.get(`api/v1/subscribers/${id}`)

      if (subscriber.status === 201) {
        const response = await axiosInstance.post(
          `api/v1/subscribers/restore`,
          {
            id: subscriber.data.id,
          }
        )
        handleSetWarningMessage('')
        handleSetInfoMessage('')
        if (response.status === 200) {
          const successData = response.data
          dispatch(initializeSubscirber(successData.subscriber))
          handleSetSuccessMessage(successData.message)
          handleSetErrorMessage('')
          handleSetIsSnackbarOpen(true)
        } else {
          const errorData = response.data
          dispatch(
            initializeSubscirber({
              email: '',
              user_type: '',
            })
          )
          handleSetIsSnackbarOpen(true)
          handleSetSuccessMessage('')
          handleSetErrorMessage(errorData.message)
        }
      }
    } catch (error: any) {
      handleSetWarningMessage('')
      handleSetIsSnackbarOpen(false)
      if (error.response && error.response.status === 404) {
        handleSetErrorMessage('')
        handleSetSuccessMessage('')
        handleSetInfoMessage('Subscribing, please wait.')
        handleSetIsSnackbarOpen(true)
        const response = await axiosInstance.post(`api/v1/subscribers`, {
          email: user.email_address,
          user_type: 'provider',
        })
        if (response.status === 201) {
          handleSetIsSnackbarOpen(false)
          const successData = response.data
          dispatch(initializeSubscirber(successData.subscriber))
          handleSetSuccessMessage(successData.message)
          handleSetErrorMessage('')
          handleSetIsSnackbarOpen(true)
          handleSetInfoMessage('')
        } else {
          handleSetIsSnackbarOpen(false)
          const errorData = response.data
          dispatch(
            initializeSubscirber({
              email: '',
              user_type: '',
            })
          )
          handleSetIsSnackbarOpen(true)
          handleSetSuccessMessage('')
          handleSetErrorMessage(errorData.message)
          handleSetInfoMessage('')
        }
      } else {
        handleSetIsSnackbarOpen(true)
        handleSetSuccessMessage('')
        handleSetWarningMessage('')
        handleSetErrorMessage(error.response.data.message)
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
              handleSetInfoMessage('')
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
