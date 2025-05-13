import { Route } from '@ant-design/pro-layout/es/typing';
import UilPlus from '@iconscout/react-unicons/dist/icons/uil-plus';
import UilTrashAlt from '@iconscout/react-unicons/dist/icons/uil-trash-alt';
import { Card, Col, Empty, Form, Input, Modal, Row, Select, Skeleton, Table, Tooltip } from 'antd';
import UilPen from '@iconscout/react-unicons/dist/icons/uil-pen';
import { Button } from 'components/buttons/Buttons';
import { Cards } from 'components/cards/frame/CardsFrame';
import { DataTableStyleWrap } from 'components/table/Style';
import { Main, TableWrapper } from 'container/Style';
import { ChangeEvent, Children, FC, ReactNode, Suspense, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/RootReducer';
import { Link, useNavigate } from 'react-router-dom';
import { themeColor } from 'config/theme/ThemeVariables';
import { Heading } from 'components/heading/Heading';
import {
  createRoom,
  deleteRoom,
  fetchDetailsRoom,
  fetchListRoomPaging,
  passRoomDetails,
  updateRoom,
} from 'store/room/Actions';
import { RoomModel } from 'store/room/Types';
import { fetchListHotelAll } from 'store/hotel/Actions';
import { FormInstance } from 'antd/es/form/Form';
import { StyledFilterRoom, RoomMainLayout } from './Style';
import moment from 'moment';

interface IRoomTableData {
  ID?: number;
  Code?: string | ReactNode;
  Number?: string | ReactNode;
  Type?: string | ReactNode;
  Price?: string;
  HotelName?: string | ReactNode;
  CreatedDate?: string | ReactNode;
  Status?: number;
  StatusDisplay?: ReactNode;
  action1?: ReactNode;
  action2?: ReactNode;
}

interface IRoom { }

const Room: FC<IRoom> = (props) => {

  const navigate = useNavigate();

  const roomList = useSelector((states: RootState) => states.room.dataPaging);
  const roomForEdit = useSelector((states: RootState) => states.room.roomForEdit);
  const listAllHotel = useSelector((states: RootState) => states.hotel.data);
  const loading = useSelector((states: RootState) => states.room.loading);
  const [form] = Form.useForm();
  const [form1] = Form.useForm();
  const numberInput = Form.useWatch('Number', form1);
  const statusShow = [
    { value: 0, label: 'Chưa cho thuê' },
    { value: 1, label: 'Đã cho thuê' },
    { value: 2, label: 'Không khả dụng' },
  ];

  const dispatch = useDispatch<any>();
  const [state, setState] = useState({
    keyChange: '',
    itemChangeStatus: {} as RoomModel,
    statusToChange: -1,
    typeConfirm: 1,
    roomSelectToDelete: {} as RoomModel,
    page: 1,
    codeSearch: '',
    type: '',
    hotelId: 0,
    status: '',
    modalConfirmVisible: false,
  });
  const getListAllHotel = () => {
    // call API lấy list exam for select
    dispatch(fetchListHotelAll());
  };

  useEffect(() => {
    getListRoom();
  }, [state.page]);

  useEffect(() => {
    getListAllHotel();
  }, []);

  const getListRoom = () => {
    let codeSearch = state.codeSearch.trim();
    let typeSearch = state.type.trim();

    let Status = state.status.trim();
    setState({ ...state, codeSearch: codeSearch, type: typeSearch });
    form.setFieldValue('Code', codeSearch);
    form.setFieldValue('Type', typeSearch);
    dispatch(
      fetchListRoomPaging(
        state.page,
        10,
        state.hotelId,
        codeSearch,
        typeSearch,
        Status,
      ),
    );
  };

  const onChangePage = (page: number) => {
    setState({ ...state, page });
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
      dataIndex: 'Code',
      key: 'Code',
      align: 'center' as const,
      width: '20vw',
      render: (text: any) => {
        return {
          children: (
            <div
              style={{
                whiteSpace: 'nowrap',
              }}
            >
              {text}
            </div>
          ),
          props: {},
        };
      },
    },
    {
      title: () => {
        return (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontWeight: 550 }}>Number</div>
          </div>
        );
      },
      dataIndex: 'Number',
      align: 'center' as const,
      key: 'Number',
      width: '20vw',
    },
    {
      title: () => {
        return (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontWeight: 550 }}>Type</div>
          </div>
        );
      },
      dataIndex: 'Type',
      align: 'center' as const,
      key: 'Type',
      width: '20vw',
    },
    {
      title: () => {
        return (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontWeight: 550 }}>Price</div>
          </div>
        );
      },
      dataIndex: 'Price',
      align: 'right' as const,
      key: 'Price',
      width: '20vw',
    },
    {
      title: () => {
        return (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontWeight: 550 }}>HotelName</div>
          </div>
        );
      },
      dataIndex: 'HotelName',
      align: 'center' as const,
      key: 'HotelName',
      width: '20vw',
    },
    {
      title: () => {
        return (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontWeight: 550 }}>CreatedDate</div>
          </div>
        );
      },
      dataIndex: 'CreatedDate',
      align: 'center' as const,
      key: 'CreatedDate',
      width: '20vw',
    },
    {
      title: () => {
        return (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontWeight: 550 }}>Status</div>
          </div>
        );
      },
      dataIndex: 'StatusDisplay',
      key: 'StatusDisplay',
      align: 'center' as const,
    },
    {
      title: '',
      dataIndex: 'action1',
      key: 'action1',
      align: 'center' as const,
    },
    {
      title: '',
      dataIndex: 'action2',
      key: 'action2',
      align: 'center' as const,
    },
  ];

  const handleEdit = async (roomID: number) => {

  };

  const handleAdd = () => {

  };

  const handleSearch = () => {
    if (state.page === 1) {
      getListRoom();
    } else {
      setState((state) => ({ ...state, page: 1 }));
    }
  };
  const handleReset = () => {
    setState({ ...state, codeSearch: '', type: '', hotelId: 0, status: '' });
    formRef.current?.resetFields();
    if (state.page === 1) {
      dispatch(fetchListRoomPaging(1, 10, 0, '', '', ''));
    } else {
      setState((state) => ({ ...state, page: 1 }));
    }
  };

  const handleDeleteRoom = () => {
    roomForEdit?.ID && dispatch(deleteRoom(roomForEdit?.ID));
    !loading && closeModalConfirm();
    setState((state) => ({ ...state, page: 1 }));
  };

  const getListSelectHotel = () => {
    let listHotel = [] as { value?: number; label: string; name: string }[];
    listAllHotel?.map((e) => {
      listHotel.push({ value: e.ID, label: `${e?.Name}`, name: e.Name ?? '' });
    });
    return listHotel;
  };

  const currencyFormatter = (value: any) => {
    const formattedValue = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);

    return formattedValue.replace('₫', 'VND');
  };

  const openModalConfirm = (typeConfirm: number, cate: RoomModel) => {
    dispatch(fetchDetailsRoom(cate?.ID ?? 0));
    setState((state) => ({ ...state, modalConfirmVisible: true, typeConfirm }));
  };

  const closeModalConfirm = () => {
    setState((state) => ({ ...state, modalConfirmVisible: false }));
  };

  const onSubmit = () => {
    formRef1.current?.submit();
    if (formRef1.current?.getFieldsError().length !== 0) {
      if (state.typeConfirm === 1) {
        save();
      } else {
        handleDeleteRoom();
      }
    }
  };

  const save = () => {
    if (roomForEdit?.ID) {
      let roomItem = {
        ID: roomForEdit?.ID,
        Number: formRef1.current?.getFieldValue('Number')?.trim(),
        Status: formRef1.current?.getFieldValue('Status'),
        HotelId: formRef1.current?.getFieldValue('HotelId'),
        Type: formRef1.current?.getFieldValue('Type')?.trim(),
        Price: formRef1.current?.getFieldValue('Price'),
      };
      dispatch(updateRoom(roomItem));
    }
    else {
      let roomItem = {
        Number: formRef1.current?.getFieldValue('Number')?.trim(),
        Status: formRef1.current?.getFieldValue('Status'),
        HotelId: formRef1.current?.getFieldValue('HotelId'),
        Type: formRef1.current?.getFieldValue('Type')?.trim(),
        Price: formRef1.current?.getFieldValue('Price'),
      };
      dispatch(createRoom(roomItem));
    }
    !loading && closeModalConfirm();
    setState((state) => ({ ...state, searchKey: '', page: 1 }));
  };


  useEffect(() => {
    state.typeConfirm === 1 &&
      formRef1.current?.setFieldsValue({
        Number: roomForEdit?.Number,
        Status: roomForEdit?.Status,
        HotelId: roomForEdit?.HotelId,
        Type: roomForEdit?.Type,
        Price: roomForEdit?.Price,
      });

    state.typeConfirm === 2 &&
      formRef1.current?.setFieldsValue({
        Number: '',
        Status: '',
        HotelId: '',
        Type: '',
        Price: '',
      });
  }, [roomForEdit, state.typeConfirm]);

  const handleChange = (e: any) => {
    const value = e.target.value;
    // Loại bỏ các ký tự không phải số và giới hạn tối đa 16 ký tự
    const newValue = value.replace(/\D/g, '').slice(0, 16);
    formRef1.current?.setFieldsValue({
      Price: newValue,
    });
  };

  const tableDataScource: IRoomTableData[] = [];

  roomList?.ListRoom?.map((item) => {
    const { ID, Code, Number, Type, Price, Status, HotelName, CreatedDate } = item;
    return tableDataScource.push({
      Code,
      Number,
      Type,
      Price: currencyFormatter(Price),
      HotelName: (
        <Tooltip
          title={<pre className="custom-pre">{HotelName}</pre>}
          placement="bottom"
          overlayStyle={{ maxWidth: '100%' }}
          style={{ display: 'block', maxWidth: '100%' }}
          overlayInnerStyle={{ background: '#000' }}
        >
          <pre className="custom-pre">{HotelName}</pre>
        </Tooltip>
      ),
      CreatedDate: (
        <pre className="custom-pre">{moment(CreatedDate).format('HH:mm DD-MM-YYYY')}</pre>
      ),
      Status,
      StatusDisplay:
        Status == 1 ? (
          <div
            style={{
              width: 100,
              height: 40,
              backgroundColor: '#0075FF',
              fontWeight: 550,
              color: 'white',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              margin: 'auto',
              borderRadius: 8,
            }}
          >
            Đã cho thuê
          </div>
        ) : Status == 0 ? (
          <div
            style={{
              width: 100,
              height: 40,
              fontWeight: 550,
              backgroundColor: '#F0E68C',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              margin: 'auto',
              borderRadius: 8,
            }}
          >
            Chưa cho thuê
          </div>
        ) : Status == 2 ? (
          <div
            style={{
              width: 100,
              height: 40,
              fontWeight: 550,
              background: '#A52C2C',
              color: 'white',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              margin: 'auto',
              borderRadius: 8,
            }}
          >
            Không khả dụng
          </div>
        ) : (
          ''
        ),
      action1: (
        <div className="table-actions">
          <Tooltip title="Edit">
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
            <Link className="delete" to="#" onClick={() => openModalConfirm(2, item)}>
              <UilTrashAlt style={{ width: 24 }} color={themeColor['danger-color']} />
            </Link>
          </Tooltip>
        </div>
      ),
    });
  });

  const totalRows = roomList?.totalRow ?? 0;
  const formRef = useRef<FormInstance<any>>(null);
  const formRef1 = useRef<FormInstance<any>>(null);
  return (
    <RoomMainLayout>
      {/* <PageHeader className="ninjadash-page-header-main" /> */}
      <Main>
        <Suspense
          fallback={
            <Cards headless>
              <Skeleton active />
            </Cards>
          }
        >
          <div>
            <DataTableStyleWrap>
              <StyledFilterRoom>
                <Card bordered={false}>
                  <Form form={form} ref={formRef} name="ninjadash-vertical-form" layout="vertical">
                    <Col span={24}>
                      <Row gutter={32} style={{ display: 'flex', flexFlow: 'unset', justifyContent: 'center' }}>
                        <Col span={12}>
                          <Form.Item
                            name="Code"
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            label={
                              <span style={{ fontSize: 17, fontWeight: 550 }}>
                                <span style={{ color: 'red' }}></span> Code
                              </span>
                            }
                          >
                            <Input
                              placeholder="Filter by Code"
                              size="small"
                              style={{ width: '100%', height: '40px' }}
                              onChange={(e) => setState({ ...state, codeSearch: e.target.value })}
                              value={state.codeSearch || ''}
                            />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item
                            name="Type"
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            label={
                              <span style={{ fontSize: 17, fontWeight: 550 }}>
                                <span style={{ color: 'red' }}></span> Type
                              </span>
                            }
                          >
                            <Input
                              placeholder="Filter by Type"
                              size="small"
                              style={{ width: '100%', height: '40px' }}
                              onChange={(e) => setState({ ...state, type: e.target.value })}
                              value={state.type || ''}
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Col span={24}>
                        <Row gutter={32} style={{ display: 'flex', flexFlow: 'unset', justifyContent: 'center' }}>
                          <Col span={12}>
                            <Form.Item
                              name="Exam"
                              labelCol={{ span: 24 }}
                              wrapperCol={{ span: 24 }}
                              label={
                                <span style={{ fontSize: 17, fontWeight: 550 }}>
                                  <span style={{ color: 'red' }}></span> Hotel
                                </span>
                              }
                            >
                              {/* <Input placeholder="Filter by L1 (Subject)" size="small"></Input> */}
                              <Select
                                showArrow={true}
                                placeholder="Filter by Type of Exam"
                                showSearch
                                filterOption={(input, option) =>
                                  (option?.label?.toString() ?? '').toLowerCase().includes(input.toLowerCase().trim())
                                }
                                style={{ width: '100%' }}
                                options={getListSelectHotel()}
                                onChange={(value, opt) =>
                                  setState({ ...state, hotelId: parseInt(value + '') })
                                }
                                value={state.hotelId || undefined}
                                notFoundContent="Not found"
                              />
                            </Form.Item>
                          </Col>
                          <Col span={12}>
                            <Form.Item
                              name="Status"
                              labelCol={{ span: 24 }}
                              wrapperCol={{ span: 24 }}
                              label={
                                <span style={{ fontSize: 17, fontWeight: 550 }}>
                                  <span style={{ color: 'red' }}></span> Status
                                </span>
                              }
                            >
                              <Select
                                placeholder="Filter by Status"
                                showSearch
                                filterOption={(input, option) =>
                                  (option?.label?.toString() ?? '').toLowerCase().includes(input.toLowerCase().trim())
                                }
                                style={{ width: '100%' }}
                                options={statusShow}
                                onChange={(value, opt) => setState({ ...state, status: value + '' })}
                                value={state.status}
                                notFoundContent="Not found"
                              />
                            </Form.Item>
                          </Col>
                        </Row>
                      </Col>
                    </Col>
                  </Form>
                  <Row gutter={16} justify={'center'}>
                    <Col>
                      <Button
                        style={{
                          minWidth: 120,
                          backgroundColor: '#Ffff',
                          color: '#194F9F',
                          borderWidth: 1,
                          fontWeight: 'bold',
                          // marginRight: '40px',
                        }}
                        onClick={() => handleReset()}
                      >
                        Reset
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        style={{
                          minWidth: 120,
                          backgroundColor: '#194F9F',
                          color: 'white',
                          fontWeight: 'bold',
                          borderWidth: 1,
                        }}
                        mergetype="dark-success"
                        onClick={() => handleSearch()}
                      >
                        Search
                      </Button>
                    </Col>
                  </Row>
                </Card>
              </StyledFilterRoom>
              <div
                className="ninjadash-datatable-filter__action"
                style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '15px', marginBottom: '15px' }}
              >
                <Button style={{ minWidth: 120 }} mergetype="dark-success" onClick={() => openModalConfirm(1, {} as RoomModel)}>
                  <UilPlus />
                  Add
                </Button>
              </div>
              {/* Table side */}
              <div className="ninjadasj-datatable">
                <TableWrapper className="table-data-view table-responsive">
                  <Table
                    bordered
                    className="table-responsive"
                    dataSource={tableDataScource}
                    columns={dataTableColumn}
                    pagination={
                      tableDataScource.length > 0 && {
                        pageSize: 10,
                        onChange: onChangePage,
                        total: totalRows || 1,
                        current: state.page,
                      }
                    }
                    locale={{
                      emptyText: (
                        <div style={{ marginTop: '40px' }}>
                          <h1 style={{ fontWeight: 'bolder', fontSize: '24px', margin: '0px', lineHeight: '30px' }}>
                            No data
                          </h1>
                          <p style={{ fontSize: '13px' }}>Your search do not match any question</p>
                        </div>
                      ),
                    }}
                  />
                </TableWrapper>
              </div>
            </DataTableStyleWrap>
          </div>
        </Suspense>
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
                disabled={state.typeConfirm === 1 && (!numberInput || numberInput === '')}
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
              {state.typeConfirm === 1 ? 'Room Details' : 'Are you sure you want to delete the item?'}
            </Heading>
          </div>

            <Form
            hidden={state.typeConfirm === 1 ? false : true}
            form={form1}
            ref={formRef1}
            name="ninjadash-vertical-form"
            layout="vertical"
            >
            <Form.Item
              name="Number"
              label={
              <span style={{ fontSize: 18, fontWeight: 600 }}>
                {' '}
                <span style={{ color: 'red' }}>*</span>Number
              </span>
              }
              normalize={(value) => value.trimStart()}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="Type"
              label={
              <span style={{ fontSize: 18, fontWeight: 600 }}>
                {' '}
                Type
              </span>
              }
              normalize={(value) => value.trimStart()}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="Price"
              label={
              <span style={{ fontSize: 18, fontWeight: 600 }}>
                {' '}
                Price
              </span>
              }
              normalize={(value) => value.trimStart()}
            >
              <Input onChange={handleChange} maxLength={16} />
            </Form.Item>
            <Form.Item
              name="HotelId"
              label={
              <span style={{ fontSize: 18, fontWeight: 600 }}>
                {' '}
                HotelName
              </span>
              }
              normalize={(value) => value.trimStart()}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="Status"
              label={
              <span style={{ fontSize: 18, fontWeight: 600 }}>
                {' '}
                Status
              </span>
              }
              normalize={(value) => value}
            >
              <Select
              placeholder="Select Status"
              options={statusShow}
              />
            </Form.Item>
            </Form>
        </Modal>
      </Main>
    </RoomMainLayout >
  );
};

export default Room;
