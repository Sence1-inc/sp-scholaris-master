import React, { useState } from "react";
import DropdownArrow from "../../../public/images/dropdownArr.svg";
import "./FilterOption.css";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRange, RangeKeyDict } from "react-date-range";
import { DateRangeItem } from "../Filter";
import { useAppDispatch } from "../../../redux/store";
import { initializeParams } from "../../../redux/reducers/SearchParamsReducer";

interface Option {
  label: string;
}

interface FilterOptionProps {
  children: React.ReactNode;
  type?: string;
  options?: Option[];
  isVisible?: boolean;
  onToggleVisibility?: () => void;
  selectedOption?: Option | null | string;
  handleOptionClick?: (option: Option) => void;
  selectedDateRange?: DateRangeItem[];
  handleSelect?: (ranges: RangeKeyDict) => void;
}

const FilterOption: React.FC<FilterOptionProps> = ({
  children,
  type,
  options = [],
  isVisible,
  onToggleVisibility,
  handleOptionClick,
  selectedOption,
  selectedDateRange,
  handleSelect
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const dispatch = useAppDispatch()

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const toggleDropdown = () => {
    if (onToggleVisibility) {
      onToggleVisibility();
    }

    if (type === 'reset') {
      dispatch(initializeParams({}))
    }
  };

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dropdown">
      <div className={`dropdown-header ${type === 'reset' && "dropdown-reset"}`} onClick={toggleDropdown}>
        {typeof selectedOption === 'string' ? selectedOption : (selectedOption ? selectedOption.label : children)}{" "}
        {type !== 'reset' &&  <img className={isVisible ? 'rotateArrow' : ''} src={DropdownArrow} alt="Dropdown arrow" />}
      </div>
      {
        isVisible && type === 'date' && handleSelect && <div><DateRange ranges={selectedDateRange} onChange={(ranges) => handleSelect(ranges)}/></div>
      }

      {isVisible && type !== 'date' && (
        <div className="dropdown-options">
          {type === "search" && (
            <>
              <input type="text" onChange={handleInputChange} value={searchTerm} />
              {filteredOptions.map((option, index) => (
                <div
                  className="dropdown-option"
                  key={option.label + index}
                  onClick={() => handleOptionClick && handleOptionClick(option)}
                >
                  {option.label}
                </div>
              ))}
            </>
          )}
          {type !== "search" && options.map((option, index) => (
            <div
              className="dropdown-option"
              key={option.label + index}
              onClick={() => handleOptionClick &&  handleOptionClick(option)}
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
