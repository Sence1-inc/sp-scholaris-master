import { Box, FormGroup, InputLabel, TextField } from '@mui/material'
import React from 'react'
import profileTheme from '../../styles/profileTheme'
import PrimaryButton from '../Button/PrimaryButton'
import AccountCard from './AccountCard'

const AccountSettings: React.FC = () => {
  return (
    <AccountCard
      heading="Account Security"
      subHeading="Edit your account password security"
    >
      <FormGroup sx={profileTheme.form.formStyle}>
        <InputLabel htmlFor="account-name" sx={profileTheme.form.formLabel}>
          Account Password
        </InputLabel>
        <TextField
          disabled
          id="account-name"
          defaultValue="Last Password Change: December 30, 2024"
          sx={profileTheme.form.formInput}
        />
        <Box sx={{ marginTop: 2 }}>
          <PrimaryButton label="Reset Password" />
        </Box>
      </FormGroup>
    </AccountCard>
  )
}

export default AccountSettings
