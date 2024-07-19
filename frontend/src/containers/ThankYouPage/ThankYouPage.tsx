import { Box, Button, Container, Typography } from '@mui/material'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { PROVIDER_TYPE, STUDENT_TYPE } from '../../constants/constants'
import './ThankYouPage.css'

const ThankYouPage: React.FC = () => {
  const navigate = useNavigate()
  const { state } = useLocation()
  return (
    <Box className="content__thank-you">
      <Container className="container">
        <Typography variant="h2">Thank you for your Feedback!</Typography>
        <Typography variant="h3">
          We're grateful for your suggestions and comments.
        </Typography>
        <Typography variant="body1">
          We will keep on improving our services and features.
        </Typography>
        <Button
          id="back-home"
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
          onClick={() =>
            navigate(
              state.user_type === STUDENT_TYPE
                ? `/${STUDENT_TYPE}`
                : `/${PROVIDER_TYPE}`
            )
          }
        >
          Go Back Home
        </Button>
      </Container>
    </Box>
  )
}

export default ThankYouPage
