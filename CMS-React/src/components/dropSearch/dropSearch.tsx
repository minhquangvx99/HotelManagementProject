import React, { FC, useState, useRef } from 'react';
import { Input, Dropdown, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import WrapperMenuItem from './menuItemWithRef';

interface Option {
  label: string;
  value: string;
}

interface DropSearchProps {
  placeholder: string;
  size?: 'small' | 'middle' | 'large';
  options: Option[];
  onChange: (field: string, value: string) => void;
  field: string;
  maxOptions?: number;
  itemHeight?: number;
  caseSensitive?: boolean;
}

const DropSearch: FC<DropSearchProps> = ({
  placeholder,
  size,
  options,
  onChange,
  field,
  maxOptions = 5,
  itemHeight = 32,
  caseSensitive = false,
}) => {
  const [searchText, setSearchText] = useState('');

  const itemRef = useRef<HTMLDivElement>(null);

  const handleMenuClick = (e: any) => {
    const selectedOption = options.find((option) => option.value === e.key);
    if (selectedOption) {
      setSearchText(selectedOption.label);
      onChange(field, selectedOption.value);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    onChange(field, e.target.value);
  };

  const filteredOptions = options.filter((option) => {
    const trimmedLabel = option.label.trim();
    const trimmedSearchText = searchText.trim();
    return caseSensitive
      ? trimmedLabel.includes(trimmedSearchText)
      : trimmedLabel.toLowerCase().includes(trimmedSearchText.toLowerCase());
  });

  const menu = (
    <Menu onClick={handleMenuClick} style={{ maxHeight: `${maxOptions * itemHeight}px`, overflowY: 'auto' }}>
      {filteredOptions.map((option, index) => (
        <WrapperMenuItem ref={index === 0 ? itemRef : null} key={option.value.trim()}>
          {option.label.trim()}
        </WrapperMenuItem>
      ))}
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <Input
        size={size}
        placeholder={placeholder}
        value={searchText}
        suffix={<DownOutlined />}
        onClick={(e) => e.preventDefault()}
        onChange={handleInputChange}
        style={{ maxWidth: '100%' }}
      />
    </Dropdown>
  );
};

export default DropSearch;
