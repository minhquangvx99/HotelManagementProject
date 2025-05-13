import { Route } from '@ant-design/pro-layout/es/typing';
import UilPlus from '@iconscout/react-unicons/dist/icons/uil-plus';
import UilTrashAlt from '@iconscout/react-unicons/dist/icons/uil-trash-alt';
import UilPen from '@iconscout/react-unicons/dist/icons/uil-pen';
import { Dropdown, Empty, MenuProps, Modal, Skeleton, Table, Tooltip } from 'antd';
import { Button } from 'components/buttons/Buttons';
import { Cards } from 'components/cards/frame/CardsFrame';
import { DataTableStyleWrap } from 'components/table/Style';
import { Main, TableWrapper } from 'container/Style';
import { ChangeEvent, FC, ReactNode, Suspense, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/RootReducer';
import { Link, useNavigate } from 'react-router-dom';
import { themeColor } from 'config/theme/ThemeVariables';
import { AnswerModel, QuestionModel, QuestionApiModel } from 'store/question/Types';
import {
  deleteQuestion,
  passDetailsQuestion,
  SetCompositeQuestionAdd,
  SetQuestionAdd,
} from 'store/question/Actions';
import { Heading } from 'components/heading/Heading';
interface IQuestionTableData {
  ID: number;
  Code?: string | undefined;
  TaskID?: ReactNode;
  Status?: number;
  Score?: number;
  Question?: string;
  BaCode?: string;
  ExamTypeCode?: ReactNode;
  KACode?: ReactNode;
  TaskCode?: ReactNode;
  ExamTypeID?: ReactNode;
  KAID?: ReactNode;
  TopicSetID?: ReactNode;
  totalRow?: ReactNode;
  answers?: AnswerModel[];
  StatusDisplay?: ReactNode;
  action1?: ReactNode;
  action2?: ReactNode;
}

interface IQuestion {
  type?: string;
  handleImportFileXls?: () => void;
  handleDownloadTemplateFillQuestion?: () => void;
  hanldePageChange: (page: number) => void;
  page?: number;

}

const Question: FC<IQuestion> = (props) => {
  const PageRoutes: Route[] = [
    {
      path: '',
      breadcrumbName: 'Question',
    },
    {
      path: '',
      breadcrumbName: 'List',
    },
  ];


  const navigate = useNavigate();

  const questionList = useSelector((states: RootState) => states.question.data);
  const questionForEdit = useSelector((states: RootState) => states.question.questionForEdit);
  const loading = useSelector((states: RootState) => states.question.loading);

  const dispatch = useDispatch<any>();
  const [state, setState] = useState({
    searchKey: '',
    keyChange: '',
    // chỉ dùng khi fake data, khi nào ghép API thì k sử dụng nữa, sử dụng redux (categoryList)
    modalConfirmVisible: false,
    typeConfirm: 1,
    questionSelectToDelete: {} as QuestionModel,
    page: props.page || 1,
  });
  useEffect(() => {
    setState({ ...state, page: props.page || 1 });
  }, [props.page]);

  const onChangePage = (page: number) => {
    setState({ ...state, page });
    props.hanldePageChange(page);
  };


  const openModalConfirm = (question: QuestionModel) => {
    setState({ ...state, modalConfirmVisible: true, questionSelectToDelete: question });
  };

  const closeModalConfirm = () => {
    setState({ ...state, modalConfirmVisible: false });
  };

  const deleteQuestionConfirm = () => {
    if (state?.questionSelectToDelete?.ID) {
      dispatch(deleteQuestion({ id: state?.questionSelectToDelete?.ID, page: state.page }));
      console.log('pageeee: ',state.page);
      
    }
    setState({ ...state,modalConfirmVisible: false, questionSelectToDelete: {} as QuestionModel });
    
  };
  const dataTableColumn = [
    {
      title: () => {
        return (
          <>
            <div style={{ fontWeight: 550, textAlign: 'center', whiteSpace: 'nowrap' }}>Subject (L1)</div>
          </>
        );
      },
      dataIndex: 'ExamTypeCode',
      key: 'ExamTypeCode',
      align: 'center' as const,
      render: (text: string) => {
        return (
          <Tooltip title={text}>
            <div style={{ cursor: 'pointer' }}>{text}</div>
          </Tooltip>
        );
      },
    },
    {
      title: () => {
        return (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontWeight: 550, whiteSpace: 'nowrap' }}>Batch ID</div>
          </div>
        );
      },
      dataIndex: 'BaCode',
      key: 'BaCode',
      align: 'center' as const,
    },
    {
      title: () => {
        return (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontWeight: 550, whiteSpace: 'nowrap' }}>L2's Name</div>
          </div>
        );
      },
      dataIndex: 'KACode',
      key: 'KACode',
      align: 'center' as const,
    },
    {
      title: () => {
        return (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontWeight: 550, whiteSpace: 'nowrap' }}>L3's Name</div>
          </div>
        );
      },
      dataIndex: 'TaskCode',
      key: 'TaskCode',
      align: 'center' as const,
    },
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

  const handleEdit = (item: QuestionModel) => {
    const searchParams = new URLSearchParams(window.location.search);
    const currentPage = state.page || "1";
    // Xóa localStorage và cập nhật Redux trước khi chuyển trang
    localStorage.removeItem('currentQuestionID');
    const event = new Event('currentQuestionIDChanged');
    window.dispatchEvent(event);
    dispatch(SetQuestionAdd(null));
    dispatch(SetCompositeQuestionAdd(null));
    dispatch(passDetailsQuestion(item));
  
    // Chuyển hướng sau khi cập nhật state
    navigate(`/admin/question/addQuestion`, { state: { page: currentPage, item } });
  };

  
  const tableDataScource: IQuestionTableData[] = [];

  questionList?.map((item) => {
    const {
      ID,
      Code,
      TaskID,
      Status,
      Score,
      Question,
      BaCode,
      ExamTypeCode,
      KACode,
      TaskCode,
      ExamTypeID,
      KAID,
      TopicSetID,
      totalRow,
      answers,
    } = item;
    var codeShow = ExamTypeID?.toString().padStart(2, '0') + '-Q' + ID.toString().padStart(4, '0');
    return tableDataScource.push({
      ID,
      Code: codeShow,
      TaskID,
      Status,
      Score,
      Question,
      BaCode: BaCode ? BaCode : 'N/A',
      ExamTypeCode,
      KACode,
      TaskCode,
      ExamTypeID,
      answers,
      KAID,
      TopicSetID,
      totalRow,
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
        ) : (
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
        ),
      action1: (
        <div className="table-actions">
          <Tooltip title="Edit">
          <button className="edit" onClick={() => handleEdit(item)} style={{ background: "none", border: "none", cursor: "pointer" }}>
              <UilPen style={{ width: 24 }} color={themeColor['dark-gray']} />
            </button>
          </Tooltip>
        </div>
      ),
      action2: (
        <div className="table-actions">
          <Tooltip title={TopicSetID == 0 || TopicSetID == null ? 'Delete' : 'Can not delete this item'}>
            {TopicSetID == 0 || TopicSetID == null ? (
              <Link
                className="delete"
                to="#"
                onClick={() => {
                  openModalConfirm(item);
                }}
              >
                <UilTrashAlt style={{ width: 24 }} color={themeColor['danger-color']} />
              </Link>
            ) : (
              <span className="delete-disabled">
                <UilTrashAlt style={{ width: 24, cursor: 'pointer' }} color={themeColor['danger-color']} />
              </span>
            )}
          </Tooltip>
        </div>
      ),
    });
  });

  const totalRows = questionList && questionList.length > 0 ? questionList[0]?.totalRow ?? 0 : 0;

  return (
    <>
      <DataTableStyleWrap>
        {/* Filter side */}

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
              // locale={{
              //   emptyText: (
              //     <Empty
              //       image={Empty.PRESENTED_IMAGE_SIMPLE}
              //       description={state.searchKey.trim() !== '' ? 'Not found' : 'No data'}
              //     />
              //   ),
              // }}
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

      <div
        style={{
          position: 'absolute',
          bottom: tableDataScource.length > 0 ? 25 : -40,
          fontSize: 15,
          color: 'rgb(64, 64, 64)',
          userSelect: 'none',
        }}
      >
        Download the form to fill questions{' '}
        <span
          onClick={props.handleDownloadTemplateFillQuestion}
          style={{ fontSize: 15, color: '#0075FF', cursor: 'pointer' }}
        >
          here
        </span>
      </div>

      <Modal
        closable={false}
        centered
        open={state.modalConfirmVisible}
        onCancel={closeModalConfirm}
        maskClosable={false}
        footer={[
          <Button mergetype="primary" outlined key="back" onClick={closeModalConfirm}>
            No
          </Button>,
          <Button loading={loading} mergetype="primary" key="submit" onClick={deleteQuestionConfirm}>
            Yes
          </Button>,
        ]}
      >
        <div style={{ justifyItems: 'center', display: 'grid', marginBottom: 20 }}>
          <Heading as="h4">Are you sure you want to delete this question?</Heading>
        </div>
      </Modal>
    </>
  );
};

export default Question;
