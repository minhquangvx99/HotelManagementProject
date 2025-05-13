/* eslint-disable react-hooks/exhaustive-deps */
import UilTrashAlt from '@iconscout/react-unicons/dist/icons/uil-trash-alt';
import UilPen from '@iconscout/react-unicons/dist/icons/uil-pen';
import { Checkbox, Dropdown, Empty, MenuProps, Modal, Table, Tooltip } from 'antd';
import { Button } from 'components/buttons/Buttons';
import { Cards } from 'components/cards/frame/CardsFrame';
import { DataTableStyleWrap } from 'components/table/Style';
import { TableWrapper } from 'container/Style';
import { FC, ReactNode, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/RootReducer';
import { Link, useNavigate } from 'react-router-dom';
import { themeColor } from 'config/theme/ThemeVariables';
import { AnswerModel, CompositeQuestionModel, QuestionApiModel } from 'store/question/Types';
import {
  deleteCompositeQuestion,
  filterQuestion,
  passDetailsQuestion,
  SetCompositeQuestionAdd,
  SetQuestionAdd,
} from 'store/question/Actions';
import { Heading } from 'components/heading/Heading';
import { DownOutlined, UploadOutlined, UpOutlined } from '@ant-design/icons';
import { render } from '@testing-library/react';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

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
  IsCheck?: boolean;
  IsCheckShow?: ReactNode;
}

interface IQuestion {
  type?: string;

