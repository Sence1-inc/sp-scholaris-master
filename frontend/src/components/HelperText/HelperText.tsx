import { Typography } from '@mui/material'
import React from 'react'

interface HelperTextProps {
  error: string
}

const HelperText: React.FC<HelperTextProps> = ({ error }) => {
  return (
    <Typography
      variant="body2"
      sx={{
        color: error ? 'red' : 'rgba(0, 0, 0, 0.54)',
        marginTop: '8px',
        fontSize: '0.75rem',
      }}
    >
      {error}
    </Typography>
  )
}

export default HelperText
