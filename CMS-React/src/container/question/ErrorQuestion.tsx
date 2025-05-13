import { ChangeEvent, FC, ReactNode, Suspense, useEffect, useRef, useState } from 'react';
import { Main, TableWrapper } from 'container/Style';
import { Cards } from 'components/cards/frame/CardsFrame';
import { Empty, Modal, Skeleton, Table, Tooltip } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/RootReducer';
import { Link, useNavigate } from 'react-router-dom';
import UilPen from '@iconscout/react-unicons/dist/icons/uil-pen';
import UilTrashAlt from '@iconscout/react-unicons/dist/icons/uil-trash-alt';
import { themeColor } from 'config/theme/ThemeVariables';
import { Button } from 'components/buttons/Buttons';
import {
  passDetailsQuestion,
  SetCompositeQuestionAdd,
  SetCompositeQuestionDetail,
  SetQuestionAdd,
} from 'store/question/Actions';
import { CreateCompositeQuestionModel, QuestionModel } from 'store/question/Types';
import moment from 'moment';

interface IErrorQuestionTableData {
  ID: number;
  Subject: string | ReactNode;
  Content: ReactNode;
  TypeOfQuestion: string;
  action1?: ReactNode;
  action2?: ReactNode;
}

interface IErrorQuestion {}

