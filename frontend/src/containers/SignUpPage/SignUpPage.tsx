import { useState, Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Button,
  Container,
  TextField,
  Typography,
  Snackbar,
  IconButton,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { Link as MuiLink } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

interface SignUpPageProps {}

const SignUpPage: React.FC<SignUpPageProps> = () => {
  const [userCredentials, setUserCredentials] = useState({
    email: '',
    password: '',
    password2: '',
  })

  const [snackBarState, setSnackBarState] = useState({
    state: false,
    snackBarMessage: '',
  })

  const navigate = useNavigate()

  function handleEmail(inputValue: string) {
    setUserCredentials((prevUserCredentials) => ({
      ...prevUserCredentials,
      email: inputValue,
    }))
  }

  function handlePassword(inputValue: string) {
    setUserCredentials((prevUserCredentials) => ({
      ...prevUserCredentials,
      password: inputValue,
    }))
  }

  function handlePassword2(inputValue: string) {
    setUserCredentials((prevUserCredentials) => ({
      ...prevUserCredentials,
      password2: inputValue,
    }))
  }

  function handleSignUp() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const isValidEmail = emailRegex.test(userCredentials.email)
    const isPasswordValid = userCredentials.password.length > 6
    const isPassword2 = userCredentials.password === userCredentials.password2

    if (!isValidEmail || !userCredentials.email) {
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
      navigate('/verify-email')
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
        onChange={(e) => handleEmail(e.target.value)}
        type="email"
        id="email"
        label="Email address"
        placeholder="Input your email"
        sx={{
          backgroundColor: '#fff',
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
      />
      <TextField
        onChange={(e) => handlePassword(e.target.value)}
        type="password"
        id="password"
        label="Password"
        placeholder="Input your password"
        sx={{
          backgroundColor: '#fff',
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
        onChange={(e) => handlePassword2(e.target.value)}
        type="password"
        id="password2"
        label="Confirm Password"
        placeholder="Input your password"
        sx={{
          backgroundColor: '#fff',
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
      <Typography
        sx={{
          textAlign: 'center',
          color: '#767676',
          fontSize: '24px',
          textDecoration: 'underline',
        }}
      >
        OR
      </Typography>
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
