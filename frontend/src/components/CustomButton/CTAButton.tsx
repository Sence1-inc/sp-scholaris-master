import { LoadingButton } from '@mui/lab'
import React from 'react'

interface CTAButtonProps {
  handleClick: any
  label: string
  loading: boolean
  styles?: any
}

const CTAButton: React.FC<CTAButtonProps> = ({
  handleClick,
  label,
  loading,
  styles,
}) => {
  return (
    <LoadingButton
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
      {label}
    </LoadingButton>
  )
}

export default CTAButton
