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

  const handleVerifyEmail = async () => {
    try {
      const response = await axiosInstance.get(`/api/v1/verify_email/${token}`)
      console.log('THIS', response)
      if (response.data.status === 'verified') {
        navigate('/sign-in')
      } else {
        setErrorMessage('Failed verifying account')
        setIsExpired(false)
      }
    } catch (error: any) {
      if (error) {
        console.log(error)
        if (error?.response?.data?.status === 'expired') {
          setIsExpired(true)
        } else {
          setIsExpired(false)
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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit
            amet purus nulla. Suspendisse egestas erat eu lectus semper, quis
            sollicitudin diam blandit. Sed rhoncus, nisi ac sollicitudin
            ultricies, ante turpis fermentum elit, id euismod dolor augue mollis
            dui. Integer efficitur diam sed tellus feugiat, et posuere tortor
            vestibulum.
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
        </>
      )}
    </Container>
  )
}

export default VerifyEmailPage
