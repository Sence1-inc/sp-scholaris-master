import { Box, Button, FormGroup, InputLabel, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axiosInstance from '../../axiosConfig'
import { useSnackbar } from '../../context/SnackBarContext'
import useGetSubscriber from '../../hooks/useGetSubscriber'
import { initializeSubscirber } from '../../redux/reducers/SubscriberReducer'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { ctaButtonStyle } from '../../styles/globalStyles'
import profileTheme from '../../styles/profileTheme'
import AccountCard from './AccountCard'

/**
 * @interface AccountSettingsProps
 * @description Represents the props for the AccountSettings component.
 * @property {() => void} handleUnsubscribe - A function to handle the unsubscribe action.
 */
interface AccountSettingsProps {
  handleUnsubscribe: () => void
}

/**
 * @function AccountSettings
 * @description Displays user account settings.
 * @param {AccountSettingsProps} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */
const AccountSettings: React.FC<AccountSettingsProps> = ({
  handleUnsubscribe,
}) => {
  const { showMessage } = useSnackbar()
  const user = useAppSelector((state) => state.user)
  const subscribed = useAppSelector(
    (state) => state.subscriber
  )

  const { id } = useParams()
  const dispatch = useAppDispatch()
  const { getSubscriber, errorMessage } = useGetSubscriber()

  /**
   * @function useEffect
   * @description Fetches the subscriber data when the user is authenticated.
   * @param {Object} user - The authenticated user object.
   * @returns {void}
   */
  useEffect(() => {
    if (user) {
      getSubscriber()

      if (errorMessage) {
        showMessage(errorMessage, 'error')
      }
    }

    // eslint-disable-next-line
  }, [user])

  /**
   * @function handleSubscribe
   * @description Handles the subscribe action.
   * @param {React.MouseEvent<HTMLButtonElement>} e - The event object.
   * @returns {void}
   */
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
        if (response.status === 200) {
          const successData = response.data
          dispatch(initializeSubscirber(successData.subscriber))
          showMessage(successData.message, 'success')
        } else {
          const errorData = response.data
          dispatch(
            initializeSubscirber({
              email: '',
              user_type: '',
              deleted_at: '',
            })
          )
          showMessage(errorData.message, 'error')
        }
      }
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        showMessage('Subscribing, please wait.', 'info')
        const response = await axiosInstance.post(`api/v1/subscribers`, {
          email: user.email_address,
          user_type: 'provider',
        })
        if (response.status === 201) {
          const successData = response.data
          dispatch(initializeSubscirber(successData.subscriber))
          showMessage(successData.message, 'success')
        } else {
          const errorData = response.data
          dispatch(
            initializeSubscirber({
              email: '',
              user_type: '',
              deleted_at: '',
            })
          )
          showMessage(errorData.message, 'error')
        }
      } else {
        showMessage(error.response.data.message, 'error')
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
        <Typography sx={profileTheme.text.textRegular}>
          {user.email_address}
        </Typography>
        <Box sx={profileTheme.box.boxBodyStyle2}>
          {
            subscribed.email === '' || ( subscribed.deleted_at !== null )? 
            (
              <Button
                variant="contained"
                sx={ctaButtonStyle}
                onClick={handleSubscribe}

                id='subscribe'
              >
                Subscribe
              </Button>
            ) 
              :
            (
              <Button
                variant="contained"
                sx={ctaButtonStyle}
                onClick={(e: any) => {
                  showMessage(
                    'Are you sure you want to delete?',
                    'warning',
                    8000,
                    handleUnsubscribe
                  )
                }}

                id="unsubscribe"
              >
                Unsubscribe
              </Button>
            )
          }
        </Box>
      </FormGroup>
    </AccountCard>
  )
}

export default AccountSettings
