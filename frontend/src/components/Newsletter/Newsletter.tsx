import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { AxiosResponse } from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import axiosInstance from '../../axiosConfig'
import { initializeSubscirber } from '../../redux/reducers/SubscriberReducer'
import { useAppDispatch } from '../../redux/store'
import { ctaButtonStyle } from '../../styles/globalStyles'
import ThankYou from '../ThankYou/ThankYou'

export interface SubscriberData {
  email: string
  user_type: string
}

export interface ErrorResponse {
  error: string
  details: string[]
}

export interface SuccessResponse {
  email: string
  user_type: string
  message: string
}

interface NewsletterProps {
  title_content: React.ReactNode | string
  subtitle_content: React.ReactNode | string
  description_content: React.ReactNode | string
  user_type: string
}

const Newsletter: React.FC<NewsletterProps> = ({
  title_content,
  subtitle_content,
  description_content,
  user_type,
}) => {
  const dispatch = useAppDispatch()
  const [email, setEmail] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [successMessage, setSuccessMessage] = useState<string>('')
  const [hasScrolled, setHasScrolled] = useState(false)
  const { hash } = useLocation()
  const newletterRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleSubscribe: (
    e: React.MouseEvent<HTMLButtonElement>
  ) => void = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const newSubscriberData: SubscriberData = {
        email: email,
        user_type: user_type,
      }

      const response: AxiosResponse<SuccessResponse | ErrorResponse> =
        await axiosInstance.post(`api/v1/subscribers`, newSubscriberData)

      if (response.status === 201) {
        const successData = response.data as SuccessResponse
        dispatch(
          initializeSubscirber({
            email: successData.email,
            user_type: successData.user_type,
          })
        )
        setIsLoading(false)
        setSuccessMessage(successData.message)
        setErrorMessage('')
      } else {
        setIsLoading(false)
        const errorData = response.data as ErrorResponse
        setErrorMessage(
          `Error: ${errorData.error}. ${errorData.details.join(' ')}`
        )
        setSuccessMessage('')
      }
    } catch (error) {
      if (error) {
        setIsLoading(false)
        setErrorMessage('Error creating new subscriber. Please try again.')
        setSuccessMessage('')
      }
    }
  }

  const handleEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void = (
    e
  ) => {
    setEmail(e.target.value)
  }

  useEffect(() => {
    if (newletterRef.current && hash === '#newsletter' && !hasScrolled) {
      newletterRef.current.scrollIntoView({
        behavior: 'smooth',
        inline: 'start',
        block: 'start',
      })

      setHasScrolled(true)
    }

    return () => {
      setHasScrolled(false)
    }
    // eslint-disable-next-line
  }, [newletterRef, hash])

  return (
    <Box ref={newletterRef} id="newsletter">
      {!successMessage ? (
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            align="center"
            sx={{
              mb: 2,
            }}
          >
            {title_content}
          </Typography>
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h4"
              sx={{
                mb: 1,
                textAlign: 'center',
              }}
            >
              {subtitle_content}
            </Typography>
            <Typography sx={{ textAlign: 'center' }} variant="h6">
              {description_content}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <TextField
              id="outlined-basic"
              variant="outlined"
              value={email}
              onChange={handleEmailChange}
            />
            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
            <Button
              variant="contained"
              sx={ctaButtonStyle}
              onClick={handleSubscribe}
            >
              {isLoading ? (
                <CircularProgress size={24} sx={{ color: 'white' }} />
              ) : (
                'SUBSCRIBE'
              )}
            </Button>
            <Typography variant="subtitle1" sx={{ textAlign: 'center' }}>
              By subscribing to the newsletter, I have read this form and
              understand its content and voluntarily give my consent for the
              collection, use, processing, storage and retention of my personal
              data or information to Sence1 for the purpose(s) described in the{' '}
              <Link style={{ color: 'primary.main' }} to={'/privacy-consent'}>
                Privacy Policy
              </Link>{' '}
              document
            </Typography>
          </Box>
        </Container>
      ) : (
        <ThankYou />
      )}
    </Box>
  )
}

export default Newsletter
