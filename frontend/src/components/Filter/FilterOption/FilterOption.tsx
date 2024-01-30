import React, { useState, useEffect } from "react";
import DropdownArrow from "../../../public/images/dropdownArr.svg";
import "./FilterOption.css";
import DateRangePicker from "../DateRangePicker/DateRangePicker";

interface Option {
  label: string;
}

interface DateRangeItem {
  startDate: Date;
  endDate: Date;
  key: string;
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
  const initialDateRange: DateRangeItem[] = [
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ];

  const [selectedOption, setSelectedOption] = useState<Option | null | string>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedDateRange, setSelectedDateRange] = useState<DateRangeItem[]>(initialDateRange);

  const handleOptionClick = (option: Option) => {
    setSelectedOption(option);
    onToggleVisibility();
  };

  const handleSelectDateRange = (newDateRange: DateRangeItem[]) => {
    setSelectedDateRange(newDateRange);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const toggleDropdown = () => {
    onToggleVisibility();
  };

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dropdown">
      <div className="dropdown-header" onClick={toggleDropdown}>
        {typeof selectedOption === 'string' ? selectedOption : (selectedOption ? selectedOption.label : children)}{" "}
        <img className={isVisible ? 'rotateArrow' : ''} src={DropdownArrow} alt="Dropdown arrow" />
      </div>
      {
        isVisible && type === 'date' && (
          <DateRangePicker
            selectedDateRange={selectedDateRange}
            onSelectDateRange={handleSelectDateRange}
          />
        )
      }

      {isVisible && type !== 'date' && (
        <div className="dropdown-options">
          {type === "search" && (
            <>
              <input type="text" onChange={handleInputChange} value={searchTerm} />
              {filteredOptions.map((option) => (
                <div
                  className="dropdown-option"
                  key={option.label}
                  onClick={() => handleOptionClick(option)}
                >
                  {option.label}
                </div>
              ))}
            </>
          )}
          {type !== "search" && options.map((option) => (
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
