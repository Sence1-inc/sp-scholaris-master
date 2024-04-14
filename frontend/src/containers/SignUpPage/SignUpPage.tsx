import CloseIcon from '@mui/icons-material/Close'
import {
  Button,
  Container,
  IconButton,
  Link as MuiLink,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import { Fragment, useState } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import axiosInstance from '../../axiosConfig'
import CustomSnackbar from '../../components/CustomSnackbar/CustomSnackbar'

interface SignUpPageProps {}

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
  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false)

  const [snackBarState, setSnackBarState] = useState({
    state: false,
    snackBarMessage: '',
  })

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

    if (!isValidEmail || !userCredentials.email_address) {
      setSnackBarState((prevState) => ({
        ...prevState,
        state: true,
        snackBarMessage: 'Please provide a valid email address.',
      }))
    } else if (!isPasswordValid) {
      setSnackBarState((prevState) => ({
        ...prevState,
        state: true,
        snackBarMessage: 'Please provide a valid password.',
      }))
    } else if (!isPassword2) {
      setSnackBarState((prevState) => ({
        ...prevState,
        state: true,
        snackBarMessage: 'Password does not match.',
      }))
    } else {
      try {
        const response = await axiosInstance.post(
          '/api/v1/register',
          userCredentials
        )
        if (response.data) {
          setSuccessMessage(
            "We've sent you a verification email. Please confirm your email address before you log in."
          )
        }
      } catch (error: any) {
        if (error) {
          let errorMessage = 'Registration failed. Please try again.'
          if (
            error.response &&
            error.response.data &&
            error.response.data.error
          ) {
            errorMessage = error.response.data.error
          } else if (error.message) {
            errorMessage = error.message
          }

          setSnackBarState((prevState) => ({
            ...prevState,
            state: true,
            snackBarMessage: errorMessage,
          }))
        }
      }
    }
  }

  const handleClose = (event: React.SyntheticEvent | Event) => {
    setSnackBarState((prevState) => ({
      ...prevState,
      state: false,
    }))
  }

  const action = (
    <Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Fragment>
  )

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
      <Snackbar
        open={snackBarState.state}
        autoHideDuration={6000}
        onClose={handleClose}
        message={snackBarState.snackBarMessage}
        action={action}
      />
      <TextField
        onChange={(e) => handleUserCredentials(e.target.value, 'email_address')}
        value={userCredentials.email_address}
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
      />
      <TextField
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
      />
      <TextField
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
      />
      <TextField
        onChange={(e) => handleUserCredentials(e.target.value, 'first_name')}
        value={userCredentials.first_name}
        label="First Name"
        placeholder="Input your first name"
        InputProps={{
          placeholder: 'Input your first name',
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
      />
      <TextField
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
      />
      <TextField
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
      />
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
              label: 'Birthdate',
              InputLabelProps: {
                sx: {
                  top: '-55px',
                  left: '-15px',
                  fontSize: '24px',
                  fontWeight: '700',
                },
                shrink: false,
              },
            },
          }}
        />
      </LocalizationProvider>

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
      <Button
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
      </Button>
    </Container>
  )
}

export default SignUpPage
