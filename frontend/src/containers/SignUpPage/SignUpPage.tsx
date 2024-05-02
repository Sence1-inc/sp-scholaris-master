import { Box, Container, Link as MuiLink, Typography } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import axiosInstance from '../../axiosConfig'
import CTAButton from '../../components/CustomButton/CTAButton'
import CustomSnackbar from '../../components/CustomSnackbar/CustomSnackbar'
import CustomTextfield from '../../components/CutomTextfield/CustomTextfield'
import HelperText from '../../components/HelperText/HelperText'
import { useAppSelector } from '../../redux/store'

interface SignUpPageProps {}

type Errors = {
  email_address: string
  password: string
  password2: string
  first_name: string
  last_name: string
  middle_name: string
  birthdate: string
}

const SignUpPage: React.FC<SignUpPageProps> = () => {
  const navigate = useNavigate()
  const [userCredentials, setUserCredentials] = useState({
    email_address: '',
    password: '',
    password2: '',
    first_name: '',
    last_name: '',
    middle_name: '',
    birthdate: null,
    is_active: 1,
    service_id: 1,
    service_key: process.env.REACT_APP_SERVICE_KEY,
    role: 'provider',
  })
  const [successMessage, setSuccessMessage] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false)
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

  const handleSignUp = async () => {
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
        condition: !isPasswordValid,
        field: 'password',
        message: 'Please provide a valid password.',
      },
      {
        condition: !isPassword2 || !userCredentials.password2,
        field: 'password2',
        message: 'Password does not match.',
      },
      {
        condition: !userCredentials.first_name,
        field: 'first_name',
        message: 'Please provide first name.',
      },
      {
        condition: !userCredentials.middle_name,
        field: 'middle_name',
        message: 'Please provide middle name.',
      },
      {
        condition: !userCredentials.last_name,
        field: 'last_name',
        message: 'Please provide last name.',
      },
      {
        condition: !userCredentials.birthdate,
        field: 'birthdate',
        message: 'Please provide birthday.',
      },
    ]

    const errorMessages = validationConditions
      .filter(({ condition }) => condition)
      .map(({ message }) => message)
    const hasErrors = errorMessages.length > 0

    if (hasErrors) {
      setSuccessMessage('')
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
      setButtonLoading(true)
      try {
        const response = await axiosInstance.post(
          '/api/v1/register',
          userCredentials
        )
        if (response.data) {
          setButtonLoading(false)
          setIsSnackbarOpen(true)
          setErrorMessage('')
          setSuccessMessage(
            "We've sent you a verification email. Please confirm your email address before you log in."
          )
        }
        console.log(response)
      } catch (error: any) {
        console.log('Error', error)
        setSuccessMessage('')
        if (error) {
          setButtonLoading(false)
          let errorMsg = 'Registration failed. Please try again.'
          if (
            error.response &&
            error.response.data &&
            error.response.data.error
          ) {
            errorMsg = error.response.data.error
          } else if (error.message) {
            errorMsg = error.message
          }
          setIsSnackbarOpen(true)
          setErrorMessage(errorMsg)
        }
      }
    }
  }

  // const handleSignUp = async () => {
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  //   const isValidEmail = emailRegex.test(userCredentials.email_address)
  //   const isPasswordValid = userCredentials.password.length > 6
  //   const isPassword2 = userCredentials.password === userCredentials.password2

  //   if (!isValidEmail || !userCredentials.email_address) {
  //     setSuccessMessage('')
  //     setIsSnackbarOpen(true)
  //     setErrorMessage('Please fill in the required details.')
  //     setErrors({
  //       ...errors,
  //       email_address: 'Please provide a valid email address.',
  //     })
  //   } else if (!isPasswordValid) {
  //     setSuccessMessage('')
  //     setIsSnackbarOpen(true)
  //     setErrorMessage('Please fill in the required details.')
  //     setErrors({
  //       ...errors,
  //       password: 'Please provide a valid password.',
  //     })
  //   } else if (!isPassword2) {
  //     setSuccessMessage('')
  //     setIsSnackbarOpen(true)
  //     setErrorMessage('Please fill in the required details.')
  //     setErrors({
  //       ...errors,
  //       password2: 'Password does not match.',
  //     })
  //   } else if (!userCredentials.first_name) {
  //     setSuccessMessage('')
  //     setIsSnackbarOpen(true)
  //     setErrorMessage('Please fill in the required details.')
  //     setErrors({
  //       ...errors,
  //       first_name: 'Please provide first name.',
  //     })
  //   } else if (!userCredentials.middle_name) {
  //     setSuccessMessage('')
  //     setIsSnackbarOpen(true)
  //     setErrorMessage('Please fill in the required details.')
  //     setErrors({
  //       ...errors,
  //       middle_name: 'Please provide middle name.',
  //     })
  //   } else if (!userCredentials.last_name) {
  //     setSuccessMessage('')
  //     setIsSnackbarOpen(true)
  //     setErrorMessage('Please fill in the required details.')
  //     setErrors({
  //       ...errors,
  //       last_name: 'Please provide last name.',
  //     })
  //   } else if (!isPasswordValid) {
  //     setSuccessMessage('')
  //     setIsSnackbarOpen(true)
  //     setErrorMessage('Please fill in the required details.')
  //     setErrors({
  //       ...errors,
  //       last_name: 'Please provide birthdate.',
  //     })
  //   } else {
  //     try {
  //       const response = await axiosInstance.post(
  //         '/api/v1/register',
  //         userCredentials
  //       )
  //       if (response.data) {
  //         setIsSnackbarOpen(true)
  //         setErrorMessage('')
  //         setSuccessMessage(
  //           "We've sent you a verification email. Please confirm your email address before you log in."
  //         )
  //       }
  //     } catch (error: any) {
  //       setSuccessMessage('')
  //       if (error) {
  //         let errorMsg = 'Registration failed. Please try again.'
  //         if (
  //           error.response &&
  //           error.response.data &&
  //           error.response.data.error
  //         ) {
  //           errorMsg = error.response.data.error
  //         } else if (error.message) {
  //           errorMsg = error.message
  //         }
  //         setIsSnackbarOpen(true)
  //         setErrorMessage(errorMsg)
  //       }
  //     }
  //   }
  // }

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
        errorMessage={errorMessage}
        successMessage={successMessage}
        isSnackbarOpen={isSnackbarOpen}
        handleSetIsSnackbarOpen={(value) => setIsSnackbarOpen(value)}
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
          label="Password"
          error={errors.password}
          handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleUserCredentials(e.target.value, 'password')
          }
          value={userCredentials.password}
          placeholder="Input your password"
        />
        <CustomTextfield
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
        {/* <TextField
        onChange={(e) =>
          handleUserCredentials(e.target.value.toLowerCase(), 'email_address')
        }
        value={userCredentials.email_address.toLowerCase()}
        error={!!errors.email_address} // Set error prop based on the presence of error
        helperText={errors.email_address ? errors.email_address : ''}
        type="email"
        id="email"
        label="Email address"
        placeholder="Input your email"
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
        onChange={(e) => handleUserCredentials(e.target.value, 'password')}
        value={userCredentials.password}
        type="password"
        id="password"
        label="Password"
        placeholder="Input your password"
        InputProps={{
          placeholder: 'Input your password',
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
        onChange={(e) => handleUserCredentials(e.target.value, 'password2')}
        value={userCredentials.password2}
        type="password"
        id="password2"
        label="Confirm Password"
        placeholder="Input your password"
        InputProps={{
          placeholder: 'Input your password',
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
        onChange={(e) => handleUserCredentials(e.target.value, 'first_name')}
        value={userCredentials.first_name}
        label="First Name"
        placeholder="Input your first name"
        error={!!errors.first_name} // Set error prop based on the presence of error
        helperText={errors.first_name ? 'First name is required' : ''}
        InputProps={{
          placeholder: 'Input your first name',
          sx: {
            '& .MuiInputBase-root': {
              borderColor: errors.first_name ? 'red' : '', // Set border color based on error
            },
          },
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
        onChange={(e) => handleUserCredentials(e.target.value, 'middle_name')}
        value={userCredentials.middle_name}
        label="Middle Name"
        placeholder="Input your middle name"
        InputProps={{
          placeholder: 'Input your middle name',
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
        onChange={(e) => handleUserCredentials(e.target.value, 'last_name')}
        value={userCredentials.last_name}
        label="Last Name"
        placeholder="Input your last name"
        InputProps={{
          placeholder: 'Input your last name',
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
      <CTAButton
        label="Sign up"
        loading={buttonLoading}
        handleClick={handleSignUp}
        styles={{ fontSize: '24px' }}
      />

      {/* <Button
        onClick={handleSignUp}
        variant="contained"
        color="primary"
        sx={{
          borderRadius: '16px',
          backgroundColor: '#f36b3b',
          padding: '20px',
          margin: '0 auto 60px',
          width: '100%',
          maxWidth: '320px',
          '&:hover': { backgroundColor: '#d2522b' },
          textTransform: 'inherit',
          fontSize: '24px',
        }}
      >
        Sign up
      </Button> */}
    </Container>
  )
}

export default SignUpPage
