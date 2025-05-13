/* eslint-disable react/forbid-prop-types */
import { FC, useEffect, useState } from 'react';
import { CheckboxStyle } from './Style';
import { CheckboxProps } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';

export const CheckboxGroup = CheckboxStyle.Group;

interface ICheckbox extends CheckboxProps {
  item?: string[];
  defaultSelect?: CheckboxValueType[];
  multiple?: boolean;
  onChangeTriger?(e: unknown[]): void;
}

export const Checkbox: FC<ICheckbox> = (props) => {
  const {
    item,
    defaultSelect,
    checked = false,
    multiple,
    onChange,
    onChangeTriger,
    defaultChecked,
    disabled,
    children,
  } = props;
  const plainOptions = item;
  const [state, setState] = useState({
    checkedList: defaultSelect,
    indeterminate: true,
    checkAll: false,
  });

  const onMultiChange = (checkedList: CheckboxValueType[]) => {
    setState({
      checkedList,
      indeterminate: plainOptions ? !!checkedList.length && checkedList.length < plainOptions.length : false,
      checkAll: plainOptions ? checkedList.length === plainOptions.length : false,
    });
  };

  useEffect(() => {
    if (state.checkedList && onChangeTriger) {
      onChangeTriger(state.checkedList);
    }
    // eslint-disable-next-line
  }, [state]);

  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    setState({
      checkedList: e.target.checked ? plainOptions : [],
      indeterminate: false,
      checkAll: e.target.checked,
    });
  };

  const onChecked = (e: CheckboxChangeEvent) => {
    return onChange && onChange(e);
  };

  return !multiple ? (
    <CheckboxStyle checked={checked} onChange={onChecked} defaultChecked={defaultChecked} disabled={disabled}>
      {children}
    </CheckboxStyle>
  ) : (
    <div>
      <div style={{ borderBottom: '1px solid #E9E9E9' }}>
        <CheckboxStyle indeterminate={state.indeterminate} onChange={onCheckAllChange} checked={state.checkAll}>
          Check all
        </CheckboxStyle>
      </div>
      <br />
      <CheckboxGroup options={plainOptions} value={state.checkedList} onChange={onMultiChange} />
    </div>
  );
};
