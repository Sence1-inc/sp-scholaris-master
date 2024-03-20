import React, { useState} from 'react';
import AccountCard from './AccountCard';
import { FormGroup, InputLabel, TextField } from '@mui/material';
import PrimaryButton from '../Button/PrimaryButton';

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
    marginBottom: 2,
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
  return (
    <AccountCard heading='Account Security' subHeading='Edit your account password security'>
      <FormGroup sx={theme.formStyle}>
        <InputLabel htmlFor="account-name" sx={theme.labelStyle}>Account Password</InputLabel>
        <TextField disabled id="account-name" defaultValue="Last Password Change: December 30, 2024" sx={theme.inputStyle} />
        <PrimaryButton label='Reset Password' />
      </FormGroup>
    </AccountCard>
  )
}

export default AccountSettings;