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
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axiosInstance, { initialUserState } from '../../../axiosConfig'
import AccountSettings from '../../../components/AccountCard/AccountSettings'
import AccountSideBar, {
  sideItem,
} from '../../../components/AccountCard/AccountSideBar'
import AccountViewProfile from '../../../components/AccountCard/AccountViewProfile'
import PrimaryButton from '../../../components/CustomButton/PrimaryButton'
import { useSnackbar } from '../../../context/SnackBarContext'
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
  const { showMessage } = useSnackbar()
  const subscr: any = useAppSelector(
    (state) => state.persistedReducer.subscriber
  )
  const data: any = useAppSelector((state) => state.persistedReducer.profile)
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
      dispatch(initializeUser(initialUserState))
      dispatch(initializeIsAuthenticated(false))
      navigate('/sign-in')
    }
  }

  const handleUnsubscribe = async () => {
    getSubscriber()
    if (err) {
      showMessage(err, 'error')
    }
    if (!subscr.deleted_at) {
      try {
        const response = await axiosInstance.post(
          `api/v1/subscribers/soft_delete`,
          { id: subscr?.id },
          { withCredentials: true }
        )

        if (response.status === 200) {
          showMessage(response.data.message, 'success')
        } else {
          showMessage(
            `Error: ${response.data.error}. ${response.data.details.join(' ')}`,
            'error'
          )
        }
      } catch (error: any) {
        if (error) {
          if (axios.isAxiosError(error)) {
            if (error.response) {
              if (error.response.status === 404) {
                showMessage('Email already unsubscribed.', 'error')
              } else {
                const errorDetails = error.response.data?.details
                  ? error.response.data.details.join(' ')
                  : ''
                const errorMessage = `${error.response.data?.message || 'Unsubscribing failed'}. ${errorDetails}`
                showMessage(errorMessage, 'error')
              }
            } else if (error.request) {
              showMessage(
                'No response from server. Please check your network connection.',
                'error'
              )
            } else {
              showMessage('Error setting up unsubscribe request.', 'error')
            }
          } else {
            showMessage('Error Unsubscribing. Please try again.', 'error')
          }
        }
      }
    } else {
      showMessage('Not yet a subscriber, please subscribe.', 'error')
    }
  }

  return (
    <Box sx={profileTheme.container.rootContainer}>
      <Container sx={{ p: 0 }}>
        <Box sx={profileTheme.container.mainContainer}>
          {isSm ? (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                width: '100%',
                padding: '0 10px',
              }}
            >
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
                    <AccountViewProfile />
                  </TabPanel>
                  {/* HIDE FOR NOW, WILL REVIVE ONCE FORGET PASSWORD IS AVAILABLE */}
                  {/* <TabPanel sx={{ padding: '20px 0' }} value="account-security">
                    <AccountSecurity />
                  </TabPanel> */}
                  <TabPanel sx={{ padding: '20px 0' }} value="account-settings">
                    <AccountSettings handleUnsubscribe={handleUnsubscribe} />
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
                <AccountViewProfile />
              )}
              {/* {activeContent && lastRoute === 'account-security' && (
                <AccountSecurity />
              )} */}
              {/* { activeContent && lastRoute === 'account-subscription' && <AccountSubscription />} */}
              {activeContent && lastRoute === 'account-settings' && (
                <AccountSettings handleUnsubscribe={handleUnsubscribe} />
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
