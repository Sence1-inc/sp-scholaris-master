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
        fontSize: 20,
      },
      "& fieldset.MuiOutlinedInput-notchedOutline": {
        border: "none",
      },
    },
  },
}

const AccountClose: React.FC = () => {
  return (
    <AccountCard heading='Close Account' subHeading='Delete your account'>
      <FormGroup sx={theme.formStyle}>
        <InputLabel htmlFor="account-name" sx={theme.labelStyle}>Close Account</InputLabel>
        <TextField disabled id="account-name" defaultValue="Close Account" sx={theme.inputStyle} />
      </FormGroup>
    </AccountCard>
  )
}

export default AccountClose;