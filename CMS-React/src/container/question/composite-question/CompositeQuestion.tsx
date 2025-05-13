import UilTrashAlt from '@iconscout/react-unicons/dist/icons/uil-trash-alt';
import UilPen from '@iconscout/react-unicons/dist/icons/uil-pen';
import { Dropdown, Empty, MenuProps, Modal, Table, Tooltip } from 'antd';
import { Button } from 'components/buttons/Buttons';
import { Cards } from 'components/cards/frame/CardsFrame';
import { DataTableStyleWrap } from 'components/table/Style';
import { TableWrapper } from 'container/Style';
import { FC, ReactNode, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/RootReducer';
import { Link, useNavigate } from 'react-router-dom';
import { themeColor } from 'config/theme/ThemeVariables';
import { AnswerModel, CompositeQuestionModel, QuestionApiModel } from 'store/question/Types';
import {
  deleteCompositeQuestion,
  passDetailsQuestion,
  SetCompositeQuestionAdd,
  SetQuestionAdd,
} from 'store/question/Actions';
import { Heading } from 'components/heading/Heading';
import { DownOutlined, UploadOutlined, UpOutlined } from '@ant-design/icons';
import { render } from '@testing-library/react';

interface IQuestionTableData {
  ID?: number;
  Code?: string;
  TaskID?: ReactNode;
  Status?: number;
  Score?: number;
  Question?: string;
  BatchCode?: string;
  ExamTypeCode?: ReactNode;
  ExamTypeID?: number;
  KACode?: ReactNode;
  TaskCode?: ReactNode;
  TaskName?: string;
  // ExamTypeID?: ReactNode;
  KAID?: ReactNode;
  TopicSetID?: ReactNode;
  totalRow?: ReactNode;
  answers?: AnswerModel[];
  StatusDisplay?: ReactNode;
  action1?: ReactNode;
  action2?: ReactNode;
  action3?: ReactNode;
}

interface IQuestion {
  type?: string;
  handleImportFileXls?: () => void;
  handleDownloadTemplateFillQuestion?: () => void;
  hanldePageChange: (page: number) => void;
  page?: number;
}
interface ISelectCompositeQuestion {
  ID: number;
  Code?: string;
  TaskID?: number;
  Status?: number;
  Score?: number;
  Question?: string;
  BaCode?: string;
  ExamTypeID?: number;
  KAID?: number;
  TopicSetID?: number;
  answers: AnswerModel[];
  totalRow?: number;
  BatchID?: number;
  Mode?: string;
  Action?: string;
  ColSpan: number;
}


const CompositeQuestion: FC<IQuestion> = (props) => {
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <div onClick={() => handleAdd()} style={{ padding: '6px 0', fontWeight: 600 }}>
          Single question
        </div>
      ),
    },
    {
      key: '2',
      label: (
        <div onClick={() => handleAddCompositeQuestion()} style={{ padding: '6px 0', fontWeight: 600 }}>
          Composite question
        </div>
      ),
    },
  ];

  const navigate = useNavigate();

  const questionList = useSelector((states: RootState) => states.question.dataComposite);
  const questionForEdit = useSelector((states: RootState) => states.question.questionForEdit);
  const loading = useSelector((states: RootState) => states.question.loading);
  const dispatch = useDispatch<any>();
  const [state, setState] = useState({
    searchKey: '',
    keyChange: '',
    arrExamResultHistoryIDDownOutlinedChoosen: [] as Number[],
    modalConfirmVisible: false,
    typeConfirm: 1,
    questionSelectToDelete: {} as CompositeQuestionModel,
    page: props.page || 1,
  });
  let pageSize = 10;
  let totalRows = (questionList && questionList[0]?.totalRow) || 0;
  useEffect(() => {
    setState({ ...state, page: props.page || 1 });
    console.log('page111:',props.page);
  }, [props.page]);

  
  const handleDownOutlinedChoose = (TopicSetID: Number) => {
    var checkTopicSetIDInArrayAlready = state.arrExamResultHistoryIDDownOutlinedChoosen.find((t) => t == TopicSetID);
    if (checkTopicSetIDInArrayAlready) {
      setState({
        ...state,
        arrExamResultHistoryIDDownOutlinedChoosen: state.arrExamResultHistoryIDDownOutlinedChoosen.filter(
          (t) => t != TopicSetID,
        ),
      });
    } else {
      setState({
        ...state,
        arrExamResultHistoryIDDownOutlinedChoosen: [...state.arrExamResultHistoryIDDownOutlinedChoosen, TopicSetID],
      });
    }
  };
  const onChangePage = (page: number) => {
    setState({ ...state, page, arrExamResultHistoryIDDownOutlinedChoosen: [] });
    console.log('vaocommm', state.page);
    props.hanldePageChange(page);
  };

  const openModalConfirm = (question: CompositeQuestionModel) => {
    setState({ ...state, modalConfirmVisible: true, questionSelectToDelete: question });
  };

  const closeModalConfirm = () => {
    setState({ ...state, modalConfirmVisible: false });
  };

  const deleteQuestionConfirm = () => {
    if (state?.questionSelectToDelete?.ID) {
      dispatch(deleteCompositeQuestion( {id: state?.questionSelectToDelete?.ID, page: state.page }));
      
    }
    setState({ ...state, modalConfirmVisible: false, questionSelectToDelete: {} as CompositeQuestionModel });
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
      dataIndex: 'action3',
      key: 'Code',
      align: 'center' as const,
      render: (text: any, record: any) => ({
        children: text,
        props: {
          colSpan: record.ColSpan ? 0 : 1,
        },
      }),
    },
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
      dataIndex: 'TaskName',
      key: 'TaskName',
      align: 'center' as const,
    },
    {
      title: () => {
        return (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontWeight: 550, whiteSpace: 'nowrap' }}>Content</div>
          </div>
        );
      },
      dataIndex: 'Question',
      key: 'Question',

      render: (text: string | undefined) => {
        const maxLength = 200;
        if (!text) {
          return '';
        }
        return (
          <div style={{ cursor: 'pointer' }}>
            {text.length > maxLength ? `${text.substring(0, maxLength)}...` : text}
          </div>
        );
      },
    },
    {
      title: () => {
        return (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontWeight: 550, whiteSpace: 'nowrap' }}>Status</div>
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

  const handleEdit = (item: CompositeQuestionModel) => {
    const searchParams = new URLSearchParams(window.location.search);
    const currentPage = state.page || "1"; 
    localStorage.removeItem('currentQuestionID');
    const event = new Event('currentQuestionIDChanged');
    window.dispatchEvent(event);
    dispatch(SetQuestionAdd(null));
    dispatch(SetCompositeQuestionAdd(null));
    // dispatch(passDetailsQuestion(item));
    navigate('/admin/question/addCompositeQuestion', { 
      state: { 
          id: item.ID, 
          page: currentPage 
      } 
  });
  };

  const handleAdd = () => {
    localStorage.removeItem('currentQuestionID');
    const event = new Event('currentQuestionIDChanged');
    window.dispatchEvent(event);
    dispatch(SetQuestionAdd(null));
    dispatch(SetCompositeQuestionAdd(null));
    dispatch(passDetailsQuestion(null));
    navigate('/admin/question/addQuestion');
  };

  const handleAddCompositeQuestion = () => {
    localStorage.removeItem('currentQuestionID');
    const event = new Event('currentQuestionIDChanged');
    window.dispatchEvent(event);
    dispatch(SetQuestionAdd(null));
    dispatch(SetCompositeQuestionAdd(null));
    dispatch(passDetailsQuestion(null));
    navigate('/admin/question/addCompositeQuestion');
  };
  const extractQuestionContent = (htmlString: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    var textContent = doc.body.textContent;
    return textContent?.trim();
  };

  const tableDataScource: IQuestionTableData[] = [];

  questionList?.map((item) => {
    const { BatchCode, ExamTypeID, ID, ExamTypeCode, totalRow, Status, CodeSearch, TaskName, Question } = item;
    var codeShow = CodeSearch;
    var IsAction1Up = state.arrExamResultHistoryIDDownOutlinedChoosen.find((e) => e == ID);

    tableDataScource.push({
      ID: ID,
      Code: codeShow,
      ExamTypeCode,
      BatchCode,
      Question: extractQuestionContent(Question || ''),
      ExamTypeID,
      totalRow,
      TaskName,
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
            <div className="edit" style={{ cursor: 'pointer' }} onClick={() => handleEdit(item)}>
              <UilPen style={{ width: 24 }} color={themeColor['dark-gray']} />
            </div>
          </Tooltip>
        </div>
      ),
      action2: (
        <div className="table-actions">
          <Tooltip title="Delete">
            <Link
              className="delete"
              to="#"
              onClick={() => {
                openModalConfirm(item);
              }}
            >
              <UilTrashAlt style={{ width: 24 }} color={themeColor['danger-color']} />
            </Link>
          </Tooltip>
        </div>
      ),
      action3: (
        <div style={{ display: 'flex', width: '100%', cursor: 'pointer' }}>
          <button style={{ border: 'none', backgroundColor: 'white' }}>
            {!IsAction1Up ? (
              <DownOutlined style={{ cursor: 'pointer' }} onClick={() => handleDownOutlinedChoose(ID ?? 0)} />
            ) : (
              <UpOutlined style={{ cursor: 'pointer' }} onClick={() => handleDownOutlinedChoose(ID ?? 0)} />
            )}
          </button>
          <div style={{ textAlign: 'center' }}>
            <div style={{ whiteSpace: 'nowrap' }}>{codeShow}</div>
          </div>
        </div>
      ),
    });

    if (IsAction1Up && item.questions) {
      item.questions.forEach((r) => {
        pageSize++;
        totalRows = totalRows + Math.ceil(questionList[0]?.totalRow / 10);
        tableDataScource.push({
          ExamTypeCode: r?.ExamTypeCode,
          KACode: r.KAName,
          TaskName: r?.TaskName,
          Question: extractQuestionContent(r.Question || ''),
        });
      });
    }
  });
  // const totalRows = questionList && questionList.length > 0 ? questionList[0]?.totalRow ?? 0 : 0;

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
                  pageSize: pageSize,
                  onChange: onChangePage,
                  total: totalRows || 1,
                  current: state.page,
                }
              }
              loading={loading}
              locale={{
                emptyText: (
                  <div>
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

export default CompositeQuestion;
