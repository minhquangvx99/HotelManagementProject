import UilSearch from '@iconscout/react-unicons/dist/icons/uil-search';
import UilTrashAlt from '@iconscout/react-unicons/dist/icons/uil-trash-alt';
import UilPen from '@iconscout/react-unicons/dist/icons/uil-pen';
import { FormInstance, Form, Tooltip, Input, Table, Modal, Skeleton, Empty } from 'antd';
import { Button } from 'components/buttons/Buttons';
import { Heading } from 'components/heading/Heading';
import { DataTableStyleWrap } from 'components/table/Style';
import { themeColor } from 'config/theme/ThemeVariables';
import { Main, TableWrapper } from 'container/Style';
import { ChangeEvent, FC, ReactNode, Suspense, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from 'store/RootReducer';
import { fetchListHotelPaging, saveHotel, deleteHotel, updateHotelForEdit } from 'store/hotel/Actions';
import { HotelModel } from 'store/hotel/Types';
import { Route } from '@ant-design/pro-layout/es/typing';
import { Cards } from 'components/cards/frame/CardsFrame';
import moment from 'moment';
interface IHotelTableData {
  ID?: string;
  key?: number;
  Name?: ReactNode;
  Address?: ReactNode;
  PhoneNumber?: ReactNode;
  StarsNumber?: ReactNode;
  ManagerName?: ReactNode;
  CreatedDate?: ReactNode;
  action1?: ReactNode;
  action2?: ReactNode;
}

interface IHotel { }

const Hoteles: FC<IHotel> = (props) => {
  const PageRoutes: Route[] = [
    {
      path: '',
      breadcrumbName: 'Hoteles',
    },
    {
      path: '',
      breadcrumbName: 'List',
    },
  ];

  const hotelDataPaging = useSelector((states: RootState) => states.hotel.dataPaging);
  const hotelForEdit = useSelector((states: RootState) => states.hotel.hotelForEdit);
  const loading = useSelector((states: RootState) => states.hotel.loading);
  const topMenu = useSelector((state: RootState) => state.layout.topMenu);
  const dispatch = useDispatch<any>();
  const formRef = useRef<FormInstance<any>>(null);
  const [form] = Form.useForm();
  const nameInput = Form.useWatch('Name', form);
  const addressInput = Form.useWatch('Address', form);
  const phoneNumberInput = Form.useWatch('PhoneNumber', form);
  const starsNumberInput = Form.useWatch('StarsNumber', form);
  const managerNameInput = Form.useWatch('ManagerName', form);
  const [state, setState] = useState({
    searchKey: '',
    modalConfirmVisible: false,
    typeConfirm: 1,
    page: 1,
  });

  useEffect(() => {
    getListHotel();
  }, [state.page]);

  const getListHotel = () => {
    // call API lấy list exam type
    let keyWord = state.searchKey.trim();
    setState({ ...state, searchKey: keyWord });
    dispatch(fetchListHotelPaging(state.page, 10, keyWord));
  };

  const onChangePage = (page: number) => {
    setState((state) => ({ ...state, page }));
  };

  const save = () => {
    // call API save
    let hotelItem = {
      ID: hotelForEdit?.ID,
      Name: formRef.current?.getFieldValue('Name')?.trim(),
      Address: formRef.current?.getFieldValue('Address')?.trim(),
      PhoneNumber: formRef.current?.getFieldValue('PhoneNumber'),
      StarsNumber: formRef.current?.getFieldValue('StarsNumber'),
      ManagerName: formRef.current?.getFieldValue('ManagerName')?.trim(),
    };
    dispatch(saveHotel(hotelItem, state.page));
    !loading && closeModalConfirm();
    setState((state) => ({ ...state, searchKey: '', page: 1 }));
  };
  const deleteCate = () => {
    // call API delete
    hotelForEdit?.ID && dispatch(deleteHotel(hotelForEdit?.ID, state.page));
    !loading && closeModalConfirm();
    setState((state) => ({ ...state, searchKey: '', page: 1 }));
  };

  const onChangeSearchBar = (e: ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, searchKey: e.currentTarget.value });
  };

  const filter = () => {
    if (state.page === 1) {
      getListHotel();
    } else {
      setState((state) => ({ ...state, page: 1 }));
    }
  };

  const dataTableColumn = [
    {
      title: () => {
        return (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontWeight: 550 }}>Code</div>
          </div>
        );
      },
      dataIndex: 'ID',
      key: 'ID',
      align: 'center' as const,
      width: '5vw',
    },
    {
      title: () => {
        return <div style={{ fontWeight: 550, textAlign: 'center' }}>Name</div>;
      },
      dataIndex: 'Name',
      key: 'Name',
      width: '85vw',
    },
    {
      title: () => {
        return <div style={{ fontWeight: 550, textAlign: 'center' }}>Address</div>;
      },
      dataIndex: 'Address',
      key: 'Address',
      width: '85vw',
    },
    {
      title: () => {
        return <div style={{ fontWeight: 550, textAlign: 'center' }}>PhoneNumber</div>;
      },
      dataIndex: 'PhoneNumber',
      key: 'PhoneNumber',
      width: '85vw',
    },
    {
      title: () => {
        return <div style={{ fontWeight: 550, textAlign: 'center' }}>StarsNumber</div>;
      },
      dataIndex: 'StarsNumber',
      key: 'StarsNumber',
      width: '85vw',
    },
    {
      title: () => {
        return <div style={{ fontWeight: 550, textAlign: 'center' }}>ManagerName</div>;
      },
      dataIndex: 'ManagerName',
      key: 'ManagerName',
      width: '85vw',
    },
    {
      title: () => {
        return <div style={{ fontWeight: 550, textAlign: 'center' }}>CreatedDate</div>;
      },
      dataIndex: 'CreatedDate',
      key: 'CreatedDate',
      width: '85vw',
    },
    {
      title: '',
      dataIndex: 'action1',
      key: 'action1',
      width: '5vw',
    },
    {
      title: '',
      dataIndex: 'action2',
      key: 'action2',
      width: '5vw',
    },
  ];

  let tableDataSource: IHotelTableData[] = [];
  hotelDataPaging?.listHotel?.map((item) => {
    const { ID, Name, Address, PhoneNumber, StarsNumber, ManagerName, CreatedDate } = item;
    return tableDataSource.push({
      key: ID,
      ID: `KS${ID}`,
      Name: (
        <Tooltip
          title={<pre className="custom-pre">{Name}</pre>}
          placement="bottom"
          overlayStyle={{ maxWidth: '100%' }}
          style={{ display: 'block', maxWidth: '100%' }}
          overlayInnerStyle={{ background: '#000' }}
        >
          <pre className="custom-pre">{Name}</pre>
        </Tooltip>
      ),
      Address: (
        <Tooltip
          title={<pre className="custom-pre">{Address}</pre>}
          placement="bottom"
          overlayStyle={{ maxWidth: '100%' }}
          style={{ display: 'block', maxWidth: '100%' }}
          overlayInnerStyle={{ background: '#000' }}
        >
          <pre className="custom-pre">{Address}</pre>
        </Tooltip>
      ),
      PhoneNumber: (
        <Tooltip
          title={<pre className="custom-pre">{PhoneNumber}</pre>}
          placement="bottom"
          overlayStyle={{ maxWidth: '100%' }}
          style={{ display: 'block', maxWidth: '100%' }}
          overlayInnerStyle={{ background: '#000' }}
        >
          <pre className="custom-pre">{PhoneNumber}</pre>
        </Tooltip>
      ),
      StarsNumber: (
        <Tooltip
          title={<pre className="custom-pre">{StarsNumber}</pre>}
          placement="bottom"
          overlayStyle={{ maxWidth: '100%' }}
          style={{ display: 'block', maxWidth: '100%' }}
          overlayInnerStyle={{ background: '#000' }}
        >
          <pre className="custom-pre">{StarsNumber} sao</pre>
        </Tooltip>
      ),
      ManagerName: (
        <Tooltip
          title={<pre className="custom-pre">{ManagerName}</pre>}
          placement="bottom"
          overlayStyle={{ maxWidth: '100%' }}
          style={{ display: 'block', maxWidth: '100%' }}
          overlayInnerStyle={{ background: '#000' }}
        >
          <pre className="custom-pre">{ManagerName}</pre>
        </Tooltip>
      ),
      CreatedDate: (
        <Tooltip
          title={<pre className="custom-pre">{moment(CreatedDate).format('HH:mm DD-MM-YYYY')}</pre>}
          placement="bottom"
          overlayStyle={{ maxWidth: '100%' }}
          style={{ display: 'block', maxWidth: '100%' }}
          overlayInnerStyle={{ background: '#000' }}
        >
          <pre className="custom-pre">{moment(CreatedDate).format('HH:mm DD-MM-YYYY')}</pre>
        </Tooltip>
      ),
      action1: (
        <div className="table-actions">
          <Tooltip title={'Edit'}>
            <Link
              className="edit"
              to="#"
              onClick={() => openModalConfirm(1, item)}
            >
              <UilPen style={{ width: 20 }} color={themeColor['dark-gray']} />
            </Link>
          </Tooltip>
        </div>
      ),
      action2: (
        <div className="table-actions">
          <Tooltip title={'Delete'}>
            <Link
              className="delete"
              to="#"
              onClick={() => openModalConfirm(2, item)}
            >
              <UilTrashAlt style={{ width: 24 }} color={themeColor['danger-color']} />
            </Link>
          </Tooltip>
        </div>
      ),
    });
  });

  useEffect(() => {
    state.typeConfirm === 1 &&
      formRef.current?.setFieldsValue({
        Name: hotelForEdit?.Name,
        Address: hotelForEdit?.Address,
        PhoneNumber: hotelForEdit?.PhoneNumber,
        StarsNumber: hotelForEdit?.StarsNumber,
        ManagerName: hotelForEdit?.ManagerName,
      });

    state.typeConfirm === 2 &&
      formRef.current?.setFieldsValue({
        Name: '',
        Address: '',
        PhoneNumber: '',
        StarsNumber: '',
        ManagerName: '',
      });
  }, [hotelForEdit, state.typeConfirm]);

  const openModalConfirm = (typeConfirm: number, cate: HotelModel) => {
    dispatch(
      updateHotelForEdit(
        cate,
        setState((state) => ({ ...state, modalConfirmVisible: true, typeConfirm })),
      ),
    );
  };

  const closeModalConfirm = () => {
    setState((state) => ({ ...state, modalConfirmVisible: false }));
  };

  const onSubmit = () => {
    formRef.current?.submit();
    if (formRef.current?.getFieldsError().length !== 0) {
      if (state.typeConfirm === 1) {
        save();
      } else {
        deleteCate();
      }
    }
  };

  const handleChange = (e: any) => {
    const value = e.target.value;
    // Loại bỏ các ký tự không phải số và giới hạn tối đa 10 ký tự
    const newValue = value.replace(/\D/g, '').slice(0, 10);
    formRef.current?.setFieldsValue({
      PhoneNumber: newValue,
    });
  };

  const handleChangeStarsNumber = (e: any) => {
    const value = e.target.value;
    // Loại bỏ các ký tự không phải số và giới hạn tối đa 10 ký tự
    const newValue = value.replace(/\D/g, '').slice(0, 1);
    formRef.current?.setFieldsValue({
      StarsNumber: newValue > 5 ? null : newValue,
    });
  };

  return (
    <div>
      <Main>
        <Suspense
          fallback={
            <Cards headless>
              <Skeleton active />
            </Cards>
          }
        >
          <Cards border>
            <DataTableStyleWrap>
              {/* Filter side */}
              <div className="ninjadash-datatable-filter">
                <div className="ninjadash-datatable-filter__left">
                  <div className="ninjadash-datatable-filter__input" style={{ minWidth: '50%' }}>
                    <Input
                      className="ninjadash-data-id"
                      value={state.searchKey}
                      allowClear
                      onChange={onChangeSearchBar}
                      onPressEnter={filter}
                      prefix={<UilSearch style={{ color: 'black' }} onClick={filter} />}
                    />
                  </div>
                </div>
                <div className="ninjadash-datatable-filter__action" style={{ display: 'flex' }}>
                  <Button
                    style={{ width: 130 }}
                    mergetype="dark-success"
                    onClick={() => openModalConfirm(1, {} as HotelModel)}
                  >
                    Add
                  </Button>
                </div>
              </div>

              {/* Table side */}
              <div className="ninjadasj-datatable">
                <TableWrapper className="table-data-view table-responsive">
                  <Table
                    bordered
                    className="table-responsive"
                    dataSource={tableDataSource}
                    columns={dataTableColumn}
                    pagination={
                      tableDataSource.length > 0 && {
                        pageSize: 10,
                        onChange: onChangePage,
                        total: hotelDataPaging?.totalRow,
                        current: state.page,
                      }
                    }
                    loading={loading}
                    locale={{
                      emptyText: (
                        <Empty
                          image={Empty.PRESENTED_IMAGE_SIMPLE}
                          description={state.searchKey.trim() !== '' ? 'Not found' : 'No data'}
                        />
                      ),
                    }}
                  />
                </TableWrapper>
              </div>
            </DataTableStyleWrap>
          </Cards>
        </Suspense>
      </Main>

      <Modal
        closable={false}
        centered
        open={state.modalConfirmVisible}
        // onCancel={closeModalConfirm}
        footer={
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button mergetype="primary" outlined key="back" onClick={closeModalConfirm}>
              {state.typeConfirm === 1 ? 'Cancel' : 'No'}
            </Button>
            ,
            <Button
              disabled={state.typeConfirm === 1 && (!nameInput || nameInput === '')}
              loading={loading}
              mergetype="primary"
              key="submit"
              onClick={onSubmit}
            >
              {state.typeConfirm === 1 ? 'Save' : 'Yes'}
            </Button>
            ,
          </div>
        }
      >
        <div style={{ justifyItems: 'center', display: 'grid', marginBottom: 20 }}>
          <Heading as="h4">
            {state.typeConfirm === 1 ? 'Hotel Details' : 'Are you sure you want to delete the item?'}
          </Heading>
        </div>

        <Form
          hidden={state.typeConfirm === 1 ? false : true}
          form={form}
          ref={formRef}
          name="ninjadash-vertical-form"
          layout="vertical"
        >
          <Form.Item
            name="Name"
            label={
              <span style={{ fontSize: 18, fontWeight: 600 }}>
                {' '}
                <span style={{ color: 'red' }}>*</span>Name
              </span>
            }
            normalize={(value) => value.trimStart()}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="Address"
            label={
              <span style={{ fontSize: 18, fontWeight: 600 }}>
                {' '}
                Address
              </span>
            }
            normalize={(value) => value.trimStart()}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="PhoneNumber"
            label={
              <span style={{ fontSize: 18, fontWeight: 600 }}>
                {' '}
                PhoneNumber
              </span>
            }
            normalize={(value) => value.trimStart()}
          >
            <Input onChange={handleChange} maxLength={10} />
          </Form.Item>
          <Form.Item
            name="StarsNumber"
            label={
              <span style={{ fontSize: 18, fontWeight: 600 }}>
                {' '}
                StarsNumber
              </span>
            }
            normalize={(value) => value.trimStart()}
          >
            <Input onChange={handleChangeStarsNumber} maxLength={1}/>
          </Form.Item>
          <Form.Item
            name="ManagerName"
            label={
              <span style={{ fontSize: 18, fontWeight: 600 }}>
                {' '}
                ManagerName
              </span>
            }
            normalize={(value) => value.trimStart()}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Hoteles;
