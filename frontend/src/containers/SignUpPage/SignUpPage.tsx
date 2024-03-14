import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Container, TextField, Typography, Link } from '@mui/material'

interface SignUpPageProps{

}

const SignUpPage: React.FC<SignUpPageProps> = ( ) => {
  const [userCredentials, setUserCredentials] = useState({
    email: '',
    password: '',
    password2: ''
  })

  const navigate = useNavigate()

  function handleEmail(inputValue: string) {
    setUserCredentials((prevUserCredentials) => ({
    ...prevUserCredentials,
    email: inputValue
    }));
  }

  function handlePassword(inputValue: string){
    setUserCredentials((prevUserCredentials) => ({
      ...prevUserCredentials,
      password: inputValue
    }));
  }

  function handlePassword2(inputValue: string){
    setUserCredentials((prevUserCredentials) => ({
      ...prevUserCredentials,
      password2: inputValue
    }));
  }

  function handleSignUp(){
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(userCredentials.email);
    //const isPasswordValid what is the condition for the password to be valid?

    if(!isValidEmail && userCredentials.password === userCredentials.password2){
      console.log('email and password does not match')
    }
      navigate('/verify-email')

  }

    return(
        <Container maxWidth='md' sx={{
            display: 'flex',
            flexDirection: 'column',
            rowGap: '50px',
            marginBlock: '40px'
        }}>
            <Typography variant='h2' sx={{
                fontSize: '64px',
                fontWeight: '700',
                textAlign: 'center',
                color: 'var(--secondary-color)'
            }}>
                Sign-up
            </Typography>
            <TextField
                onChange={(e) => handleEmail(e.target.value)}
                type='email'
                id='email'
                label="Email address"
                placeholder='Input your email'
                sx={{
                    backgroundColor: '#F3F3F3',
                    borderRadius: '16px',
                    marginTop: '35px',
                    width: '100%',
                    '& fieldset': { border: 'none' },
                    border: '1px solid #0E2F71',
                    boxShadow: '-4px -4px 1.9px 0 rgba(0, 0, 0, 10%) inset',
                  }}
                  inputProps={{
                    sx: { fontSize: '24px', color: 'var(--primary-color)', padding: '30px' },
                  }}
                  InputProps={{
                    placeholder: 'asdasd'
                  }}
                  InputLabelProps={{
                    sx: {
                        top: '-55px',
                        left: '-15px',
                        fontSize: '24px',
                        fontWeight: '700'
                    },
                    shrink: false
                  }}
            />
            <TextField
                onChange={(e) => handlePassword(e.target.value)}
                type='password'
                id='password'
                label="Password"
                placeholder='Input your email'
                sx={{
                    backgroundColor: '#F3F3F3',
                    borderRadius: '16px',
                    marginTop: '35px',
                    width: '100%',
                    '& fieldset': { border: 'none' },
                    border: '1px solid #0E2F71',
                    boxShadow: '-4px -4px 1.9px 0 rgba(0, 0, 0, 10%) inset',
                  }}
                  inputProps={{
                    sx: { fontSize: '24px', color: 'var(--primary-color)', padding: '30px' },
                  }}
                  InputProps={{
                    placeholder: 'asdasd'
                  }}
                  InputLabelProps={{
                    sx: {
                        top: '-55px',
                        left: '-15px',
                        fontSize: '24px',
                        fontWeight: '700'
                    },
                    shrink: false
                  }}
            />
             <TextField
                onChange={(e) => handlePassword2(e.target.value)}
                type='password'
                id='paswword2'
                label="Password"
                placeholder='Input your email'
                sx={{
                    backgroundColor: '#F3F3F3',
                    borderRadius: '16px',
                    marginTop: '35px',
                    width: '100%',
                    '& fieldset': { border: 'none' },
                    border: '1px solid #0E2F71',
                    boxShadow: '-4px -4px 1.9px 0 rgba(0, 0, 0, 10%) inset',
                  }}
                  inputProps={{
                    sx: { fontSize: '24px', color: 'var(--primary-color)', padding: '30px' },
                  }}
                  InputProps={{
                    placeholder: 'asdasd'
                  }}
                  InputLabelProps={{
                    sx: {
                        top: '-55px',
                        left: '-15px',
                        fontSize: '24px',
                        fontWeight: '700'
                    },
                    shrink: false
                  }}
            />
        <Link
          underline='none'
          variant="body1"
          sx={{
              cursor: 'pointer',
              fontSize: '16px',
              color: '#767676',
              marginBottom: '10px',
              textAlign: 'center',
          }}
        >
          Already have and account? Sign-in here
        </Link>
          <Container sx={{display: 'flex', justifyContent: 'center', gap: '50px', alignItems: 'center', marginBottom: '60px'}}>
          <Button
          onClick={handleSignUp}
        variant="contained"
        color="primary"
        sx={{
          borderRadius: '16px',
          backgroundColor: '#f36b3b',
          padding: '20px',
          margin: '0 auto',
          width: '100%',
          maxWidth: '320px',
          '&:hover': { backgroundColor: '#d2522b' },
          textTransform: 'inherit',
          fontSize: '24px'
        }}
      >
        Sign up
      </Button>
          <Typography
          variant="body1"
          sx={{
            textDecoration: 'underline',
            fontSize: '24px',
            color: 'var(--primary-color)',
            textAlign: 'center',
          }}
        >
          OR
        </Typography>
        <Button
        variant="contained"
        sx={{
          borderRadius: '16px',
          backgroundColor: 'transparent',
          border: '3px solid #1AA5D8',
          boxShadow: 'none',
          padding: '20px',
          margin: '0 auto',
          width: '100%',
          maxWidth: '320px',
          '&:hover': { backgroundColor: 'transparent' },
          textTransform: 'inherit',
          fontSize: '24px',
          color: '#1AA5D8',
        }}
      >
        Sign-in with Google
      </Button>
          </Container>
        </Container>
    )
}

export default SignUpPage