import { useState, } from 'react';
import { useNavigate } from 'react-router-dom';
import {Button, Container, Typography, Alert, IconButton} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '../../public/images/checkIcon.svg'


interface VerifyEmailProps{

}

const VerifyEmailPage: React.FC<VerifyEmailProps> = ( ) => {
    const [showAlert, setShowAlert] = useState(false);
    const navigate = useNavigate();

    const handleVerifyEmail = () => {

        setShowAlert(true);

        setTimeout(() => {
            setShowAlert(false);
          }, 5000);
      };

    return(
        <Container 
        maxWidth='md'
        sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '50px',
            alignItems: 'center',
            paddingBlock: '120px'
        }}>
                 {showAlert && (
        <Alert
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'absolute',
            right: '20px',
            top: '120px',
            padding: '10px 25px',
            fontSize: '26px',
            color: '#fff',
            backgroundColor: '#1AA5D8',
            borderRadius: '16px',
          }}
          iconMapping={{
            success: (
              <img
                src={CheckIcon}
                alt="Check Icon"
                style={{ width: 'inherit', height: 'inherit' }}
              />
            ),
            error: <CloseIcon fontSize="inherit" />,
          }}
          action={
            <IconButton
              color="inherit"
              size="medium"
              sx={{
                width: '50px',
                height: '50px',
              }}
              edge="end"
              onClick={() => setShowAlert(false)}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          Signed up successfully
        </Alert>
      )}
            <Typography
            variant='h2'
            sx={{
                textTransform: 'capitalize',
                fontSize: '64px',
                fontWeight: '700',
                color: 'var(--secondary-color)',
                textAlign: 'center'
            }}>
                Thank you for signing up
            </Typography>
            <Typography sx={{
                fontSize: '16px',
                fontWeight: '300px',
                textAlign: 'center',
                color: '#767676'
            }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet purus nulla. Suspendisse egestas erat eu lectus semper, quis sollicitudin diam blandit. Sed rhoncus, nisi ac sollicitudin ultricies, ante turpis fermentum elit, id euismod dolor augue mollis dui. Integer efficitur diam sed tellus feugiat, et posuere tortor vestibulum. 
            </Typography>
            <Button
             onClick={handleVerifyEmail} 
            variant="contained"
            color="primary"
            sx={{
            borderRadius: '16px',
            backgroundColor: '#f36b3b',
            padding: '20px',
            margin: '0 auto',
            width: '100%',
            maxWidth: '550px',
            '&:hover': { backgroundColor: '#d2522b' },
            textTransform: 'inherit',
            fontSize: '24px'
        }}
      >
        Verify Email
      </Button>
      <Typography sx={{
                fontSize: '16px',
                fontWeight: '300px',
                textAlign: 'center',
                color: '#767676'
            }}>
            Check your email to verify your account
        </Typography>
    <Button
    onClick={() => navigate('/sign-in')}
        variant="contained"
        sx={{
          backgroundColor: 'transparent',
          border: 'none',
          boxShadow: 'none',
          padding: '0',
          margin: '0 auto',
          width: '100%',
          maxWidth: '320px',
          '&:hover': { backgroundColor: 'transparent',  boxShadow: 'none'},
          textTransform: 'inherit',
          fontStyle: 'italic',
          fontSize: '24px',
          color: '#1AA5D8',
        }}
      >
        Sign-in Account
      </Button>
        </Container>
    )
}

export default VerifyEmailPage