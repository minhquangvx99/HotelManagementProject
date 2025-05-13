/* eslint-disable react-hooks/exhaustive-deps */
import { Route } from '@ant-design/pro-layout/es/typing';
import UilPlus from '@iconscout/react-unicons/dist/icons/uil-plus';
import UilTrashAlt from '@iconscout/react-unicons/dist/icons/uil-trash-alt';
import UilPen from '@iconscout/react-unicons/dist/icons/uil-pen';
import { Checkbox, Dropdown, Empty, Form, MenuProps, Modal, Skeleton, Switch, Table, Tooltip } from 'antd';
import { Button } from 'components/buttons/Buttons';
import { Cards } from 'components/cards/frame/CardsFrame';
import { DataTableStyleWrap } from 'components/table/Style';
import { Main, TableWrapper } from 'container/Style';
import { ChangeEvent, FC, ReactNode, Suspense, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/RootReducer';
import { Link, useNavigate } from 'react-router-dom';
import { themeColor } from 'config/theme/ThemeVariables';
import { AnswerModel, QuestionModel, QuestionApiModel } from 'store/question/Types';
import {
  deleteQuestion,
  fetchListQuestion,
  filterQuestion,
  passDetailsQuestion,
  SetCompositeQuestionAdd,
  SetQuestionAdd,
} from 'store/question/Actions';
import { Heading } from 'components/heading/Heading';
import { CaretDownOutlined, UploadOutlined } from '@ant-design/icons';
import { QuestionsInTopicSetByExamtypeIDModel } from 'store/topic-set/Types';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
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
  IsCheck?: boolean;
  ObligatoryShow?: ReactNode;
  IsCheckShow?: ReactNode;
}
interface IQuestionTableData1 {
  IsCheck?: boolean;
  Code?: string;
  Task?: string;
  Demo?: string;
  Obligatory?: boolean;
  CodeShow?: ReactNode;
  IsCheckShow?: ReactNode;
  ObligatoryShow?: ReactNode;
}
interface IQuestion {
  type?: string;
  hanldePageChange: (page: number) => void;
  parentState: any;
  setParentState: (value: any) => void;
  numberofquestion: any;
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

  const tableDataScourceSingle: IQuestionTableData[] = [];

  const navigate = useNavigate();

  const questionList = useSelector((states: RootState) => states.question.data);
  const questionForEdit = useSelector((states: RootState) => states.question.questionForEdit);
  const loading = useSelector((states: RootState) => states.question.loading);
  const [form] = Form.useForm();
  const typeOfTopicSetInput = Form.useWatch('TypeOfTopicSet', form);
  const listAllTypeOfTopicSet = useSelector((states: RootState) => states.typeOfTopicSet.dataAll);
  const dispatch = useDispatch<any>();
  const [state, setState] = useState({
    searchKey: '',
    keyChange: '',
    // chỉ dùng khi fake data, khi nào ghép API thì k sử dụng nữa, sử dụng redux (categoryList)
    modalConfirmVisible: false,
    typeConfirm: 1,
    questionSelectToDelete: {} as QuestionModel,
    page: 1,
    checkDeleteIds: [] as number[],
    switchState: {} as { [key: number]: boolean },
    checkAll: false,
  });

  const getQuestionLength = () => {
    return (
      props.parentState.questionCheckedFake?.length +
      props.parentState.questionCompositeCheckedFake?.reduce(
        (accumulator: any, currentValue: any) => accumulator + currentValue?.questions?.length,
        0,
      )
    );
  };

  useEffect(() => {
    setState({
      ...state,
      page: 1,
    });
  }, [props.type]);

  const getListQuestion = () => {
    // let keyWord = state.searchKey.trim();
    // setState({ ...state, searchKey: keyWord });
    // dispatch(fetchListQuestion(keyWord, state.page, 10));

    const values = {} as QuestionApiModel;
    values.status = 1;
    values.type = '1';
    values.page = state.page;
    try {
      dispatch(filterQuestion(values));
    } catch (error) {}
  };

  const onChangePage = (page: number) => {
    setState({ ...state, page });

    props.hanldePageChange(page);
  };

  // filter list theo keyword - đang fake data, sau khi có API => call API getListCate()
  const filter = () => {
    if (state.page === 1) {
      getListQuestion();
    } else {
      setState((state) => ({ ...state, page: 1 }));
    }
  };

  const questionCheckedFakeIds = useMemo(() => {
    return props.parentState.questionCheckedFake?.map((it: any) => it.ID);
  }, [props.parentState.questionCheckedFake]);

