import React from 'react';
import { FormGroup, InputLabel, TextField } from '@mui/material';
import { ProviderData } from '../../redux/types'
import AccountCard from './AccountCard';
import profileTheme from '../../styles/profileTheme';

interface ProviderDataProps {
  provider: ProviderData | null
}

const AccountProfile: React.FC<ProviderDataProps> = ({ provider }) => {
  return (
    provider &&
    (<AccountCard heading='Account Profile' subHeading='Edit your account profile and change your profile contents and image here.'>
      <FormGroup sx={profileTheme.form.formStyle}>
        <InputLabel htmlFor="account-name" sx={profileTheme.form.formLabel}>Account Name</InputLabel>
        <TextField disabled id="account-name" defaultValue={provider.scholarship_provider && provider.scholarship_provider.provider_name} sx={profileTheme.form.formInput} />
      </FormGroup>
      <FormGroup sx={profileTheme.form.formStyle}>
        <InputLabel htmlFor="account-details" sx={profileTheme.form.formLabel}>Account Details</InputLabel>
        <TextField disabled id="account-details" defaultValue={provider && provider.description} sx={profileTheme.form.formInput} />
      </FormGroup>
      <FormGroup>
        <InputLabel htmlFor="account-link" sx={profileTheme.form.formLabel}>Organization / Link</InputLabel>
        <TextField disabled id="account-link" defaultValue="https://test.com" sx={profileTheme.form.formInput} />
      </FormGroup>
    </AccountCard>)
  )
}

export default AccountProfile;