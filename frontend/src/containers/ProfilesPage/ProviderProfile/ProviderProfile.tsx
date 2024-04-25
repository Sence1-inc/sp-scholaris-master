import { Box, Container, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axiosInstance from '../../../axiosConfig'
import AccountClose from '../../../components/AccountCard/AccountClose'
import AccountProfile from '../../../components/AccountCard/AccountProfile'
import AccountSecurity from '../../../components/AccountCard/AccountSecurity'
import AccountSettings from '../../../components/AccountCard/AccountSettings'
import AccountSideBar from '../../../components/AccountCard/AccountSideBar'
import AccountViewProfile from '../../../components/AccountCard/AccountViewProfile'
import CustomSnackbar from '../../../components/CustomSnackbar/CustomSnackbar'
import { useAppSelector } from '../../../redux/store'
import { ScholarshipProvider } from '../../../redux/types'
import profileTheme from '../../../styles/profileTheme'

interface Subscriber {
  id: number
  email: string
  user_type: string
  subscribed_at: string
}

const ProviderProfile: React.FC = () => {
  const [activeContent, setActiveContent] = useState<string>('view-profile')
  const { lastRoute } = useParams()
  const data: any = useAppSelector((state) => state.persistedReducer.profile)
  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false)
  const [successMessage, setSuccessMessage] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [warningMessage, setWarningMessage] = useState<string>('')
  const user = useAppSelector((state) => state.persistedReducer.user)
  const [subscriber, setSubscriber] = useState<Subscriber | null>(null)

  useEffect(() => {
    const getSubscriber = async () => {
      const subscriber = await axiosInstance.get(
        `api/v1/subscribers/${user.id}`
      )

      if (subscriber.data) {
        setSubscriber(subscriber.data)
      }
    }

    getSubscriber()
  }, [user])

  const handleUnsubscribe = async () => {
    try {
      const response = await axiosInstance.post(
        `api/v1/subscribers/soft_delete`,
        { id: subscriber?.id },
        { withCredentials: true }
      )

      if (response.status === 200) {
        setSuccessMessage(response.data.message)
        setErrorMessage('')
        setIsSnackbarOpen(true)
      } else {
        setIsSnackbarOpen(true)
        setSuccessMessage('')
        setErrorMessage(
          `Error: ${response.data.error}. ${response.data.details.join(' ')}`
        )
      }
    } catch (error: any) {
      if (error) {
        setIsSnackbarOpen(true)
        setSuccessMessage('')
        if (axios.isAxiosError(error)) {
          if (error.response) {
            if (error.response.status === 404) {
              setErrorMessage('Email already unsubscribed.')
            } else {
              const errorDetails = error.response.data?.details
                ? error.response.data.details.join(' ')
                : ''
              const errorMessage = `Error: ${error.response.data?.error || 'Unsubscribing failed'}. ${errorDetails}`
              setErrorMessage(errorMessage)
            }
          } else if (error.request) {
            setErrorMessage(
              'No response from server. Please check your network connection.'
            )
          } else {
            setErrorMessage('Error setting up unsubscribe request.')
          }
        } else {
          setErrorMessage('Error Unsubscribing. Please try again.')
        }
      }
    }
  }

  return (
    <Box sx={profileTheme.container.rootContainer}>
      <CustomSnackbar
        successMessage={successMessage}
        errorMessage={errorMessage}
        warningMessage={warningMessage}
        handleWarningProceed={handleUnsubscribe}
        isSnackbarOpen={isSnackbarOpen}
        handleSetIsSnackbarOpen={(value) => setIsSnackbarOpen(value)}
      />
      <Container>
        <Typography sx={profileTheme.heading.mainHeading}>
          Account Profile
        </Typography>
        <Box sx={profileTheme.container.mainContainer}>
          <AccountSideBar
            activeContent={activeContent}
            setActiveContent={setActiveContent}
            id={user.id.toString()}
            provider={data.profile.scholarship_provider as ScholarshipProvider}
          />
          {activeContent && lastRoute === 'view-profile' && (
            <AccountViewProfile
              handleSetSuccessMessage={(value) => setSuccessMessage(value)}
              handleSetErrorMessage={(value) => setErrorMessage(value)}
              handleSetIsSnackbarOpen={(value) => setIsSnackbarOpen(value)}
            />
          )}
          {activeContent && lastRoute === 'account-profile' && (
            <AccountProfile
              handleSetSuccessMessage={(value) => setSuccessMessage(value)}
              handleSetErrorMessage={(value) => setErrorMessage(value)}
              handleSetIsSnackbarOpen={(value) => setIsSnackbarOpen(value)}
            />
          )}
          {activeContent && lastRoute === 'account-security' && (
            <AccountSecurity />
          )}
          {/* { activeContent && lastRoute === 'account-subscription' && <AccountSubscription />} */}
          {activeContent && lastRoute === 'account-settings' && (
            <AccountSettings
              handleSetSuccessMessage={(value) => setSuccessMessage(value)}
              handleSetErrorMessage={(value) => setErrorMessage(value)}
              handleSetWarningMessage={(value) => setWarningMessage(value)}
              handleSetIsSnackbarOpen={(value) => setIsSnackbarOpen(value)}
            />
          )}
          {activeContent && lastRoute === 'close-account' && <AccountClose />}
        </Box>
      </Container>
    </Box>
  )
}

export default ProviderProfile
