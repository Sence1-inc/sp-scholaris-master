import React from 'react';
import { DateRange, RangeKeyDict } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import './DateRangePicker.css';

interface DateRangeItem {
  startDate: Date;
  endDate: Date;
  key: string;
}

interface DateRangePickerProps {
  selectedDateRange: DateRangeItem[];
  onSelectDateRange: (newDateRange: DateRangeItem[]) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({ selectedDateRange, onSelectDateRange }) => {
  const handleSelect = (ranges: RangeKeyDict) => {
    const newDateRange: DateRangeItem[] = [ranges.selection as DateRangeItem];
    onSelectDateRange(newDateRange);
  };

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
