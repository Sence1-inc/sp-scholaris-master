import { Button, Container, Typography } from '@mui/material'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axiosInstance from '../../axiosConfig'
import CustomSnackbar from '../../components/CustomSnackbar/CustomSnackbar'
import { ctaButtonStyle } from '../../styles/globalStyles'

interface VerifyEmailProps {}

const VerifyEmailPage: React.FC<VerifyEmailProps> = () => {
  const { token } = useParams()
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false)
  const [isExpired, setIsExpired] = useState<boolean>(false)
  const [isAlreadyVerified, setIsAlreadyVerified] = useState<boolean>(false)

  const handleVerifyEmail = async () => {
    try {
      const response = await axiosInstance.get(`/api/v1/verify_email/${token}`)

      if (response.data.status === 'verified') {
        navigate('/sign-in')
      } else if (response.data.status === 'invalid link') {
        setIsSnackbarOpen(true)
        setIsExpired(false)
        setErrorMessage('Invalid link. Your account may already be verified.')
        setIsAlreadyVerified(true)
      } else {
        setIsSnackbarOpen(true)
        setErrorMessage('Failed verifying account')
        setIsExpired(false)
        setIsAlreadyVerified(false)
      }
    } catch (error: any) {
      if (error) {
        if (error?.response?.data?.status === 'expired') {
          setIsSnackbarOpen(true)
          setIsExpired(true)
          setIsAlreadyVerified(false)
        } else {
          setIsSnackbarOpen(true)
          setIsExpired(false)
          setIsAlreadyVerified(false)
          setErrorMessage('Failed verifying account')
        }
      }
    }
  }

  return (
    <Container
      maxWidth="md"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '30px',
        alignItems: 'center',
        paddingBlock: '120px',
      }}
    >
      <CustomSnackbar
        errorMessage={errorMessage}
        isSnackbarOpen={isSnackbarOpen}
        handleSetIsSnackbarOpen={(value) => setIsSnackbarOpen(value)}
      />
      {isExpired ? (
        <>
          <Typography
            variant="h2"
            sx={{
              fontSize: '64px',
              fontWeight: '700',
              color: 'primary.main',
              textAlign: 'center',
            }}
          >
            Send email to scholaris@sence1.com for a new link
          </Typography>
          <Button sx={{ ...ctaButtonStyle }} onClick={() => navigate('/')}>
            Go to Home
          </Button>
        </>
      ) : (
        <>
          <Typography
            variant="h2"
            sx={{
              textTransform: 'capitalize',
              fontSize: '64px',
              fontWeight: '700',
              color: 'var(--secondary-color)',
              textAlign: 'center',
              paddingBottom: '50px',
            }}
          >
            Thank you for signing up
          </Typography>
          <Typography
            sx={{
              fontSize: '16px',
              fontWeight: '300px',
              textAlign: 'center',
              color: '#767676',
            }}
          >
            Before you can start enjoying all the features of your account, we
            need to make sure your email address is valid. Click on the Verify
            Email button below.
          </Typography>
          <Typography
            sx={{
              fontSize: '16px',
              fontWeight: '300px',
              textAlign: 'center',
              color: '#767676',
            }}
          >
            If you need any help or have any questions, please contact our
            support team at scholaris@sence1.com.
          </Typography>
          <Typography
            sx={{
              fontSize: '16px',
              fontWeight: '300px',
              textAlign: 'center',
              color: '#767676',
            }}
          >
            Thank you for taking the time to verify your email. We look forward
            to bringing you the best experience possible!
          </Typography>
          {isAlreadyVerified ? (
            <Button
              onClick={() => navigate('/sign-in')}
              variant="contained"
              color="primary"
              sx={{
                borderRadius: '16px',
                backgroundColor: '#f36b3b',
                padding: '20px',
                margin: '0 auto',
                width: '100%',
                maxWidth: '550px',
                '&:hover': { backgroundColor: '#d2522b' },
                textTransform: 'inherit',
                fontSize: '24px',
              }}
            >
              Sign in
            </Button>
          ) : (
            <Button
              onClick={handleVerifyEmail}
              variant="contained"
              color="primary"
              sx={{
                borderRadius: '16px',
                backgroundColor: '#f36b3b',
                padding: '20px',
                margin: '50px auto',
                width: '100%',
                maxWidth: '550px',
                '&:hover': { backgroundColor: '#d2522b' },
                textTransform: 'inherit',
                fontSize: '24px',
              }}
            >
              Verify Email
            </Button>
          )}
        </>
      )}
    </Container>
  )
}

export default VerifyEmailPage
