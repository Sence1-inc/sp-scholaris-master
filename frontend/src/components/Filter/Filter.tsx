import React, { useState } from "react";
import "./Filter.css";
import FilterOption from "./FilterOption/FilterOption";

interface FilterProps {}

interface Option {
  label: string;
}

//Temporary variable while there's still no api
const options: Option[] = [
  { label: "option1" },
  { label: "option2" },
  { label: "option3" },
  { label: "option4" },
  { label: "option5" },
  { label: "option6" },
  { label: "option7" },
  { label: "option8" },
  { label: "Option9" },
];

const Filter: React.FC<FilterProps> = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const handleDropdownToggle = (dropdownName: string): void => {
    setActiveDropdown((prev: string | null) => (prev === dropdownName ? null : dropdownName));
};

  return (
    <div className="filter container-1040">
      <div className="filter-header">
        <h4>Filters</h4>
      </div>
      <FilterOption
        options={options}
        type="date"
        isVisible={activeDropdown === "date"}
        onToggleVisibility={() => handleDropdownToggle("date")}
      >
        Date
      </FilterOption>
      <FilterOption
        options={options}
        isVisible={activeDropdown === "benefits"}
        onToggleVisibility={() => handleDropdownToggle("benefits")}
      >
        Benefits
      </FilterOption>
      <FilterOption
        isVisible={activeDropdown === "course"}
        onToggleVisibility={() => handleDropdownToggle("course")}
      >
        Course
      </FilterOption>
      <FilterOption
        options={options}
        type="search"
        isVisible={activeDropdown === "school"}
        onToggleVisibility={() => handleDropdownToggle("school")}
      >
        School
      </FilterOption>
      <FilterOption
        isVisible={activeDropdown === "provider"}
        onToggleVisibility={() => handleDropdownToggle("provider")}
      >
        Provider
      </FilterOption>
    </div>
  );
};

export default Filter;
