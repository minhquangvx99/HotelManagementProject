import UilSearch from '@iconscout/react-unicons/dist/icons/uil-search';
import UilPlus from '@iconscout/react-unicons/dist/icons/uil-plus';
import UilTrashAlt from '@iconscout/react-unicons/dist/icons/uil-trash-alt';
import UilPen from '@iconscout/react-unicons/dist/icons/uil-pen';
import {
  FormInstance,
  Tooltip,
  Input,
  Table,
  Modal,
  Select,
  Empty,
  Pagination,
  Form,
  Row,
  Col,
  DatePicker,
  Card,
} from 'antd';
import { DownOutlined, CaretRightFilled } from '@ant-design/icons';
import { Button } from 'components/buttons/Buttons';
import { Heading } from 'components/heading/Heading';
import { DataTableStyleWrap } from 'components/table/Style';
import { themeColor } from 'config/theme/ThemeVariables';
import { Main, TableWrapper } from 'container/Style';
import { ChangeEvent, FC, ReactNode, Suspense, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { RootState } from 'store/RootReducer';
import { fetchListStudentPaging, deleteStudent, passDetailsStudent, updateStatusStudent } from 'store/student/Actions';
import { StudentModel } from 'store/student/Types';
import { Route } from '@ant-design/pro-layout/es/typing';
import { PageHeader } from 'components/page-headers/PageHeaders';
import moment from 'moment';
import { Cards } from 'components/cards/frame/CardsFrame';
import { fetchListClassAll } from 'store/class/Actions';
import { DateRangePickerOne } from 'components/buttons/date-picker/DatePicker';
import { StyledStudentFilter, StyledStudentTable } from './style';
import { render } from '@testing-library/react';

interface IStudentTableData {
  key?: number;
  RegisterDate?: ReactNode;
  Email?: ReactNode;
  Subject?: ReactNode;
  Name?: ReactNode;
  Class?: ReactNode;
  TuitionFee?: ReactNode;
  Status?: ReactNode;
  action1?: ReactNode;
  action2?: ReactNode;
  action3?: ReactNode;
}

interface IStudent {}

const Students: FC<IStudent> = (props) => {
  const PageRoutes: Route[] = [
    {
      path: '',
      breadcrumbName: 'Students',
    },
    {
      path: '',
      breadcrumbName: 'List',
    },
  ];
  const navigate = useNavigate();
  const studentDataPaging = useSelector((states: RootState) => states.student.dataPaging);
  const studentForEdit = useSelector((states: RootState) => states.student.studentForEdit);
  const loading = useSelector((states: RootState) => states.student.loading);
  const [form] = Form.useForm();
  const dispatch = useDispatch<any>();
  const formRef = useRef<FormInstance<any>>(null);
  const startDateInput = Form.useWatch('startDate', form);
  const endDateInput = Form.useWatch('endDate', form);
  const [state, setState] = useState({
    searchKey: '',
    modalConfirmVisible: false,
    typeConfirm: 1,
    studentSelectToDelete: {} as StudentModel,
    page: 1,
    ID: 0,
    newStatus: 0,
    modalUpdateStatusConfirmVisible: false,
  });
  const currencyFormatter = (value: any) => {
    const formattedValue = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);

    return formattedValue.replace('₫', 'VND');
  };

  useEffect(() => {
    getListStudent();
  }, [state.page]);

  const getListStudent = () => {
    const values: any = form.getFieldsValue();
    const startDate = values.startDate ? moment(values.startDate).format('YYYY-MM-DD') : undefined;
    const endDate = values.endDate ? moment(values.endDate).format('YYYY-MM-DD') : undefined;
    const emailSearch = values.Email ? values.Email : undefined;
    const status = values.Status;
    const page = state.page;
    const pageSize = 10;
    // let keyWord = state.searchKey.trim();
    // setState({ ...state, searchKey: keyWord });
    dispatch(fetchListStudentPaging(page, pageSize, startDate, endDate, emailSearch, status));
  };
  const handleReset = () => {
    try {
      form.resetFields();
      filter();
    } catch (error) {
      console.error('Error resetting fields:', error);
    }
  };
  const onChangePage = (page: number) => {
    setState((state) => ({ ...state, page }));
  };

  const deleteStudentConfirm = () => {
    if (state?.studentSelectToDelete?.ID) {
      dispatch(deleteStudent(state.studentSelectToDelete.ID, state.page));
    }
    setState({ ...state, modalConfirmVisible: false, studentSelectToDelete: {} as StudentModel });
    setState((state) => ({ ...state, page: 1 }));
  };
  const getListStatus = () => {
    const listStatus = [
      { value: 1, label: 'Active' },
      { value: 0, label: 'Inactive' },
      { value: 2, label: 'Block' },
      { value: 4, label: 'Pending' },
      { value: 5, label: 'Refuse' },
    ];
    return listStatus;
  };
  const onChangeSearchBar = (e: ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, searchKey: e.currentTarget.value });
  };

  const filter = () => {
    if (state.page === 1) {
      getListStudent();
    } else {
      setState((state) => ({ ...state, page: 1 }));
    }
  };
  const disabledAtiveDate = (current: any) => {
    return current && (startDateInput != '' ? current > moment(startDateInput) : false);
  };
  const disabledExpireDate = (current: any) => {
    return current && (endDateInput != '' ? current < moment(endDateInput) : false);
  };
  const handleKeyDownEmail = (event: { key: string; preventDefault: () => void }) => {
    const regex = /^[a-zA-Z0-9@.]*$/;
    if (!regex.test(event.key)) event.preventDefault();
  };
  const dataTableColumn = [
    {
      title: () => {
        return (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontWeight: 550 }}>Register time</div>
          </div>
        );
      },
      dataIndex: 'RegisterDate',
      key: 'RegisterDate',
      align: 'left' as const,
      width: '13vw',
    },
    {
      title: () => {
        return (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontWeight: 550 }}>Email</div>
          </div>
        );
      },
      dataIndex: 'Email',
      key: 'Email',
      align: 'left' as const,
      width: '13vw',
    },
    {
      title: () => {
        return (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontWeight: 550 }}>Subject</div>
          </div>
        );
      },
      dataIndex: 'Subject',
      key: 'Subject',
      align: 'center' as const,
      width: '21vw',
    },

    {
      title: () => {
        return (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontWeight: 550 }}>Name</div>
          </div>
        );
      },
      dataIndex: 'Name',
      key: 'Name',
      align: 'left' as const,
      width: '18vw',
    },
    {
      title: () => {
        return (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontWeight: 550 }}>Class</div>
          </div>
        );
      },
      dataIndex: 'Class',
      key: 'Class',
      align: 'center' as const,
      width: '10vw',
    },
    {
      title: () => {
        return (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontWeight: 550 }}>Tuition fee</div>
          </div>
        );
      },
      dataIndex: 'TuitionFee',
      key: 'TuitionFee',
      align: 'center' as const,
      width: '8vw',
    },
    {
      title: () => {
        return (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontWeight: 550 }}>Status</div>
          </div>
        );
      },
      dataIndex: 'Status',
      key: 'Status',
      align: 'center' as const,
      width: '5vw',
    },

    {
      title: '',
      dataIndex: 'action1',
      key: 'action1',
      align: 'center' as const,
      width: '5vw',
    },
    {
      title: '',
      dataIndex: 'action2',
      key: 'action2',
      align: 'center' as const,
      width: '5vw',
    },
  ];

  const handleEdit = (item: StudentModel) => {
    dispatch(passDetailsStudent(item));
  };
  const validateDates = (activeDate: Date, expireDate: Date) => {
    console.log('activeDate:____', activeDate);
    console.log('expireDate:____', expireDate);

    if (activeDate && expireDate && moment(activeDate).isAfter(moment(expireDate))) {
      return Promise.reject('Date from must be less than Date to');
    }
    return Promise.resolve();
  };
  const handleAdd = () => {
    dispatch(passDetailsStudent(null));
    navigate('/admin/student/categoryInfoStudent');
  };

  const handleStatusChange = () => {
    if (state.ID && !isNaN(state.newStatus)) {
      dispatch(updateStatusStudent(state.ID, state.newStatus, state.page));
      setState({ ...state, modalUpdateStatusConfirmVisible: false, ID: 0, newStatus: 0 });
      setState((state) => ({ ...state, page: 1 }));
    }
  };
  
  let tableDataSource: IStudentTableData[] = [];
  studentDataPaging?.ListUserPaging?.map((item) => {
    const { ID, Name, ExamType, TuitionFee, Status, CreatedDate, Email, ClassID } = item;
    return tableDataSource.push({
      key: ID,
      RegisterDate: moment(CreatedDate).format('DD/MM/YYYY'),
      Email,
      Subject: (
        <Tooltip
          title={ExamType || ''} // Check if ExamType exists, otherwise provide an empty string
          placement="bottom"
          overlayStyle={{ maxWidth: '100%' }}
          style={{ display: 'block', maxWidth: '100%' }}
          overlayInnerStyle={{ background: '#000' }}
        >
          {ExamType?.split(',')
            ?.map((item) => item.trim())
            ?.slice(0, 3) // Display only the first 3 subjects
            ?.map((item, index) => { return (
              <span
                key={index}
                style={{
                  display: 'inline-block',
                  backgroundColor: '#358DF4',
                  padding: '5px 10px',
                  margin: '5px',
                  borderRadius: '15px',
                  border: '1px solid #164D9E',
                  color: '#ffffff',
                }}
              >
                {item}
              </span>
            )})}
          {ExamType && ExamType?.split(',')?.length > 3 && <span>...</span>} {/* Show "..." if more than 3 subjects */}
        </Tooltip>
      ),

      Name,
      Class: ClassID,
      TuitionFee: currencyFormatter(TuitionFee),
      Status: (
        <Tooltip
          placement="bottom"
          style={{ display: 'block', maxWidth: '100%' }}
          overlayInnerStyle={{ background: '#000' }}
        >
          <Select
            disabled={true}
            style={{ width: '100%', opacity: '1 !important', borderRadius: 8 }}
            className={
              Status === 0
                ? 'statusStyleInactive'
                : Status === 1
                  ? 'statusStyleActive'
                  : Status === 4
                    ? 'statusStylePending'
                    : Status === 5
                      ? 'statusStyleRefuse'
                      : Status === 2
                        ? 'statusStyleBlocked'
                        : 'statusStyleNormal'
            }
            placeholder="Select status"
            value={Status?.toString()}
            onChange={(value) => openModalUpdateStatusConfirm(ID ? ID : 0, parseInt(value))}
            suffixIcon={null}
          >
            <Select.Option value="0" hidden={Status == 1 || Status == 2}>
              Inactive
            </Select.Option>
            <Select.Option value="1" hidden={Status != 1 && Status != 2}>
              Active
            </Select.Option>
            <Select.Option value="2" hidden={Status != 1 && Status != 2}>
              Block
            </Select.Option>
            <Select.Option value="4" hidden={Status !== 1 && Status !== 2}>
              Pending
            </Select.Option>
            <Select.Option value="5" hidden={Status !== 1 && Status !== 2}>
              Refuse
            </Select.Option>
          </Select>
        </Tooltip>
      ),
      action1: (
        <div className="table-actions">
          <Tooltip title="Edit">
            <Link className="edit" to="/admin/student/categoryInfoStudent" onClick={() => handleEdit(item)}>
              <UilPen style={{ width: 20 }} color={themeColor['dark-gray']} />
            </Link>
          </Tooltip>
        </div>
      ),
      action2: (
        <div className="table-actions">
          <Tooltip title={ 'Delete'}>
            <Link
              className="delete"
              to="#"
              onClick={() => openModalConfirm(item)}
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
        Content: studentForEdit?.Content,
      });

    state.typeConfirm === 2 &&
      formRef.current?.setFieldsValue({
        Content: '',
      });
  }, [studentForEdit, state.typeConfirm]);

  const openModalConfirm = (student: StudentModel) => {
    setState({ ...state, modalConfirmVisible: true, studentSelectToDelete: student });
  };

  const closeModalConfirm = () => {
    setState({ ...state, modalConfirmVisible: false });
  };

  const openModalUpdateStatusConfirm = (ID: number, newStatus: number) => {
    setState({ ...state, modalUpdateStatusConfirmVisible: true, ID: ID, newStatus: newStatus });
  };

  const closeModalUpdateStatusConfirm = () => {
    setState({ ...state, modalUpdateStatusConfirmVisible: false });
  };

  return (
    <div>
      <Main>
        <Suspense>
          <div>
            <DataTableStyleWrap>
              <StyledStudentFilter>
                <Card bordered={false}>
                  <Form form={form} ref={formRef} name="ninjadash-vertical-form" layout="vertical">
                    <Row gutter={32}>
                      {/* Date picker */}
                      <Col span={12}>
                        <Row gutter={32}>
                          <Col span={12}>
                            <Form.Item
                              name="startDate"
                              label={
                                <span style={{ fontSize: 18, fontWeight: 600 }}>
                                  <span style={{ color: 'red' }}></span> Register Date
                                </span>
                              }
                              rules={[
                                ({ getFieldValue }) => ({
                                  validator(_, value) {
                                    const expireDate = getFieldValue(`endDate`);
                                    return validateDates(value, expireDate);
                                  },
                                }),
                              ]} // Only required check
                            >
                              <DatePicker placeholder="dd/mm/yyyy" style={{ width: '100%' }} format={'DD/MM/YYYY'} />
                            </Form.Item>
                          </Col>
                          <CaretRightFilled style={{ position: 'absolute', top: '50%', left: 'calc(50% - 8px)' }} />
                          <Col span={12}>
                            <Form.Item
                              name="endDate"
                              label={
                                <span style={{ fontSize: 18, fontWeight: 600 }}>
                                  <span style={{ color: 'red', opacity: 0 }}>''</span>
                                </span>
                              }
                              rules={[
                                ({ getFieldValue }) => ({
                                  validator(_, value) {
                                    const expireDate = getFieldValue(`startDate`);
                                    return validateDates(expireDate, value);
                                  },
                                }),
                              ]} // Only required check
                            >
                              <DatePicker placeholder="dd/mm/yyyy" style={{ width: '100%' }} format={'DD/MM/YYYY'} />
                            </Form.Item>
                          </Col>
                        </Row>
                      </Col>
                      {/* Status */}
                      <Col span={6}>
                        <Form.Item
                          name="Status"
                          label={
                            <span style={{ fontSize: 18, fontWeight: 600 }}>
                              <span style={{ color: 'red' }}></span> Status
                            </span>
                          }
                        >
                          <Select
                            placeholder="Choose status"
                            style={{ width: '100%' }}
                            options={getListStatus()}
                            showSearch
                            filterOption={(input, option) =>
                              (option?.label?.toString() ?? '').toLowerCase().includes(input.toLowerCase().trim())
                            }
                          ></Select>
                        </Form.Item>
                      </Col>
                      {/* Email */}
                      <Col span={6}>
                        <Form.Item
                          name="Email"
                          label={
                            <span style={{ fontSize: 18, fontWeight: 600 }}>
                              <span>Email</span>
                            </span>
                          }
                        >
                          <Input
                            onKeyDown={handleKeyDownEmail}
                            placeholder="Example@gmail.com"
                            size="small"
                            style={{ width: '100%', height: '40px' }}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
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
                          onClick={filter}
                        >
                          Search
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </Card>
              </StyledStudentFilter>
              <div
                className="ninjadash-datatable-filter__action"
                style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '15px', marginTop: '15px' }}
              >
                <Button style={{ minWidth: 120 }} mergetype="dark-success" onClick={() => handleAdd()}>
                  Add
                </Button>
              </div>

              {/* </div> */}

              {/* Table side */}
              <div className="ninjadasj-datatable">
                <StyledStudentTable>
                  <style>
                    {
                      `
                        .ant-select:not(.ant-select-customize-input) .ant-select-selector {
                          border-radius: 8px !important;
                        }
                      `
                    }
                  </style>
                  <TableWrapper className="table-data-view table-responsive">
                    <Table
                      bordered
                      className="table-responsive"
                      dataSource={tableDataSource}
                      columns={dataTableColumn}
                      pagination={{
                        pageSize: 10,
                        onChange: onChangePage,
                        total: studentDataPaging?.totalRow,
                        current: state.page,
                      }}
                      loading={loading}
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
                </StyledStudentTable>
              </div>
            </DataTableStyleWrap>
          </div>
        </Suspense>
      </Main>

      <Modal
        closable={false}
        centered
        open={state.modalConfirmVisible}
        // onCancel={closeModalConfirm}
        footer={[
          <Button loading={loading} mergetype="primary" key="submit" onClick={deleteStudentConfirm}>
            Yes
          </Button>,
          <Button mergetype="primary" outlined key="back" onClick={closeModalConfirm}>
            No
          </Button>,
        ]}
      >
        <div style={{ justifyItems: 'center', display: 'grid', marginBottom: 20 }}>
          <Heading as="h4">Are you sure you want to delete this item?</Heading>
        </div>
      </Modal>
      <Modal
        closable={false}
        centered
        open={state.modalUpdateStatusConfirmVisible}
        onCancel={closeModalUpdateStatusConfirm}
        footer={[
          <Button loading={loading} mergetype="primary" key="submit" onClick={handleStatusChange}>
            Yes
          </Button>,
          <Button mergetype="primary" outlined key="back" onClick={closeModalUpdateStatusConfirm}>
            No
          </Button>,
        ]}
      >
        <div style={{ justifyItems: 'center', display: 'grid', marginBottom: 20 }}>
          <Heading as="h4">Are you sure you want to change?</Heading>
        </div>
      </Modal>
    </div>
  );
};

export default Students;
