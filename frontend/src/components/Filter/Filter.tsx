import { Typography } from '@mui/material'
import { format } from 'date-fns'
import React, { useEffect, useState } from 'react'
import { RangeKeyDict } from 'react-date-range'
import axiosInstance from '../../axiosConfig'
import { initializeParams } from '../../redux/reducers/SearchParamsReducer'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import './Filter.css'
import FilterOption from './FilterOption/FilterOption'

interface FilterProps {}

interface Option {
  label: string
}

interface Params {
  [key: string]: string | null | Date | number | number
}

export interface DateRangeItem {
  startDate: Date
  endDate: Date
  key: string
}

const Filter: React.FC<FilterProps> = () => {
  const dispatch = useAppDispatch()
  const params = useAppSelector((state) => state.searchParams)
  const initialDateRange: DateRangeItem[] = [
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [benefits, setBenefits] = useState<Option[] | []>([])
  // const [courses, setCourses] = useState<Option[] | []>([])
  // const [schools, setSchools] = useState<Option[] | []>([])
  const [providers, setProviders] = useState<Option[] | []>([])
  const [selectedParams, setSelectedParams] = useState<Params>({})
  const [selectedDateRange, setSelectedDateRange] = useState<
    DateRangeItem[] | []
  >(initialDateRange)

  const handleOptionClick = (option: Option) => {
    const key: string | null = activeDropdown
    if (activeDropdown) {
      dispatch(
        initializeParams({
          ...params.params,
          ...{ [key as string]: option.label },
        })
      )
      setSelectedParams((prevParams) => ({
        ...prevParams,
        [key as string]: option.label,
      }))
    }
  }

  const mapToOptions = (response: any[], label: string): Option[] => {
    return response.map((item) => ({
      label: item[label],
    }))
  }

  const handleReset = () => {
    setSelectedDateRange(initialDateRange)
    setSelectedParams({})
    dispatch(initializeParams({}))
  }

  useEffect(() => {
    const getData = async () => {
      const benefits = await axiosInstance.get(`api/v1/benefit_categories`)
      // const courses = await axiosInstance.get(`api/v1/courses`)
      // const schools = await axiosInstance.get(`api/v1/schools`)
      const providers = await axiosInstance.get(
        `api/v1/scholarship_providers`,
        { withCredentials: true }
      )

      setBenefits(mapToOptions(benefits.data, 'category_name'))
      // setCourses(mapToOptions(courses.data, 'course_name'))
      // setSchools(mapToOptions(schools.data, 'school_name'))
      setProviders(mapToOptions(providers.data, 'provider_name'))
    }

    getData()
  }, [])

  const handleDropdownToggle = (dropdownName: string): void => {
    setActiveDropdown((prev: string | null) =>
      prev === dropdownName ? null : dropdownName
    )
  }

  const handleDateSelect = (ranges: RangeKeyDict) => {
    const newDateRange: DateRangeItem[] = [ranges.selection as DateRangeItem]
    setSelectedDateRange(newDateRange)
    setSelectedParams((prevParams: Params) => ({
      ...prevParams,
      start_date: format(ranges.selection.startDate as Date, 'LLLL dd, yyyy'),
      due_date: format(ranges.selection.endDate as Date, 'LLLL dd, yyyy'),
    }))
    dispatch(
      initializeParams({
        ...params.params,
        start_date: format(ranges.selection.startDate as Date, 'LLLL dd, yyyy'),
        due_date: format(ranges.selection.endDate as Date, 'LLLL dd, yyyy'),
      })
    )
  }

  useEffect(() => {
    if (!activeDropdown) {
      dispatch(initializeParams({}))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedParams])

  return (
    <div className="filter">
      <div className="filter-header">
        <Typography variant="h4">Filters</Typography>
      </div>
      <FilterOption
        selectedDateRange={selectedDateRange}
        handleSelect={handleDateSelect}
        type="date"
        isVisible={activeDropdown === 'date'}
        onToggleVisibility={() => handleDropdownToggle('date')}
      >
        Application Date
      </FilterOption>
      <FilterOption
        handleOptionClick={handleOptionClick}
        options={benefits}
        isVisible={activeDropdown === 'benefits'}
        onToggleVisibility={() => handleDropdownToggle('benefits')}
      >
        Benefits
      </FilterOption>
      {/* <FilterOption
        handleOptionClick={handleOptionClick}
        options={courses}
        isVisible={activeDropdown === 'course'}
        onToggleVisibility={() => handleDropdownToggle('course')}
      >
        Course
      </FilterOption> */}
      {/* <FilterOption
        handleOptionClick={handleOptionClick}
        options={schools}
        type="search"
        isVisible={activeDropdown === 'school'}
        onToggleVisibility={() => handleDropdownToggle('school')}
      >
        School
      </FilterOption> */}
      <FilterOption
        handleOptionClick={handleOptionClick}
        options={providers}
        isVisible={activeDropdown === 'provider'}
        onToggleVisibility={() => handleDropdownToggle('provider')}
      >
        Provider
      </FilterOption>
      <FilterOption type="reset" handleReset={handleReset}>
        Reset
      </FilterOption>
    </div>
  )
}

export default Filter
