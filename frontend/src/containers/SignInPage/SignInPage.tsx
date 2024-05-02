import { Button, Container, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import axiosInstance from '../../axiosConfig'
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
    service_id: 1,
    service_key: process.env.REACT_APP_SERVICE_KEY,
    role: 'provider',
  })
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [infoMessage, setInfoMessage] = useState<string>('')
  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false)
  const [errors, setErrors] = useState<Errors>({
    email_address: '',
    password: '',
  })

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/provider/dashboard')
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
    console.log(inputValue)
    setUserCredentials((prevUserCredentials) => ({
      ...prevUserCredentials,
      password: inputValue,
    }))
  }

  const handleSignIn = async () => {
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
      try {
        const response = await axiosInstance.post(
          '/api/v1/login',
          userCredentials,
          {
            withCredentials: true,
          }
        )

        if (response) {
          setIsSnackbarOpen(false)
          setErrorMessage('')
          dispatch(initializeUser(response.data))
          dispatch(initializeProfile(response.data.profile))
          navigate('/provider/dashboard')
        }
      } catch (error: any) {
        if (error) {
          setIsSnackbarOpen(true)
          setErrorMessage(error.response.data.message ?? 'Login failed.')
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
        label="Password"
        value={userCredentials.password}
        handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handlePassword(e.target.value)
        }
        placeholder="Input your password"
        error={errors.password ?? ''}
      />
      {/* <TextField
        onChange={(e) => handleEmail(e.target.value)}
        value={userCredentials.email_address.toLowerCase()}
        type="email"
        id="email"
        label="Email address"
        placeholder="Input your email"
        sx={{
          borderRadius: '16px',
          marginTop: '35px',
          width: '100%',
          '& fieldset': { border: 'none' },
          border: '1px solid #0E2F71',
          boxShadow: '-4px -4px 1.9px 0 rgba(0, 0, 0, 10%) inset',
        }}
        inputProps={{
          sx: {
            fontSize: '24px',
            color: 'var(--primary-color)',
            padding: '30px',
          },
        }}
        InputProps={{
          placeholder: 'Input your email',
        }}
        InputLabelProps={{
          sx: {
            top: '-55px',
            left: '-15px',
            fontSize: '24px',
            fontWeight: '700',
          },
          shrink: false,
        }}
      /> */}
      {/* <TextField
        onChange={(e) => handlePassword(e.target.value)}
        value={userCredentials.password}
        type="password"
        id="Password"
        label="Password"
        placeholder="Input your email"
        sx={{
          borderRadius: '16px',
          marginTop: '35px',
          width: '100%',
          '& fieldset': { border: 'none' },
          border: '1px solid #0E2F71',
          boxShadow: '-4px -4px 1.9px 0 rgba(0, 0, 0, 10%) inset',
        }}
        inputProps={{
          sx: {
            fontSize: '24px',
            color: 'var(--primary-color)',
            padding: '30px',
          },
        }}
        InputProps={{
          placeholder: 'asdasd',
        }}
        InputLabelProps={{
          sx: {
            top: '-55px',
            left: '-15px',
            fontSize: '24px',
            fontWeight: '700',
          },
          shrink: false,
        }}
      /> */}
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '0 !important',
        }}
      >
        <Button
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

      <Button
        onClick={handleSignIn}
        variant="contained"
        color="primary"
        sx={{
          borderRadius: '16px',
          backgroundColor: '#f36b3b',
          padding: '20px',
          margin: '0 auto 60px',
          width: '100%',
          maxWidth: '600px',
          '&:hover': { backgroundColor: '#d2522b' },
          textTransform: 'inherit',
          fontSize: '24px',
        }}
      >
        Login
      </Button>
    </Container>
  )
}

export default SignInPage
