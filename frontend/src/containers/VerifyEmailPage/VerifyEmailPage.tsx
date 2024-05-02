import { Button, Container, Typography } from '@mui/material'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axiosInstance from '../../axiosConfig'
import CustomSnackbar from '../../components/CustomSnackbar/CustomSnackbar'
import { User } from '../../redux/types'

interface VerifyEmailProps {}

const VerifyEmailPage: React.FC<VerifyEmailProps> = () => {
  const { token } = useParams()
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [successMessage, setSuccessMessage] = useState<string>('')
  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false)
  const [isExpired, setIsExpired] = useState<boolean>(false)
  const [isAlreadyVerified, setIsAlreadyVerified] = useState<boolean>(false)
  const [user, setUser] = useState<User | null>(null)

  const handleVerifyEmail = async () => {
    try {
      const response = await axiosInstance.get(`/api/v1/verify_email/${token}`)
      setSuccessMessage('')
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
      setSuccessMessage('')
      if (error) {
        if (error?.response?.data?.status === 'expired') {
          setIsSnackbarOpen(true)
          setIsExpired(true)
          setUser(error?.response?.data?.user)
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

  const handleResendVerificationEmail = async () => {
    try {
      const response = await axiosInstance.post(
        '/api/v1/resend_verification',
        {
          token: token,
          id: user?.id,
        },
        { withCredentials: true }
      )

      if (response.status === 200) {
        setErrorMessage('')
        setIsSnackbarOpen(true)
        setSuccessMessage(response.data.msg)
      }
    } catch (error: any) {
      setIsSnackbarOpen(true)
      setSuccessMessage('')
      setErrorMessage(error?.response?.data?.msg)
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
        successMessage={successMessage}
        errorMessage={errorMessage}
        isSnackbarOpen={isSnackbarOpen}
        handleSetIsSnackbarOpen={(value) => setIsSnackbarOpen(value)}
      />
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
          If you need any help or have any questions, please contact our support
          team at scholaris@sence1.com.
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
    </Container>
  )
}

export default VerifyEmailPage
