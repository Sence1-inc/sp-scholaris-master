import { FormGroup, InputLabel, TextField } from '@mui/material'
import React from 'react'
import profileTheme from '../../styles/profileTheme'
import AccountCard from './AccountCard'

const AccountClose: React.FC = () => {
  return (
    <AccountCard heading="Close Account" subHeading="Delete your account">
      <FormGroup sx={profileTheme.form.formStyle}>
        <InputLabel htmlFor="account-name" sx={profileTheme.form.formLabel}>
          Close Account
        </InputLabel>
        <TextField
          disabled
          id="account-name"
          defaultValue="Close Account"
          sx={profileTheme.form.formInput}
        />
      </FormGroup>
    </AccountCard>
  )
}

export default AccountClose
