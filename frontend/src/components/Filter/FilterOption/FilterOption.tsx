import React, { useState } from "react";
import DropdownArrow from "../../../public/images/dropdownArr.svg";
import "./FilterOption.css";
import DateRangePicker from "../DateRangePicker/DateRangePicker";

interface Option {
  label: string;
}

interface FilterOptionProps {
  children: React.ReactNode;
  type?: string;
  options?: Option[];
  isVisible: boolean;
  onToggleVisibility: () => void;
}

const FilterOption: React.FC<FilterOptionProps> = ({
  children,
  type,
  options = [],
  isVisible,
  onToggleVisibility,
}) => {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  const handleOptionClick = (option: Option) => {
    setSelectedOption(option);
    onToggleVisibility();
  };

  const toggleDropdown = () => {
    onToggleVisibility();
  };

  return (
    <div className="dropdown">
      <div className="dropdown-header" onClick={toggleDropdown}>
        {selectedOption ? selectedOption.label : children}{" "}
        <img className={isVisible ? 'rotateArrow' : ''} src={DropdownArrow} alt="Dropdown arrow" />
      </div>
      {
        isVisible && type === 'date' && <DateRangePicker/>
      }

      {isVisible && type !== 'date' && (
        <div className="dropdown-options">
          {type === "search" && <input type="text" />}
          {options.map((option) => (
            <div
              className="dropdown-option"
              key={option.label}
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterOption;
