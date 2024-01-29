import React, { useState } from 'react';
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
  const [dateRange, setDateRange] = useState<DateRangeItem[]>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  const handleSelect = (ranges: RangeKeyDict) => {
    setDateRange([ranges.selection as DateRangeItem]);
  };

  return (
    <div>
      <DateRange
        ranges={dateRange}
        onChange={(ranges: RangeKeyDict) => handleSelect(ranges)}
      />
    </div>
  );
};

export default DateRangePicker;
