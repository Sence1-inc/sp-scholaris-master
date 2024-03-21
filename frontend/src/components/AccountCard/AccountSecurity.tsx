import React from 'react';
import AccountCard from './AccountCard';
import { FormGroup, InputLabel, TextField, Box } from '@mui/material';
import PrimaryButton from '../Button/PrimaryButton';
import profileTheme from '../../styles/profileTheme';

const AccountSettings: React.FC = () => {
  return (
    <AccountCard heading='Account Security' subHeading='Edit your account password security'>
      <FormGroup sx={profileTheme.form.formStyle}>
        <InputLabel htmlFor="account-name" sx={profileTheme.form.formLabel}>Account Password</InputLabel>
        <TextField disabled id="account-name" defaultValue="Last Password Change: December 30, 2024" sx={profileTheme.form.formInput} />
        <Box sx={{ marginTop: 2 }}>
          <PrimaryButton label='Reset Password' />
        </Box>
      </FormGroup>
    </AccountCard>
  )
}

export default AccountSettings;