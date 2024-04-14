import { Button, Container, Typography } from '@mui/material'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axiosInstance from '../../axiosConfig'
import CustomSnackbar from '../../components/CustomSnackbar/CustomSnackbar'

interface VerifyEmailProps {}

const VerifyEmailPage: React.FC<VerifyEmailProps> = () => {
  const { token } = useParams()
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false)

  const handleVerifyEmail = async () => {
    try {
      const response = await axiosInstance.get(`/api/v1/verify_email/${token}`)
      if (response.data.status === 'verified') {
        navigate('/sign-in')
      } else {
        setErrorMessage('Failed verifying account')
      }
    } catch (error) {
      setErrorMessage('Failed verifying account')
    }
  }
  console.log(token)
  return (
    <Container
      maxWidth="md"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '50px',
        alignItems: 'center',
        paddingBlock: '120px',
      }}
    >
      <CustomSnackbar
        errorMessage={errorMessage}
        isSnackbarOpen={isSnackbarOpen}
        handleSetIsSnackbarOpen={(value) => setIsSnackbarOpen(value)}
      />
      <Typography
        variant="h2"
        sx={{
          textTransform: 'capitalize',
          fontSize: '64px',
          fontWeight: '700',
          color: 'var(--secondary-color)',
          textAlign: 'center',
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
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet
        purus nulla. Suspendisse egestas erat eu lectus semper, quis
        sollicitudin diam blandit. Sed rhoncus, nisi ac sollicitudin ultricies,
        ante turpis fermentum elit, id euismod dolor augue mollis dui. Integer
        efficitur diam sed tellus feugiat, et posuere tortor vestibulum.
      </Typography>
      <Button
        onClick={handleVerifyEmail}
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
        Verify Email
      </Button>
      <Typography
        sx={{
          fontSize: '16px',
          fontWeight: '300px',
          textAlign: 'center',
          color: '#767676',
        }}
      >
        Check your email to verify your account
      </Typography>
      <Button
        onClick={() => navigate('/sign-in')}
        variant="contained"
        sx={{
          backgroundColor: 'transparent',
          border: 'none',
          boxShadow: 'none',
          padding: '0',
          margin: '0 auto',
          width: '100%',
          maxWidth: '320px',
          '&:hover': { backgroundColor: 'transparent', boxShadow: 'none' },
          textTransform: 'inherit',
          fontStyle: 'italic',
          fontSize: '24px',
          color: '#1AA5D8',
        }}
      >
        Sign-in Account
      </Button>
    </Container>
  )
}

export default VerifyEmailPage
