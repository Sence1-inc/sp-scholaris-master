import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { AxiosResponse } from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import axiosInstance from '../../axiosConfig'

interface SubscriberData {
  email: string
  user_type: string
}

interface ErrorResponse {
  error: string
  details: string[]
}

interface SuccessResponse {
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
  const [email, setEmail] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [successMessage, setSuccessMessage] = useState<string>('')
  const [hasScrolled, setHasScrolled] = useState(false)
  const { hash } = useLocation()
  const newletterRef = useRef<HTMLDivElement>(null)

  const handleSubscribe: (
    e: React.MouseEvent<HTMLButtonElement>
  ) => void = async (e) => {
    e.preventDefault()

    try {
      const newSubscriberData: SubscriberData = {
        email: email,
        user_type: user_type,
      }

      const response: AxiosResponse<SuccessResponse | ErrorResponse> =
        await axiosInstance.post(`api/v1/subscribers`, newSubscriberData)

      if (response.status === 201) {
        const successData = response.data as SuccessResponse
        setSuccessMessage(successData.message)
        setErrorMessage('')
      } else {
        const errorData = response.data as ErrorResponse
        setErrorMessage(
          `Error: ${errorData.error}. ${errorData.details.join(' ')}`
        )
        setSuccessMessage('')
      }
    } catch (error) {
      setErrorMessage('Error creating new subscriber. Please try again.')
      setSuccessMessage('')
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
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          align="center"
          sx={{
            mb: 2,
            color: 'var(--primary-color)',
            textAlign: 'center',
            fontWeight: '700',
            fontSize: '48px',
          }}
        >
          {title_content}
        </Typography>
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h4"
            sx={{
              mb: 1,
              color: 'var(--secondary-color)',
              textAlign: 'center',
              fontWeight: '700',
            }}
          >
            {subtitle_content}
          </Typography>
          <Typography
            sx={{ fontSize: '24px', fontWeight: '400', textAlign: 'center' }}
            variant="body1"
          >
            {description_content}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <TextField
            sx={{
              '& fieldset': { border: 'none' },
              borderRadius: '16px',
              border: '1px solid #0E2F71',
            }}
            id="outlined-basic"
            variant="outlined"
            value={email}
            onChange={handleEmailChange}
          />
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
          {successMessage && <Alert severity="success">{successMessage}</Alert>}
          <Button
            fullWidth
            sx={{
              padding: '20px',
              borderRadius: '16px',
              fontWeight: '700',
              textTransform: 'capitalize',
              backgroundColor: 'var(--secondary-color)',
              color: 'white',
              '&:hover': {
                backgroundColor: 'var(--primary-color)',
              },
            }}
            onClick={handleSubscribe}
          >
            SUBSCRIBE
          </Button>
          <Typography variant="body2" className="newsletter-text__small">
            By subscribing to the newsletter, I have read this form and
            understand its content and voluntarily give my consent for the
            collection, use, processing, storage and retention of my personal
            data or information to Sence1 for the purpose(s) described in the{' '}
            <Link
              style={{ color: 'var(--primary-color)' }}
              to={'/privacy-consent'}
            >
              Privacy Policy
            </Link>{' '}
            document
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}

export default Newsletter
