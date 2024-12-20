import { LoadingButton } from '@mui/lab'
import { Box } from '@mui/material'
import React from 'react'
import profileTheme from '../../styles/profileTheme';


interface CTAButtonProps {
  icon?: string
  handleClick: any
  label: string
  loading: boolean
  styles?: any
  disabled?: boolean
  id?: string
}

const CTAButton: React.FC<CTAButtonProps> = ({
  handleClick,
  label,
  loading,
  styles,
  icon,
  disabled = false,
  id,
}) => {
  return (
    <LoadingButton
      id={id}
      disabled={disabled}
      fullWidth
      loading={loading}
      loadingPosition="center"
      onClick={handleClick}
      variant="contained"
      sx={{
        borderRadius: '16px',
        padding: '20px',
        backgroundColor: 'secondary.main',
        '&:hover': { backgroundColor: 'primary.main' },
        color: '#fff',
        height: '100%',
        ...styles,
      }}
    >
      {icon && <Box component="img" sx={profileTheme.button.buttonIcon} src={icon} alt='icon' />}
      {label}
    </LoadingButton>
  )
}

export default CTAButton
