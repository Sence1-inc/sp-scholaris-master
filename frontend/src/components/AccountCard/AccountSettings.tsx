import { Box, Button, FormGroup, InputLabel, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axiosInstance, { CustomApiError } from '../../axiosConfig'
import { useSnackbar } from '../../context/SnackBarContext'
import { initializeSubscirber } from '../../redux/reducers/SubscriberReducer'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { ctaButtonStyle } from '../../styles/globalStyles'
import profileTheme from '../../styles/profileTheme'
import AccountCard from './AccountCard'
import useGetSubscriber from '../../hooks/useGetSubscriber'

/**
 * @interface AccountSettingsProps
 * @description Represents the props for the AccountSettings component.
 * @property {() => void} handleUnsubscribe - A function to handle the unsubscribe action.
 */
interface AccountSettingsProps {
  handleUnsubscribe: () => void
}

interface Subscriber {
  email: string
  user_type: string
  deleted_at: string | undefined
}

const subscriberService = {
  async getExistingSubscriber(id: string) {
    const response = await axiosInstance.get(`api/v1/subscribers/${id}`)
    return response.status === 201 ? response.data : null
  },

  async restoreSubscription(subscriberId: string) {
    return await axiosInstance.post(`api/v1/subscribers/restore`, { id: subscriberId })
  },

  async createNewSubscription(email: string) {
    return await axiosInstance.post(`api/v1/subscribers`, {
      email,
      user_type: 'provider',
    })
  }
}

const emptySubscriber: Subscriber = {
  email: '',
  user_type: '',
  deleted_at: undefined
}

/**
 * @function AccountSettings
 * @description Displays user account settings.
 * @param {AccountSettingsProps} props - The component props.
 * @param {() => void} handleUnsubscribe - The function to handle the unsubscribe action.
 * @returns {JSX.Element} The rendered component.
 */
const AccountSettings: React.FC<AccountSettingsProps> = ({ handleUnsubscribe }) => {
  const { showMessage } = useSnackbar()
  const user = useAppSelector((state) => state.user)
  const subscribed = useAppSelector((state) => state.subscriber)
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const { getSubscriber } = useGetSubscriber()

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
    if (!id || !user.email_address) return

    try {
      const existingSubscriber = await subscriberService.getExistingSubscriber(id)

      if (existingSubscriber) {
        const response = await subscriberService.restoreSubscription(existingSubscriber.id)
        handleSubscriptionResponse(response)
      } else {
        showMessage('Subscribing, please wait.', 'info')
        const response = await subscriberService.createNewSubscription(user.email_address)
        handleSubscriptionResponse(response)
      }
    } catch (error) {
      handleSubscriptionError(error)
    }
  }

  useEffect(() => {
    getSubscriber()
  }, [])

  const handleSubscriptionResponse = (response: any) => {
    if (response.status === 200 || response.status === 201) {
      dispatch(initializeSubscirber(response.data.subscriber))
      showMessage(response.data.message, 'success')
    } else {
      dispatch(initializeSubscirber(emptySubscriber))
      showMessage(response.data.message, 'error')
    }
  }

  const handleSubscriptionError = (error: unknown) => {
    if (error instanceof CustomApiError) {
      showMessage(error.response?.data?.message ?? 'An error occurred', 'error')
    } else {
      showMessage('An unexpected error occurred', 'error')
    }
  }

  const isUnsubscribed = subscribed.email === '' || subscribed.deleted_at !== null

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
          {isUnsubscribed ? (
            <Button
              variant="contained"
              sx={ctaButtonStyle}
              onClick={handleSubscribe}
              id='subscribe'
            >
              Subscribe
            </Button>
          ) : (
            <Button
              variant="contained"
              sx={ctaButtonStyle}
              onClick={() => showMessage(
                'Are you sure you want to delete?',
                'warning',
                8000,
                handleUnsubscribe
              )}
              id="unsubscribe"
            >
              Unsubscribe
            </Button>
          )}
        </Box>
      </FormGroup>
    </AccountCard>
  )
}

export default AccountSettings