const ErrorQuestion: FC<IErrorQuestion> = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const [state, setState] = useState({
    isOpenConfirmExit: false,
    isOpenConfirmDelete: false,
    isOpenErrorQuestionEmpty: false,
    page: 1,
    indexPick: -1,
    itemMode: '',
  });
  const [dataSingleQuestion, setDataSingleQuestion] = useState([]);
  const [dataCompositeQuestion, setDataCompositeQuestion] = useState([]);

  useEffect(() => {
    //Reset
    dispatch(SetQuestionAdd(null));
    dispatch(passDetailsQuestion(null));
    dispatch(SetCompositeQuestionAdd(null));
    dispatch(SetCompositeQuestionDetail());

    var invalidSingleQuestionArrGet = JSON.parse(localStorage.getItem('invalidSingleQuestionArr') + '');
    if (invalidSingleQuestionArrGet === null) invalidSingleQuestionArrGet = [];
    var invalidCompositeQuestionArrGet = JSON.parse(localStorage.getItem('invalidCompositeQuestionArr') + '');
    if (invalidCompositeQuestionArrGet === null) invalidCompositeQuestionArrGet = [];

    setDataSingleQuestion(invalidSingleQuestionArrGet);
    setDataCompositeQuestion(invalidCompositeQuestionArrGet);
  }, []);

  useEffect(() => {
    var invalidSingleQuestionArrGet = JSON.parse(localStorage.getItem('invalidSingleQuestionArr') + '');
    if (invalidSingleQuestionArrGet === null) invalidSingleQuestionArrGet = [];
    var invalidCompositeQuestionArrGet = JSON.parse(localStorage.getItem('invalidCompositeQuestionArr') + '');
    if (invalidCompositeQuestionArrGet === null) invalidCompositeQuestionArrGet = [];

    if (invalidSingleQuestionArrGet.length === 0 && invalidCompositeQuestionArrGet.length === 0) {
      setState({ ...state, isOpenErrorQuestionEmpty: true, isOpenConfirmDelete: false });
    } else {
      setState({ ...state, isOpenConfirmDelete: false });
    }
  }, [dataSingleQuestion, dataCompositeQuestion]);

  const dataTableColumn = [
    {
      title: () => {
        return (
          <>
            <div style={{ fontWeight: 550, textAlign: 'center' }}>ID</div>
          </>
        );
      },
      dataIndex: 'ID',
      key: 'ID',
      width: '5vw',
      align: 'center' as const,
    },
    {
      title: () => {
        return (
          <>
            <div style={{ fontWeight: 550, textAlign: 'center' }}>Subject (L1)</div>
          </>
        );
      },
      dataIndex: 'Subject',
      key: 'Subject',
      width: '15vw',
      align: 'center' as const,
    },
    {
      title: () => {
        return (
          <>
            <div style={{ fontWeight: 550, textAlign: 'center' }}>Content</div>
          </>
        );
      },
      dataIndex: 'Content',
      key: 'Content',
      align: 'left' as const,
    },
    {
      title: () => {
        return (
          <>
            <div style={{ fontWeight: 550, textAlign: 'center' }}>Type of question</div>
          </>
        );
      },
      dataIndex: 'TypeOfQuestion',
      key: 'TypeOfQuestion',
      width: '15vw',
      render: (text: any) => {
        return {
          children: (
            <div
              style={{
                wordWrap: 'break-word', // Breaks long words if necessary
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                textAlign: 'center',
                whiteSpace: 'pre-wrap', // Preserves white spaces and wraps text
                display: 'inline-block', // Maintains the width of the text
                color: '#0075FF',
              }}
            >
              {text}
            </div>
          ),
          props: {},
        };
      },
      align: 'center' as const,
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

  const openModalConfirm = (index: any, mode: string) => {
    setState({
      ...state,
      isOpenConfirmDelete: true,
      indexPick: index,
      itemMode: mode,
    });
  };
  // ID: number;
  // Code?: string;
  // TaskID?: number;
  // Status?: number;
  // Score?: number;
  // Question?: string;
  // ExamTypeCode?: NullableString | number;
  // KACode?: NullableString | number;
  // TaskCode?: NullableString | number;
  // ExamTypeID?: number;
  // KAID?: number;
  // TopicSetID?: number;
  // answers: AnswerModel[];
  // totalRow?: number;

  const handleClickEdit = (item: any, ID: number, mode: string) => {
    const singleQuestion = {
      ID: ID,
      Code: item.Code,
      TaskID: item.TaskID,
      KAID: item.L2ID,
      Status: item.Status,
      Score: item.Score,
      Question: item.Question,
      ExamTypeCode: item.ExamTypeName,
      ExamTypeID: item.ExamTypeID,
      answers: item.answers,
      BatchID: item.BatchID,
      BatchCode: item.BatchCode,
      Mode: mode,
    } as QuestionModel;
    localStorage.setItem('currentQuestionID', ID + '');
    //Notify id is change to re-cal the title
    const event = new Event('currentQuestionIDChanged');
    window.dispatchEvent(event);
    dispatch(passDetailsQuestion(null));
    dispatch(SetQuestionAdd(singleQuestion));
  };

  // ExamtypeID: number;
  // Status: number;
  // Score: number;
  // Question: string;
  // BatchID: number;
  // questions: QuestionCreateModel;

  const handleClickEditCompositeQuestion = (item: any, ID: number, mode: string) => {
    const questions: any[] = [];
    item?.questions?.map((q: any) => {
      const singleQuestion = {
        ID: ID,
        Code: q.Code,
        TaskID: q.TaskID,
        KAID: q.L2ID,
        Status: q.Status,
        Score: q.Score,
        Question: q.Question,
        ExamTypeCode: q.ExamTypeName,
        ExamTypeID: q.ExamTypeID,
        answers: q.answers,
        BatchID: q.BatchID,
        BatchCode: q.BatchCode,
        Mode: mode,
      } as QuestionModel;
      questions.push(singleQuestion);
    });
    const compositeQuestion = {
      ID: ID,
      ExamtypeID: item.ExamtypeID,
      Status: item.Status,
      Score: item.Score,
      Question: item.Question,
      BatchCode: item.BatchCode,
      BatchID: item.BatchID,
      questions: questions,
    } as CreateCompositeQuestionModel;
    localStorage.setItem('currentQuestionID', dataSingleQuestion?.length + ID + '');
    //Notify id is change to re-cal the title
    const event = new Event('currentQuestionIDChanged');
    window.dispatchEvent(event);
    dispatch(passDetailsQuestion(null));
    dispatch(SetCompositeQuestionAdd(compositeQuestion));
  };

  const extractQuestionContent = (htmlString: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    var textContent = doc.body.textContent;
    return textContent?.trim();
  };

  const tableDataScource: IErrorQuestionTableData[] = [];

  dataSingleQuestion?.map((item, index) => {
    const { ExamtypeID, ExamTypeName, BatchID, Question } = item;
    const qt = extractQuestionContent(Question);
    const ques = (qt as string)?.length > 200 ? (qt as string)?.slice(0, 200) : qt;
    return tableDataScource.push({
      ID: index + 1,
      Subject: (
        <Tooltip
          title={ExamTypeName}
          placement="bottom"
          overlayStyle={{ maxWidth: '60%' }}
          style={{ display: 'block', maxWidth: '100%' }}
          overlayInnerStyle={{ background: '#000' }}
        >
          {ExamTypeName}
        </Tooltip>
      ),
      Content: ques,
      TypeOfQuestion: 'Single question',
      action1: (
        <div className="table-actions">
          <Tooltip title="Edit">
            <Link
              className="edit"
              to="/admin/question/addQuestion"
              onClick={() => handleClickEdit(item, index + 1, 'single')}
            >
              <UilPen style={{ width: 20 }} color={themeColor['dark-gray']} />
            </Link>
          </Tooltip>
        </div>
      ),
      action2: (
        <div className="table-actions">
          <Tooltip title="Delete">
            <span onClick={() => openModalConfirm(index, 'single')} className="delete-disabled">
              <UilTrashAlt style={{ width: 24, cursor: 'pointer' }} color={themeColor['danger-color']} />
            </span>
          </Tooltip>
        </div>
      ),
    });
  });

  dataCompositeQuestion?.map((item, index) => {
    const { ExamtypeID, ExamtypeName, BatchID, Question } = item;
    const singleQuestionLength = dataSingleQuestion?.length;
    const qt = extractQuestionContent(Question);
    const ques = (qt as string)?.length > 200 ? (qt as string)?.slice(0, 200) : qt;
    return tableDataScource.push({
      ID: singleQuestionLength + index + 1,
      Subject: ExamtypeName,
      Content:
        ques && qt ? (
          <Tooltip
            title={qt}
            placement="bottom"
            overlayStyle={{ maxWidth: '60%' }}
            style={{ display: 'block', maxWidth: '100%' }}
            overlayInnerStyle={{ background: '#000' }}
          >
            {ques === 'undefined' ? '' : ques}
          </Tooltip>
        ) : (
          ''
        ),
      TypeOfQuestion: 'Composite question',
      action1: (
        <div className="table-actions">
          <Tooltip title="Edit">
            <Link
              className="edit"
              to="/admin/question/addCompositeQuestion"
              onClick={() => handleClickEditCompositeQuestion(item, index + 1, 'composite')}
            >
              <UilPen style={{ width: 20 }} color={themeColor['dark-gray']} />
            </Link>
          </Tooltip>
        </div>
      ),
      action2: (
        <div className="table-actions">
          <Tooltip title="Delete">
            <span onClick={() => openModalConfirm(index, 'composition')} className="delete-disabled">
              <UilTrashAlt style={{ width: 24, cursor: 'pointer' }} color={themeColor['danger-color']} />
            </span>
          </Tooltip>
        </div>
      ),
    });
  });

  const totalRows = tableDataScource.length;

  const handleExit = () => {
    localStorage.removeItem('invalidCompositeQuestionArr');
    localStorage.removeItem('invalidSingleQuestionArr');
    navigate('/admin/question');
  };

  const handleDelete = () => {
    if (state.indexPick === -1) return;
    var invalidSingleQuestionArrGet = JSON.parse(localStorage.getItem('invalidSingleQuestionArr') + '');
    if (invalidSingleQuestionArrGet === null) invalidSingleQuestionArrGet = [];
    var invalidCompositeQuestionArrGet = JSON.parse(localStorage.getItem('invalidCompositeQuestionArr') + '');
    if (invalidCompositeQuestionArrGet === null) invalidCompositeQuestionArrGet = [];

    if (state.itemMode === 'single') {
      invalidSingleQuestionArrGet.splice(state.indexPick, 1);
    } else {
      invalidCompositeQuestionArrGet.splice(state.indexPick, 1);
    }

    localStorage.setItem('invalidSingleQuestionArr', JSON.stringify(invalidSingleQuestionArrGet));
    localStorage.setItem('invalidCompositeQuestionArr', JSON.stringify(invalidCompositeQuestionArrGet));

    setDataSingleQuestion(invalidSingleQuestionArrGet);
    setDataCompositeQuestion(invalidCompositeQuestionArrGet);
  };

  const handleNavigateHome = () => {
    navigate('/admin/question');
  };

  const onChangePage = (page: number) => {
    setState({ ...state, page });
  };

  return (
    <>
      <Main>
        <Suspense
          fallback={
            <Cards headless>
              <Skeleton active />
            </Cards>
          }
        >
          <div style={{ textAlign: 'end' }}>
            <Button
              style={{
                marginLeft: 20,
                marginRight: 20,
                backgroundColor: '#FFF',
                border: '1px solid #DE3B40',
                color: '#DE3B40',
                width: 120,
                marginBottom: 20,
              }}
              onClick={() => setState({ ...state, isOpenConfirmExit: true })}
            >
              Exit
            </Button>
          </div>
          <div className="ninjadasj-datatable">
            <TableWrapper className="table-data-view table-responsive">
              <Table
                bordered
                className="table-responsive"
                dataSource={tableDataScource.slice((state.page - 1) * 10, state.page * 10)}
                columns={dataTableColumn}
                pagination={
                  tableDataScource.length > 0 && {
                    pageSize: 10,
                    onChange: onChangePage,
                    total: totalRows || 1,
                    current: state.page,
                  }
                }
                // loading={loading}
                locale={{
                  emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={''} />,
                }}
              />
            </TableWrapper>
          </div>
          <Modal
            width={650}
            closable={false}
            centered
            open={state.isOpenConfirmExit}
            onCancel={() => setState({ ...state, isOpenConfirmExit: false })}
            footer={null}
            maskClosable={false}
          >
            <div style={{ justifyItems: 'center', display: 'grid', marginBottom: 20 }}>
              <div style={{ fontSize: 28, fontWeight: 600, color: '#000', marginTop: 20 }}>
                Are you sure you want to exit?
              </div>
              <div style={{ fontSize: 20, fontWeight: 600, color: '#000', marginTop: 4 }}>
                These questions will not be saved
              </div>
              <div style={{ display: 'flex' }}>
                <Button
                  style={{
                    marginTop: 20,
                    width: 160,
                    marginRight: 20,
                    backgroundColor: '#FFF',
                    color: themeColor['primary-color'],
                    border: `1px solid ${themeColor['primary-color']}`,
                  }}
                  type="primary"
                  key="submit"
                  onClick={() => setState({ ...state, isOpenConfirmExit: false })}
                >
                  No
                </Button>
                <Button style={{ marginTop: 20, width: 160 }} type="primary" key="submit" onClick={handleExit}>
                  Yes
                </Button>
              </div>
            </div>
          </Modal>

          <Modal
            width={650}
            closable={false}
            centered
            open={state.isOpenConfirmDelete}
            onCancel={() => setState({ ...state, isOpenConfirmDelete: false })}
            footer={null}
            maskClosable={false}
          >
            <div style={{ justifyItems: 'center', display: 'grid', marginBottom: 20 }}>
              <div style={{ fontSize: 28, fontWeight: 600, color: '#000', marginTop: 20, textAlign: 'center' }}>
                Are you sure you want to delete this question?
              </div>
              <div style={{ display: 'flex' }}>
                <Button
                  style={{
                    marginTop: 20,
                    width: 160,
                    marginRight: 20,
                    backgroundColor: '#FFF',
                    color: themeColor['primary-color'],
                    border: `1px solid ${themeColor['primary-color']}`,
                  }}
                  type="primary"
                  key="submit"
                  onClick={() => setState({ ...state, isOpenConfirmDelete: false })}
                >
                  No
                </Button>
                <Button style={{ marginTop: 20, width: 160 }} type="primary" key="submit" onClick={handleDelete}>
                  Yes
                </Button>
              </div>
            </div>
          </Modal>

          <Modal
            width={650}
            closable={false}
            centered
            open={state.isOpenErrorQuestionEmpty}
            onCancel={() => setState({ ...state, isOpenErrorQuestionEmpty: false })}
            footer={null}
            maskClosable={false}
          >
            <div style={{ justifyItems: 'center', display: 'grid', marginBottom: 20 }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 128 128" fill="none">
                <g clip-path="url(#clip0_1070_32650)">
                  <path
                    d="M64 128C47.0261 128 30.7475 121.257 18.7452 109.255C6.74284 97.2525 0 80.9739 0 64C0 47.0261 6.74284 30.7475 18.7452 18.7452C30.7475 6.74284 47.0261 0 64 0C80.9739 0 97.2525 6.74284 109.255 18.7452C121.257 30.7475 128 47.0261 128 64C128 80.9739 121.257 97.2525 109.255 109.255C97.2525 121.257 80.9739 128 64 128ZM51.2 96L108.8 41.6L99.2 32L51.2 76.8L28.8 54.4L19.2 64L51.2 96Z"
                    fill="#2DA354"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1070_32650">
                    <rect width="128" height="128" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <div style={{ fontSize: 28, fontWeight: 600, color: '#000', marginTop: 20 }}>
                The error question list is empty
              </div>
              <div style={{ fontSize: 20, fontWeight: 600, color: '#000', marginTop: 4 }}>
                Error questions have been resolved
              </div>
              <div style={{ display: 'flex' }}>
                <Button style={{ marginTop: 20, width: 160 }} type="primary" key="submit" onClick={handleNavigateHome}>
                  Ok
                </Button>
              </div>
            </div>
          </Modal>
        </Suspense>
      </Main>
    </>
  );
};

export default ErrorQuestion;
