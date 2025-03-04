import { Box, Button, Container, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import axiosInstance from '../../axiosConfig'
import CTAButton from '../../components/CustomButton/CTAButton'
import CustomTextfield from '../../components/CutomTextfield/CustomTextfield'
import { initializeUser } from '../../redux/reducers/UserReducer'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { useSnackbar } from '../../context/SnackBarContext'
import { User } from '../../redux/types'
import { initializeIsAuthenticated } from '../../redux/reducers/IsAuthenticatedReducer'
import BannerButton from '../../components/Button/BannerButton'
import SignUp from '../../components/SignUp/SignUp'

interface SignInPageProps {}

// interface SignInChildProps {
//   updateSignInClosedState: () => void;
// }

type Errors = {
  email_address: string
  password: string
}

type UserCredentials = {
  email_address: string
  password: string
}

const SignInPage: React.FC<SignInPageProps> = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { showMessage } = useSnackbar()
  const isAuthenticated = useAppSelector(
    (state) => state.isAuthenticated
  )
  const [userCredentials, setUserCredentials] = useState<UserCredentials>({
    email_address: '',
    password: '',
  })
  const userState: User = useAppSelector((state) => state.user)
  const [errors, setErrors] = useState<Errors>({
    email_address: '',
    password: '',
  })
  const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false)
  const [isSignUpClicked, setIsSignUpClicked] = useState<boolean>(false)
  const handleSignUpShow = () => {
    location.pathname === '/sign-in' ?
    nav(('/sign-up')) : setIsSignUpClicked(true)  
  }
  const nav = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isAuthenticated) {
      console.log(window.location.pathname);
      switch (userState?.role?.id) {
        case 3:
          if(window.location.pathname != '/sign-in') {
            // updateSignInClosedState();
            navigate(window.location.pathname);
          } else {
            console.log('here in student profile')
            navigate('/student/account')
          }
          break

        case 4:
          if (userState.scholarship_provider.provider_name) {
            navigate('/provider/dashboard')
          } else {
            navigate(`/provider/account/${userState.id}/view-profile`)
          }
          break
        case 5:
          navigate('/admin/scholarships')
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
      setIsButtonLoading(true)
      try {
        const response = await axiosInstance.post(
          `/api/v1/login`,
          userCredentials,
          {
            withCredentials: true,
          }
        )

        setErrors({
          email_address: '',
          password: '',
        })
        setIsButtonLoading(false)
        dispatch(initializeUser(response.data))
        dispatch(initializeIsAuthenticated(true))
      } catch (error: any) {
        setIsButtonLoading(false)
        if (error) {
          showMessage(error.response.data.message ?? 'Login failed.', 'error')
          setErrors({
            email_address: '',
            password: '',
          })
          dispatch(initializeIsAuthenticated(false))
        }
      }
    }
  }

  return (
    <>
    {
    isSignUpClicked ? 
    <SignUp />:
    <Container
      maxWidth="md"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        rowGap: '25px',
        marginBlock: '40px',
      }}
    >
      <Box
         className='banner__container'
        >
          <BannerButton />
        </Box>
      <Typography
        variant="h2"
        sx={{
          fontSize: {xs: '26px', md: '30px', lg: '40px'},
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
          handleClick={handleSignIn}
          label="Sign in"
          loading={isButtonLoading}
          styles={{ 
            fontSize: { xs: '16px', lg: '24px' },
            padding: {xs: '10px', lg: '20px'} 
          }}
        />
      </Box>
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '0 0 40px'
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
            display: 'flex',
            alignItems: 'start',
            textTransform: 'none',
            backgroundColor: 'transparent',
            '&:hover': {
              backgroundColor: '#FFF',
            },
          }}
          onClick={() => {
            showMessage(
              'Contact scholaris@sence1.com to change password.',
              'info'
            )
          }}
        >
          Forgot password?
        </Button>
        <Button
          id="to-sign-up"
          disableRipple
          onClick={handleSignUpShow}
          variant="text"
          sx={{
            cursor: 'pointer',
            fontSize: '16px',
            color: '#767676',
            fontWeight: '300',
            fontStyle: 'italic',
            textAlign: 'right',
            textTransform: 'none',
            backgroundColor: 'transparent',
            '&:hover': {
              backgroundColor: '#FFF',
            },
          }}
        >
          No account yet? <br/> Sign up here
        </Button>
      </Container>
    </Container>
    }
    </>
  )
}

export default SignInPage

