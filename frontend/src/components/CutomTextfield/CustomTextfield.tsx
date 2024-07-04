import { Box, TextField, Typography } from '@mui/material'
import React from 'react'
import HelperText from '../HelperText/HelperText'

interface CustomTextfieldProps {
  label?: string
  error?: string
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  value?: string
  placeholder?: string
  multiline?: boolean
  rows?: number
  styles?: any
  type?: string
  handleOnKeyDonw?: () => void
}

const CustomTextfield: React.FC<CustomTextfieldProps> = ({
  label,
  error,
  handleChange,
  value,
  placeholder,
  multiline = false,
  rows,
  styles,
  type = 'text',
  handleOnKeyDonw,
}) => {
  return (
    <Box sx={{ width: '100%', alignSelf: 'end' }}>
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
        onKeyDown={(e: any) => {
          if (e.keyCode === 13 && handleOnKeyDonw) {
            handleOnKeyDonw()
          } else {
            return null
          }
        }}
        type={type}
        multiline={multiline}
        rows={rows}
        required
        id="outlined-basic"
        variant="outlined"
        sx={{
          borderColor: error ? 'red' : '',
          ...styles,
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
