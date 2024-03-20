import React from 'react';
import { FormGroup, InputLabel, TextField } from '@mui/material';
import AccountCard from './AccountCard';
import { ProviderData } from '../../redux/types'

interface ProviderDataProps {
  provider: ProviderData | null
}

const AccountProfile: React.FC<ProviderDataProps> = ({ provider }) => {
  return (
    provider &&
    (<AccountCard heading='Account Profile' subHeading='Edit your account profile and change your profile contents and image here.'>
      <FormGroup sx={theme.formStyle}>
        <InputLabel htmlFor="account-name" sx={theme.labelStyle}>Account Name</InputLabel>
        <TextField disabled id="account-name" defaultValue={provider.scholarship_provider && provider.scholarship_provider.provider_name} sx={theme.inputStyle} />
      </FormGroup>
      <FormGroup sx={theme.formStyle}>
        <InputLabel htmlFor="account-details" sx={theme.labelStyle}>Account Details</InputLabel>
        <TextField disabled id="account-details" defaultValue={provider && provider.description} sx={theme.inputStyle} />
      </FormGroup>
      <FormGroup>
        <InputLabel htmlFor="account-link" sx={theme.labelStyle}>Organization / Link</InputLabel>
        <TextField disabled id="account-link" defaultValue="https://test.com" sx={theme.inputStyle} />
      </FormGroup>
    </AccountCard>)
  )
}

export default AccountProfile;

const theme = {
  boxStyle: {
    py: 3, 
    px: 4,
    backgroundColor: '#95a8bd'
  },
  headingStyle: {
    mb: 1,
    fontSize: 36,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    color: '#002147',
    textAlign: 'center'
  },
  paragraphStyle: {
    mb: 1,
    fontSize: 18,
    fontWeight: 'light',
    fontFamily: 'Roboto',
    color: '#002147',
    textAlign: 'center'
  },
  boxBodyStyle: {
    width: '100%',
    p: 4,
    display: 'flex',
    flexDirection: 'column'
  },
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