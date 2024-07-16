import { LoadingButton } from '@mui/lab'
import React from 'react'

interface PrimaryButtonProps {
  handleClick: any
  label: string
  loading: boolean
  styles?: any
  disabled?: boolean
  id?: string
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  handleClick,
  label,
  loading,
  styles,
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
        fontSize: '24px',
        borderRadius: '16px',
        padding: '20px',
        backgroundColor: 'primary.main',
        '&:hover': { backgroundColor: 'secondary.main' },
        color: '#fff',
        height: '100%',
        ...styles,
      }}
    >
      {label}
    </LoadingButton>
  )
}

export default PrimaryButton
