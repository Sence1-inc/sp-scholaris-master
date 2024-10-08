import { Box, Container, Link as MuiLink, Typography } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import axiosInstance from '../../axiosConfig'
import CTAButton from '../../components/CustomButton/CTAButton'
import CustomTextfield from '../../components/CutomTextfield/CustomTextfield'
import HelperText from '../../components/HelperText/HelperText'
import { useAppSelector } from '../../redux/store'
import { useSnackbar } from '../../context/SnackBarContext';

interface SignUpPageProps {}

export type Errors = {
  email_address: string
  password: string
  password2?: string
  first_name: string
  last_name: string
  middle_name?: string
  birthdate: string
}

const SignUpPage: React.FC<SignUpPageProps> = () => {
  const navigate = useNavigate()
  const { showMessage } = useSnackbar();
  const [userCredentials, setUserCredentials] = useState({
    email_address: '',
    password: '',
    password2: '',
    first_name: '',
    last_name: '',
    middle_name: '',
    birthdate: null,
    is_active: 1,
    role: 'provider',
  })
  const isAuthenticated = useAppSelector(
    (state) => state.persistedReducer.isAuthenticated
  )
  const [errors, setErrors] = useState<Errors>({
    email_address: '',
    password: '',
    password2: '',
    first_name: '',
    last_name: '',
    middle_name: '',
    birthdate: '',
  })
  const [buttonLoading, setButtonLoading] = useState<boolean>(false)
  const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true)

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/provider/dashboard')
    }
    // eslint-disable-next-line
  }, [isAuthenticated])

  const handleUserCredentials = (inputValue: string, key: string) => {
    setUserCredentials((prevUserCredentials) => ({
      ...prevUserCredentials,
      [key]: inputValue,
    }))
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const isValidEmail = emailRegex.test(userCredentials.email_address)
  const isPasswordValid = userCredentials.password.length > 6
  const isPassword2 = userCredentials.password === userCredentials.password2

  const validationConditions = [
    {
      condition: !isValidEmail || !userCredentials.email_address,
      field: 'email_address',
      message: 'Please provide a valid email address.',
    },
    {
      condition: !isPasswordValid || !userCredentials.password,
      field: 'password',
      message: 'Password must be at least 6 characters.',
    },
    {
      condition: !isPassword2 || !userCredentials.password2,
      field: 'password2',
      message: 'Passwords do not match.',
    },
    {
      condition: !userCredentials.first_name,
      field: 'first_name',
      message: 'Please provide your first name.',
    },
    {
      condition: !userCredentials.middle_name,
      field: 'middle_name',
      message: 'Please provide your middle name.',
    },
    {
      condition: !userCredentials.last_name,
      field: 'last_name',
      message: 'Please provide your last name.',
    },
    {
      condition:
        !userCredentials.birthdate ||
        isNaN(new Date(userCredentials.birthdate).getTime()) ||
        new Date(userCredentials.birthdate) > new Date() ||
        new Date(userCredentials.birthdate) < new Date('1920-01-01'),
      field: 'birthdate',
      message: 'Please provide your valid birthday.',
    },
  ]

  useEffect(() => {
    if (!isInitialLoad) {
      const errorMessages: any = validationConditions
        .filter(({ condition }) => condition)
        .reduce((acc: any, item) => {
          acc[item.field] = item.message
          return acc
        }, {})
      setErrors(errorMessages)
    }
    // eslint-disable-next-line
  }, [userCredentials, isInitialLoad])

  const helloMessage = () => {
    console.log('hello')
  }

  const handleSignUp = async (role: string) => {
    userCredentials.role = role
    setIsInitialLoad(false)

    const errorMessages = validationConditions
      .filter(({ condition }) => condition)
      .map(({ message }) => message)
    const hasErrors = errorMessages.length > 0

    if (hasErrors) {
      showMessage('Please fill in the required details.', 'error')
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
      setButtonLoading(true)
      try {
        const response = await axiosInstance.post(
          '/api/v1/register',
          userCredentials,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        if (response.data) {
          setButtonLoading(false)
          showMessage("We've sent you a verification email. Please confirm your email address before you log in.", 'success')
          setErrors({
            email_address: '',
            password: '',
            password2: '',
            first_name: '',
            last_name: '',
            middle_name: '',
            birthdate: '',
          })
        }
      } catch (error: any) {
        if (error) {
          setButtonLoading(false)
          showMessage(error.response.data.error ??
            'Registration failed. Please try again.', 'error')
          const errors = {
            email_address: '',
            password: '',
            password2: '',
            first_name: '',
            last_name: '',
            middle_name: '',
            birthdate: '',
          }

          if (
            error.response &&
            error.response.data &&
            Array.isArray(error.response.data.details)
          ) {
            error.response.data.details.forEach((errorMessage: string) => {
              if (errorMessage.includes('Email')) {
                errors.email_address = errorMessage
              } else if (
                errorMessage.includes('Password') &&
                !errorMessage.includes('match')
              ) {
                errors.password = errorMessage
              } else if (errorMessage.includes('match')) {
                errors.password2 = errorMessage
              } else if (errorMessage.includes('First name')) {
                errors.first_name = errorMessage
              } else if (errorMessage.includes('Last name')) {
                errors.last_name = errorMessage
              } else if (errorMessage.includes('Middle name')) {
                errors.middle_name = errorMessage
              } else if (errorMessage.includes('Birthdate')) {
                errors.birthdate = errorMessage
              }
            })
          }

          setErrors(errors)
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
      <Typography
        variant="h2"
        sx={{
          fontSize: '64px',
          fontWeight: '700',
          textAlign: 'center',
          color: 'var(--secondary-color)',
        }}
      >
        Sign-up
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <CustomTextfield
          label="Email address"
          error={errors.email_address}
          handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleUserCredentials(e.target.value.toLowerCase(), 'email_address')
          }
          value={userCredentials.email_address.toLowerCase()}
          placeholder="Input your email"
        />
        <CustomTextfield
          type="password"
          label="Password"
          error={errors.password}
          handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleUserCredentials(e.target.value, 'password')
          }
          value={userCredentials.password}
          placeholder="Input your password"
        />
        <CustomTextfield
          type="password"
          label="Confirm Password"
          error={errors.password2}
          handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleUserCredentials(e.target.value, 'password2')
          }
          value={userCredentials.password2}
          placeholder="Confirm your password"
        />
        <CustomTextfield
          label="First name"
          error={errors.first_name}
          handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleUserCredentials(e.target.value, 'first_name')
          }
          value={userCredentials.first_name}
          placeholder="Input your first name"
        />
        <CustomTextfield
          label="Middle name"
          error={errors.middle_name}
          handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleUserCredentials(e.target.value, 'middle_name')
          }
          value={userCredentials.middle_name}
          placeholder="Input your middle name"
        />
        <CustomTextfield
          label="Last name"
          error={errors.last_name}
          handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleUserCredentials(e.target.value, 'last_name')
          }
          value={userCredentials.last_name}
          placeholder="Input your last name"
        />
        <Box>
          <Typography
            sx={{
              fontFamily: 'Roboto',
              fontSize: '24px',
              fontWeight: '700',
              color: '#002147',
            }}
          >
            Birthdate
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              onChange={(date) =>
                handleUserCredentials(date?.toString() as string, 'birthdate')
              }
              value={
                userCredentials.birthdate === null
                  ? null
                  : dayjs(userCredentials.birthdate)
              }
              slotProps={{
                textField: {
                  variant: 'outlined',
                  sx: { borderColor: errors.birthdate ? 'red' : '' },
                },
              }}
            />
            <HelperText error={errors.birthdate ? errors.birthdate : ''} />
          </LocalizationProvider>
        </Box>
      </Box>
      <MuiLink
        component={RouterLink}
        to="/sign-in"
        underline="none"
        variant="body1"
        sx={{
          cursor: 'pointer',
          fontSize: '16px',
          color: '#767676',
          textAlign: 'center',
        }}
      >
        Already have and account? Sign-in here
      </MuiLink>

      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: '30px',
        }}
      >
        <CTAButton
          id="sign-up"
          label="Sign up as student"
          loading={buttonLoading}
          handleClick={() => handleSignUp('student')}
          styles={{ fontSize: '24px' }}
        />
        <CTAButton
          id="sign-up"
          label="Sign up as provider"
          loading={buttonLoading}
          handleClick={() => handleSignUp('provider')}
          styles={{ fontSize: '24px' }}
        />
      </Box>
    </Container>
  )
}

export default SignUpPage
