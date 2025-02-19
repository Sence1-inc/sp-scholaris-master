import { Box, Menu, MenuItem } from '@mui/material'
import { LocalizationProvider, StaticDatePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs, { Dayjs } from 'dayjs'
import React, { useState } from 'react'
import DropdownArrow from '../../../public/images/dropdownArr.svg'
import { initializeParams } from '../../../redux/reducers/SearchParamsReducer'
import { useAppDispatch, useAppSelector } from '../../../redux/store'
import { BenefitData, ProviderData, ScholarshipType } from '../../../redux/types'

/**
 * @type Option
 * @description Represents an option
 * @property {string} label - Label of the option
 */
export type Option = {
  /**
   * @description The display label for the option.
   */
  label: string
}

/**
 * @interface FilterOptionProps
 * @description Represents the props for the FilterOption component.
 * @property {React.ReactNode} children - The content of the option, typically a label or custom element.
 * @property {string} [type] - The type of filter, e.g., "date" or "text", to dictate how options are rendered.
 * @property {Option[]} [options] - List of selectable options.
 * @property {boolean} [isVisible] - Flag indicating whether the options dropdown is visible.
 * @property {() => void} onToggleVisibility - Callback to toggle the visibility of the filter options.
 * @property {Option | null | string} [selectedOption] - The currently selected option value.
 * @property {(option: Option) => void} [handleOptionClick] - Callback invoked when an option is selected.
 * @property {Dayjs | null} [selectedStartDate] - The currently selected start date, if applicable.
 * @property {(value: Dayjs) => void} [setSelectedStartDate] - Callback to update the selected start date.
 * @property {Dayjs | null} [selectedDueDate] - The currently selected due date, if applicable.
 * @property {(value: Dayjs) => void} [setSelectedDueDate] - Callback to update the selected due date.
 * @property {any} [setSelectedParams] - Callback to update additional parameters associated with filtering.
 * @property {() => void} [handleReset] - Callback invoked to reset the filter selection.
 */
interface FilterOptionProps {
  children: React.ReactNode
  type?: string
  options?: Option[]
  isVisible?: boolean
  onToggleVisibility: () => void
  selectedOption?: Option | null | string
  handleOptionClick?: (option: Option) => void
  selectedStartDate?: Dayjs | null
  setSelectedStartDate?: (value: Dayjs) => void
  selectedDueDate?: Dayjs | null
  setSelectedDueDate?: (value: Dayjs) => void
  setSelectedParams?: any
  handleReset?: () => void
}

/**
 * @component FilterOption
 * @description Functional component that renders a filter option. It displays a button to toggle
 *              a list of options and optionally renders date pickers when the filter type is "date".
 *              It also handles option selection and passes the selected option back via callback props.
 *
 * @param {FilterOptionProps} props - The component properties.
 * @returns {JSX.Element} The rendered filter option component.
 *
 * @example
 * <FilterOption
 *   type="select"
 *   options={[{ label: 'Option 1', value: '1' }, { label: 'Option 2', value: '2' }]}
 *   isVisible={true}
 *   onToggleVisibility={handleToggle}
 *   selectedOption={{ label: 'Option 1', value: '1' }}
 *   handleOptionClick={handleSelectOption}
 * >
 *   Select an Option
 * </FilterOption>
 */
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
    setAnchorEl(event.currentTarget)
    onToggleVisibility()

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
            maxHeight: '287px',
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
                  transition: 'font-weight 0.1s ease-in-out'
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
