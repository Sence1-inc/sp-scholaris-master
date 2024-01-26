import React, { useState } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css'; 
import './DateRangePicker.css'

const DateRangePicker = () => {
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  const handleSelect = (ranges) => {
    setDateRange([ranges.selection]);
  };

  return (
    <div>
      <DateRange
        ranges={dateRange}
        onChange={handleSelect}
      />
    </div>
  );
};

export default DateRangePicker;
