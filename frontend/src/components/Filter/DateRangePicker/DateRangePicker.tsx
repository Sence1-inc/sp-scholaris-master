import React, { useState, useEffect } from 'react';
import { DateRange, RangeKeyDict } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import './DateRangePicker.css';

interface DateRangeItem {
  startDate: Date;
  endDate: Date;
  key: string;
}

const DateRangePicker: React.FC = () => {
  const storedDateRange = localStorage.getItem('selectedDateRange');
  const initialDateRange: DateRangeItem[] = storedDateRange ? JSON.parse(storedDateRange) : [
    {
      startDate: new Date(),
      endDate: new Date(), 
      key: 'selection',
    },
  ];

  const [selectedDateRange, setSelectedDateRange] = useState<DateRangeItem[]>(initialDateRange);

  const handleSelect = (ranges: RangeKeyDict) => {
    console.log(selectedDateRange)
    const newDateRange: DateRangeItem[] = [ranges.selection as DateRangeItem];
    setSelectedDateRange(newDateRange);
  };

  useEffect(() => {
    localStorage.setItem('selectedDateRange', JSON.stringify(selectedDateRange, (_, value) => {
      if (value instanceof Date) {
        return value.toISOString(); // Convert Date objects to ISO string
      }
      return value;
    }));
  }, [selectedDateRange]);

  return (
    <div>
      <DateRange
        ranges={selectedDateRange}
        onChange={(ranges: RangeKeyDict) => handleSelect(ranges)}
      />
    </div>
  );
};

export default DateRangePicker;


