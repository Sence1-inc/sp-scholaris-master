import { Box, Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import image from '../../public/images/404.png'
import { ctaButtonStyle } from '../../styles/globalStyles'

import './PageNotFoundPage.css'

const PageNotFoundPage = () => {
  const navigate = useNavigate()
  return (
    <Box
      sx={{
        height: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 100px',
          textAlign: 'center',
          gap: '50px',
          margin: 'auto',
        }}
      >
        <Typography variant="h4">Oops! Page not found.</Typography>
        <img src={image} className="container_404-image" alt="404" />
        <Typography variant="h3">
          We are sorry, the page you requested was not found.
        </Typography>
        <Box sx={{ display: 'flex', gap: '40px' }}>
          <Button sx={{ ...ctaButtonStyle }} onClick={() => navigate(-2)}>
            Go Back
          </Button>
          <Button sx={{ ...ctaButtonStyle }} onClick={() => navigate('/')}>
            Go to Home
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default PageNotFoundPage
