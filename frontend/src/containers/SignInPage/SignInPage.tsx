import { Box, Button, Container, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import axiosInstance from '../../axiosConfig'
import CTAButton from '../../components/CustomButton/CTAButton'
import CustomSnackbar from '../../components/CustomSnackbar/CustomSnackbar'
import CustomTextfield from '../../components/CutomTextfield/CustomTextfield'
import { initializeProfile } from '../../redux/reducers/ProfileReducer'
import { initializeUser } from '../../redux/reducers/UserReducer'
import { useAppDispatch, useAppSelector } from '../../redux/store'

interface SignInPageProps {}

type Errors = {
  email_address: string
  password: string
}

const SignInPage: React.FC<SignInPageProps> = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const isAuthenticated = useAppSelector(
    (state) => state.persistedReducer.isAuthenticated
  )
  const [userCredentials, setUserCredentials] = useState({
    email_address: '',
    password: '',
    role: '',
  })
  const userState = useAppSelector((state) => state.persistedReducer.user)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [infoMessage, setInfoMessage] = useState<string>('')
  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false)
  const [errors, setErrors] = useState<Errors>({
    email_address: '',
    password: '',
  })
  const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false)

  useEffect(() => {
    if (isAuthenticated) {
      switch (userState?.role?.id) {
        case 3:
          navigate('/student/dashboard')
          break

        case 4:
          navigate('/provider/dashboard')
          break
        default:
          navigate('/')
      }
    }
    // eslint-disable-next-line
  }, [isAuthenticated])

  function handleEmail(inputValue: string) {
    setUserCredentials((prevUserCredentials) => ({
      ...prevUserCredentials,
      email_address: inputValue.toLowerCase(),
    }))
  }

  function handlePassword(inputValue: string) {
    setUserCredentials((prevUserCredentials) => ({
      ...prevUserCredentials,
      password: inputValue,
    }))
  }

  const handleSignIn = async (role: string) => {
    userCredentials.role = role
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const isValidEmail = emailRegex.test(userCredentials.email_address)

    const validationConditions = [
      {
        condition: !isValidEmail || !userCredentials.email_address,
        field: 'email_address',
        message: 'Please provide a valid registered email address.',
      },
      {
        condition: !userCredentials.password,
        field: 'password',
        message: 'Please provide a valid password.',
      },
    ]

    const errorMessages = validationConditions
      .filter(({ condition }) => condition)
      .map(({ message }) => message)
    const hasErrors = errorMessages.length > 0

    if (hasErrors) {
      setIsSnackbarOpen(true)
      setErrorMessage('Please fill in the required details.')
      const newErrors = validationConditions.reduce<{ [key: string]: string }>(
        (acc, { condition, field, message }) => {
          if (condition) {
            acc[field] = message
          }
          return acc
        },
        {}
      )

      setErrors({ ...errors, ...newErrors })
    } else {
      setIsButtonLoading(true)
      try {
        const response = await axiosInstance.post(
          `/api/v1/login`,
          userCredentials,
          {
            withCredentials: true,
          }
        )

        if (response) {
          setErrors({
            email_address: '',
            password: '',
          })
          setIsButtonLoading(false)
          setIsSnackbarOpen(false)
          setErrorMessage('')
          dispatch(initializeUser(response.data))
          dispatch(initializeProfile(response.data.profile))
          navigate('/provider/dashboard')
        }
      } catch (error: any) {
        setIsButtonLoading(false)
        if (error) {
          setIsSnackbarOpen(true)
          setErrorMessage(error.response.data.message ?? 'Login failed.')
          setErrors({
            email_address: '',
            password: '',
          })
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
        rowGap: '50px',
        marginBlock: '40px',
      }}
    >
      <CustomSnackbar
        isSnackbarOpen={isSnackbarOpen}
        handleSetIsSnackbarOpen={(value) => setIsSnackbarOpen(value)}
        errorMessage={errorMessage}
        infoMessage={infoMessage}
      />
      <Typography
        variant="h2"
        sx={{
          fontSize: '64px',
          fontWeight: '700',
          textAlign: 'center',
          color: 'var(--secondary-color)',
        }}
      >
        Sign-in
      </Typography>
      <CustomTextfield
        label="Email address"
        value={userCredentials.email_address.toLowerCase()}
        handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleEmail(e.target.value)
        }
        placeholder="Input your email"
        error={errors.email_address ?? ''}
      />
      <CustomTextfield
        type="password"
        label="Password"
        value={userCredentials.password}
        handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handlePassword(e.target.value)
        }
        placeholder="Input your password"
        error={errors.password ?? ''}
      />
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '0 !important',
        }}
      >
        <Button
          id="forgot-password"
          disableRipple
          variant="text"
          sx={{
            cursor: 'pointer',
            fontSize: '16px',
            color: '#767676',
            fontWeight: '300',
            fontStyle: 'italic',
            textAlign: 'start',
            textTransform: 'none',
            backgroundColor: 'transparent',
            '&:hover': {
              backgroundColor: '#FFF',
            },
          }}
          onClick={() => {
            setIsSnackbarOpen(true)
            setInfoMessage('Contact scholaris@sence1.com to change password.')
          }}
        >
          Forgot password?
        </Button>
        <Button
          id="to-sign-up"
          disableRipple
          component={RouterLink}
          to="/sign-up"
          variant="text"
          sx={{
            cursor: 'pointer',
            fontSize: '16px',
            color: '#767676',
            fontWeight: '300',
            fontStyle: 'italic',
            textAlign: 'center',
            textTransform: 'none',
            backgroundColor: 'transparent',
            '&:hover': {
              backgroundColor: '#FFF',
            },
          }}
        >
          No account yet? Sign-up here
        </Button>
      </Container>

      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: '30px',
        }}
      >
        <CTAButton
          id="sign-in-from-sigin-page"
          handleClick={() => handleSignIn('student')}
          label="Sign in as student"
          loading={isButtonLoading}
          styles={{ fontSize: '24px' }}
        />
        <CTAButton
          id="sign-in-from-sigin-page"
          handleClick={() => handleSignIn('provider')}
          label="Sign in as provider"
          loading={isButtonLoading}
          styles={{ fontSize: '24px' }}
        />
      </Box>
    </Container>
  )
}

export default SignInPage