  hanldePageChange: (page: number) => void;
  parentState: any;
  setParentState: (value: any) => void;
  numberofquestion: any;
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
    page: 1,
    checkAll: false,
  });
  let pageSize = 10;
  let totalRows = (questionList && questionList[0]?.totalRow) || 0;

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

  const getListQuestion = () => {
    const values = {} as QuestionApiModel;
    values.type = '2';
    values.page = state.page;
    values.status = 1;
    try {
      dispatch(filterQuestion(values));
    } catch (error) {}
  };

  const onChangePage = (page: number) => {
    setState({ ...state, page, arrExamResultHistoryIDDownOutlinedChoosen: [] });
    props.hanldePageChange(page);
  };

  useEffect(() => {
    setState({
      ...state,
      page: 1,
    });
  }, [props.type]);

  const filter = () => {
    if (state.page === 1) {
      getListQuestion();
    } else {
      setState((state) => ({ ...state, page: 1 }));
    }
  };

  const compositeQuestionCheckedFakeIds = useMemo(() => {
    return props.parentState.questionCompositeCheckedFake?.map((qc: any) => qc.ID);
  }, [props.parentState.questionCompositeCheckedFake, questionList]);

  const listCanAdd = useMemo(() => {
    return questionList?.filter((item: any) => {
      return !compositeQuestionCheckedFakeIds?.includes(item?.ID);
    });
  }, [compositeQuestionCheckedFakeIds, questionList]);

  const lengthCanAdd = listCanAdd?.reduce(
    (accumulator: any, currentValue: any) => accumulator + currentValue?.questions?.length,
    0,
  );

  const getQuestionLength = () => {
    return (
      props.parentState.questionCheckedFake?.length +
      props.parentState.questionCompositeCheckedFake?.reduce(
        (accumulator: any, currentValue: any) => accumulator + currentValue?.questions?.length,
        0,
      )
    );
  };

  const numberOfQuestionNeed = props.numberofquestion ? props.numberofquestion - getQuestionLength() : 0;

  useEffect(() => {
    const qIds = questionList?.map((q) => q.ID);
    const qCheckIds = props.parentState.questionCompositeCheckedFake?.map((q: any) => q.ID);
    const CheckAll = !qIds?.some((qc) => !qCheckIds?.includes(qc)) || numberOfQuestionNeed <= 0;

    const hasQuestionChecked = Boolean(qIds?.some((qc) => qCheckIds?.includes(qc)));
    const isCheckAll = !hasQuestionChecked ? hasQuestionChecked : CheckAll;
    setState({
      ...state,
      checkAll: isCheckAll,
    });
  }, [props.parentState.questionCompositeCheckedFake, questionList]);

  const handleClickCheckBoxAll = () => {
    let numberOfQuestionNeed = props.numberofquestion ? props.numberofquestion - getQuestionLength() : 0;
    if (state.checkAll) {
      const compoQuesIdsRemove = questionList?.map((q) => q.ID);
      props.setParentState({
        ...props.parentState,
        questionCompositeCheckedFake: props.parentState.questionCompositeCheckedFake?.filter(
          (qccf: any) => !compoQuesIdsRemove?.includes(qccf?.ID),
        ),
        switchStateComposite: {
          ...props.parentState.switchStateComposite,
        },
      });
    } else {
      const switchStateUpdates = listCanAdd?.reduce((acc: any, question) => {
        if (numberOfQuestionNeed <= 0 || numberOfQuestionNeed - question?.questions?.length < 0) {
          return acc;
        }
        numberOfQuestionNeed = numberOfQuestionNeed - question?.questions?.length;
        acc[question.ID ?? 0] = true;

        return acc;
      }, {});
      // const listWillAdd = [] as CompositeQuestionModel[];
      const listWillAdd = listCanAdd?.filter((q) => switchStateUpdates[q.ID as number]);
      props.setParentState({
        ...props.parentState,
        questionCompositeCheckedFake: [...props.parentState.questionCompositeCheckedFake, ...(listWillAdd || [])],
        switchStateComposite: {
          ...props.parentState.switchStateComposite,
          ...switchStateUpdates,
        },
      });
    }
  };

  const dataTableColumn = [
    {
      title: () => {
        return (
          <Checkbox
            checked={state.checkAll}
            // disabled={numberOfQuestionNeed <= 0}
            // onChange={(value) => switchAll(value.target.checked)}
            onChange={handleClickCheckBoxAll}
            className="custom-checkbox"
          ></Checkbox>
        );
      },
      dataIndex: 'IsCheckShow',
      key: 'IsCheckShow',
      align: 'center' as const,
      width: 50,
    },
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
      render: (text: any, record: any) => ({
        children: text,
        props: {
          colSpan: record.ColSpan ? 0 : 1,
        },
      }),
      width: 150,
    },

    {
      title: () => {
        return (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontWeight: 550 }}>L2's Name</div>
          </div>
        );
      },
      dataIndex: 'KACode',
      key: 'KACode',
      width: 200,
    },
    {
      title: () => {
        return (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontWeight: 550 }}>L3's Name</div>
          </div>
        );
      },
      dataIndex: 'TaskName',
      key: 'TaskName',
    },
    {
      title: () => {
        return (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontWeight: 550 }}>Content</div>
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
        return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
      },
    },
  ];

  const handleClickCheckBox = (item: IQuestionTableData, e: CheckboxChangeEvent, type: number) => {
    // if (type == 1) {
    //   const isContainQuestionID = state.checkDeleteIds.includes(item?.ID ?? 0);

    //   if (e.target.checked) {
    //     if (!isContainQuestionID) {
    //       setState({
    //         ...state,
    //         checkDeleteIds: [...state.checkDeleteIds, item?.ID ?? 0],
    //       });
    //     }

    //   } else {
    //     if (isContainQuestionID) {
    //       setState({
    //         ...state,
    //         checkDeleteIds: state.checkDeleteIds.filter((q) => q !== item.ID),
    //       });
    //     }
    //   }
    //  }
    // else {
    const isContainQuestion = props.parentState.questionCompositeCheckedFake?.some((q: any) => q.ID == item.ID);
    if (e.target.checked) {
      if (!isContainQuestion) {
        props.setParentState({
          ...props.parentState,
          questionCompositeCheckedFake: [...props.parentState.questionCompositeCheckedFake, item],
          switchState: {
            ...props.parentState.switchState,
            [item.ID ?? 0]: true,
          },
        });
      }
    } else {
      if (isContainQuestion) {
        props.setParentState({
          ...props.parentState,
          questionCompositeCheckedFake: props.parentState.questionCompositeCheckedFake.filter(
            (q: any) => q.ID !== item.ID,
          ),
        });
      }
    }
    // }
  };

  const extractQuestionContent = (htmlString: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    var textContent = doc.body.textContent;
    return textContent?.trim();
  };

  const tableDataScource: IQuestionTableData[] = [];

  questionList?.map((item) => {
    const {
      BatchCode,
      ExamTypeID,
      ID,
      ExamTypeCode,
      totalRow,
      CQStatus: Status,
      CodeSearch,
      TaskName,
      Question,
      questions,
    } = item;
    var codeShow = CodeSearch;
    var IsAction1Up = state.arrExamResultHistoryIDDownOutlinedChoosen.find((e) => e == ID);
    let isCheck = props.parentState?.questionCompositeCheckedFake?.map((q: any) => q?.ID)?.includes(item.ID);
    const isContainQuestionFake = props.parentState?.questionCompositeCheckedFake?.some((q: any) => q.ID == item.ID);
    const checkDisableCheckBox = getQuestionLength() + questions?.length > (props.numberofquestion ?? 0);

    tableDataScource.push({
      ID: ID,
      Code: codeShow,
      ExamTypeCode,
      BatchCode,
      IsCheck: false,
      IsCheckShow: (
        <Checkbox
          checked={isCheck}
          disabled={!isCheck && checkDisableCheckBox}
          onChange={(e) => handleClickCheckBox(item, e, 2)}
          className="custom-checkbox"
        ></Checkbox>
      ),
      Question: extractQuestionContent(Question || ''),
      ExamTypeID,
      totalRow,
      TaskName,
      action3: (
        <div style={{ display: 'flex', width: '100%' }}>
          <button style={{ border: 'none', backgroundColor: 'white' }}>
            {!IsAction1Up ? (
              <DownOutlined style={{ cursor: 'pointer' }} onClick={() => handleDownOutlinedChoose(ID ?? 0)} />
            ) : (
              <UpOutlined style={{ cursor: 'pointer' }} onClick={() => handleDownOutlinedChoose(ID ?? 0)} />
            )}
          </button>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontWeight: 550 }}>{codeShow}</div>
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
      <Cards>
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
      </Cards>
    </>
  );
};

export default CompositeQuestion;
