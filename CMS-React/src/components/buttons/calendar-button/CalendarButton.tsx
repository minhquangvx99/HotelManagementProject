import { DateRangePickerOne } from 'components/date-picker/DatePicker';
import { Popover } from 'components/popup/Popup';
import { FC } from 'react';
import { Button } from '../Buttons';
import UilCalender from '@iconscout/react-unicons/dist/icons/uil-calendar-alt';

interface ICalendarButtonPageHeader {}

export const CalendarButtonPageHeader: FC<ICalendarButtonPageHeader> = () => {
  const content = <DateRangePickerOne />;

  return (
    <Popover placement="bottomRight" title="Search by Calendar" content={content} trigger="hover">
      <Button size="small" className="ant-btn-white" mergetype="white" style={{ backgroundColor: 'inherit' }}>
        <UilCalender />
        Calendar
      </Button>
    </Popover>
  );
};
