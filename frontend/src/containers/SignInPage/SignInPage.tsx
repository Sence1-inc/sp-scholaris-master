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
import { Fragment, useState } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import axiosInstance from '../../axiosConfig'
import { initializeProfile } from '../../redux/reducers/ProfileReducer'
import { initializeUser } from '../../redux/reducers/UserReducer'
import { useAppDispatch } from '../../redux/store'

interface SignInPageProps {}

const SignInPage: React.FC<SignInPageProps> = () => {
  const dispatch = useAppDispatch()
  const [userCredentials, setUserCredentials] = useState({
    email_address: '',
    password: '',
    service_id: 1,
    service_key: process.env.REACT_APP_SERVICE_KEY,
    role: 'provider',
  })

  const [open, setOpen] = useState(false)

  const navigate = useNavigate()

  function handleEmail(inputValue: string) {
    setUserCredentials((prevUserCredentials) => ({
      ...prevUserCredentials,
      email_address: inputValue,
    }))
  }

  function handlePassword(inputValue: string) {
    setUserCredentials((prevUserCredentials) => ({
      ...prevUserCredentials,
      password: inputValue,
    }))
  }

  const handleSignIn = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const isValidEmail = emailRegex.test(userCredentials.email_address) // && userCredentials.email === user's email;
    const isPasswordValid = undefined // if password is the user's password

    if (!isValidEmail && !isPasswordValid) {
      setOpen(true)
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
          dispatch(initializeUser(response.data))
          dispatch(initializeProfile(response.data.profile))
          navigate('/provider/dashboard')
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleClose = (event: React.SyntheticEvent | Event) => {
    setOpen(false)
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
        Sign-in
      </Typography>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Password and email does not match"
        action={action}
      />
      <TextField
        onChange={(e) => handleEmail(e.target.value)}
        value={userCredentials.email_address}
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
      />
      <TextField
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
      />
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '0 !important',
        }}
      >
        <MuiLink
          underline="none"
          sx={{
            cursor: 'pointer',
            fontSize: '16px',
            color: '#767676',
            fontWeight: '300',
            fontStyle: 'italic',
            marginBottom: '10px',
            textAlign: 'start',
          }}
        >
          Forgot password?
        </MuiLink>
        <MuiLink
          component={RouterLink}
          to="/sign-up"
          underline="none"
          variant="body1"
          sx={{
            cursor: 'pointer',
            fontSize: '16px',
            color: '#767676',
            marginBottom: '10px',
            textAlign: 'start',
          }}
        >
          No account yet? Sign-up here
        </MuiLink>
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
