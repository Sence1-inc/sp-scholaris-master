import axios from "axios";
import React, { useEffect, useState } from "react";
import { RangeKeyDict } from "react-date-range";
import { initializeParams } from "../../redux/reducers/SearchParamsReducer";
import "./Filter.css";
import FilterOption from "./FilterOption/FilterOption";
import { useAppDispatch } from '../../redux/store';
import {format} from 'date-fns';

interface FilterProps {}

interface Option {
  label: string;
}

interface Params {
  [key: string]: string | null | Date | number | number
}

export interface DateRangeItem {
  startDate: Date;
  endDate: Date;
  key: string;
}

const Filter: React.FC<FilterProps> = () => {
  const dispatch = useAppDispatch()
  const initialDateRange: DateRangeItem[] = [
    {
      startDate: new Date(),
      endDate: new Date(), 
      key: 'selection',
    },
  ];
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [benefits, setBenefits] = useState<Option[] | []>([])
  const [courses, setCourses] = useState<Option[] | []>([])
  const [schools, setSchools] = useState<Option[] | []>([])
  const [providers, setProviders] = useState<Option[] | []>([])
  const [params, setParams] = useState<Params>({})
  const [selectedDateRange, setSelectedDateRange] = useState<DateRangeItem[] | []>(initialDateRange);

  const handleOptionClick = (option: Option) => {
    const key: string | null = activeDropdown
    if (activeDropdown) {
      setParams((prevParams) => ({
        ...prevParams,
        [key as string]: option.label
      }));
    }
  };

  const mapToOptions = (response: any[], label: string): Option[] => {
    return response.map((item) => ({
      label: item[label],
    }));
  };

  const handleReset = () => {
    setSelectedDateRange(initialDateRange)
    setParams({});
  }

  useEffect(() => {
    const getData = async () => {
      const benefits = await axios.get(`api/v1/benefits`)
      const courses = await axios.get(`api/v1/courses`)
      const schools = await axios.get(`api/v1/schools`)
      const providers = await axios.get(`api/v1/scholarship_providers`)

      setBenefits(mapToOptions(benefits.data, 'benefit_name'))
      setCourses(mapToOptions(courses.data, 'course_name'))
      setSchools(mapToOptions(schools.data, 'school_name'))
      setProviders(mapToOptions(providers.data, 'provider_name'))
    }

    getData()
  }, [])

  const handleDropdownToggle = (dropdownName: string): void => {
    setActiveDropdown((prev: string | null) => (prev === dropdownName ? null : dropdownName));
  };

  const handleSelect = (ranges: RangeKeyDict) => {
    const newDateRange: DateRangeItem[] = [ranges.selection as DateRangeItem];
    setSelectedDateRange(newDateRange);
    setParams((prevParams: Params) => ({
      ...prevParams,
      start_date: format(ranges.selection.startDate as Date, "LLLL dd, yyyy"),
      due_date: format(ranges.selection.endDate as Date, "LLLL dd, yyyy"),
    }));
  };

  useEffect(() => {
    dispatch(initializeParams(params))
  }, [params])

  return (
    <div className="filter">
      <div className="filter-header">
        <h4>Filters</h4>
      </div>
      <FilterOption
        selectedDateRange={selectedDateRange}
        handleSelect={handleSelect}
        type="date"
        isVisible={activeDropdown === "date"}
        onToggleVisibility={() => handleDropdownToggle("date")}
      >
        Date
      </FilterOption>
      <FilterOption
        handleOptionClick={handleOptionClick}
        options={benefits}
        isVisible={activeDropdown === "benefits"}
        onToggleVisibility={() => handleDropdownToggle("benefits")}
      >
        Benefits
      </FilterOption>
      <FilterOption
        handleOptionClick={handleOptionClick}
        options={courses}
        isVisible={activeDropdown === "course"}
        onToggleVisibility={() => handleDropdownToggle("course")}
      >
        Course
      </FilterOption>
      <FilterOption
        handleOptionClick={handleOptionClick}
        options={schools}
        type="search"
        isVisible={activeDropdown === "school"}
        onToggleVisibility={() => handleDropdownToggle("school")}
      >
        School
      </FilterOption>
      <FilterOption
        handleOptionClick={handleOptionClick}
        options={providers}
        isVisible={activeDropdown === "provider"}
        onToggleVisibility={() => handleDropdownToggle("provider")}
      >
        Provider
      </FilterOption>
      <FilterOption type="reset" handleReset={handleReset}>
        Reset
      </FilterOption>
    </div>
  );
};

export default Filter;
