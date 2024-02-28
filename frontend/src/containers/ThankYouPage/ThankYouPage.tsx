import React from 'react';
import './ThankYouPage.css';
// import WelcomePage from '/containers/WelcomePage/WelcomePage';
import { Button } from '@mui/material';
import { amber } from '@mui/material/colors';

const ThankYouPage: React.FC = () => {
    return (
      <>
        <div className='content__thank-you'>
            <div className='container'>
                <h2>Thank you for your Feedback!</h2>
                <h3>We're grateful for your feedback</h3>
                <p>We will keep on improving our services and feature.</p>
                <Button 
                    variant="contained"
                    sx={{ 
                        bgcolor: amber[900],
                        borderRadius: '16px',
                        marginTop: 5,
                        maxWidth: 'md', width: '100%', height: '70px',
                        fontSize: '24px', fontFamily: 'Outfit', fontWeight: '700'
                    }}>Go Back Home
                </Button>
            </div>
        </div>
      </>
    );
  }
  
  export default ThankYouPage;