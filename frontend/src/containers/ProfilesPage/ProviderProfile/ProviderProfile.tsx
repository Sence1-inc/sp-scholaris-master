import { TabContext, TabPanel } from '@mui/lab'
import {
  Box,
  Container,
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
} from '@mui/material'
import axios from 'axios'
import dayjs from 'dayjs'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axiosInstance from '../../../axiosConfig'
import AccountProfile from '../../../components/AccountCard/AccountProfile'
import AccountSettings from '../../../components/AccountCard/AccountSettings'
import AccountSideBar, {
  sideItem,
} from '../../../components/AccountCard/AccountSideBar'
import AccountViewProfile from '../../../components/AccountCard/AccountViewProfile'
import PrimaryButton from '../../../components/CustomButton/PrimaryButton'
import CustomSnackbar from '../../../components/CustomSnackbar/CustomSnackbar'
import useGetSubscriber from '../../../hooks/useGetSubscriber'
import ProfileImage from '../../../public/images/profile.png'
import { initializeIsAuthenticated } from '../../../redux/reducers/IsAuthenticatedReducer'
import { initializeUser } from '../../../redux/reducers/UserReducer'
import { useAppDispatch, useAppSelector } from '../../../redux/store'
import { ScholarshipProvider } from '../../../redux/types'
import profileTheme from '../../../styles/profileTheme'
import theme from '../../../styles/theme'

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
  const navigate = useNavigate()
  const { getSubscriber, errorMessage: err } = useGetSubscriber()

  const isSm = useMediaQuery(() => theme.breakpoints.down('sm'))

  const handleDeleteCookie = async () => {
    const data = {
      email: user.email_address,
    }

    const response = await axiosInstance.post('/api/v1/logout', data, {
      withCredentials: true,
    })

    if (response.data.deleted) {
      dispatch(
        initializeUser({
          birthdate: '',
          email_address: '',
          first_name: '',
          id: 0,
          is_active: 0,
          last_name: '',
          role_id: 0,
          session_token: '',
          role: { id: 0, role_name: '' },
          scholarship_provider: {
            id: 0,
            provider_name: '',
            user_id: 0,
            provider_link: '',
          },
          student_profile: {
            about: '',
            full_name: '',
            birthdate: dayjs(new Date()),
            email: '',
            age: 0,
            nationality: '',
            gender: '',
            state: '',
            secondary_school_name: '',
            secondary_school_year: '',
            secondary_school_address: '',
            secondary_school_phone_number: '',
            secondary_school_awards: '',
            secondary_school_organizations: '',
            elementary_school_name: '',
            elementary_school_year: '',
            elementary_school_address: '',
            elementary_school_phone_number: '',
            elementary_school_awards: '',
            elementary_school_organizations: '',
            guardian_full_name: '',
            guardian_contact_number: '',
            guardian_relationship: '',
          },
        })
      )
      dispatch(initializeIsAuthenticated(false))
      navigate('/sign-in')
    }
  }

  const handleUnsubscribe = async () => {
    getSubscriber()
    if (err) {
      setErrorMessage(err)
    } else {
      setErrorMessage('')
    }
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
        <Box sx={profileTheme.container.mainContainer}>
          {isSm ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <Box
                sx={{
                  ...profileTheme.box.boxSideContentstyle,
                  borderRadius: 8,
                  gap: '16px',
                }}
              >
                <img src={ProfileImage} alt="" />
                <Typography sx={profileTheme.text.textRegularSide}>
                  {data.profile.scholarship_provider?.provider_name}
                </Typography>
                <PrimaryButton
                  id="logout-from-provide-profile"
                  label="Logout"
                  loading={false}
                  handleClick={handleDeleteCookie}
                  styles={{
                    width: 'fit-content',
                    padding: '8px 20px',
                    fontSize: '18px',
                  }}
                />
              </Box>
              <TabContext value={activeContent}>
                <Box sx={{ width: '100%' }}>
                  <Tabs
                    value={activeContent}
                    onChange={(
                      event: React.SyntheticEvent,
                      newValue: string
                    ) => {
                      setActiveContent(newValue)
                    }}
                    variant="fullWidth"
                    aria-label="wrapped label tabs example"
                  >
                    {sideItem.map(
                      (
                        item: { id: string; title: string; Icon: JSX.Element },
                        index: number
                      ) => {
                        return (
                          <Tab
                            key={index}
                            value={item.id}
                            label={item.Icon}
                            wrapped
                          />
                        )
                      }
                    )}
                  </Tabs>
                  <TabPanel sx={{ padding: '20px 0' }} value="view-profile">
                    <AccountViewProfile
                      handleSetSuccessMessage={(value) =>
                        setSuccessMessage(value)
                      }
                      handleSetErrorMessage={(value) => setErrorMessage(value)}
                      handleSetIsSnackbarOpen={(value) =>
                        setIsSnackbarOpen(value)
                      }
                    />
                  </TabPanel>
                  <TabPanel sx={{ padding: '20px 0' }} value="account-profile">
                    <AccountProfile
                      handleSetSuccessMessage={(value) =>
                        setSuccessMessage(value)
                      }
                      handleSetErrorMessage={(value) => setErrorMessage(value)}
                      handleSetIsSnackbarOpen={(value) =>
                        setIsSnackbarOpen(value)
                      }
                    />
                  </TabPanel>
                  {/* HIDE FOR NOW, WILL REVIVE ONCE FORGET PASSWORD IS AVAILABLE */}
                  {/* <TabPanel sx={{ padding: '20px 0' }} value="account-security">
                    <AccountSecurity />
                  </TabPanel> */}
                  <TabPanel sx={{ padding: '20px 0' }} value="account-settings">
                    <AccountSettings
                      handleSetSuccessMessage={(value) =>
                        setSuccessMessage(value)
                      }
                      handleSetErrorMessage={(value) => setErrorMessage(value)}
                      handleSetWarningMessage={(value) =>
                        setWarningMessage(value)
                      }
                      handleSetInfoMessage={(value) => setInfoMessage(value)}
                      handleSetIsSnackbarOpen={(value) =>
                        setIsSnackbarOpen(value)
                      }
                    />
                  </TabPanel>
                </Box>
              </TabContext>
            </Box>
          ) : (
            <>
              <AccountSideBar
                activeContent={activeContent}
                setActiveContent={setActiveContent}
                id={user.scholarship_provider.id.toString()}
                provider={
                  data.profile.scholarship_provider as ScholarshipProvider
                }
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
              {/* {activeContent && lastRoute === 'account-security' && (
                <AccountSecurity />
              )} */}
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
              {/* {activeContent && lastRoute === 'close-account' && (
                <AccountClose />
              )} */}
            </>
          )}
        </Box>
      </Container>
    </Box>
  )
}

export default ProviderProfile
