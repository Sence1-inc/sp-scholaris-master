import { Box, TextField, Typography } from '@mui/material'
import React from 'react'
import HelperText from '../HelperText/HelperText'

interface CustomTextfieldProps {
  label: string
  error: string
  handleChange: any
  value: string
  placeholder: string
}

const CustomTextfield: React.FC<CustomTextfieldProps> = ({
  label,
  error,
  handleChange,
  value,
  placeholder,
}) => {
  return (
    <Box sx={{ width: '100%' }}>
      <Typography
        sx={{
          fontFamily: 'Roboto',
          fontSize: '24px',
          fontWeight: '700',
          color: '#002147',
        }}
      >
        {label}
      </Typography>
      <TextField
        required
        id="outlined-basic"
        variant="outlined"
        sx={{
          borderColor: error ? 'red' : '',
        }}
        onChange={handleChange}
        value={value}
        name="email_address"
        placeholder={placeholder}
      />
      <HelperText error={error ? error : ''} />
    </Box>
  )
}

export default CustomTextfield
