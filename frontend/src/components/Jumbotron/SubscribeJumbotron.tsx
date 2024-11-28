import { LoadingButton } from '@mui/lab'
import { Box, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import axiosInstance from '../../axiosConfig'
import { useSnackbar } from '../../context/SnackBarContext'
import JumbotronImage from '../../public/images/jumbotron-subscribe.png'
import { SubscriberData } from '../Newsletter/Newsletter'

const SubscribeJumbotron = () => {
  const { showMessage } = useSnackbar()
  const [email, setEmail] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleSubscribe: (
    e: React.MouseEvent<HTMLButtonElement>
  ) => void = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const newSubscriberData: SubscriberData = {
        email: email,
        user_type: 'student',
      }

      const response = await axiosInstance.post(
        `api/v1/subscribers`,
        newSubscriberData
      )

      if (response.status === 201) {
        const successData = response.data
        setIsLoading(false)
        showMessage(successData.message, 'success')
      } else {
        setIsLoading(false)
        const errorData = response.data
        showMessage(
          `Error: ${errorData.error}. ${errorData.details.join(' ')}`,
          'error'
        )
      }
    } catch (error) {
      if (error) {
        setIsLoading(false)
        showMessage('Error creating new subscriber. Please try again.', 'error')
      }
    }
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: { xs: '20px 0', sm: '50px 0' },
          width: { xs: '100%', sm: '80%' },
          height: 'inherit',
          gap: '20px',
          justifyContent: 'center',
          alignItems: { xs: 'center', sm: 'flex-start' },
        }}
      >
        <Box>
          <Typography variant="subtitle1">
            Subscribe and Receive Latest Scholarship Information!
          </Typography>
          <Typography variant="h3">
            Subscribe to Scholaris Newsletter
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            gap: '10px',
            width: { xs: '100%', md: '60%' },
          }}
        >
          <TextField
            id="outlined-basic"
            placeholder="Email address"
            variant="outlined"
            InputLabelProps={{ shrink: false }}
            sx={{
              padding: '4px 6px',
              borderRadius: '20px',
              '& .MuiOutlinedInput-root': { fontSize: '1rem' },
            }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <LoadingButton
            loading={isLoading}
            variant="contained"
            sx={{
              fontSize: '1rem',
              borderRadius: '20px',
              lineHeight: '1rem',
              paddingLeft: '26px',
              paddingRight: '26px',
            }}
            onClick={handleSubscribe}
          >
            Subscribe
          </LoadingButton>
        </Box>
      </Box>
      <Box>
        <img
          src={JumbotronImage}
          height="100%"
          width="100%"
          alt="Unlock Your Future with Scholaris"
        />
      </Box>
    </Box>
  )
}

export default SubscribeJumbotron
