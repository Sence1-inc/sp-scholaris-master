import { FormGroup, InputLabel, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Profile } from '../../redux/types'
import profileTheme from '../../styles/profileTheme'
import AccountCard from './AccountCard'

interface ProfileProps {
  profile: Profile | null
}

const AccountProfile: React.FC<ProfileProps> = ({ profile }) => {
  const [isEditting, setIsEditting] = useState<boolean>(false)
  const [details, setDetails] = useState<string>('')
  const [link, setLink] = useState<string>('')

  useEffect(() => {
    if (profile) {
      setDetails(profile.description)
      setLink(profile.scholarship_provider.provider_link)
    }
  }, [profile])
  return (
    <AccountCard
      heading="Account Profile"
      subHeading="Edit your account profile and change your profile contents and image here."
      handleEdit={(edit) => setIsEditting(edit)}
      isEditting={isEditting}
    >
      <FormGroup sx={profileTheme.form.formStyle}>
        <InputLabel htmlFor="account-details" sx={profileTheme.form.formLabel}>
          Account Details
        </InputLabel>
        <TextField
          disabled={!isEditting}
          id="account-details"
          value={details}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setDetails(e.target.value)
          }
          sx={profileTheme.form.formInput}
        />
      </FormGroup>
      <FormGroup>
        <InputLabel htmlFor="account-link">Organization Link</InputLabel>
        <TextField
          disabled={!isEditting}
          id="account-link"
          value={link}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setLink(e.target.value)
          }
          sx={profileTheme.form.formInput}
        />
      </FormGroup>
    </AccountCard>
  )
}

export default AccountProfile
