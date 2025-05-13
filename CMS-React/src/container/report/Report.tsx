import UilSearch from '@iconscout/react-unicons/dist/icons/uil-search';
import UilPlus from '@iconscout/react-unicons/dist/icons/uil-plus';
import UilTrashAlt from '@iconscout/react-unicons/dist/icons/uil-trash-alt';
import UilPen from '@iconscout/react-unicons/dist/icons/uil-pen';
import { FormInstance, Form, Tooltip, Input, Table, Modal, Skeleton, Empty, Card, Row, Col, DatePicker, Select } from 'antd';
import { Button } from 'components/buttons/Buttons';
import { Heading } from 'components/heading/Heading';
import { DataTableStyleWrap } from 'components/table/Style';
import { themeColor } from 'config/theme/ThemeVariables';
import { Main, TableWrapper } from 'container/Style';
import { ChangeEvent, FC, ReactNode, Suspense, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from 'store/RootReducer';
import { fetchListClassPaging, saveClass, deleteClass, updateClassForEdit } from 'store/class/Actions';
import { ClassModel } from 'store/class/Types';
import { Route } from '@ant-design/pro-layout/es/typing';
import { PageHeader } from 'components/page-headers/PageHeaders';
import { Cards } from 'components/cards/frame/CardsFrame';
import { AuthInfo } from 'components/utilities/Info';
import { TopMenuSearch } from 'layout/Style';
import { fetchListReportExamPaging } from 'store/report/Actions';
import * as XLSX from 'xlsx';
import { time } from 'console';
import moment from 'moment';
import { fetchListExamTypeAll } from 'store/exam-type/Actions';
interface IReportTableData {
  ID?: number;
  Class?: string;
  UserName?: string;
  ExamCode?: string;
  Subject?: string;
  StudentName?: string;
  ExamName?: string;
  Time?: string;
  timeDoing?: number;
  TypeOfTopicSetName?: string;
  NumberOfQuestion?: string;
  Score?: number;
}

interface IReport {}

const Report: FC<IReport> = (props) => {
  const PageRoutes: Route[] = [
    {
      path: '',
      breadcrumbName: 'Reports',
    },
    {
      path: '',
      breadcrumbName: 'List',
    },
  ];

  const reportDataPaging = useSelector((states: RootState) => states.report.dataPaging);
  const loading = useSelector((states: RootState) => states.report.loading);
  const topMenu = useSelector((state: RootState) => state.layout.topMenu);
  const classDataPaging = useSelector((states: RootState) => states.class.dataPaging);
  const listAllExamType = useSelector((states: RootState) => states.examType.dataAll);
  const [form] = Form.useForm();
  const formRef = useRef<FormInstance<any>>(null);
  const startDateInput = Form.useWatch('startDate', form);
  const endDateInput = Form.useWatch('endDate', form);
  const dispatch = useDispatch<any>();
  const [state, setState] = useState({
    searchKey: '',
    modalConfirmVisible: false,
    typeConfirm: 1,
    page: 1,
    examTypeID: 0,
  });
    const getListAllExamType = () => {
      // call API lấy list exam for select
      dispatch(fetchListExamTypeAll());
    };
  const getListClassSelect = (): { label: string; value: string }[] => {
    if (!classDataPaging || !classDataPaging.listClass || classDataPaging.listClass.length === 0) {
      return [];
    }
  
    return (classDataPaging?.listClass || []).map((classItem: ClassModel) => ({
      label: classItem.Content ?? 'Unknown', // Hiển thị tên lớp học
      value: (classItem.ID ?? '').toString(), // Giá trị của lớp học
    }));
  };
  useEffect(() => {
    getListAllExamType();
    getListReport();
  }, [state.page]);

  const getListReport = () => {
    const values: any = form.getFieldsValue();
        const From = values.from ? moment(values.from).format('YYYY-MM-DD') : undefined;
        const To = values.to ? moment(values.to).format('YYYY-MM-DD') : undefined;
        const ExamName = values.ExamName ? values.ExamName : undefined;
        const UserName = values.UserName ? values.UserName : undefined;
        const page = state.page;
        const pageSize = 10;
        const classID = values.Class ? parseInt(values.Class) : undefined;
        const examTypeID = values.examTypeID !== null ? values.examTypeID : undefined;
 
    console.log('examTypeID,classID,From, To, ExamName, Username', examTypeID, classID, From, To, ExamName, UserName);
  
    //setState({ ...state, });
    dispatch(fetchListReportExamPaging(state.page, 10,classID, examTypeID, UserName, From, To, ExamName));
  };

  const onChangePage = (page: number) => {
    setState((state) => ({ ...state, page }));
  };
  const getListSelectExamType = () => {
    let listExamType = [] as { value?: number; label: string; name: string }[];
    listAllExamType?.map((e) => {
      listExamType.push({ value: e.ID, label: `[${e?.ExamType}]-[${e?.Name}]`, name: e.Name ?? '' });
    });
    return listExamType;
  };


  const filter = () => {
    if (state.page === 1) {
        getListReport();
    } else {
      setState((state) => ({ ...state, page: 1 }));
    }
  };
 
  const dataTableColumn = [
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
        return <div style={{ fontWeight: 550, textAlign: 'center' }}>User name</div>;
      },
      dataIndex: 'UserName',
      key: 'UserName',
      width: '10vw',
    },

    {
      title: () => {
        return <div style={{ fontWeight: 550, textAlign: 'center' }}>Student name</div>;
      },
      dataIndex: 'StudentName',
      key: 'StudentName',
      width: '10vw',
    },

    {
      title: () => {
        return <div style={{ fontWeight: 550, textAlign: 'center' }}>Subject</div>;
      },
      dataIndex: 'Subject',
      key: 'Subject',
      width: '10vw',
    },

    {
      title: () => {
        return <div style={{ fontWeight: 550, textAlign: 'center' }}>Exam code</div>;
      },
      dataIndex: 'ExamCode',
      key: 'ExamCode',
      width: '10vw',
    },
    {
      title: () => {
        return <div style={{ fontWeight: 550, textAlign: 'center' }}>Exam name</div>;
      },
      dataIndex: 'ExamName',
      key: 'ExamName',
      width: '10vw',
    },
    {
      title: () => {
        return <div style={{ fontWeight: 550, textAlign: 'center' }}>Time</div>;
      },
      dataIndex: 'Time',
      key: 'Time',
      width: '10vw',
    },
    {
      title: () => {
        return <div style={{ fontWeight: 550, textAlign: 'center' }}>Number of question</div>;
      },
      dataIndex: 'NumberOfQuestion',
      key: 'NumberOfQuestion',
      width: '10vw',
    },
    {
      title: () => {
        return <div style={{ fontWeight: 550, textAlign: 'center' }}>Score</div>;
      },
      dataIndex: 'Score',
      key: 'Score',
      width: '10vw',
    },
    {
      title: () => {
        return <div style={{ fontWeight: 550, textAlign: 'center' }}>timeDoing</div>;
      },
      dataIndex: 'timeDoing',
      key: 'timeDoing',
      width: '10vw',
    },
  ];

  const handleReset = () => {
    try {
      form.resetFields();
      filter();
    } catch (error) {
      console.error('Error resetting fields:', error);
    }
  };

  let tableDataSource: IReportTableData[] = [];
  reportDataPaging?.ListExam?.map((item) => {
    console.log('reportDataPaging?.listExamReport', reportDataPaging?.ListExam);

    const {
      ID,
      Class,
      UserName,
      ExamCode,
      Subject,
      StudentName,
      ExamName,
      Time,
      timeDoing,
      TypeOfTopicSetName,
      NumberOfQuestion,
      Score,
    } = item;
    return tableDataSource.push({
      ID: ID,
      Class: Class ?? undefined,
      UserName: UserName ?? undefined,
      ExamCode: ExamCode ?? undefined,
      Subject: Subject ?? undefined,
      StudentName: StudentName ?? undefined,
      Time: Time
        ? new Date(Time).toLocaleString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          })
        : 'N/A',
      ExamName: ExamName ?? undefined,
      timeDoing: timeDoing ?? undefined,
      TypeOfTopicSetName: TypeOfTopicSetName ?? undefined,
      NumberOfQuestion: NumberOfQuestion ?? undefined,
      Score: Score ?? undefined,
    });
  });
   const validateDates = (activeDate: Date, expireDate: Date) => {
      console.log('activeDate:____', activeDate);
      console.log('expireDate:____', expireDate);
  
      if (activeDate && expireDate && moment(activeDate).isAfter(moment(expireDate))) {
        return Promise.reject('Date from must be less than Date to');
      }
      return Promise.resolve();
    };

  const openModalConfirm = (typeConfirm: number, cate: ClassModel) => {
    dispatch(
      updateClassForEdit(
        cate,
        setState((state) => ({ ...state, modalConfirmVisible: true, typeConfirm })),
      ),
    );
  };
  const exportToExcel = () => {
    console.log('hehehe');
    if (!reportDataPaging?.ListExam || reportDataPaging.ListExam.length === 0) {
      console.error('No data available to export');
      return;
    }

    const dataToExport =
      reportDataPaging?.ListExam?.map((item: any) => ({
        Class: item.Class ?? 'N/A',
        UserName: item.UserName ?? 'N/A',
        ExamCode: item.ExamCode ?? 'N/A',
        Subject: item.Subject ?? 'N/A',
        StudentName: item.StudentName ?? 'N/A',
        timeDoing: item.timeDoing ?? 'N/A',
        ExamName: item.ExamName ?? 'N/A',
        Time: item.Time ? new Date(item.Time).toLocaleString() : 'N/A',
        NumberOfQuestion: item.NumberOfQuestion ?? 'N/A',
        Score: item.Score ?? 0,
      })) || [];
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Report');
    XLSX.writeFile(workbook, 'Report.xlsx');
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
                <Card bordered={false}>
                  <Form form={form} ref={formRef} name="ninjadash-vertical-form" layout="vertical">
                    <Row gutter={16} align="middle">
                      <Col span={4}>
                        {/* Date picker From */}
                        <Form.Item
                          name="from"
                          label={
                            <span style={{ fontSize: 18, fontWeight: 600 }}>
                              <span style={{ color: 'red' }}></span> From
                            </span>
                          }
                          rules={[
                            ({ getFieldValue }) => ({
                              validator(_, value) {
                                const expireDate = getFieldValue(`to`);
                                return validateDates(value, expireDate);
                              },
                            }),
                          ]}
                        >
                          <DatePicker placeholder="dd/mm/yyyy" style={{ width: '100%' }} format={'DD/MM/YYYY'} />
                        </Form.Item>
                      </Col>
                      <Col span={4}>
                        {/* Date picker To */}
                        <Form.Item
                          name="to"
                          label={
                            <span style={{ fontSize: 18, fontWeight: 600 }}>
                              <span style={{ color: 'red' }}></span> To
                            </span>
                          }
                          rules={[
                            ({ getFieldValue }) => ({
                              validator(_, value) {
                                const expireDate = getFieldValue(`from`);
                                return validateDates(expireDate, value);
                              },
                            }),
                          ]}
                        >
                          <DatePicker placeholder="dd/mm/yyyy" style={{ width: '100%' }} format={'DD/MM/YYYY'} />
                        </Form.Item>
                      </Col>
                      <Col span={4}>
                        {/* Input Name */}
                        <Form.Item
                          name="UserName"
                          label={
                            <span style={{ fontSize: 18, fontWeight: 600 }}>
                              <span>Name</span>
                            </span>
                          }
                        >
                          <Input
                            placeholder="Filter by User name or Student name"
                            size="small"
                            style={{ width: '100%', height: '40px' }}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={4}>
                        {/* Input Exam Name */}
                        <Form.Item
                          name="ExamName"
                          label={
                            <span style={{ fontSize: 18, fontWeight: 600 }}>
                              <span>Exam Name</span>
                            </span>
                          }
                        >
                          <Input
                            placeholder="Filter by Exam name"
                            size="small"
                            style={{ width: '100%', height: '40px' }}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={4}>
                        {/* Select Class */}
                        <Form.Item
                          name="Class"
                          label={
                            <span style={{ fontSize: 18, fontWeight: 600 }}>
                              <span style={{ color: 'red' }}></span> Class
                            </span>
                          }
                        >
                          <Select
                            placeholder="Filter by Class"
                            style={{ width: '100%' }}
                            options={getListClassSelect()}
                            showSearch
                            filterOption={(input, option) =>
                              (option?.label?.toString() ?? '').toLowerCase().includes(input.toLowerCase().trim())
                            }
                          ></Select>
                        </Form.Item>
                      </Col>
                      <Col span={4}>
                        {/* Select Subject */}
                        <Form.Item
                          name="examTypeID"
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                          label={
                            <span style={{ fontSize: 17, fontWeight: 550 }}>
                              <span style={{ color: 'red' }}></span> Subject (L1)
                            </span>
                          }
                        >
                          <Select
                            placeholder="Filter by L1 (Subject)"
                            style={{ width: '100%' }}
                            showSearch
                            filterOption={(input, option) =>
                              (option?.label?.toString() ?? '').toLowerCase().includes(input.toLowerCase().trim())
                            }
                            optionLabelProp="label"
                            onChange={(value, opt) => setState({ ...state, examTypeID: parseInt(value + '') })}
                            value={state.examTypeID !== null ? state.examTypeID + '' : undefined}
                            aria-required
                            notFoundContent="Not found"
                          >
                            {getListSelectExamType().map((option) => (
                              <Select.Option key={option.value} value={option.value + ''} label={option.label}>
                                <Tooltip title={option.name}>{option.label}</Tooltip>
                              </Select.Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={24} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
                        {/* Buttons */}
                        <Button
                          style={{
                            minWidth: 120,
                            backgroundColor: '#Ffff',
                            color: '#194F9F',
                            borderWidth: 1,
                            fontWeight: 'bold',
                            marginRight: '10px',
                          }}
                          onClick={() => handleReset()}
                        >
                          Reset
                        </Button>
                        <Button
                          style={{
                            minWidth: 120,
                            backgroundColor: '#194F9F',
                            color: 'white',
                            fontWeight: 'bold',
                            borderWidth: 1,
                            marginRight: '10px',
                          }}
                          mergetype="dark-success"
                          onClick={filter}
                        >
                          Search
                        </Button>
                        <Button
                          style={{
                            minWidth: 130,
                            backgroundColor: '#28a745',
                            color: 'white',
                            fontWeight: 'bold',
                            borderWidth: 1,
                          }}
                          onClick={exportToExcel}
                        >
                          Export to Excel
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </Card>
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
                        total: reportDataPaging?.totalRow,
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
    </div>
  );
};

export default Report;
