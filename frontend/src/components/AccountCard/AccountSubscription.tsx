import React from 'react';
import AccountCard from './AccountCard';
import { FormGroup, InputLabel, TextField } from '@mui/material';

const theme = {
  formStyle: {
    marginBottom: 2,
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
        padding: 2,
        fontSize: 20,
      },
      "& fieldset.MuiOutlinedInput-notchedOutline": {
        border: "none",
      },
    },
  },
}


const AccountSubscription: React.FC = () => {
  return (
    <AccountCard heading='Account Subscription' subHeading='Edit your account billing and subscription in here'>
      <FormGroup sx={theme.formStyle}>
        <InputLabel htmlFor="account-name" sx={theme.labelStyle}>Subscription</InputLabel>
        <TextField disabled id="account-name" defaultValue="Expired: December 30, 2024" sx={theme.inputStyle} />
      </FormGroup>
      <FormGroup sx={theme.formStyle}>
        <InputLabel htmlFor="account-name" sx={theme.labelStyle}>Payment Method</InputLabel>
        <TextField disabled id="account-name" defaultValue="VISA: XXXX-XXXX-XXXX-1234" sx={theme.inputStyle} />
      </FormGroup>
    </AccountCard>
  ) 
}

export default AccountSubscription;