import {
  Box,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  useMediaQuery,
} from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Dayjs } from 'dayjs'
import React, { ChangeEvent } from 'react'
import theme from '../../styles/theme'

interface CustomSmallTextFieldProps {
  label: string
  multiline?: boolean
  fullWidth?: boolean
  minRows?: number
  type?: string
  isSelect?: boolean
  options?: { value: string; label: string }[]
  value: any
  isDisabled?: boolean
  handleOnInputChange?: (e: ChangeEvent<HTMLInputElement>) => void
  handleDateChange?: (newValue: Dayjs) => void
  handleSelect?: (e: SelectChangeEvent<string>) => void
}

const CustomSmallTextField: React.FC<CustomSmallTextFieldProps> = ({
  label,
  multiline = false,
  fullWidth = true,
  minRows = 4,
  type = 'text',
  isSelect = false,
  options,
  handleOnInputChange,
  handleDateChange,
  handleSelect,
  value,
  isDisabled = false,
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
          value={value}
          onChange={(e: SelectChangeEvent<string>) =>
            handleSelect && handleSelect(e)
          }
          sx={{
            padding: '0',
            borderRadius: '0px',
            backgroundColor: 'background.paper',
            '& .MuiInputBase-root': {
              display: 'flex',
              alignItems: 'center',
            },
            '& .MuiInputBase-input': {
              height: 'auto',
              fontSize: '15px',
              padding: '4px 8px',
            },
          }}
          label={label}
        >
          {options?.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      ) : type === 'date' ? (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            sx={{
              padding: '0',
              borderRadius: '0px',
              backgroundColor: 'background.paper',
              '& .MuiInputBase-root': {
                display: 'flex',
                alignItems: 'center',
              },
              '& .MuiInputBase-input': {
                height: 'auto',
                fontSize: '15px',
                padding: '4px 8px',
              },
            }}
            value={value}
            onChange={(newValue) =>
              handleDateChange && handleDateChange(newValue)
            }
          />
        </LocalizationProvider>
      ) : (
        <TextField
          disabled={isDisabled}
          type={type}
          multiline={multiline}
          minRows={minRows}
          variant="outlined"
          value={value}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleOnInputChange && handleOnInputChange(e)
          }
          sx={{
            padding: '0',
            borderRadius: '0px',
            backgroundColor: 'background.paper',
            '& .MuiInputBase-root': {
              display: 'flex',
              alignItems: 'center',
            },
            '& .MuiInputBase-input': {
              height: 'auto',
              fontSize: '15px',
              padding: '4px 8px',
            },
          }}
        />
      )}
    </Box>
  )
}

export default CustomSmallTextField
