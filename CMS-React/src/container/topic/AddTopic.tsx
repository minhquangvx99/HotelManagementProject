import { Route } from '@ant-design/pro-layout/es/typing';
import {
  Card,
  Checkbox,
  Col,
  Form,
  FormInstance,
  Input,
  Modal,
  Row,
  Select,
  Skeleton,
  Switch,
  Table,
  Tooltip,
} from 'antd';
import { Button } from 'components/buttons/Buttons';
import { Cards } from 'components/cards/frame/CardsFrame';
import { Main, TableWrapper } from 'container/Style';
import { StyledAddTopic } from 'container/topic/Style';
import { FC, ReactNode, Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/RootReducer';
import { useNavigate } from 'react-router-dom';
import { Heading } from 'components/heading/Heading';
import { fetchListExamTypeAll } from 'store/exam-type/Actions';
import { fetchListTaskAll } from 'store/task/Actions';
import { DataTableStyleWrap } from 'components/table/Style';
// import './AddTopic.css';
import { fetchListTypeOfTopicSetAll } from 'store/type-of-topic-set/Actions';
import {
  createTopicSet,
  fetchDetailsTopicSet,
  fetchListQuestionInTopicSetByExamTypeID,
  updateTopicSet,
} from 'store/topic-set/Actions';
import { openNotification } from 'utility/Utility';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { QuestionsInTopicSetByExamtypeIDModel } from 'store/topic-set/Types';
import QuestionFilter from 'container/question/QuestionFilter';
import { Tab } from 'components/tabs/Tabs';
import { QuestionApiModel, QuestionModel } from 'store/question/Types';
import { themeColor } from 'config/theme/ThemeVariables';
import { DownOutlined, UploadOutlined, UpOutlined } from '@ant-design/icons';
import CompositeQuestion from './composite-question/CompositeQuestion';
import SingleQuestion from './single-question/SingleQuestion';
import {
  downloadTemplateFillQuestion,
  filterQuestion,
  passDetailsQuestion,
  SetCompositeQuestionAdd,
  SetCompositeQuestionDetail,
  SetQuestionAdd,
} from 'store/question/Actions';
import ExamType from 'container/category/exam-type/ExamType';
import QuestionFilterTopic from './QuestionFilterTopic';
import { fetchListKAAll } from 'store/ka/Actions';
import { fetchListBatchID } from 'store/batch/Action';
import { check } from 'prettier';
const { TextArea } = Input;

interface IQuestionTableData {
  IsCheck?: boolean;
  Code?: string | ReactNode;
  Task?: string;
  KACode?: string;
  Demo?: string;
  Obligatory?: boolean;
  CodeShow?: ReactNode;
  IsCheckShow?: ReactNode;
  ObligatoryShow?: ReactNode;
  totalRow?: number;
  action3?: ReactNode;
}

interface CompositeQuestionModel {
  ID?: number;
  ExamtypeCode: string;
  CompositeQuestionID: number;
  ExamTypeID: number;
  ExamTypeCode: string;
  Question: string;
  CQStatus: number;
  CodeSearch: string;
  TaskName: string;
  totalRow: number;
  Obligatory?: boolean;
  Status: number;
  BatchID: number;
  BatchCode: string;
  questions: QuestionModel[] | [];
}
interface IAddTopic {}

const AddTopic: FC<IAddTopic> = (props) => {
  const PageRoutes: Route[] = [
    {
      path: '',
      breadcrumbName: 'AddQuestion',
    },
    {
      path: '',
      breadcrumbName: 'List',
    },
  ];

  const navigate = useNavigate();
  const switchRef = useRef<any>(null);
  const [form] = Form.useForm();
  const formRef = useRef<FormInstance<any>>(null);
  const statusInput = Form.useWatch('Status', form);
  // const examTypeInput = Form.useWatch('ExamType', form);
  const typeOfTopicSetInput = Form.useWatch('TypeOfTopicSet', form);
  const nameInput = Form.useWatch('Name', form);
  const numberOfQuestionInput = Form.useWatch('NumberOfQuestion', form);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const myInfo = useSelector((states: RootState) => states.auth.myInfo);
  const topicSetForEdit = useSelector((states: RootState) => states.topicSet.topicSetForEdit);

  const listQuestionInTopicSet = useSelector((states: RootState) => states.topicSet.dataQuestionInTopicSetByExamTypeID);
  const loading = useSelector((states: RootState) => states.topicSet.loading);
  const listAllExamType = useSelector((states: RootState) => states.examType.dataAll);
  const questionList = useSelector((states: RootState) => states.question.dataComposite);
  const listAllTypeOfTopicSet = useSelector((states: RootState) => states.typeOfTopicSet.dataAll);
  const listStatusInActive = [
    { value: 1, label: 'Active' },
    { value: 0, label: 'Inactive' },
  ];
  const listStatusActive = [
    { value: 1, label: 'Active' },
    { value: 2, label: 'Blocked' },
  ];
  const [type, setType] = useState('1');
  const KaAll = useSelector((state: RootState) => state.ka.dataAll);
  const examTypeAll = useSelector((states: RootState) => states.examType.dataAll);
  const BatchIdAll = useSelector((state: RootState) => state.batch.data);
  const taskAll = useSelector((states: RootState) => states.task.dataAll);

  const listAllTask = useSelector((states: RootState) => states.task.dataAll);
  const dispatch = useDispatch<any>();
  const [state, setState] = useState({
    topicSetID: 0,
    // selectedStatus: 1,
    selectedExamtypeID: 0,
    modalConfirmEditVisible: false,
    typeConfirm: 1,
    checkl1: true,
    isDisableStatus: true,
    questionChecked: [] as QuestionsInTopicSetByExamtypeIDModel[],
    questionCompositeChecked: [] as CompositeQuestionModel[],
    questionCompositeCheckedFake: [] as CompositeQuestionModel[],
    questionCheckedFake: [] as QuestionsInTopicSetByExamtypeIDModel[],
    switchState: {} as { [key: number]: boolean },
    switchStateComposite: {} as { [key: number]: boolean },
    checkDeleteIds: [] as number[],
    // numberOfQuestion: 0,
    // typeOfTopicSetID: 0,
    valueExamTypeChange: '',
    ExamTypeFilter: '',
    taskFilterID: 0,
    filter: {} as QuestionApiModel,
    page: 1,
    checkstatus: true,
    arrExamResultHistoryIDDownOutlinedChoosen: [] as Number[],
    checkTypeOfExam: '',
    allChecked: true,
  });
  const changeFilterForm = (values: QuestionApiModel) => {
    setState({ ...state, filter: values });
  };
  let numberOfQuestion = listAllTypeOfTopicSet?.find((tots) => tots.ID == typeOfTopicSetInput)?.NumberOfQuestion;

  const [stateValid, setStateValid] = useState({
    examType: true,
    typeOfTopicSet: true,
    name: true,
  });
  useEffect(() => {
    //Reset
    dispatch(SetQuestionAdd(null));
    dispatch(passDetailsQuestion(null));
    dispatch(SetCompositeQuestionAdd(null));
    dispatch(SetCompositeQuestionDetail());

    getListQuestion();
  }, [type, state.page]);

  const getListQuestion = () => {
    // let keyWord = state.searchKey.trim();
    // setState({ ...state, searchKey: keyWord });
    // dispatch(fetchListQuestion(keyWord, state.page, 10));

    const values = {} as QuestionApiModel;
    values.id = state.filter.id;
    values.content = state.filter.content;
    values.code = state.filter.code;
    values.l1 = state.selectedExamtypeID;

    values.l2 = state.filter.l2;
    values.l3 = state.filter.l3;
    values.type = type;
    values.page = state.page;
    values.status = 1;

    try {
      dispatch(filterQuestion(values));
    } catch (error) {}
  };
  var listTaskFilter = listAllTask
    ?.filter((t) => t.examType?.ID == state.selectedExamtypeID)
    ?.map((t) => {
      return { value: t.ID, label: `[${t.Name}]-[${t.ka?.Name}]` };
    });
  let isDisableStatusCheck = (topicSetForEdit && topicSetForEdit.Status != 0) ?? false;
  useEffect(() => {
    if (!topicSetForEdit?.Name) {
      dispatch(fetchDetailsTopicSet(topicSetForEdit?.TopicSetID ?? 0));
    }
  }, []);
  useEffect(() => {
    formRef.current?.setFieldsValue({
      Status: 0,
    });
    getListAllTask();
    getListAllExamType();
    getListAllKA();
    getListAllBatchID();
    getListAllTypeOfTopicSet();
    // getListQuestionInTopicSet(state.selectedExamtypeID);
    getListQuestion();
  }, [topicSetForEdit?.TopicSetID]);

  useEffect(() => {
    getListQuestion();
  }, [state.selectedExamtypeID]);

  const convertListToSwitchStateObjectComposite = (list: QuestionsInTopicSetByExamtypeIDModel[]) => {
    return list?.reduce(
      (acc, item) => {
        if (item.ID !== undefined && item.Obligation !== undefined) {
          acc[item.ID] = item.Obligation;
        }
        return acc;
      },
      {} as { [key: number]: boolean },
    );
  };
  const convertListToSwitchStateObject = (list: QuestionsInTopicSetByExamtypeIDModel[]) => {
    return list?.reduce(
      (acc, item) => {
        if (item.QuestionID !== undefined && item.Obligatory !== undefined) {
          acc[item.QuestionID] = item.Obligatory;
        }
        return acc;
      },
      {} as { [key: number]: boolean },
    );
  };

  let pageSize = 10;
  let totalRows = (questionList && questionList[0]?.totalRow) || 0;

  useEffect(() => {
    if (topicSetForEdit) {
      var switchState = convertListToSwitchStateObject(
        topicSetForEdit?.QuestionsInTopicSet as QuestionsInTopicSetByExamtypeIDModel[],
      );

      var switchStateComposite = convertListToSwitchStateObjectComposite(
        topicSetForEdit?.QuestionsCompositeInTopicSet as QuestionsInTopicSetByExamtypeIDModel[],
      );
      formRef.current?.setFieldsValue({
        Status: topicSetForEdit?.Status ?? 0,
        TypeOfTopicSet: topicSetForEdit?.TypeOfTopicSetID,
        NumberOfQuestion: topicSetForEdit?.NumberOfQuestion,
        Name: topicSetForEdit?.Name,
      });

      setState({
        ...state,
        topicSetID: topicSetForEdit?.TopicSetID ?? 0,
        selectedExamtypeID: topicSetForEdit?.ExamTypeID ?? 0,
        questionChecked: topicSetForEdit?.QuestionsInTopicSet?.map((q) => {
          return {
            QuestionID: q?.QuestionID,
            KACode: q?.KACode,
            TaskCode: q?.Task,
            Question: q?.QuestionContent,
            ID: q?.QuestionID,
            Obligatory: q?.Obligatory,
            ExamTypeID: q?.ExamTypeID,
          };
        }) as QuestionsInTopicSetByExamtypeIDModel[],
        questionCompositeChecked:
          topicSetForEdit?.QuestionsCompositeInTopicSet?.map((q) => {
            return {
              ...q,
              CodeSearch: q.ExamTypeID?.toString().padStart(3, '0') + '-CQ' + q.ID?.toString().padStart(4, '0'),
            };
          }) ?? [],
        switchState: switchState,
        switchStateComposite: switchStateComposite,
      });
      // getListQuestionInTopicSet(topicSetForEdit?.ExamTypeID ?? 0);
    }
  }, [topicSetForEdit]);

  const getListAllTask = () => {
    // call API lấy list exam for select

    dispatch(fetchListTaskAll());
  };

  const getListAllExamType = () => {
    // call API lấy list exam for select
    dispatch(fetchListExamTypeAll());
  };
  const getListAllKA = () => {
    // call API lấy list exam for select
    dispatch(fetchListKAAll());
  };
  const getListAllBatchID = () => {
    // call API lấy list exam for select
    dispatch(fetchListBatchID());
  };
  const getListAllTypeOfTopicSet = () => {
    // call API lấy list exam for select
    dispatch(fetchListTypeOfTopicSetAll());
  };

  const getListQuestionInTopicSet = (value: number) => {
    // call API lấy list exam for select
    dispatch(fetchListQuestionInTopicSetByExamTypeID(value));
  };

  const handleSavePopUp = () => {
    setState({
      ...state,
      questionChecked: state.questionCheckedFake,
      questionCheckedFake: [],
      questionCompositeChecked: state.questionCompositeCheckedFake,
      questionCompositeCheckedFake: [],
      modalConfirmEditVisible: false,
    });
    // if (state.questionCheckedFake?.length == numberOfQuestion) {
    //   setStateValid({
    //     ...stateValid,
    //     table: true,
    //   });
    // }
  };
  const openModalConfirm = (type: number) => {
    setState({ ...state, modalConfirmEditVisible: true, typeConfirm: type });
  };

  const closeModalExitConfirm = () => {
    setState({ ...state, modalConfirmEditVisible: false, taskFilterID: 0 });
  };

  const handleExamTypeChange = (value: string) => {
    setState({
      ...state,
      selectedExamtypeID: parseInt(value),
      questionChecked: [],
      questionCheckedFake: [],
      questionCompositeChecked: [],
      questionCompositeCheckedFake: [],
      switchState: {},
      switchStateComposite: {},
      checkDeleteIds: [],
      modalConfirmEditVisible: false,
      taskFilterID: 0,
      checkTypeOfExam: '',
    });
    // form.setFieldValue('TypeOfTopicSet', value);
    setStateValid({
      ...stateValid,
      examType: true,
    });
    // getListQuestionInTopicSet(parseInt(value));
  };

  const getListSelectExamType = () => {
    let listExamType = [] as { value?: number; label: string; name: string }[];
    listAllExamType?.map((e) => {
      listExamType.push({ value: e.ID, label: `[${e?.ExamType}]-[${e?.Name}]`, name: e.Name ?? '' });
    });

    return listExamType;
  };

  const getListSelectTypeOfTopicSet = () => {
    let listTypeOfTopicSet = [] as { value?: number; label: string; name: string }[];
    listAllTypeOfTopicSet?.map((e) => {
      listTypeOfTopicSet.push({ value: e.ID, label: `${e?.Name}`, name: e.Name ?? '' });
    });
    return listTypeOfTopicSet;
  };

  const onlyNumberKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    ['e', 'E', 'g', 'G', '+', '-', '.', ','].includes(e.key) && e.preventDefault();
  };

  const handleChooseQuestion = () => {
    setState({
      ...state,
      modalConfirmEditVisible: true,
      typeConfirm: 2,
      questionCheckedFake: state.questionChecked,
      questionCompositeCheckedFake: state.questionCompositeChecked,
    });
  };

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
  const handleClickCheckBox = (item: QuestionsInTopicSetByExamtypeIDModel, e: CheckboxChangeEvent, type: number) => {
    if (type == 1) {
      const isContainQuestionID = state.checkDeleteIds.includes(item?.QuestionID ?? 0);
      if (e.target.checked) {
        if (!isContainQuestionID) {
          setState({
            ...state,
            checkDeleteIds: [...state.checkDeleteIds, item?.QuestionID ?? 0],
          });
        }
      } else {
        if (isContainQuestionID) {
          setState({
            ...state,
            checkDeleteIds: state.checkDeleteIds.filter((q) => q !== item.QuestionID),
          });
        }
      }
    } else {
      const isContainQuestion = state.questionCheckedFake?.some((q) => q.QuestionID == item.QuestionID);
      if (e.target.checked) {
        if (!isContainQuestion) {
          setState({
            ...state,
            questionCheckedFake: [...state.questionCheckedFake, item],
          });
        }
      } else {
        if (isContainQuestion) {
          setState({
            ...state,
            questionCheckedFake: state.questionCheckedFake.filter((q) => q.QuestionID !== item.QuestionID),
          });
        }
      }
    }
    setState({ ...state, allChecked: checkSwitchChecked() });
  };

  const extractQuestionContent = (htmlString: string) => {
    // Create a new DOMParser
    const parser = new DOMParser();

    // Parse the HTML string into a Document
    const doc = parser.parseFromString(htmlString, 'text/html');

    // Extract the text content
    var textContent = doc.body.textContent;

    if (textContent != null && textContent?.length > 200) {
      textContent = textContent?.substring(0, 200) + '...';
    }

    return textContent?.trim();
  };

  const handleSwapQuestionCheck = (value: number, ID: number) => {
    const itemAdd = listQuestionInTopicSet?.find(
      (item) => item.QuestionID === value,
    ) as QuestionsInTopicSetByExamtypeIDModel;

    // Find the index of the question to be deleted
    const index = state.questionChecked.findIndex((q) => q.QuestionID === ID);

    // Create a new array with the question replaced at the same position
    const newQuestionChecked = [
      ...state.questionChecked.slice(0, index), // Items before the one to replace
      itemAdd, // The new item to add
      ...state.questionChecked.slice(index + 1), // Items after the one to replace
    ];

    // Update the state with the new array
    setState({
      ...state,
      questionChecked: newQuestionChecked,
    });
  };
  const handleDelete = () => {
    setState({
      ...state,
      questionChecked: [],
      questionCompositeChecked: [],
      modalConfirmEditVisible: false,
    });
    openNotification('success', 'Success', 'Deleted successfully');
  };

  const QuestionSortAll = () => {
    let allQuestion = [
      ...state.questionChecked?.map((q) => {
        return {
          ...q,
          IsSingle: true,
        };
      }),
      ...state.questionCompositeChecked?.map((q) => {
        return {
          ...q,
          IsSingle: false,
        };
      }),
    ];
    allQuestion.sort((a: any, b: any) => {
      var codeShowSingle =
        a?.ExamTypeID?.toString().padStart(2, '0') + '-Q' + a?.QuestionID?.toString().padStart(4, '0');
      var codeShowComposite = b?.ExamTypeID?.toString().padStart(2, '0') + '-Q' + b?.ID?.toString().padStart(4, '0');
      return codeShowSingle.localeCompare(codeShowComposite, undefined, { sensitivity: 'base' });
    });
    return allQuestion;
  };

  const tableDataScource: IQuestionTableData[] = [];

  QuestionSortAll()?.forEach((item) => {
    if (item.IsSingle) {
      const { ID, Question, QuestionID, ExamTypeID, Task, TaskCode, KACode, Demo, IsSingle, Obligatory } =
        item as QuestionsInTopicSetByExamtypeIDModel;
      const isSwitchChecked = state.switchState[item?.ID ?? 0] === null ? Obligatory : state.switchState[item?.ID ?? 0];

      const isDeleteCheck = state.checkDeleteIds.includes(QuestionID ?? 0);
      var codeShow = ExamTypeID?.toString().padStart(2, '0') + '-Q' + ID?.toString().padStart(4, '0');

      var listQuestionFilterQuestionChoose = listQuestionInTopicSet?.filter(
        (q) => !state?.questionChecked?.some((qc) => qc.QuestionID == q.QuestionID),
      );
      listQuestionFilterQuestionChoose?.push(item);
      var listQuestionCode = listQuestionFilterQuestionChoose?.map((q) => {
        return { value: q.QuestionID, label: ExamTypeID + '-Q' + q.QuestionID?.toString().padStart(4, '0') };
      });
      return tableDataScource.push({
        IsCheck: false,
        Code: codeShow,
        Task: TaskCode,
        KACode: KACode,
        Demo: extractQuestionContent(Question ?? ''),
        Obligatory: true,
        CodeShow: codeShow,
        IsCheckShow: (
          <Checkbox
            disabled={isDisableStatusCheck}
            checked={isDeleteCheck}
            onChange={(e) => handleClickCheckBox(item, e, 1)}
            className="custom-checkbox"
          ></Checkbox>
        ),
        ObligatoryShow: (
          <Switch
            className="custom-switch"
            checked={isSwitchChecked}
            onChange={(checked) => handleSwitchChange(item?.ID ?? 1, checked)}
            disabled={isDisableStatusCheck}
          />
        ),
      });
    } else {
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
        Obligatory,
      } = item as CompositeQuestionModel;
      var codeShow = CodeSearch;
      var IsAction1Up = state.arrExamResultHistoryIDDownOutlinedChoosen.find((e) => e == ID);
      const isSwitchChecked = state.switchStateComposite[ID ?? 0] || false;
      tableDataScource.push({
        Code: (
          <div style={{ display: 'flex', width: '100%' }}>
            <button style={{ border: 'none', backgroundColor: 'white' }}>
              {!IsAction1Up ? (
                <DownOutlined style={{ cursor: 'pointer' }} onClick={() => handleDownOutlinedChoose(ID ?? 0)} />
              ) : (
                <UpOutlined style={{ cursor: 'pointer' }} onClick={() => handleDownOutlinedChoose(ID ?? 0)} />
              )}
            </button>
            <div style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>{codeShow}</div>
          </div>
        ),
        IsCheck: false,
        Demo: extractQuestionContent(Question || ''),
        ObligatoryShow: (
          <Switch
            className="custom-switch"
            checked={isSwitchChecked}
            onChange={(checked) => handleSwitchChangeComposite(ID ?? 0, checked)}
            disabled={isDisableStatusCheck}
          />
        ),
        totalRow,
        Task: TaskName,
        action3: null,
      });

      if (IsAction1Up && questions) {
        questions.forEach((r) => {
          pageSize++;
          if (questionList) totalRows = totalRows + Math.ceil(questionList[0]?.totalRow / 10);
          tableDataScource.push({
            KACode: r.KAName,
            Task: r?.TaskName,
            Demo: extractQuestionContent(r.Question || ''),
          });
        });
      }
    }
  });

  const dataTableColumn = [
    {
      title: () => {
        return (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontWeight: 550 }}>Code of Question</div>
          </div>
        );
      },
      dataIndex: 'Code',
      key: 'Code',
      align: 'center' as const,
      render: (text: any, record: any) => ({
        children: text,
        props: {
          colSpan: record.ColSpan ? 0 : 1,
        },
      }),
      width: 200,
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
      dataIndex: 'Task',
      key: 'Task',
    },
    {
      title: () => {
        return (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontWeight: 550 }}>Content</div>
          </div>
        );
      },
      dataIndex: 'Demo',
      key: 'Demo',
    },
    {
      title: () => {
        return (
          <Row justify={'center'} align={'middle'} style={{ gap: '16px' }}>
            <div style={{ fontWeight: 550 }}>Mandatory</div>
            <Switch
              ref={switchRef}
              // defaultChecked={checkSwitchChecked}
              // checked={checkSwitchChecked()}
              checked={state.allChecked}
              className="custom-switch"
              onClick={(value) => switchAll(value)}
            />
          </Row>
        );
      },
      dataIndex: 'ObligatoryShow',
      key: 'ObligatoryShow',
      align: 'center' as const,
      width: 200,
    },
  ];

  const handleSwitchChange = (ID: number, checked: boolean) => {
    const objCheck = { ...state.switchState, [ID]: checked };
    const isObligatoryAll = !Object.values(objCheck).some((value) => value === false);

    setState((prevState) => ({
      ...prevState,
      switchState: {
        ...prevState.switchState,
        [ID]: checked,
      },
      allChecked: isObligatoryAll,
    }));
  };

  const validateNumberOfQuestion = (_: any, value: string) => {
    console.log('getQuestionLength(3): ', getQuestionLength(3));
    console.log('form.getFieldError: ', form.getFieldError('NumberOfQuestion'));

    if ((getQuestionLength(3) ?? 0) > 0) {
      return Promise.resolve();
    }
    return Promise.reject(new Error(''));
  };

  const handleSwitchChangeComposite = (ID: number, checked: boolean) => {
    setState((prevState) => ({
      ...prevState,
      switchStateComposite: {
        ...prevState.switchStateComposite,
        [ID]: checked,
      },
    }));
  };

  const canSavePage = () => {
    if (
      state.selectedExamtypeID == 0 ||
      typeOfTopicSetInput == undefined ||
      nameInput == undefined
      //getQuestionLength(2) != numberOfQuestion
    )
      return false;
    if (!checkNumberOfQuestion()) {
      const questionLength = getQuestionLength(3) ?? 0;
      const questionCount =
        listAllTypeOfTopicSet?.find((tots) => tots.ID == typeOfTopicSetInput)?.NumberOfQuestion ?? 0;
      if(questionLength > questionCount)
        return false;
    }
    return true;
  };


  let canSavePopUp = state.questionCheckedFake?.length == numberOfQuestion;
  const tableDataScourceFull: IQuestionTableData[] = [];

  state.taskFilterID == 0
    ? listQuestionInTopicSet?.map((item) => {
        const { QuestionID, ExamTypeID, Task, TaskID, Demo } = item;
        const isContainQuestion = state.questionChecked?.some((q) => q.QuestionID == item.QuestionID);
        const isContainQuestionFake = state.questionCheckedFake?.some((q) => q.QuestionID == item.QuestionID);
        return tableDataScourceFull.push({
          IsCheck: isContainQuestion,
          CodeShow: ExamTypeID + '-Q' + QuestionID?.toString().padStart(4, '0'),
          Task,
          Demo: extractQuestionContent(Demo ?? ''),
          Obligatory: false,
          IsCheckShow: (
            <Checkbox
              checked={isContainQuestionFake}
              disabled={!isContainQuestionFake && canSavePopUp}
              onChange={(e) => handleClickCheckBox(item, e, 2)}
              className="custom-checkbox"
            />
          ),
          ObligatoryShow: <Switch className="custom-switch" />,
        });
      })
    : listQuestionInTopicSet
        ?.filter((q) => q.TaskID == state.taskFilterID)
        ?.map((item) => {
          const { QuestionID, ExamTypeID, Task, TaskID, Demo } = item;
          const isContainQuestion = state.questionChecked?.some((q) => q.QuestionID == item.QuestionID);
          const isContainQuestionFake = state.questionCheckedFake?.some((q) => q.QuestionID == item.QuestionID);
          return tableDataScourceFull.push({
            IsCheck: isContainQuestion,
            CodeShow: ExamTypeID + '-Q' + QuestionID?.toString().padStart(4, '0'),
            Task,
            Demo: extractQuestionContent(Demo ?? ''),
            Obligatory: false,
            IsCheckShow: (
              <Checkbox
                checked={isContainQuestionFake}
                disabled={!isContainQuestionFake && canSavePopUp}
                onChange={(e) => handleClickCheckBox(item, e, 2)}
                className="custom-checkbox"
              />
            ),
            ObligatoryShow: <Switch className="custom-switch" />,
          });
        });
  const checkAnyThingChangeWhenEdit = () => {
    if (topicSetForEdit) {
      var IsQuestionCheckChange = topicSetForEdit?.QuestionsInTopicSet?.some(
        (qits) => !state.questionChecked.map((q) => q.QuestionID).includes(qits.QuestionID),
      );
      if (
        topicSetForEdit?.Status != statusInput ||
        topicSetForEdit?.TypeOfTopicSetID != typeOfTopicSetInput ||
        topicSetForEdit?.Name != nameInput ||
        topicSetForEdit?.ExamTypeID != state.selectedExamtypeID ||
        IsQuestionCheckChange
      )
        return true;
      else return false;
    } else {
      if (statusInput != 0 || typeOfTopicSetInput != undefined || state.selectedExamtypeID != 0) return true;
      else return false;
    }
  };
  const checkSwitchChecked = (): boolean => {
    let count = 0;
    let totalSwitches = 0;

    Object.keys(state.switchState).forEach((key: any) => {
      if (state.switchState[key] === true) {
        count++;
      }
      totalSwitches++;
    });

    Object.keys(state.switchStateComposite).forEach((key: any) => {
      if (state.switchStateComposite[key] === true) {
        count++;
      }
      totalSwitches++;
    });
    if (count == totalSwitches) {
      switchAll(true);
      setState({ ...state, allChecked: true });
      return true;
    }
    return false;
  };
  useEffect(() => {
    setState({ ...state, allChecked: checkSwitchChecked() });
  }, [state.switchState, state.switchStateComposite]);

  const switchAll = (isChecked: boolean) => {
    const newSwitchState = Object.keys(state.switchState).reduce(
      (acc, key) => {
        acc[parseInt(key)] = isChecked;
        return acc;
      },
      {} as { [key: number]: boolean },
    );
    const newSwitchStateComposite = Object.keys(state.switchStateComposite).reduce(
      (acc, key) => {
        acc[parseInt(key)] = isChecked;
        return acc;
      },
      {} as { [key: number]: boolean },
    );
    setState({
      ...state,
      switchState: newSwitchState,
      switchStateComposite: newSwitchStateComposite,
      allChecked: isChecked,
    });
  };
  const getQuestionLength = (type: number) => {
    if (type === 1) {
      return (
        state.questionCheckedFake?.length +
        state.questionCompositeCheckedFake?.reduce(
          (accumulator, currentValue) => accumulator + currentValue?.questions?.length,
          0,
        )
      );
    }
    if (type === 3) {
      return (
        state.questionChecked?.length +
        state.questionCompositeChecked?.reduce(
          (accumulator, currentValue) => accumulator + currentValue?.questions?.length,
          0,
        )
      );
    }
    if (type === 2) {
      return state.questionChecked?.length + state.questionCompositeChecked.length;
    }
  };

  useEffect(() => {
    if (getQuestionLength(3) === numberOfQuestion) {
      setState({ ...state, isDisableStatus: false });
    } else {
      setState({ ...state, isDisableStatus: true });
    }
  }, [state.questionChecked]);
  const handleClickEdit = () => {
    if (checkAnyThingChangeWhenEdit()) {
      openModalConfirm(1);
    } else {
      navigate('/admin/topic');
    }
  };
  const onChangePage = (page: number) => {
    setState({ ...state, page, filter: { ...state.filter, page } });
  };

  const onChangeTab = (index: string) => {
    setType(index);
    setState({ ...state, page: 1 });
  };
  const handleDownloadTemplateFillQuestion = async () => {
    dispatch(downloadTemplateFillQuestion());
  };
  const handleImportFileXls = () => {
    // Programmatically open the file input dialog
    fileInputRef.current?.click();
  };
  const tabData = [
    {
      key: '1',
      tabTitle: 'Single Question',
      content: (
        <SingleQuestion
          parentState={state}
          setParentState={setState}
          hanldePageChange={onChangePage}
          numberofquestion={numberOfQuestion}
          type={type}
        />
      ),
    },
    {
      key: '2',
      tabTitle: 'Composite Question',
      content: (
        <CompositeQuestion
          parentState={state}
          setParentState={setState}
          hanldePageChange={onChangePage}
          numberofquestion={numberOfQuestion}
          type={type}
        />
      ),
    },
  ];

  // let headerText = topicSetForEdit
  //   ? `Topic Set Details: ${state.selectedExamtypeID}-D${state.topicSetID?.toString().padStart(5, '0')}`
  //   : 'Information';
  let headerText = 'Information';
  let isDelete = state.checkDeleteIds?.filter((i) => i != 0)?.length > 0;
  let isDisableChooseQuestion = state.selectedExamtypeID == 0 || typeOfTopicSetInput == undefined;
  let isDisableExamType = topicSetForEdit ? true : false;

  const checkNumberOfQuestion = (value?: number) => {
    // Cache the result of getQuestionLength(3) to avoid multiple function calls
    const questionLength = getQuestionLength(3) ?? 0;
    const questionCount =
      listAllTypeOfTopicSet?.find((tots) => tots.ID == (value ? value : typeOfTopicSetInput))?.NumberOfQuestion ?? 0;
    if (questionLength !== 0) {
      if (questionLength > questionCount) {
        setState({ ...state, checkTypeOfExam: '1' }); // over question
        return false;
      } else if (questionLength < questionCount) {
        setState({ ...state, checkTypeOfExam: '2' }); // not enough question
        return true;
      } else if (questionLength == questionCount) {
        setState({ ...state, checkTypeOfExam: '3' }); // number question true
        return true;
      }
    }
    return true;
  };
  const handleSave = async () => {
    try {
      console.log('vâpppppp1');
      const values = await form.validateFields();
      form.submit();
      console.log('vâpppppp2');
      
      //reset valid
      form.setFields([
        {
          name: 'NumberOfQuestion',
          errors: [],
        },
      ]);

      if (canSavePage()) {
        if (state.topicSetID == 0) {
          let topicSetAddObj = {
            TopicSetID: state.topicSetID,
            TopicSetCode: 'Code123',
            Name: nameInput,
            UserID: myInfo?.ID,
            Status: statusInput,
            ExamTypeID: state.selectedExamtypeID,
            TypeOfTopicSetID: typeOfTopicSetInput,
            QuestionAndObligatoryIds: state.questionChecked?.map((q) => [
              q.ID,
              state.switchState[q.ID ?? 0] || false ? 1 : 0,
            ]),
            QuestionCompositeAndObligatoryIds: state.questionCompositeChecked?.map((q) => [
              q.ID,
              state.switchStateComposite[q.ID ?? 0] || false ? 1 : 0,
            ]),
          };
          dispatch(createTopicSet(topicSetAddObj));
          navigate('/admin/topic');
        } else {
          let topicSetUpdateObj = {
            TopicSetID: state.topicSetID,
            Name: nameInput,
            UserID: myInfo?.ID,
            Status: statusInput,
            TypeOfTopicSetID: typeOfTopicSetInput,
            ExamTypeID: state.selectedExamtypeID,
            QuestionAndObligatoryIds: state.questionChecked?.map((q) => [
              q.ID,
              state.switchState[q.ID ?? 0] || false ? 1 : 0,
            ]),
            QuestionCompositeAndObligatoryIds: state.questionCompositeChecked?.map((q) => [
              q.ID,
              state.switchStateComposite[q.ID ?? 0] || false ? 1 : 0,
            ]),
          };
          dispatch(updateTopicSet(topicSetUpdateObj));
          navigate('/admin/topic');
        }
      } else if (!checkNumberOfQuestion()) {
        form.setFields([
          {
            name: 'NumberOfQuestion',
            errors: ['The number of questions in the topic set is not enough'],
          },
        ]);
      } else {
        openNotification('error', '', 'Lack of information');
        //check valid field
        setStateValid({
          ...stateValid,
          examType: state.selectedExamtypeID == 0 ? false : true,
          typeOfTopicSet: typeOfTopicSetInput == undefined ? false : true,
          name: nameInput == null || nameInput == undefined ? false : true,
          // table: state.questionChecked?.length != numberOfQuestion ? false : true,
        });
      }
    } catch (error) {}
  };

  return (
    <StyledAddTopic>
      {/* <PageHeader className="ninjadash-page-header-main" title="" routes={PageRoutes} /> */}
      <Main>
        <Form form={form} ref={formRef} name="ninjadash-vertical-form" layout="vertical">
          <Suspense
            fallback={
              <Cards headless>
                <Skeleton active />
              </Cards>
            }
          >
            <Row gutter={15}>
              <Col xs={24}>
                <Row style={{}}>
                  <Col style={{ fontSize: 20, color: 'black', fontWeight: 550 }} span={12}>
                    {headerText}
                  </Col>
                  <Col style={{ display: 'flex', justifyContent: 'flex-end' }} span={12}>
                    <Button
                      style={{ border: '1px solid #194F9F', color: '#194F9F', marginRight: 20, width: 120 }}
                      onClick={() => handleClickEdit()}
                    >
                      Exit
                    </Button>
                    <Button style={{ width: 120 }} mergetype="primary" onClick={() => handleSave()}>
                      Save
                    </Button>
                  </Col>
                </Row>
                {/* <Card style={{ marginTop: '20px' }}> */}
                <Row style={{ marginTop: 20, fontSize: 20, color: 'black', fontWeight: 550 }}>
                  <Col span={24} style={{ padding: '16px' }}>
                    <Row
                      style={{
                        gap: '32px',
                        display: 'flex',
                        flexFlow: 'unset',
                        justifyContent: 'center',
                        paddingRight: '20px',
                        paddingLeft: '20px',
                      }}
                    >
                      <Col span={8}>
                        <Form.Item
                          name="Name"
                          rules={[{ required: true, message: '' }]}
                          validateTrigger="onSubmit"
                          normalize={(value) => value.trimStart()}
                          label={<span style={{ fontWeight: 'bold' }}> Name</span>}
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                        >
                          <Input
                            placeholder={"Name's Exam"}
                            aria-required
                            maxLength={200}
                            // disabled={topicSetForEdit ? true : false}
                            disabled={isDisableStatusCheck}
                            style={{ height: '40px' }}
                            className={!stateValid.name ? 'custom-select-border' : ''}
                            autoFocus
                          />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        {/* <h1 style={{ fontSize: 18, fontWeight: 550, marginBottom: 4 }}>
                          <span style={{ fontSize: 18, fontWeight: 600, color: 'red' }}>*</span> Subject
                        </h1> */}
                        <Form.Item
                          // name="Subject"
                          rules={[{ required: true, message: '' }]}
                          validateTrigger="onSubmit"
                          normalize={(value) => value.trimStart()}
                          label={<span style={{ fontWeight: 'bold' }}>Subject (L1)</span>}
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                        >
                          <Select
                            placeholder="Subject"
                            className={!stateValid.examType ? 'custom-select-border' : ''}
                            style={{ width: '100%' }}
                            showSearch
                            filterOption={(input, option) =>
                              (option?.label?.toString() ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                            optionLabelProp="label"
                            onChange={(value) => {
                              if (
                                state.questionChecked?.length != 0 &&
                                state.questionChecked != undefined &&
                                state.questionCompositeChecked != undefined
                              ) {
                                setState({
                                  ...state,
                                  valueExamTypeChange: value,
                                  modalConfirmEditVisible: true,
                                  typeConfirm: 4,
                                });
                              } else {
                                handleExamTypeChange(value);
                              }
                            }}
                            value={state.selectedExamtypeID ? state.selectedExamtypeID + '' : undefined}
                            aria-required
                            disabled={isDisableStatusCheck}
                            notFoundContent="Not found"
                            allowClear
                          >
                            {getListSelectExamType().map((option) => (
                              <Select.Option key={option.value} value={option.value + ''} label={option.label}>
                                <Tooltip title={option.name}>{option.label}</Tooltip>
                              </Select.Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          label={<span style={{ fontWeight: 'bold' }}> Status</span>}
                          name="Status"
                          style={{ marginBottom: 20 }}
                        >
                          <Select
                            className={
                              statusInput == 1
                                ? `statusStyleActive`
                                : statusInput == 0
                                  ? `statusStyleInactive`
                                  : 'statusStyleBlocked'
                            }
                            filterOption={(input, option) =>
                              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                            options={
                              topicSetForEdit
                                ? topicSetForEdit?.Status == 1 || topicSetForEdit?.Status == 2
                                  ? listStatusActive
                                  : listStatusInActive
                                : listStatusInActive
                            }
                            // onChange={(value, opt) => setState({ ...state, selectedStatus: parseInt(value+"") })}
                            value={statusInput}
                            disabled={state.isDisableStatus}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>
                </Row>

                <Row style={{ marginTop: 0, fontSize: 20, color: 'black', fontWeight: 550 }}>
                  <Col span={24} style={{ padding: '16px' }}>
                    <Row
                      style={{
                        gap: '32px',
                        display: 'flex',
                        flexFlow: 'unset',
                        justifyContent: 'center',
                        paddingRight: '20px',
                        paddingLeft: '20px',
                      }}
                    >
                      <Col span={8}>
                        {/* <h1 style={{ fontSize: 18, fontWeight: 550, marginBottom: 4 }}>
                          <span style={{ fontSize: 18, fontWeight: 600, color: 'red' }}>*</span> Type of exam
                        </h1> */}
                        <Form.Item
                          name="TypeOfTopicSet"
                          rules={[{ required: true, message: '' }]}
                          validateTrigger="onSubmit"
                          // normalize={(value) => value.trimStart()}
                          label={<span style={{ fontWeight: 'bold' }}> Type of exam</span>}
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                        >
                          <Select
                            placeholder="Select Type of Exam"
                            className={!stateValid.typeOfTopicSet ? 'custom-select-border' : ''}
                            showSearch
                            filterOption={(input, option) =>
                              (option?.label?.toString() ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                            style={{ width: '100%' }}
                            options={getListSelectTypeOfTopicSet()}
                            // onChange={(value, opt) => setState({ ...state, typeOfTopicSetID: parseInt(value+'') })}
                            value={typeOfTopicSetInput}
                            disabled={isDisableStatusCheck}
                            onChange={(value) => {
                              setStateValid({ ...stateValid, typeOfTopicSet: true });
                              checkNumberOfQuestion(value);
                            }}
                            allowClear
                            notFoundContent="Not found"
                          />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        {/* <h1 style={{ fontSize: 18, fontWeight: 550, marginBottom: 4 }}>Number Of Question</h1> */}
                        {/* <Form.Item name="NumberOfQuestion" style={{ marginBottom: 20 }}
                         */}
                        <Form.Item
                          name="NumberOfQuestion"
                          // rules={[{ required: true, }]}
                          validateTrigger="onSubmit"
                          // normalize={(value) => value.trimStart()}
                          label={<span style={{ fontWeight: 'bold' }}> Number Of Question</span>}
                          labelCol={{ span: 24 }}
                          wrapperCol={{ span: 24 }}
                          hasFeedback
                          // validateStatus={form.getFieldError('NumberOfQuestion').length ? 'error' : ''}
                        >
                          <Input
                            readOnly
                            value={`${getQuestionLength(3)}/${numberOfQuestion ?? 0}`}
                            placeholder="0"
                            style={{ width: '100%', height: '40px', cursor: 'not-allowed' }}
                          />
                          <div style={{ color: 'red', fontWeight: '500' }}>
                            {state.checkTypeOfExam === '1'
                              ? 'Over limit question'
                              : state.checkTypeOfExam === '2'
                                ? 'Not enough question'
                                : ''}
                          </div>
                        </Form.Item>
                      </Col>

                      <Col style={{ display: 'flex', justifyContent: 'flex-end' }} span={8}>
                        <Row>
                          <Col style={{ marginTop: 30 }} span={10}>
                            <Button
                              disabled={isDisableChooseQuestion || isDisableStatusCheck}
                              style={{ marginLeft: '150px' }}
                              mergetype="primary"
                              onClick={handleChooseQuestion}
                            >
                              Choose Questions
                            </Button>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                {/* </Card> */}
                <Row style={{ marginTop: 20, fontSize: 20, color: 'black', fontWeight: 550 }}>
                  <Col span={2}></Col>
                </Row>

                <Row style={{ marginTop: 20 }}>
                  <DataTableStyleWrap style={{ width: '100%' }}>
                    {/* Table side */}
                    <div className="ninjadasj-datatable">
                      <TableWrapper className="table-data-view table-responsive">
                        <Table
                          bordered
                          className={'table-responsive'}
                          dataSource={tableDataScource}
                          columns={dataTableColumn}
                          loading={loading}
                          //scroll={{ y: 400 }}
                          style={{ overflowY: 'auto', maxHeight: '50vh' }}
                          pagination={
                            tableDataScource.length > 0 && {
                              pageSize: 10,
                              onChange: onChangePage,
                              total: getQuestionLength(2) || 1,
                              current: state.page,
                            }
                          }
                          locale={{
                            emptyText: (
                              <div style={{ marginTop: '40px' }}>
                                <h2
                                  style={{
                                    fontWeight: 'bolder',
                                    fontSize: '22px',
                                    margin: '0px',
                                    lineHeight: '30px',
                                    marginBottom: 50,
                                  }}
                                >
                                  No data
                                </h2>
                                {/* <p style={{ fontSize: '13px' }}>Your search do not match any question</p> */}
                              </div>
                            ),
                          }}
                        />
                      </TableWrapper>
                    </div>
                  </DataTableStyleWrap>
                </Row>
              </Col>
            </Row>
          </Suspense>
        </Form>
        <Modal
          width={state.typeConfirm == 1 || state.typeConfirm == 3 || state.typeConfirm == 4 ? '' : '55%'}
          closable={false}
          centered
          open={state.modalConfirmEditVisible}
          onCancel={closeModalExitConfirm}
          footer={null}
        >
          <div
            style={{
              justifyContent:
                state.typeConfirm == 1 || state.typeConfirm == 3 || state.typeConfirm == 4 ? 'center' : 'space-between',
              display: state.typeConfirm == 1 || state.typeConfirm == 3 ? 'grid' : 'flex',
              // marginBottom: 20,
            }}
          >
            <Heading as="h4">
              <h3 style={{ paddingTop: 20, fontWeight: 'bold', marginBottom: '0.2em' }}>
                {state.typeConfirm == 1
                  ? 'Are you sure you want to exit?'
                  : state.typeConfirm == 2
                    ? 'Choose Question'
                    : state.typeConfirm == 4
                      ? 'Are you sure you want to change subject?'
                      : ''}
              </h3>
            </Heading>
            {state.typeConfirm == 1 || state.typeConfirm == 3 || state.typeConfirm == 4 ? (
              ''
            ) : (
              <div className="ninjadash-datatable-filter__action" style={{ display: 'flex', justifyContent: 'center' }}>
                <style>
                  {`
                    .custom-input-count {
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      border: 1px solid #194F9F;
                      border-radius: 73px !important;
                      width: 200px;
                      font-weight: bolder;
                      color: #194F9F;
                      background: #CCE3FF;
                    }
                  `}
                </style>
                <Input
                  style={{
                    whiteSpace: 'nowrap',
                    textAlign: 'center',
                  }}
                  className="custom-input-count"
                  value={`Selected: ${getQuestionLength(1)}/${numberOfQuestion}`}
                />
              </div>
            )}
          </div>
          {state.typeConfirm == 1 ? (
            <div style={{ textAlign: 'center', fontWeight: 500, fontSize: 18, color: '#000' }}>
              Any changes will not be saved
            </div>
          ) : state.typeConfirm == 3 ? (
            <div style={{ textAlign: 'center', fontSize: 20, fontWeight: 500, color: 'black', paddingBottom: 30 }}>
              Are you sure you want to delete the selected item(s)?
            </div>
          ) : state.typeConfirm == 4 ? (
            <div style={{ textAlign: 'center', fontWeight: 500, fontSize: 18, color: '#000' }}>
              All questions will be deleted
            </div>
          ) : (
            <DataTableStyleWrap>
              {/* Filter side */}

              <div>
                <QuestionFilterTopic
                  selectedExamtypeID={state.selectedExamtypeID}
                  checkl1={state.checkl1}
                  examTypeAll={examTypeAll}
                  taskAll={taskAll}
                  KaAll={KaAll}
                  BatchIdAll={BatchIdAll}
                  setFilterForm={changeFilterForm}
                />
                <Cards style={{ border: 'none' }}>
                  {/* <Tab style={{ borderColor: themeColor['white-color'] }} data={tabData} onChange={onChangeTab} /> */}
                </Cards>
              </div>

              {/* Table side */}

              {/* <div className="ninjadasj-datatable">
                <TableWrapper className="table-data-view table-responsive">
                  <Table
                    bordered
                    className="table-responsive"
                    pagination={false}
                    dataSource={tableDataScourceFull}
                    columns={dataTableColumnPopUp}
                    loading={loading}
                    scroll={{ y: 400 }}
                  />
                </TableWrapper>
              </div> */}
              <Tab style={{ borderColor: themeColor['white-color'] }} data={tabData} onChange={onChangeTab} />
            </DataTableStyleWrap>
          )}

          <div style={state.typeConfirm == 4 || 1 ? { width: '100%', textAlign: 'center', marginTop: 20 } : {}}>
            {state.typeConfirm == 2 || state.typeConfirm == 3 ? (
              <Button
                mergetype="primary"
                outlined
                key="back"
                onClick={closeModalExitConfirm}
                style={{ border: '1px solid red', color: 'red', width: 120, marginLeft: 10, marginRight: 10 }}
              >
                Close
              </Button>
            ) : state.typeConfirm == 4 || 1 ? (
              <Button
                style={{ width: 120, marginLeft: 10, marginRight: 10 }}
                mergetype="primary"
                outlined
                key="back"
                onClick={closeModalExitConfirm}
                // style={{ border: '1px solid red', color: 'red' }}
              >
                No
              </Button>
            ) : (
              ''
            )}
            <Button
              style={{ width: 120, marginLeft: 10, marginRight: 10 }}
              loading={loading}
              mergetype="primary"
              key="submit"
              onClick={() =>
                state.typeConfirm == 1
                  ? navigate('/admin/topic')
                  : state.typeConfirm == 2
                    ? handleSavePopUp()
                    : state.typeConfirm == 4
                      ? handleExamTypeChange(state.valueExamTypeChange)
                      : handleDelete()
              }
            >
              {state.typeConfirm == 1 || state.typeConfirm == 3 || state.typeConfirm == 4 ? 'Yes' : 'Save'}
            </Button>
          </div>
        </Modal>
      </Main>
    </StyledAddTopic>
  );
};

export default AddTopic;
