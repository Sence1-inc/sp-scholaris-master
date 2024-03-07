import { Button, Container, TextField, Typography, FormControl, InputLabel, Link } from '@mui/material'

interface SignInPageProps{

}

const SignInPage: React.FC<SignInPageProps> = ( ) => {

    
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
                Sign-in
            </Typography>
            <TextField
                type='email'
                id='input'
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
                type='password'
                id='input'
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
            <Container sx={{display: 'flex', justifyContent: 'space-between', padding: '0 !important'}}>
        <Link
            underline='none'
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
        </Link>
        <Link
            underline='none'
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
        </Link>
            </Container>

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
        color="primary"
        sx={{
          borderRadius: '16px',
          backgroundColor: '#f36b3b',
          padding: '20px',
          margin: '0 auto',
          width: '100%',
          maxWidth: '600px',
          '&:hover': { backgroundColor: '#d2522b' },
          textTransform: 'inherit',
          fontSize: '24px'
        }}
      >
        Login
      </Button>
      <Button
        variant="contained"
        sx={{
          borderRadius: '16px',
          backgroundColor: 'transparent',
          border: '3px solid #1AA5D8',
          boxShadow: 'none',
          padding: '20px',
          margin: '0 auto 60px',
          width: '100%',
          maxWidth: '600px',
          '&:hover': { backgroundColor: 'transparent' },
          textTransform: 'inherit',
          fontSize: '24px',
          color: '#1AA5D8',
        }}
      >
        Sign-in with Google
      </Button>

        </Container>
    )
}

export default SignInPage