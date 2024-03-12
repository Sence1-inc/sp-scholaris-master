import { Box, Typography } from '@mui/material'
import PrimaryButton from '../../components/Button/PrimaryButton'
import image from '../../public/images/404.png'

import './PageNotFoundPage.css'

const PageNotFoundPage = () => {
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
        <PrimaryButton label="Go to Home" url="/"></PrimaryButton>
      </Box>
    </Box>
  )
}

export default PageNotFoundPage
