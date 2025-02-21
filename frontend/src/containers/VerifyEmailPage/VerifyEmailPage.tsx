import { Button, Container, Typography } from '@mui/material'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axiosInstance, { CustomApiError } from '../../axiosConfig'
import { User } from '../../redux/types'
import { useSnackbar } from '../../context/SnackBarContext';


interface VerifyEmailProps {}

const VerifyEmailPage: React.FC<VerifyEmailProps> = () => {
  const { showMessage } = useSnackbar();
  const { token } = useParams()
  const navigate = useNavigate()
  const [isExpired, setIsExpired] = useState<boolean>(false)
  const [isAlreadyVerified, setIsAlreadyVerified] = useState<boolean>(false)
  const [user, setUser] = useState<User | null>(null)

  const handleVerifyEmail = async () => {
    try {
      const response = await axiosInstance.get(`/api/v1/verify_email/${token}`)
      
      switch (response.data.status) {
        case 'verified':
          navigate('/sign-in')
          break
        case 'error':
          if (response.data.message === 'Invalid link') {
            setIsExpired(false)
            setIsAlreadyVerified(true)
            showMessage('Invalid link. Your account may already be verified.', 'error')
          } else {
            showMessage('Failed verifying account', 'error')
          }
          break
        default:
          setIsExpired(false)
          setIsAlreadyVerified(false)
          showMessage('Failed verifying account', 'error')
      }
    } catch (error) {
      if (!(error instanceof CustomApiError)) {
        showMessage('An unexpected error occurred', 'error')
        return
      }

      const { status, user: userData, msg } = error.response?.data || {}
      
      if (status === 'expired') {
        setIsExpired(true)
        setUser(userData)
        setIsAlreadyVerified(false)
        showMessage(msg, 'error')
      } else {
        setIsExpired(false)
        setIsAlreadyVerified(false)
        showMessage('Failed verifying account', 'error')
      }
    }
  }

  const handleResendVerificationEmail = async () => {
    try {
      const response = await axiosInstance.post(
        '/api/v1/resend_verification',
        { token, id: user?.id },
        { withCredentials: true }
      )
      showMessage(response.data.msg, 'success')
    } catch (error) {
      if (error instanceof CustomApiError) {
        showMessage(error.response?.data?.msg || 'Failed to resend verification email', 'error')
      } else {
        showMessage('An unexpected error occurred', 'error')
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
          Thank you for signing up!
        </Typography>
        <Typography
          sx={{
            fontSize: '16px',
            fontWeight: '300px',
            textAlign: 'center',
            color: '#767676',
          }}
        >
          To make sure your email address is valid, click on the Verify Email
          button below.
        </Typography>
        <Typography
          sx={{
            fontSize: '16px',
            fontWeight: '300px',
            textAlign: 'center',
            color: '#767676',
          }}
        >
          Thank you for taking the time to verify your email. We look forward to
          bringing you the best experience possible!
        </Typography>
        {isAlreadyVerified ? (
          <Button
            id="sign-in-from-verification-page"
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
        ) : isExpired ? (
          <Button
            id="resend-verification"
            onClick={handleResendVerificationEmail}
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
            Resend Verification Email
          </Button>
        ) : (
          <Button
            id="verify"
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
        <Typography
          sx={{
            fontSize: '16px',
            fontWeight: '300px',
            textAlign: 'center',
            color: '#767676',
          }}
        >
          If you need any help or have any questions, please contact our support
          team at scholaris@sence1.com.
        </Typography>
      </>
    </Container>
  )
}

export default VerifyEmailPage
