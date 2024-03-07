import { Box, Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../redux/store'

const ThankYou = () => {
  const subscriber = useAppSelector((state) => state.subscriber)
  const navigate = useNavigate()
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        height: '100%',
      }}
    >
      <Typography variant="h5">
        Thank you {subscriber.email} for subscribing to our newsletter
      </Typography>
      <Typography variant="body2">
        Experience a smoother scholarship application process with our upcoming
        management system, granting you more control over applications and
        scholarship management. Share your thoughts in our survey and help us
        tailor our services to better meet your needs.
      </Typography>
      <Button
        onClick={() => navigate(`/${subscriber.user_type}/survey`)}
        fullWidth
        sx={{
          padding: '20px',
          borderRadius: '16px',
          fontWeight: '700',
          textTransform: 'capitalize',
          backgroundColor: 'var(--secondary-color)',
          color: 'white',
          '&:hover': {
            backgroundColor: 'var(--primary-color)',
          },
        }}
      >
        Answer Survey
      </Button>
    </Box>
  )
}

export default ThankYou
