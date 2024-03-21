import React from 'react';
import AccountCard from './AccountCard';
import { FormGroup, InputLabel, TextField } from '@mui/material';
import profileTheme from '../../styles/profileTheme';

const AccountClose: React.FC = () => {
  return (
    <AccountCard heading='Close Account' subHeading='Delete your account'>
      <FormGroup sx={profileTheme.form.formStyle}>
        <InputLabel htmlFor="account-name" sx={profileTheme.form.formLabel}>Close Account</InputLabel>
        <TextField disabled id="account-name" defaultValue="Close Account" sx={profileTheme.form.formInput} />
      </FormGroup>
    </AccountCard>
  )
}

export default AccountClose;