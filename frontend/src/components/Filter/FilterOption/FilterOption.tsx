import { Box, Menu, MenuItem } from '@mui/material'
import { LocalizationProvider, StaticDatePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs, { Dayjs } from 'dayjs'
import React, { useState } from 'react'
import DropdownArrow from '../../../public/images/dropdownArr.svg'
import { initializeParams } from '../../../redux/reducers/SearchParamsReducer'
import { useAppDispatch, useAppSelector } from '../../../redux/store'

interface Option {
  label: string
}

interface FilterOptionProps {
  children: React.ReactNode
  type?: string
  options?: Option[]
  isVisible?: boolean
  onToggleVisibility?: () => void
  selectedOption?: Option | null | string
  handleOptionClick?: (option: Option) => void
  selectedStartDate?: Dayjs | null
  setSelectedStartDate?: (value: Dayjs) => void
  selectedDueDate?: Dayjs | null
  setSelectedDueDate?: (value: Dayjs) => void
  setSelectedParams?: any
  handleReset?: () => void
}

const FilterOption: React.FC<FilterOptionProps> = ({
  children,
  type,
  options = [],
  isVisible,
  onToggleVisibility,
  handleOptionClick,
  selectedOption,
  selectedStartDate,
  setSelectedStartDate,
  selectedDueDate,
  setSelectedDueDate,
  setSelectedParams,
  handleReset,
}) => {
  const params = useAppSelector((state) => state.searchParams)
  const dispatch = useAppDispatch()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const toggleDropdown = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget)
    onToggleVisibility?.()

    if (type === 'reset') {
      handleReset && handleReset()
    }
  }

  return (
    <Box position="relative">
      <Box
        id={`${type}-filter`}
        onClick={toggleDropdown}
        sx={{
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 15px',
          border: '2px solid #002147',
          borderRadius: '16px',
        }}
      >
        {typeof selectedOption === 'string'
          ? selectedOption
          : selectedOption
            ? selectedOption.label
            : children}{' '}
        <img
          style={
            Boolean(anchorEl)
              ? {
                  transform: 'rotate(180deg)',
                  transition: 'all 0.4s ease',
                  marginLeft: '6px',
                }
              : { marginLeft: '6px' }
          }
          src={DropdownArrow}
          alt="Dropdown arrow"
        />
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        sx={{
          marginTop: '10px',
          '& .MuiPaper-root': {
            borderRadius: '16px',
          },
          '& .MuiList-root': {
            border: '2px rgb(0, 33, 71) solid',
            borderRadius: '16px',
            maxHeight: '210px',
            overflowY: 'auto',
          },
        }}
      >
        {type === 'startDate' && setSelectedStartDate && (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StaticDatePicker
              views={['month', 'year']}
              defaultValue={dayjs(selectedStartDate)}
              onChange={(newValue) => {
                setSelectedStartDate(newValue as Dayjs)
                setSelectedParams((prevParams: any) => ({
                  ...prevParams,
                  start_date: dayjs(newValue).format('MMMM DD, YYYY'),
                }))
                dispatch(
                  initializeParams({
                    ...params.params,
                    start_date: dayjs(newValue).format('MMMM DD, YYYY'),
                  })
                )
              }}
              slots={{
                toolbar: () => null,
                actionBar: () => null,
              }}
            />
          </LocalizationProvider>
        )}

        {type !== 'startDate' &&
          type !== 'dueDate' &&
          options.map((option, index) => (
            <MenuItem
              sx={{
                whiteSpace: 'normal',
                '&:hover': {
                  cursor: 'pointer',
                  fontWeight: 600,
                  transition: 'font-weight 0.1s ease-in-out',
                },
              }}
              key={option.label + index}
              onClick={() => handleOptionClick?.(option)}
            >
              {option.label}
            </MenuItem>
          ))}
      </Menu>
    </Box>
  )
}

export default FilterOption
