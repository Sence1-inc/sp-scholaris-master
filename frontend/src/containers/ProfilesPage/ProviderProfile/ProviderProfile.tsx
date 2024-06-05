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
import { initializeSubscirber } from '../../../redux/reducers/SubscriberReducer'
import { useAppDispatch, useAppSelector } from '../../../redux/store'
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
  const subscr: any = useAppSelector(
    (state) => state.persistedReducer.subscriber
  )
  const data: any = useAppSelector((state) => state.persistedReducer.profile)
  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false)
  const [successMessage, setSuccessMessage] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [warningMessage, setWarningMessage] = useState<string>('')
  const [infoMessage, setInfoMessage] = useState<string>('')
  const user = useAppSelector((state) => state.persistedReducer.user)
  const dispatch = useAppDispatch()

  const getSubscriber = async () => {
    if (user.scholarship_provider.id) {
      try {
        const subs = await axiosInstance.get(
          `api/v1/subscribers/${user.scholarship_provider.id}`
        )

        if (subs.data) {
          dispatch(initializeSubscirber(subs.data))
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  useEffect(() => {
    if (user) {
      getSubscriber()
    }

    // eslint-disable-next-line
  }, [user])

  const handleUnsubscribe = async () => {
    getSubscriber()
    if (!subscr.deleted_at) {
      try {
        const response = await axiosInstance.post(
          `api/v1/subscribers/soft_delete`,
          { id: subscr?.id },
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
                const errorMessage = `${error.response.data?.message || 'Unsubscribing failed'}. ${errorDetails}`
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
    } else {
      setErrorMessage('Not yet a subscriber, please subscribe.')
    }
  }

  return (
    <Box sx={profileTheme.container.rootContainer}>
      <CustomSnackbar
        successMessage={successMessage}
        errorMessage={errorMessage}
        warningMessage={warningMessage}
        infoMessage={infoMessage}
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
            id={user.scholarship_provider.id.toString()}
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
              handleSetInfoMessage={(value) => setInfoMessage(value)}
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
