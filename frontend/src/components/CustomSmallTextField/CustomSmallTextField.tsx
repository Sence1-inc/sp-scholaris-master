import {
  Box,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  useMediaQuery,
} from '@mui/material'
import React from 'react'
import theme from '../../styles/theme'

interface CustomSmallTextFieldProps {
  label: string
  multiline?: boolean
  fullWidth?: boolean
  minRows?: number
  type?: string
  isSelect?: boolean
  options?: { value: string; label: string }[]
}

const CustomSmallTextField: React.FC<CustomSmallTextFieldProps> = ({
  label,
  multiline = false,
  fullWidth = true,
  minRows = 4,
  type = 'text',
  isSelect = false,
  options,
}) => {
  const isSm = useMediaQuery(() => theme.breakpoints.down('md'))

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        width: fullWidth || isSm ? '100%' : '50%',
        padding: '20px 0',
      }}
    >
      <InputLabel
        shrink
        sx={{
          width: fullWidth && !isSm ? '26%' : '70%',
          paddingLeft: !isSm ? '20px' : 0,
        }}
      >
        {label}
      </InputLabel>
      {isSelect ? (
        <Select
          sx={{
            padding: '0',
            borderRadius: '0px',
            backgroundColor: 'background.paper',
          }}
          label={label}
        >
          {options?.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      ) : (
        <TextField
          type={type}
          multiline={multiline}
          minRows={minRows}
          variant="outlined"
          sx={{
            padding: '0',
            borderRadius: '0px',
            backgroundColor: 'background.paper',
          }}
        />
      )}
    </Box>
  )
}

export default CustomSmallTextField
