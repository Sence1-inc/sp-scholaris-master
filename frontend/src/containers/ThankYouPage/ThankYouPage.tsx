import React from 'react'
import './ThankYouPage.css'
import { Box, Button, Container } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const ThankYouPage: React.FC = () => {
  const navigate = useNavigate()
  return (
    <>
      <Box className="content__thank-you">
        <Container className="container">
          <h2>Thank you for your Feedback!</h2>
          <h3>We're grateful for your feedback</h3>
          <p>We will keep on improving our services and feature.</p>
          <Button
            variant="contained"
            sx={{
              bgcolor: '#f36b3b',
              borderRadius: '16px',
              marginTop: 5,
              maxWidth: 'md',
              width: '100%',
              height: '70px',
              fontSize: '24px',
              fontFamily: 'Outfit',
              fontWeight: '700',
              ':hover': {
                bgcolor: '#002147',
                color: 'white',
              },
            }}
            onClick={() => navigate('/')}
          >
            Go Back Home
          </Button>
        </Container>
      </Box>
    </>
  )
}

export default ThankYouPage
