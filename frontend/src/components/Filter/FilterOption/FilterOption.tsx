import { Close } from '@mui/icons-material'
import { LocalizationProvider, StaticDatePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs, { Dayjs } from 'dayjs'
import React, { useState } from 'react'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import DropdownArrow from '../../../public/images/dropdownArr.svg'
import { initializeParams } from '../../../redux/reducers/SearchParamsReducer'
import { useAppDispatch, useAppSelector } from '../../../redux/store'
import './FilterOption.css'

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
  const [searchTerm, setSearchTerm] = useState<string>('')

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const toggleDropdown = () => {
    if (onToggleVisibility) {
      onToggleVisibility()
    }

    if (type === 'reset') {
      handleReset && handleReset()
    }
  }

  const filteredOptions =
    options.length > 0
      ? options.filter((option) =>
          option.label?.toLowerCase().includes(searchTerm?.toLowerCase())
        )
      : []

  return (
    <div className="dropdown">
      <div
        className={`dropdown-header ${type === 'reset' && 'dropdown-reset'}`}
        onClick={toggleDropdown}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {typeof selectedOption === 'string'
          ? selectedOption
          : selectedOption
            ? selectedOption.label
            : children}{' '}
        {type !== 'reset' && !isVisible ? (
          <img src={DropdownArrow} alt="Dropdown arrow" />
        ) : (
          <Close
            color="primary"
            fontSize="inherit"
            sx={{ padding: 0, margin: 0, width: '20px' }}
          />
        )}
      </div>
      {isVisible && type === 'startDate' && setSelectedStartDate && (
        <div
          className="dropdown-options"
          style={{ maxHeight: '600px', padding: 0 }}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StaticDatePicker
              defaultValue={dayjs(selectedStartDate)}
              onChange={(newValue) => {
                setSelectedStartDate(newValue as Dayjs)
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
        </div>
      )}

      {isVisible && type === 'dueDate' && setSelectedDueDate && (
        <div
          className="dropdown-options"
          style={{ maxHeight: '600px', padding: 0 }}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StaticDatePicker
              defaultValue={dayjs(selectedDueDate)}
              onChange={(newValue) => {
                setSelectedDueDate(newValue as Dayjs)
                setSelectedParams((prevParams: any) => ({
                  ...prevParams,
                  due_date: dayjs(newValue).format('MMMM DD, YYYY'),
                }))
                dispatch(
                  initializeParams({
                    ...params.params,
                    due_date: dayjs(newValue).format('MMMM DD, YYYY'),
                  })
                )
              }}
              slots={{
                toolbar: () => null,
                actionBar: () => null,
              }}
            />
          </LocalizationProvider>
        </div>
      )}

      {isVisible && type !== 'startDate' && type !== 'dueDate' && (
        <div className="dropdown-options">
          {type === 'search' && (
            <>
              <input
                type="text"
                onChange={handleInputChange}
                value={searchTerm}
              />
              {filteredOptions.length > 0 &&
                filteredOptions.map((option, index) => (
                  <div
                    className="dropdown-option"
                    key={option.label + index}
                    onClick={() =>
                      handleOptionClick && handleOptionClick(option)
                    }
                  >
                    {option.label}
                  </div>
                ))}
            </>
          )}
          {type !== 'search' &&
            options.length > 0 &&
            options.map((option, index) => (
              <div
                className="dropdown-option"
                key={option.label + index}
                onClick={() => handleOptionClick && handleOptionClick(option)}
              >
                {option.label}
              </div>
            ))}
        </div>
      )}
    </div>
  )
}

export default FilterOption
