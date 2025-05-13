// eslint-disable-next-line max-classes-per-file
import { DatePicker, DatePickerProps } from 'antd';
import { addDays } from 'date-fns';
import { FC, useState } from 'react';
import { DateRangePicker, DateRangePickerProps } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { ButtonGroup, ItemWraper } from './Style';
import { Button } from 'components/buttons/Buttons';

interface IDateRangePickerOne {}

export const DateRangePickerOne: FC<IDateRangePickerOne> = () => {
  const [state, setState] = useState({
    datePickerInternational: null,
    dateRangePicker: {
      selection: {
        startDate: new Date(),
        endDate: addDays(new Date(), 7),
        key: 'selection',
      },
    },
  });

  const handleRangeChange = (which: DateRangePickerProps) => {
    setState({
      ...state,
      dateRangePicker: {
        ...state.dateRangePicker,
        ...which,
      },
    });
  };

  const { dateRangePicker } = state;
  const start = dateRangePicker.selection.startDate.toString().split(' ');
  const end = dateRangePicker.selection.endDate.toString().split(' ');

  return (
    <ItemWraper>
      <DateRangePicker
        onChange={handleRangeChange}
        // showSelectionPreview
        moveRangeOnFirstSelection={false}
        className="PreviewArea"
        months={2}
        ranges={[dateRangePicker.selection]}
        direction="horizontal"
      />

      <ButtonGroup>
        <p>{`${start[1]} ${start[2]} ${start[3]} - ${end[1]} ${end[2]} ${end[3]}`}</p>
        <Button size="small" type="primary">
          Apply
        </Button>
        <Button size="small" mergetype="white" outlined>
          Cancel
        </Button>
      </ButtonGroup>
    </ItemWraper>
  );
};

interface ICustomDateRange {}

interface IState {
  startValue: DatePickerProps['value'];
  endValue: DatePickerProps['value'];
  endOpen: boolean | undefined;
}

export const CustomDateRange: FC<ICustomDateRange> = () => {
  const [state, setState] = useState<IState>({
    startValue: null,
    endValue: null,
    endOpen: undefined,
  });

  const disabledStartDate: DatePickerProps['disabledDate'] = (startValue) => {
    if (!startValue || !state.endValue) {
      return false;
    }
    return startValue.valueOf() > state.endValue.valueOf();
  };

  const disabledEndDate: DatePickerProps['disabledDate'] = (endValue) => {
    if (!endValue || !state.startValue) {
      return false;
    }
    return endValue.valueOf() <= state.startValue.valueOf();
  };

  const onChange = (field: string, value: DatePickerProps['value']) => {
    setState({ ...state, [field]: value });
  };

  const onStartChange = (value: DatePickerProps['value']) => {
    onChange('startValue', value);
  };

  const onEndChange = (value: DatePickerProps['value']) => {
    onChange('endValue', value);
  };

  const handleStartOpenChange = (open: boolean) => {
    if (!open) {
      setState({ ...state, endOpen: true });
    }
  };

  const handleEndOpenChange = (open: boolean) => {
    setState({ ...state, endOpen: open });
  };

  return (
    <div>
      <DatePicker
        disabledDate={disabledStartDate}
        showTime
        format="YYYY-MM-DD HH:mm:ss"
        value={state.startValue}
        placeholder="Start"
        onChange={onStartChange}
        onOpenChange={handleStartOpenChange}
        style={{ margin: '5px' }}
      />

      <DatePicker
        disabledDate={disabledEndDate}
        showTime
        format="YYYY-MM-DD HH:mm:ss"
        value={state.endValue}
        placeholder="End"
        onChange={onEndChange}
        open={state.endOpen}
        onOpenChange={handleEndOpenChange}
        style={{ margin: '5px' }}
      />
    </div>
  );
};
