import UilSearch from '@iconscout/react-unicons/dist/icons/uil-search';
import { Input, Select, Table } from 'antd';
import { useDispatch } from 'react-redux';
import { DataTableStyleWrap } from './Style';
import { Button } from 'components/buttons/Buttons';
import { ChangeEvent, FC } from 'react';
import { TableRowSelection } from 'antd/es/table/interface';
import { ColumnGroupType, ColumnType } from 'antd/lib/table';
import { TableWrapper } from 'container/Style';

// import { dataLiveFilter, filterWithSubmit } from '../../redux/data-filter/actionCreator';

type Status = 'active' | 'deactivated' | 'blocked';

interface IDataTable {
  filterOption?: boolean;
  filterOnchange?: boolean;
  rowSelection?: TableRowSelection<any>;
  tableData: any[];
  columns: (ColumnGroupType<any> | ColumnType<any>)[];
}

export const DataTable: FC<IDataTable> = ({ filterOption, filterOnchange, rowSelection, tableData, columns }) => {
  const dispatch = useDispatch();
  const handleIdSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const id = e.currentTarget.value;
    // dispatch(dataLiveFilter(id, 'id'));
  };
  const handleStatusSearch = (value: Status) => {
    // dispatch(dataLiveFilter(value, 'status'));
  };

  const handleDataUser = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    // dispatch(dataLiveFilter(value, 'name'));
  };

  const handleSearch = () => {
    const id = (document.querySelector('.ninjadash-data-id') as HTMLInputElement).value;
    const status = (document.querySelector('.ninjadash-data-status .ant-select-selection-item') as HTMLSelectElement)
      .title;
    // dispatch(filterWithSubmit(id, status));
  };

  const prefix = <UilSearch />;

  return (
    <DataTableStyleWrap>
      {filterOption ? (
        <div className="ninjadash-datatable-filter">
          {!filterOnchange ? (
            <div className="ninjadash-datatable-filter__left">
              <div className="ninjadash-datatable-filter__input">
                <span className="label">Id:</span>
                <Input className="ninjadash-data-id" placeholder="Search with Id" />
              </div>
              <div className="ninjadash-datatable-filter__input">
                <span className="label">Status:</span>
                <Select style={{ width: 200 }} className="ninjadash-data-status" defaultValue="active">
                  <Select.Option value="active">Active</Select.Option>
                  <Select.Option value="deactiveted">Deactivated</Select.Option>
                  <Select.Option value="blocked">Blocked</Select.Option>
                </Select>
              </div>
              <div className="ninjadash-datatable-filter__action">
                <Button mergetype="primary" size="small" onClick={handleSearch} transparent>
                  Submit
                </Button>
              </div>
            </div>
          ) : (
            <div className="ninjadash-datatable-filter__left">
              <div className="ninjadash-datatable-filter__input">
                <span className="label">Id:</span>
                <Input onChange={handleIdSearch} placeholder="Search with Id" />
              </div>
              <div className="ninjadash-datatable-filter__input">
                <span className="label">Status:</span>
                <Select onChange={handleStatusSearch} style={{ width: 200 }} defaultValue="active">
                  <Select.Option value="active">Active</Select.Option>
                  <Select.Option value="deactivated">Deactivated</Select.Option>
                  <Select.Option value="blocked">Blocked</Select.Option>
                </Select>
              </div>
            </div>
          )}
          <div className="ninjadash-datatable-filter__right">
            <Input onChange={handleDataUser} size="middle" placeholder="Search" prefix={prefix} />
          </div>
        </div>
      ) : (
        ''
      )}

      <div className="ninjadasj-datatable">
        <TableWrapper className="table-data-view table-responsive">
          {rowSelection ? (
            <Table
              rowSelection={{
                // type: state.selectionType,
                ...rowSelection,
              }}
              pagination={{ pageSize: 10, showSizeChanger: true }}
              dataSource={tableData}
              columns={columns}
            />
          ) : (
            <Table pagination={{ pageSize: 10, showSizeChanger: true }} dataSource={tableData} columns={columns} />
          )}
        </TableWrapper>
      </div>
    </DataTableStyleWrap>
  );
};