  const listCanAdd = useMemo(() => {
    return questionList?.filter((item: any) => {
      return !questionCheckedFakeIds?.includes(item?.ID);
    });
  }, [questionCheckedFakeIds, questionList]);
  const numberOfQuestionNeed = props.numberofquestion ? props.numberofquestion - getQuestionLength() : 0;
  const dataTableColumnPopUp = [
    {
      title: () => {
        return (
          <Checkbox
            // checked={}
            // disabled={numberOfQuestionNeed <= 0}
            // onChange={(value) => switchAll(value.target.checked)}
            checked={state.checkAll}
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
      title: 'Code',
      dataIndex: 'Code',
      key: 'Code',
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
      width: 150,
    },
    {
      title: () => {
        return (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontWeight: 550 }}>L3's Name</div>
          </div>
        );
      },
      dataIndex: 'TaskCode',
      key: 'TaskCode',
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
    const isContainQuestion = props.parentState.questionCheckedFake?.some((q: any) => q.ID == item.ID);
    if (e.target.checked) {
      if (!isContainQuestion) {
        // setState({
        //   ...state,
        //   questionCheckedFake: [ ...state.questionCheckedFake, item ]
        // })
        props.setParentState({
          ...props.parentState,
          questionCheckedFake: [...props.parentState.questionCheckedFake, item],
          switchState: {
            ...props.parentState.switchState,
            [item.ID ?? 0]: true,
          },
        });
      }
    } else {
      // console.log('else')
      if (isContainQuestion) {
        props.setParentState({
          ...props.parentState,
          questionCheckedFake: props.parentState.questionCheckedFake.filter((q: any) => q.ID !== item.ID),
        });
      }
    }
    // }
  };
  const switchAll = (isChecked: any) => {
    // console.log(props.parentState);
    const newSwitchState = Object.keys(state.switchState).reduce(
      (acc, key) => {
        acc[parseInt(key)] = isChecked;
        return acc;
      },
      {} as { [key: number]: boolean },
    );

    props.setParentState({ ...props.parentState, switchState: { ...props.parentState.switchState, newSwitchState } });
  };

  useEffect(() => {
    let numberOfQuestionNeed = props.numberofquestion ? props.numberofquestion - getQuestionLength() : 0;
    const qIds = questionList?.map((q) => q.ID);
    const qCheckIds = props.parentState.questionCheckedFake?.map((q: any) => q.ID);
    const CheckAll = !qIds?.some((qc) => !qCheckIds?.includes(qc)) || numberOfQuestionNeed <= 0;
    const hasQuestionChecked = Boolean(qIds?.some((qc) => qCheckIds?.includes(qc)));

    const isChecked = !hasQuestionChecked ? hasQuestionChecked : CheckAll;

    setState({
      ...state,
      checkAll: isChecked,
    });
  }, [props.parentState.questionCheckedFake, questionList]);

  const handleClickCheckBoxAll = () => {
    let numberOfQuestionNeed = props.numberofquestion ? props.numberofquestion - getQuestionLength() : 0;

    if (state.checkAll) {
      const quesIdsRemove = questionList?.map((q) => q.ID);
      props.setParentState({
        ...props.parentState,
        questionCheckedFake: props.parentState.questionCheckedFake?.filter(
          (qcf: any) => !quesIdsRemove?.includes(qcf?.ID),
        ),
        switchState: {
          ...props.parentState.switchState,
        },
      });
    } else {
      const switchStateUpdates = listCanAdd?.reduce((acc: any, question) => {
        if (numberOfQuestionNeed <= 0) {
          return acc;
        }
        numberOfQuestionNeed--;
        acc[question.ID ?? 0] = true;
        return acc;
      }, {});
      const listWillAdd = listCanAdd?.filter((q) => switchStateUpdates[q.ID]);
      props.setParentState({
        ...props.parentState,
        questionCheckedFake: [...props.parentState.questionCheckedFake, ...(listWillAdd || [])],
        switchState: {
          ...props.parentState.switchState,
          ...switchStateUpdates,
        },
      });
    }
  };
  const tableDataScource: IQuestionTableData[] = [];
  const extractQuestionContent = (htmlString: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    var textContent = doc.body.textContent;
    return textContent?.trim();
  };
  // ID?: number;
  // QuestionID?: number;
  // Question: string;
  // ExamTypeID?: number;
  // TaskID?: number;
  // Task?: string;
  // Demo?: string;
  // Obligatory?: boolean;
  // IsSingle?: boolean;
  // TaskCode?: string;
  // KACode?: string;
  questionList?.map((item) => {
    const isDeleteCheck = state.checkDeleteIds.includes(item?.ID ?? 0);
    const {
      ID,
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
      ObligatoryShow,
    } = item;
    const isContainQuestionFake = props.parentState.questionCheckedFake?.some((q: any) => q.ID == item.ID);
    var codeShow = ExamTypeID?.toString().padStart(3, '0') + '-Q' + ID.toString().padStart(4, '0');
    let canSavePopUp = props.parentState.questionCheckedFake?.length == props.numberofquestion;

    const checkDisableCheckBox = getQuestionLength() >= (props.numberofquestion ?? 0);

    return tableDataScource.push({
      ID,
      Code: codeShow,
      TaskID,
      IsCheck: false,
      IsCheckShow: (
        <Checkbox
          checked={isContainQuestionFake}
          disabled={!isContainQuestionFake && checkDisableCheckBox}
          onChange={(e) => handleClickCheckBox(item, e, 2)}
          className="custom-checkbox"
        ></Checkbox>
      ),

      Status,
      Score,
      Question: extractQuestionContent(Question || ''),
      BaCode,
      ExamTypeCode,
      KACode,

      TaskCode,
      ExamTypeID,
      answers,
      KAID,
      TopicSetID,
      totalRow,
    });
  });

  const totalRows = questionList && questionList.length > 0 ? questionList[0]?.totalRow ?? 0 : 0;

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
                columns={dataTableColumnPopUp}
                pagination={
                  tableDataScource.length > 0 && {
                    pageSize: 10,
                    onChange: onChangePage,
                    total: totalRows || 1,
                    current: state.page,
                    showSizeChanger: false,
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

export default Question;
