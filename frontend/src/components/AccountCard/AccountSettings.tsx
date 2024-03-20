import React, { useState, useEffect } from 'react';
import { AxiosResponse } from 'axios'
import axiosInstance from '../../axiosConfig'
import Button from '../Button/Button';
import AccountCard from './AccountCard';
import { ErrorResponse, SuccessResponse } from '../../components/Newsletter/Newsletter';
import Alert from '@mui/material/Alert';
import { FormGroup, InputLabel, TextField, Box } from '@mui/material';

const theme = {
  formStyle: {
    marginBottom: 2,
  },
  boxStyle: {
    marginTop: 2,
    display: 'flex',
    flexDirection: 'row',
    gap: 2,
  },
  labelStyle: {
    fontFamily: 'Roboto',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 1,
    color: '#002147',
  },
  inputStyle: {  
    backgroundColor: '#ffffff', 
    borderRadius: 4, 
    border: '1px solid #656565',
    boxShadow: 'inset -1px -1px 4px #656565',
    "& .MuiOutlinedInput-root": {
      "& .MuiInputBase-input": {
        height: 40,
        fontSize: 20,
      },
      "& fieldset.MuiOutlinedInput-notchedOutline": {
        border: "none",
      },
    },
  },
}

const AccountSettings: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [alertMessage, setAlertMessage] = useState<string>('')

  useEffect(() => {
    if(alertMessage || errorMessage) {
      setTimeout(() => {
        setAlertMessage('');
        setErrorMessage('');
      }, 4000)
    }
  }, [alertMessage, errorMessage])

  const handleSubscribe: (
    e: React.MouseEvent<HTMLButtonElement>
  ) => void = async (e) => {
    e.preventDefault()
  
    try {
      const response: AxiosResponse<SuccessResponse | ErrorResponse> =
        await axiosInstance.post(`api/v1/subscribers/restore`, { id: 1 })
  
      if (response.status === 200) {
        const successData = response.data as SuccessResponse
        setAlertMessage(successData.message);
      } else {
        const errorData = response.data as ErrorResponse
        setErrorMessage(
          `Error: ${errorData.error}. ${errorData.details.join(' ')}`
        )
      }
    } catch (error) {
      setErrorMessage('Error Subscribing. Please try again.')
    }
  }
  
  const handleUnsubscribe: (
    e: React.MouseEvent<HTMLButtonElement>
  ) => void = async (e) => {
    e.preventDefault()
  
    try {
      const response: AxiosResponse<SuccessResponse | ErrorResponse> =
        await axiosInstance.post(`api/v1/subscribers/soft_delete`, { id: 1 })
  
      if (response.status === 200) {
        const successData = response.data as SuccessResponse
        setAlertMessage(successData.message);
      } else {
        const errorData = response.data as ErrorResponse
        setErrorMessage(
          `Error: ${errorData.error}. ${errorData.details.join(' ')}`
        )
      }
    } catch (error) {
      setErrorMessage('Error Unsubscribing. Please try again.')
    }
  }

  return (
    <AccountCard heading='Account Settings' subHeading='Edit your account billing and subscription in here'>
      <FormGroup sx={theme.formStyle}>
        <InputLabel htmlFor="account-name" sx={theme.labelStyle}>Newsletter Email</InputLabel>
        <TextField disabled id="account-name" defaultValue="Registered Email: test@email.com" sx={theme.inputStyle} />
        {alertMessage ? <Alert sx={{ marginTop: 2 }} severity="success">{alertMessage}</Alert> : errorMessage && <Alert sx={{ marginTop: 2 }} severity="error">{errorMessage}</Alert>}
        <Box sx={theme.boxStyle}>
          <Button handleClick={handleSubscribe}>Subscribe</Button>
          <Button handleClick={handleUnsubscribe}>Unsubscribe</Button>
        </Box>
      </FormGroup>
    </AccountCard>
  )
}

export default AccountSettings;