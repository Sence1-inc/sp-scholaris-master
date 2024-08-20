import { Typography } from '@mui/material'
import { Dayjs } from 'dayjs'
import React, { useEffect, useRef, useState } from 'react'
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
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [benefits, setBenefits] = useState<Option[] | []>([])
  // const [courses, setCourses] = useState<Option[] | []>([])
  // const [schools, setSchools] = useState<Option[] | []>([])
  const [providers, setProviders] = useState<Option[] | []>([])
  const [selectedParams, setSelectedParams] = useState<Params>({})
  const [selectedStartDate, setSelectedStartDate] = useState<Dayjs | null>(null)
  // const [selectedDueDate, setSelectedDueDate] = useState<Dayjs | null>(null)

  const dropdownRef = useRef<HTMLDivElement | null>(null)

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
    setActiveDropdown(dropdownName)
  }

  useEffect(() => {
    if (!activeDropdown) {
      dispatch(initializeParams({}))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedParams])

  return (
    <div className="filter" ref={dropdownRef}>
      <div className="filter-header">
        <Typography variant="h6">Filters</Typography>
      </div>
      <FilterOption
        selectedStartDate={selectedStartDate}
        setSelectedParams={setSelectedParams}
        setSelectedStartDate={setSelectedStartDate}
        type="startDate"
        isVisible={activeDropdown === 'startDate'}
        onToggleVisibility={() => handleDropdownToggle('startDate')}
      >
        Application Start Date
      </FilterOption>
      {/* <FilterOption
        selectedDueDate={selectedDueDate}
        setSelectedDueDate={setSelectedDueDate}
        setSelectedParams={setSelectedParams}
        type="dueDate"
        isVisible={activeDropdown === 'dueDate'}
        onToggleVisibility={() => handleDropdownToggle('dueDate')}
      >
        Application Due Date
      </FilterOption> */}
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
    </div>
  )
}

export default Filter
