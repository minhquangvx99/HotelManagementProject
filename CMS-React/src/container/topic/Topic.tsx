import { Route } from '@ant-design/pro-layout/es/typing';
import UilSearch from '@iconscout/react-unicons/dist/icons/uil-search';
import UilPlus from '@iconscout/react-unicons/dist/icons/uil-plus';
import UilTrashAlt from '@iconscout/react-unicons/dist/icons/uil-trash-alt';
import { Card, Col, Empty, Form, Input, Modal, Row, Select, Skeleton, Table, Tooltip } from 'antd';
import UilPen from '@iconscout/react-unicons/dist/icons/uil-pen';
import { Button } from 'components/buttons/Buttons';
import { Cards } from 'components/cards/frame/CardsFrame';
import { PageHeader } from 'components/page-headers/PageHeaders';
import { DataTableStyleWrap } from 'components/table/Style';
import { Main, TableWrapper } from 'container/Style';
import { ChangeEvent, Children, FC, ReactNode, Suspense, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/RootReducer';
import { Link, useNavigate } from 'react-router-dom';
import { themeColor } from 'config/theme/ThemeVariables';
import { Heading } from 'components/heading/Heading';
import { DownOutlined } from '@ant-design/icons';
import {
  deleteTopicSet,
  fetchDetailsTopicSet,
  fetchListTopicSetPaging,
  passTopicSetDetails,
  updateStatusOfTopicSet,
} from 'store/topic-set/Actions';
import { TopicSetModel } from 'store/topic-set/Types';
// import '../topic/Topic.css';
import { fetchListTypeOfTopicSetAll } from 'store/type-of-topic-set/Actions';
import { fetchListExamTypeAll } from 'store/exam-type/Actions';
import { FormInstance } from 'antd/es/form/Form';
import { render } from '@testing-library/react';
import { text } from 'stream/consumers';
import { StyledFilterTopic, TopicMainLayout } from './Style';

interface ITopicSetTableData {
  TopicSetID?: number;
  ExamTypeID?: string | ReactNode;
  TypeOfTopicSet?: string | ReactNode;
  Code?: string;
  Admin?: string | ReactNode;
  Status?: number;
  Name?: string | ReactNode;
  StatusDisplay?: ReactNode;
  action1?: ReactNode;
  action2?: ReactNode;
}

interface ITopic {}

const Topic: FC<ITopic> = (props) => {
  const PageRoutes: Route[] = [
    {
      path: '',
      breadcrumbName: 'Topic',
    },
    {
      path: '',
      breadcrumbName: 'List',
    },
  ];

  const navigate = useNavigate();

  const topicSetList = useSelector((states: RootState) => states.topicSet.dataPaging);
  const topicSetForEdit = useSelector((states: RootState) => states.topicSet.topicSetForEdit);
  const loading = useSelector((states: RootState) => states.question.loading);
  const listAllTypeOfTopicSet = useSelector((states: RootState) => states.typeOfTopicSet.dataAll);
  const listAllExamType = useSelector((states: RootState) => states.examType.dataAll);
  const [form] = Form.useForm();
  const listStatusInActive = [
    { value: 1, label: 'Active' },
    { value: 0, label: 'Inactive' },
  ];
  const listStatusActive = [
    { value: 1, label: 'Active' },
    { value: 2, label: 'Blocked' },
  ];

  const dispatch = useDispatch<any>();
  const [state, setState] = useState({
    searchKey: '',
    keyChange: '',
    modalConfirmChangeSelectVisible: false,
    itemChangeStatus: {} as TopicSetModel,
    statusToChange: -1,
    typeConfirm: 1,
    TopicSetIDToDelete: -1,
    topicSetSelectToDelete: {} as TopicSetModel,
    page: 1,
    codeSearch: '',
    name: '',
    typeOfTopicSetsID: 0,
    examTypeID: 0,
    status: '',
  });
  const getListAllTypeOfTopicSet = () => {
    // call API lấy list exam for select
    dispatch(fetchListTypeOfTopicSetAll());
  };
  const getListAllExamType = () => {
    // call API lấy list exam for select
    dispatch(fetchListExamTypeAll());
  };

  useEffect(() => {
    getListTopicSet();
  }, [state.page]);

  useEffect(() => {
    getListAllTypeOfTopicSet();
    getListAllExamType();
  }, []);
  const getListSelectExamType = () => {
    let listExamType = [] as { value?: number; label: string; name: string }[];
    listAllExamType?.map((e) => {
      listExamType.push({ value: e.ID, label: `[${e?.ExamType}]-[${e?.Name}]`, name: e.Name ?? '' });
    });
    return listExamType;
  };

  const getListTopicSet = () => {
    let keyWord = state.searchKey.trim();
    let codeSearch = state.codeSearch.trim();
    let nameSearch = state.name.trim();

    let Status = state.status.trim();
    setState({ ...state, searchKey: keyWord, codeSearch: codeSearch, name: nameSearch });
    form.setFieldValue('Code', codeSearch);
    form.setFieldValue('Name', nameSearch);
    dispatch(
      fetchListTopicSetPaging(
        state.page,
        10,
        keyWord,
        state.examTypeID,
        state.typeOfTopicSetsID,
        codeSearch,
        nameSearch,
        Status,
      ),
    );
  };

  const onChangePage = (page: number) => {
    setState({ ...state, page });
  };

  const onChangeSearchBar = (e: ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, searchKey: e.currentTarget.value });
  };

  const closeModalChangeSelectConfirm = () => {
    setState({ ...state, modalConfirmChangeSelectVisible: false });
  };

  // filter list theo keyword - đang fake data, sau khi có API => call API getListCate()
  const filter = () => {
    if (state.page === 1) {
      getListTopicSet();
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
            <div style={{ fontWeight: 550 }}>Name</div>
          </div>
        );
      },
      dataIndex: 'Name',
      key: 'Name',
      width: '20vw',
    },
    {
      title: () => {
        return (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontWeight: 550 }}>Subject (L1)</div>
          </div>
        );
      },
      dataIndex: 'ExamTypeID',
      key: 'ExamTypeID',
      align: 'center' as const,
      width: '20vw',
    },
    {
      title: () => {
        return (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontWeight: 550 }}>Type of Exam</div>
          </div>
        );
      },
      dataIndex: 'TypeOfTopicSet',
      key: 'TypeOfTopicSet',
      width: 400,
      render: (text: any) => {
        return {
          children: (
            <div
              style={{
                wordWrap: 'break-word', // Breaks long words if necessary
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                // textAlign: 'center',
                whiteSpace: 'pre-wrap', // Preserves white spaces and wraps text
                width: '400px', // Ensures the width is set to 400 pixels
                display: 'inline-block', // Maintains the width of the text
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

  const handleEdit = async (topicSetID: number) => {
    try {
      await dispatch(fetchDetailsTopicSet(topicSetID));
      navigate('/admin/topic/addTopic');
    } catch (error) {
      console.error('Failed to fetch topic set details:', error);
    }
  };

  const handleAdd = () => {
    dispatch(passTopicSetDetails(null));
    navigate('/admin/topic/addTopic');
  };

  const handleSearch = () => {
    if (state.page === 1) {
      getListTopicSet();
    } else {
      setState((state) => ({ ...state, page: 1 }));
    }
  };
  const handleReset = () => {
    setState({ ...state, codeSearch: '', name: '', typeOfTopicSetsID: 0, examTypeID: 0, status: '' });
    formRef.current?.resetFields();
    if (state.page === 1) {
      dispatch(fetchListTopicSetPaging(1, 10, '', 0, 0, '', '', ''));
    } else {
      setState((state) => ({ ...state, page: 1 }));
    }
  };
  const handleSelectChange = (item: TopicSetModel, value: number) => {
    setState({
      ...state,
      itemChangeStatus: item,
      statusToChange: value,
      modalConfirmChangeSelectVisible: true,
      typeConfirm: 1,
    });
  };

  const handleChangeStatus = () => {
    dispatch(
      updateStatusOfTopicSet({
        examTypeID: state.itemChangeStatus.ExamType,
        topicSetID: state.itemChangeStatus.TopicSetID,
        topicSetStatus: state.statusToChange,
        page: state.page,
      }),
    );
    setState({ ...state, itemChangeStatus: {}, statusToChange: -1, modalConfirmChangeSelectVisible: false });
  };

  const handleDeleteTopicSet = () => {
    dispatch(deleteTopicSet(state.TopicSetIDToDelete));
    setState({ ...state, TopicSetIDToDelete: -1, modalConfirmChangeSelectVisible: false, page: 1 });
  };

  const openDeleteConfirmModel = (TopicSetID: any) => {
    setState({ ...state, modalConfirmChangeSelectVisible: true, typeConfirm: 2, TopicSetIDToDelete: TopicSetID });
  };
  const getListSelectTypeOfTopicSet = () => {
    let listTypeOfTopicSet = [] as { value?: number; label: string; name: string }[];
    listAllTypeOfTopicSet?.map((e) => {
      listTypeOfTopicSet.push({ value: e.ID, label: `${e?.Name}`, name: e.Name ?? '' });
    });
    return listTypeOfTopicSet;
  };
  const getListStatus = () => {
    const listStatus = [
      { value: 1, label: 'Active' },
      { value: 0, label: 'Inactive' },
      { value: 2, label: 'Block' },
    ];
    return listStatus;
  };
  const tableDataScource: ITopicSetTableData[] = [];

  topicSetList?.ListTopicSet?.map((item) => {
    const { TopicSetID, ExamType, ExamCode, TypeOfTopicSet, NumberOfQuestion, Code, Name, Admin, Status } = item;
    var codeShow = ExamCode + '-D' + TopicSetID?.toString().padStart(5, '0');
    var statusShow = Status == 1 || Status == 2 ? listStatusActive : listStatusInActive;
    return tableDataScource.push({
      ExamTypeID: <span style={{ whiteSpace: 'pre' }}>{ExamType}</span>,
      TypeOfTopicSet: TypeOfTopicSet + ' - ' + NumberOfQuestion + 'Q',
      Code: codeShow,
      Name,
      Admin: <span style={{ whiteSpace: 'pre' }}>{Admin}</span>,
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
            Active
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
            Inactive
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
            Block
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
              onClick={(e) => {
                e.preventDefault(); // Prevent default link behavior
                handleEdit(TopicSetID ?? 0);
              }}
            >
              <UilPen style={{ width: 20 }} color={themeColor['dark-gray']} />
            </Link>
          </Tooltip>
        </div>
      ),
      action2: (
        <div className="table-actions">
          <Tooltip title={Status == 0 ? 'Delete' : 'Cannot delete this item'}>
            {Status == 0 ? (
              <Link className="delete" to="#" onClick={() => openDeleteConfirmModel(TopicSetID)}>
                <UilTrashAlt style={{ width: 24 }} color={themeColor['danger-color']} />
              </Link>
            ) : (
              <span className="delete-disabled">
                <UilTrashAlt style={{ width: 24 }} color={themeColor['danger-color']} />
              </span>
            )}
          </Tooltip>
        </div>
      ),
    });
  });

  const totalRows = topicSetList?.totalRow ?? 0;
  const formRef = useRef<FormInstance<any>>(null);
  return (
    <TopicMainLayout>
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
              {/* Filter side */}
              {/* <div className="ninjadash-datatable-filter">
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
                
                              
              </div> */}
              <StyledFilterTopic>
                <Card bordered={false}>
                  <Form form={form} ref={formRef} name="ninjadash-vertical-form" layout="vertical">
                    <Col span={24}>
                      <Row gutter={32} style={{ display: 'flex', flexFlow: 'unset', justifyContent: 'center' }}>
                        <Col span={8}>
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
                            {/* <Input placeholder="Filter by L1 (Subject)" size="small"></Input> */}
                            <Input
                              placeholder="Filter by Code"
                              size="small"
                              style={{ width: '100%', height: '40px' }}
                              onChange={(e) => setState({ ...state, codeSearch: e.target.value })} // Use e.target.value to get the input value
                              value={state.codeSearch || ''} // Simpler conditional check
                            />
                          </Form.Item>
                        </Col>
                        <Col span={8}>
                          <Form.Item
                            name="Name"
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            label={
                              <span style={{ fontSize: 17, fontWeight: 550 }}>
                                <span style={{ color: 'red' }}></span> Name
                              </span>
                            }
                          >
                            {/* <Input placeholder="Filter by L2 (KA,Module)" size="small"></Input> */}
                            <Input
                              placeholder="Filter by Exam’s Name"
                              size="small"
                              style={{ width: '100%', height: '40px' }}
                              onChange={(e) => setState({ ...state, name: e.target.value })} // Use e.target.value to get the input value
                              value={state.name || ''} // Simpler conditional check
                            />
                          </Form.Item>
                        </Col>
                        <Col span={8}>
                          <Form.Item
                            name="Subject"
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            label={
                              <span style={{ fontSize: 17, fontWeight: 550 }}>
                                <span style={{ color: 'red' }}></span> Subject (L1)
                              </span>
                            }
                          >
                            {/* <Input placeholder="Filter by L3 (Task)" size="small"></Input> */}
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
                              suffixIcon={<DownOutlined />}
                            >
                              {getListSelectExamType().map((option) => (
                                <Select.Option key={option.value} value={option.value + ''} label={option.label}>
                                  <Tooltip title={option.name}>{option.label}</Tooltip>
                                </Select.Option>
                              ))}
                            </Select>
                          </Form.Item>
                        </Col>
                      </Row>
                      <Col span={24}>
                        <Row gutter={32} style={{ display: 'flex', flexFlow: 'unset', justifyContent: 'center' }}>
                          <Col span={8}>
                            <Form.Item
                              name="Exam"
                              labelCol={{ span: 24 }}
                              wrapperCol={{ span: 24 }}
                              label={
                                <span style={{ fontSize: 17, fontWeight: 550 }}>
                                  <span style={{ color: 'red' }}></span> Type of Exam
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
                                options={getListSelectTypeOfTopicSet()}
                                onChange={(value, opt) =>
                                  setState({ ...state, typeOfTopicSetsID: parseInt(value + '') })
                                }
                                value={state.typeOfTopicSetsID || undefined}
                                notFoundContent="Not found"
                              />
                            </Form.Item>
                          </Col>
                          <Col span={8}>
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
                                options={getListStatus()}
                                onChange={(value, opt) => setState({ ...state, status: value + '' })}
                                value={state.status}
                                // onChange={() => setStateValid({ ...stateValid, typeOfTopicSet: true })}
                                notFoundContent="Not found"
                              />
                            </Form.Item>
                          </Col>
                          <Col span={8}></Col>
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
              </StyledFilterTopic>
              <div
                className="ninjadash-datatable-filter__action"
                style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '15px', marginBottom: '15px' }}
              >
                <Button style={{ minWidth: 120 }} mergetype="dark-success" onClick={() => handleAdd()}>
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
              </div>
            </DataTableStyleWrap>
          </div>
        </Suspense>
        <Modal
          closable={false}
          centered
          open={state.modalConfirmChangeSelectVisible}
          onCancel={closeModalChangeSelectConfirm}
          footer={[
            <Button
              loading={loading}
              mergetype="primary"
              key="submit"
              onClick={() => (state.typeConfirm == 1 ? handleChangeStatus() : handleDeleteTopicSet())}
            >
              Yes
            </Button>,
            <Button mergetype="primary" outlined key="back" onClick={closeModalChangeSelectConfirm}>
              No
            </Button>,
          ]}
        >
          <div style={{ justifyItems: 'center', display: 'grid', marginBottom: 20 }}>
            <Heading as="h4">
              {state.typeConfirm == 1
                ? 'Are you sure you want to change?'
                : 'Are you sure you want to delete this item?'}
            </Heading>
          </div>
        </Modal>
      </Main>
    </TopicMainLayout>
  );
};

export default Topic;
