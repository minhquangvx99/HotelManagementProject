import { SearchOutlined } from '@ant-design/icons';
import { AutoCompleteProps, Input } from 'antd';
import React, { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { AutoCompleteStyled } from './Style';
import { RootState } from 'store/RootReducer';
import { Button } from 'components/buttons/Buttons';

const onSelect = () => {};

const renderItem = (title?: string, count?: ReactNode) => {
  return {
    value: title,
    label: (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        {title}
        {count}
      </div>
    ),
  };
};

interface IAutoComplete extends AutoCompleteProps {
  customComponent?: ReactNode;
  patterns?: boolean;
  patternButtons?: boolean;
  width?: string;
}

export const AutoComplete = React.memo<IAutoComplete>((props) => {
  const rtl = useSelector((state: RootState) => state.layout.rtlData);
  const {
    customComponent,
    patterns,
    patternButtons,
    width = '350px',
    onSearch,
    options,
    placeholder = 'Input here',
  } = props;

  const content =
    options && options.length > 0
      ? options.map((group) => {
          const { title, count } = group;
          return {
            label: title,
            options: [renderItem(title, <span className="certain-search-item-count">{count} people</span>)],
          };
        })
      : [];

  const onSearching = (searchText: string) => {
    onSearch && onSearch(searchText);
  };

  return typeof options !== 'boolean' ? (
    customComponent ? (
      <AutoCompleteStyled options={options} style={{ width }} onSelect={onSelect} onSearch={onSearching}>
        {customComponent}
      </AutoCompleteStyled>
    ) : patterns ? (
      <AutoCompleteStyled
        className="certain-category-search"
        popupClassName="certain-category-search-dropdown"
        dropdownMatchSelectWidth={false}
        dropdownStyle={{ width: 300 }}
        style={{ width }}
        options={content}
        placeholder={placeholder}
        onSearch={onSearching}
      >
        <Input
          suffix={
            patternButtons ? (
              <Button className="search-btn" style={{ [rtl ? 'marginLeft' : 'marginRight']: -20 }} mergetype="primary">
                <SearchOutlined />
              </Button>
            ) : (
              <SearchOutlined />
            )
          }
        />
      </AutoCompleteStyled>
    ) : (
      <AutoCompleteStyled
        options={options}
        style={{ width }}
        onSelect={onSelect}
        onSearch={onSearching}
        placeholder={placeholder}
      />
    )
  ) : (
    <></>
  );
});
