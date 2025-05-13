import { Route } from '@ant-design/pro-layout/es/typing';
import { Col, Form, FormInstance, Input, Modal, Radio, RadioChangeEvent, Row, Select, Skeleton, Tooltip } from 'antd';
import { Button } from 'components/buttons/Buttons';
import { Cards } from 'components/cards/frame/CardsFrame';
import { Main } from 'container/Style';
import { FC, Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/RootReducer';
import { useLocation, useNavigate } from 'react-router-dom';
import { addQuestion, SetCompositeQuestionAdd, SetQuestionAdd, updateQuestion } from 'store/question/Actions';
import { Heading } from 'components/heading/Heading';
import QuestionBox from 'components/questionInput/QuestionBox';
import { fetchListExamTypeAll } from 'store/exam-type/Actions';
import { fetchListKAAll } from 'store/ka/Actions';
import { fetchListTaskAll } from 'store/task/Actions';
// import '../question/AddQuestion.css';
import { AnswerModel, CreateCompositeQuestionModel, QuestionModel } from 'store/question/Types';
import { themeColor } from 'config/theme/ThemeVariables';
import { es } from 'date-fns/locale';
import { openNotification } from 'utility/Utility';
import { StyledAddQuestion } from './Style';

const { TextArea } = Input;

interface IAddQuestion {}
interface Answer {
  ID: number;
  content: string;
  explanation: string;
}
interface QuestionCheckModel {
  ExamTypeID: number;
  Code: string;
  TaskID: number;
  Status: number;
  Score: number;
  Question: string;
  KAID?: number;
  answers: AnswerModel[];
}

const AddQuestion: FC<IAddQuestion> = (props) => {
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

  const [form] = Form.useForm();
  const formRef = useRef<FormInstance<any>>(null);
  const examTypeInput = Form.useWatch('ExamType', form);
  const l2CodeInput = Form.useWatch('L2Code', form);
  const l3NameInput = Form.useWatch('L3Name', form);
  const statusInput = Form.useWatch('Status', form);
  const scoreInput = Form.useWatch('Score', form);
  const location = useLocation();

  const loading = useSelector((states: RootState) => states.question.loading);

  const listAllExamType = useSelector((states: RootState) => states.examType.dataAll);
  const listAllKA = useSelector((states: RootState) => states.ka.dataAll);
  const listAllTask = useSelector((states: RootState) => states.task.dataAll);

  const questionForEdit = useSelector((states: RootState) => states.question.questionForEdit);

  const questionForAdd = useSelector((states: RootState) => states.question.questionForAdd);
  const { page } = location.state || {};
  console.log('currentPageADD: ', page);

  const listStatus = [
    { value: 1, label: 'Active' },
    { value: 0, label: 'Inactive' },
  ];

  const dispatch = useDispatch<any>();
  const [state, setState] = useState({
    questionContentBase64: '',
    modalConfirmEditVisible: false,
    modalNotifySaveToExam: false,
    examTypeToolTipText: '',
    modalConfirmNextBackVisible: false,
  });
  const [questionSave, setQuestionSave] = useState<QuestionCheckModel | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [questionNextBack, setQuestionNextBack] = useState<any>();
  const [answers, setAnswers] = useState([
    { ID: 0, content: '', explanation: '' },
    { ID: 0, content: '', explanation: '' },
    { ID: 0, content: '', explanation: '' },
    { ID: 0, content: '', explanation: '' },
  ]);

  const openModalConfirm = () => {
    setState({ ...state, modalConfirmEditVisible: true });
  };

  const closeModalExitConfirm = () => {
    setState({ ...state, modalConfirmEditVisible: false });
  };

  const handleRadioChange = (e: RadioChangeEvent) => {
    setSelectedAnswer(e.target.value);
  };

  const handleContentChange = (index: number, e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newAnswers = [...answers];
    newAnswers[index].content = e.target.value;
    setAnswers(newAnswers);
  };

  const handleExplanationChange = (index: number, e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newAnswers = [...answers];
    newAnswers[index].explanation = e.target.value;
    setAnswers(newAnswers);
  };

  useEffect(() => {

  
    formRef.current?.setFieldsValue({
      Status: 0,
      Score: 1,
    });
    getListAllExamType();
    getListAllKA();
    getListAllTask();
    
  }, []);


  useEffect(() => {
    if (questionForEdit) {
     
      localStorage.setItem(
        'currentSingleQuestionCode',
        String(questionForEdit?.ExamTypeID).padStart(2, '0') + '-Q' + String(questionForEdit?.ID).padStart(4, '0'),
      );
      const event = new Event('currentQuestionIDChanged');
      window.dispatchEvent(event);

      formRef.current?.setFieldsValue({
        ExamType: questionForEdit?.ExamTypeID,
        L2Code: questionForEdit?.KAID,
        L3Name: questionForEdit?.TaskID,
        Status: questionForEdit?.Status,
        Score: questionForEdit?.Score,
      });
      setState({ ...state, questionContentBase64: questionForEdit?.Question ?? '' });
      let answerList = [] as Answer[];
      let correctAns = null;
      questionForEdit?.answers?.map((a, index) => {
        var id = parseInt(a.ID + '');
        answerList.push({ ID: id, content: a.Key ?? '', explanation: a.Explain ?? '' });
        if (a.State) correctAns = index + 1;
      });
      setAnswers(answerList);
      setSelectedAnswer(correctAns);
    } else if (questionForAdd) {
     
      formRef.current?.setFieldsValue({
        ExamType: questionForAdd?.ExamTypeID,
        L2Code: questionForAdd?.KAID,
        L3Name: questionForAdd?.TaskID,
        Status: questionForAdd?.Status,
        Score: questionForAdd?.Score,
        BatchID: questionForAdd?.BatchID,
      });
      setState({ ...state, questionContentBase64: questionForAdd?.Question ?? '' });
      let answerList = [] as Answer[];
      let correctAns = null;
      questionForAdd?.answers?.map((a, index) => {
        var id = parseInt(a.ID + '');
        answerList.push({ ID: id, content: a.Key ?? '', explanation: a.Explain ?? '' });
        if (a.State) correctAns = index + 1;
      });
      while (answerList.length < 4) {
        answerList.push({ ID: 0, content: '', explanation: '' });
      }
      setAnswers(answerList);
      setSelectedAnswer(correctAns);
    }
  }, [questionForEdit, questionForAdd]);

  const handleExamTypeChange = (value: number) => {
    const l2 = listAllKA?.find((k) => k.ID == l2CodeInput);
    const isCurrentL2InExamTypeCode = l2?.ExamTypeID == value;
    if (isCurrentL2InExamTypeCode)
      formRef.current?.setFieldsValue({
        ExamType: value,
      });
    else
      formRef.current?.setFieldsValue({
        ExamType: value,
        L2Code: undefined,
        L3Name: undefined,
      });
  };

  const handleL2Change = (value: number, option: any) => {
    const l3 = listAllTask?.find((t) => t.ID == l3NameInput);

    const isCurrentL3InL2 = l3?.KAID == value;
    //When L2 change set properly ExamTypeCode
    const l2 = listAllKA?.find((ka) => ka.ID == value);
    const examTypeIdWithL2 = listAllExamType?.find((e) => e.ID == l2?.ExamTypeID);
    if (examTypeIdWithL2)
      if (isCurrentL3InL2)
        formRef.current?.setFieldsValue({
          ExamType: examTypeIdWithL2?.ID,
          L2Code: value,
        });
      else
        formRef.current?.setFieldsValue({
          ExamType: examTypeIdWithL2?.ID,
          L2Code: value,
          L3Name: undefined,
        });
    else if (isCurrentL3InL2)
      formRef.current?.setFieldsValue({
        L2Code: value,
      });
    else
      formRef.current?.setFieldsValue({
        L2Code: value,
        L3Name: undefined,
      });
  };

  const handleL3Change = (value: number, option: any) => {
    const l3 = listAllTask?.find((t) => t.ID == value);
    const l2WithL3 = listAllKA?.find((ka) => ka.ID == l3?.KAID);
    const examTypeIdWithL2 = listAllExamType?.find((e) => e.ID == l2WithL3?.ExamTypeID);
    if (l2WithL3)
      if (examTypeIdWithL2)
        formRef.current?.setFieldsValue({
          ExamType: examTypeIdWithL2?.ID,
          L2Code: l2WithL3?.ID,
          L3Name: value,
        });
      else
        formRef.current?.setFieldsValue({
          L2Code: l2WithL3?.ID,
          L3Name: value,
        });
    else
      formRef.current?.setFieldsValue({
        L3Name: value,
      });
  };

  const getListAllExamType = () => {
    // call API lấy list exam for select
    dispatch(fetchListExamTypeAll());
  };

  const getListAllKA = () => {
    // call API lấy list exam for select
    dispatch(fetchListKAAll());
  };

  const getListAllTask = () => {
    // call API lấy list exam for select
    dispatch(fetchListTaskAll());
  };
  const getListSelectTask = () => {
    let listTask = [] as { value?: number; label: string; name: string }[];
    listAllTask?.map((e) => {
      if (l2CodeInput == undefined) {
        if (examTypeInput == undefined)
          listTask.push({
            value: e.ID,
            label: `${e?.Name}`,
            name: `[${e?.Name}]-[${e?.ka?.Name}]-[${e?.examType?.ExamType}]`,
          });
        else if (examTypeInput == e.examType?.ID)
          listTask.push({
            value: e.ID,
            label: `${e?.Name}`,
            name: `[${e?.Name}]-[${e?.ka?.Name}]-[${e?.examType?.ExamType}]`,
          });
      } else {
        if (e.KAID == l2CodeInput)
          listTask.push({
            value: e.ID,
            label: `${e?.Name}`,
            name: `[${e?.Name}]-[${e?.ka?.Name}]-[${e?.examType?.ExamType}]`,
          });
      }
    });
    return listTask;
  };

  const getListSelectKA = () => {
    let listKA = [] as { value?: number; label: string; name: string }[];
    listAllKA?.map((e) => {
      if (examTypeInput == undefined) {
        listKA.push({ value: e.ID, label: `${e?.Name}`, name: `[${e?.Name}]` });
      } else {
        if (e.ExamTypeID == examTypeInput) listKA.push({ value: e.ID, label: `${e?.Name}`, name: `[${e?.Name}]` });
      }
    });

    return listKA;
  };

  const getListSelectExamType = () => {
    let listExamType = [] as { value?: number; label: string; name: string }[];
    listAllExamType?.map((e) => {
      listExamType.push({ value: e.ID, label: `${e?.ExamType}`, name: `${e?.Name}` });
    });
    return listExamType;
  };

  const handleSave = () => {
    if (questionForEdit) {
      let questionEdit = {
        question: {
          CreatedDate: null,
          CreatedBy: 0,
          ModifiedDate: null,
          ModifiedBy: 0,
          ID: questionForEdit?.ID,
          Code: questionForEdit?.Code,
          TaskID: l3NameInput,
          Status: statusInput,
          Score: scoreInput,
          Question: state?.questionContentBase64,
          BatchID: questionForEdit?.BatchID,
        },
        answers: [
          ...answers?.map((a, index) => {
            return {
              CreatedDate: null,
              CreatedBy: 0,
              ModifiedDate: null,
              ModifiedBy: 0,
              ID: a?.ID,
              QuestionID: questionForEdit?.ID,
              Key: a?.content?.trim(),
              State: index + 1 == selectedAnswer ? true : false,
              Explain: a?.explanation?.trim(),
            };
          }),
        ],
      };
      setQuestionSave({
        ExamTypeID: examTypeInput,
        Code: '',
        KAID: l2CodeInput,
        TaskID: l3NameInput,
        Status: statusInput,
        Score: scoreInput,
        Question: state.questionContentBase64,
        answers: [...questionEdit.answers],
      });
      dispatch(updateQuestion(questionEdit));
    } else {
      let question = {
        ExamTypeID: examTypeInput,
        Code: 'no',
        TaskID: l3NameInput,
        Status: statusInput,
        Score: scoreInput,
        Question: state.questionContentBase64,
        answers: [
          ...answers?.map((a, index) => {
            return {
              QuestionID: 0,
              Key: a?.content?.trim(),
              State: selectedAnswer == index + 1,
              Explain: a?.explanation?.trim(),
            };
          }),
        ],
        BatchID: questionForAdd ? questionForAdd.BatchID : 0,
      };
      setQuestionSave({
        ExamTypeID: examTypeInput,
        Code: '',
        KAID: l2CodeInput,
        TaskID: l3NameInput,
        Status: statusInput,
        Score: scoreInput,
        Question: state.questionContentBase64,
        answers: [...question.answers],
      });

      //Remove question at localStorage
      if (questionForAdd) {
        var invalidSingleQuestionArrGet = JSON.parse(localStorage.getItem('invalidSingleQuestionArr') + '');
        if (invalidSingleQuestionArrGet === null) invalidSingleQuestionArrGet = [];
        var invalidCompositeQuestionArrGet = JSON.parse(localStorage.getItem('invalidCompositeQuestionArr') + '');
        if (invalidCompositeQuestionArrGet === null) invalidCompositeQuestionArrGet = [];
        if (checkFullFieldIsFillReal()) {
          if (questionForAdd.Mode === 'single') {
            invalidSingleQuestionArrGet.splice(questionForAdd.ID - 1, 1);
          } else {
            invalidCompositeQuestionArrGet.splice(questionForAdd.ID - 1, 1);
          }

          localStorage.setItem('invalidSingleQuestionArr', JSON.stringify(invalidSingleQuestionArrGet));
          localStorage.setItem('invalidCompositeQuestionArr', JSON.stringify(invalidCompositeQuestionArrGet));
          dispatch(addQuestion(question));
          dispatch(SetQuestionAdd(null));
          navigate('/admin/question/errorQuestion');
        } else {
          const examTypeName = listAllExamType?.find((e) => e.ID === examTypeInput)?.Name;
          //Save to error ques
          let questionSaveError = {
            ExamTypeName: examTypeName,
            ExamTypeID: examTypeInput,
            Code: 'no',
            L2ID: l2CodeInput,
            TaskID: l3NameInput,
            Status: statusInput,
            Score: scoreInput,
            Question: state.questionContentBase64,
            answers: [
              ...answers?.map((a, index) => {
                return {
                  QuestionID: 0,
                  Key: a?.content?.trim(),
                  State: selectedAnswer == index + 1,
                  Explain: a?.explanation?.trim(),
                };
              }),
            ],
            BatchID: questionForAdd ? questionForAdd.BatchID : 0,
            BatchCode: questionForAdd?.BatchCode ? questionForAdd?.BatchCode : questionForAdd?.BaCode,
          };

          const questionForAddPush = {
            ID: questionForAdd?.ID,
            Code: questionForAdd.Code,
            TaskID: l3NameInput,
            KAID: l2CodeInput,
            Status: statusInput,
            Score: scoreInput,
            Question: state.questionContentBase64,
            ExamTypeCode: examTypeName,
            ExamTypeID: examTypeInput,
            answers: [
              ...answers?.map((a, index) => {
                return {
                  QuestionID: 0,
                  Key: a?.content?.trim(),
                  State: selectedAnswer == index + 1,
                  Explain: a?.explanation?.trim(),
                };
              }),
            ],
            BatchID: questionForAdd ? questionForAdd.BatchID : 0,
            BatchCode: questionForAdd?.BatchCode ? questionForAdd?.BatchCode : questionForAdd?.BaCode,
            Mode: 'single',
            Action: 'back',
          } as QuestionModel;

          invalidSingleQuestionArrGet.splice(questionForAdd.ID - 1, 1, questionSaveError);
          localStorage.setItem('invalidSingleQuestionArr', JSON.stringify(invalidSingleQuestionArrGet));
          dispatch(SetQuestionAdd(questionForAddPush));
          openNotification('success', 'Success', 'Saved successfully');
          navigate('admin/question');
        }
      } else {
        dispatch(addQuestion(question));
      }
    }
    setState({
      ...state,
      modalNotifySaveToExam: false,
    });
  };

  const checkAnyThingChangeWhenEdit = () => {
    var check = false;

    var questionCheck = questionForAdd ? questionForAdd : questionSave == null ? questionForEdit : questionSave;
    var correctAnsHistory = selectedAnswer;
    questionCheck?.answers?.map((a, index) => {
      if (a.State) correctAnsHistory = index + 1;
    });
    if (questionCheck) {
      if (
        questionCheck?.ExamTypeID != examTypeInput ||
        questionCheck?.KAID != l2CodeInput ||
        questionCheck?.TaskID != l3NameInput ||
        extractQuestionContent(questionCheck?.Question + '') != extractQuestionContent(state.questionContentBase64) ||
        questionCheck?.Score != scoreInput ||
        questionCheck?.Status != statusInput ||
        correctAnsHistory != selectedAnswer
      ) {
        check = true;
      }
      questionCheck?.answers?.map((a, index) => {
        if ((a?.Key ?? '') != answers[index].content || (a.Explain ?? '') != answers[index].explanation) {
          check = true;
        }
      });
    } else {
      if (
        selectedAnswer ||
        examTypeInput ||
        l2CodeInput ||
        l3NameInput ||
        state.questionContentBase64 ||
        scoreInput != 1 ||
        statusInput != 0
      )
        check = true;
      answers?.map((a, index) => {
        if (answers[index].content || answers[index].explanation) check = true;
      });
    }

    return check;
  };

  const checkFullFieldIsFill = () => {
    if (
      !examTypeInput ||
      !l2CodeInput ||
      !l3NameInput ||
      statusInput == undefined ||
      scoreInput == 0 ||
      state.questionContentBase64 == '' ||
      selectedAnswer == null
    ) {
      return false;
    }

    var checkCanNotSave = answers.some((a) => {
      if (a.content?.trim() == '' || a.explanation.trim() == '') return true;
    });
    if (checkCanNotSave || !checkAnyThingChangeWhenEdit()) return false;
    // if (checkCanNotSave) return false;
    return true;
  };

  const checkFullFieldIsFillReal = () => {
    if (
      !examTypeInput ||
      !l2CodeInput ||
      !l3NameInput ||
      statusInput == undefined ||
      scoreInput == 0 ||
      state.questionContentBase64 == '' ||
      selectedAnswer == null
    ) {
      return false;
    }

    var checkCanNotSave = answers.some((a) => {
      if (a.content?.trim() == '' || a.explanation.trim() == '') return true;
    });
    // if (checkCanNotSave || !checkAnyThingChangeWhenEdit()) return false;
    if (checkCanNotSave) return false;
    return true;
  };

  const extractQuestionContent = (htmlString: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    var textContent = doc.body.textContent;
    return textContent?.trim();
  };

  const canSaveQuestionStatus = () => {
    if (questionForAdd) {
      var selectAnswerRaw = null;
      var checkReturn = false;

      var arrCheck = questionForAdd?.answers;
      while (arrCheck.length < 4) {
        arrCheck.push({ QuestionID: 0, Key: '', State: false, Explain: '' });
      }
      arrCheck?.forEach((a, idx) => {
        if (a?.State) selectAnswerRaw = idx + 1;
        if ((a?.Key ?? '') != answers[idx]?.content || (a?.Explain ?? '') != answers[idx]?.explanation) {
          checkReturn = true;
        }
      });
      if (
        examTypeInput != questionForAdd?.ExamTypeID ||
        l2CodeInput != questionForAdd?.KAID ||
        l3NameInput != questionForAdd?.TaskID ||
        scoreInput != questionForAdd?.Score ||
        extractQuestionContent(state.questionContentBase64) != extractQuestionContent(questionForAdd?.Question + '') ||
        selectedAnswer != selectAnswerRaw
      ) {
        checkReturn = true;
      }
      return checkReturn;
    } else {
      return checkFullFieldIsFill();
    }
  };

  const [previousValue1, setPreviousValue1] = useState(1);

  const handleChange1 = (event: any) => {
    if (event.target.value != '' && (event.target.value > 255 || event.target.value < 1)) {
      setPreviousValue1(previousValue1);

      form.setFieldsValue({ Score: previousValue1 });
    } else {
      setPreviousValue1(event.target.value);
      form.setFieldsValue({ Score: event.target.value });
    }
  };
  const onlyNumberKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    ['e', 'E', 'g', 'G', '+', '-', '.', ','].includes(e.key) && e.preventDefault();
  };

  const removeAscent = (str: string) => {
    if (str == null || str == undefined) return str;
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    str = str.replace(/đ/g, 'd');
    return str;
  };

  const handleExit = () => {
    if (questionForAdd) {
      dispatch(SetQuestionAdd(null));
      navigate('/admin/question/errorQuestion');
    } else {
      navigate('/admin/question');
    }
  };

  const handleClickBack = () => {
    if (questionForAdd?.ID) {
      const currentIndex = questionForAdd?.ID - 2;
      var invalidSingleQuestionArrGet = JSON.parse(localStorage.getItem('invalidSingleQuestionArr') + '');
      if (invalidSingleQuestionArrGet === null) invalidSingleQuestionArrGet = [];
      const questionForAddPick = invalidSingleQuestionArrGet[currentIndex];
      const singleQuestion = {
        ID: currentIndex + 1,
        Code: questionForAddPick.Code,
        TaskID: questionForAddPick.TaskID,
        KAID: questionForAddPick.L2ID,
        Status: questionForAddPick.Status,
        Score: questionForAddPick.Score,
        Question: questionForAddPick.Question,
        ExamTypeCode: questionForAddPick.ExamTypeName,
        ExamTypeID: questionForAddPick.ExamTypeID,
        answers: questionForAddPick.answers,
        BatchID: questionForAddPick.BatchID,
        Mode: 'single',
        Action: 'back',
      } as QuestionModel;
      if (checkChange()) {
        setState({ ...state, modalConfirmNextBackVisible: true });
        setQuestionNextBack(singleQuestion);
      } else {
        const id = JSON.parse(localStorage.getItem('currentQuestionID') + '');
        localStorage.setItem('currentQuestionID', id - 1 + '');
        //Notify id is change to re-cal the title
        const event = new Event('currentQuestionIDChanged');
        window.dispatchEvent(event);
        dispatch(SetQuestionAdd(singleQuestion));
      }
    }
  };

  const checkChange = () => {
    var check = false;
    if (
      questionForAdd?.ExamTypeID !== examTypeInput ||
      questionForAdd?.KAID !== l2CodeInput ||
      questionForAdd?.TaskID !== l3NameInput ||
      (questionForAdd?.Status !== 2 && questionForAdd?.Status !== statusInput) ||
      questionForAdd?.Score !== scoreInput ||
      extractQuestionContent(questionForAdd?.Question + '') !== extractQuestionContent(state.questionContentBase64)
    )
      check = true;
    var selectedAnswerRaw = 0;
    var arrCheck = questionForAdd?.answers ?? [];
    while (arrCheck.length < 4) {
      arrCheck.push({ QuestionID: 0, Key: '', State: false, Explain: '' });
    }
    arrCheck?.forEach((a, index) => {
      if ((a?.Key ?? '') !== answers[index]?.content || (a?.Explain ?? '') !== answers[index]?.explanation)
        check = true;
      if (a?.State === true) selectedAnswerRaw = index + 1;
    });

    if (selectedAnswerRaw === 0 && selectedAnswer !== null) {
      check = true;
    } else if (selectedAnswerRaw !== selectedAnswer && selectedAnswer !== null) {
      check = true;
    }
    return check;
  };

  const handleClickNext = () => {
    if (questionForAdd?.ID) {
      const currentIndex = questionForAdd?.ID - 1;
      var invalidSingleQuestionArrGet = JSON.parse(localStorage.getItem('invalidSingleQuestionArr') + '');
      if (invalidSingleQuestionArrGet === null) invalidSingleQuestionArrGet = [];

      if (currentIndex + 1 < invalidSingleQuestionArrGet.length) {
        const questionForAddPick = invalidSingleQuestionArrGet[currentIndex + 1];
        const singleQuestion = {
          ID: currentIndex + 2,
          Code: questionForAddPick.Code,
          TaskID: questionForAddPick.TaskID,
          KAID: questionForAddPick.L2ID,
          Status: questionForAddPick.Status,
          Score: questionForAddPick.Score,
          Question: questionForAddPick.Question,
          ExamTypeCode: questionForAddPick.ExamTypeName,
          ExamTypeID: questionForAddPick.ExamTypeID,
          answers: questionForAddPick.answers,
          BatchID: questionForAddPick.BatchID,
          Mode: 'single',
          Action: 'next',
        } as QuestionModel;
        if (checkChange()) {
          setState({ ...state, modalConfirmNextBackVisible: true });
          setQuestionNextBack(singleQuestion);
        } else {
          const id = JSON.parse(localStorage.getItem('currentQuestionID') + '');
          localStorage.setItem('currentQuestionID', id + 1 + '');
          //Notify id is change to re-cal the title
          const event = new Event('currentQuestionIDChanged');
          window.dispatchEvent(event);
          dispatch(SetQuestionAdd(singleQuestion));
        }
      } else {
        var invalidCompositeQuestionArrGet = JSON.parse(localStorage.getItem('invalidCompositeQuestionArr') + '');
        if (invalidCompositeQuestionArrGet === null) invalidCompositeQuestionArrGet = [];
        const compositeQuestionPick = invalidCompositeQuestionArrGet[0];
        const questions: any[] = [];
        compositeQuestionPick?.questions?.map((q: any) => {
          const singleQuestion = {
            ID: 1,
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
            Mode: 'composite',
          } as QuestionModel;
          questions.push(singleQuestion);
        });
        const compositeQuestion = {
          ID: 1,
          Mode: 'composite',
          Action: 'next',
          ExamtypeID: compositeQuestionPick.ExamtypeID,
          Status: compositeQuestionPick.Status,
          Score: compositeQuestionPick.Score,
          Question: compositeQuestionPick.Question,
          BatchID: compositeQuestionPick.BatchID,
          questions: questions,
        } as CreateCompositeQuestionModel;

        if (checkChange()) {
          setState({ ...state, modalConfirmNextBackVisible: true });
          setQuestionNextBack(compositeQuestion);
        } else {
          const id = JSON.parse(localStorage.getItem('currentQuestionID') + '');
          localStorage.setItem('currentQuestionID', id + 1 + '');
          //Notify id is change to re-cal the title
          const event = new Event('currentQuestionIDChanged');
          window.dispatchEvent(event);
          dispatch(SetCompositeQuestionAdd(compositeQuestion));
          navigate('/admin/question/addCompositeQuestion');
        }
      }
    }
  };

  const handleSaveNextBack = () => {
    const isFillAll = checkFullFieldIsFill();
    const id = JSON.parse(localStorage.getItem('currentQuestionID') + '');
    if (questionNextBack?.Action === 'next') {
      localStorage.setItem('currentQuestionID', isFillAll ? id : id + 1 + '');
    } else {
      localStorage.setItem('currentQuestionID', id - 1 + '');
    }
    //Notify id is change to re-cal the title
    const event = new Event('currentQuestionIDChanged');
    window.dispatchEvent(event);

    var invalidSingleQuestionArrGet = JSON.parse(localStorage.getItem('invalidSingleQuestionArr') + '');
    if (invalidSingleQuestionArrGet === null) invalidSingleQuestionArrGet = [];

    if (isFillAll) {
      let question = {
        notShowToastSuccess: true,
        ExamTypeID: examTypeInput,
        Code: 'no',
        TaskID: l3NameInput,
        Status: statusInput,
        Score: scoreInput,
        Question: state.questionContentBase64,
        answers: [
          ...answers?.map((a, index) => {
            return {
              QuestionID: 0,
              Key: a?.content?.trim(),
              State: selectedAnswer == index + 1,
              Explain: a?.explanation?.trim(),
            };
          }),
        ],
        BatchID: questionForAdd ? questionForAdd.BatchID : 0,
        BatchCode: questionForAdd ? questionForAdd.BatchCode : '',
      };
      dispatch(addQuestion(question));
      questionForAdd && invalidSingleQuestionArrGet?.splice(questionForAdd?.ID - 1, 1);
      invalidSingleQuestionArrGet = invalidSingleQuestionArrGet?.map((q: any, idx: number) => {
        return {
          ...q,
          ID: idx + 1,
        };
      });
      localStorage.setItem('invalidSingleQuestionArr', JSON.stringify(invalidSingleQuestionArrGet));
    } else {
      var currentQuesIndex = questionNextBack?.Action === 'next' ? questionNextBack?.ID - 2 : questionNextBack?.ID;

      if (questionNextBack?.Mode !== 'single') {
        currentQuesIndex = invalidSingleQuestionArrGet?.length - 1;
      }
      const examTypeName = listAllExamType?.find((e) => e.ID === examTypeInput)?.Name;
      const invalidSingleQuestionArrGetUpdate = invalidSingleQuestionArrGet?.map((q: any, index: number) => {
        if (currentQuesIndex === index) {
          return {
            ID: questionNextBack?.ID,
            Code: 'no',
            TaskID: l3NameInput,
            L2ID: l2CodeInput,
            Status: statusInput,
            Score: scoreInput,
            Question: extractQuestionContent(state.questionContentBase64),
            ExamTypeName: examTypeName,
            ExamTypeID: examTypeInput,
            answers: answers?.map((a, index) => {
              return { QuestionID: 0, Key: a.content, State: selectedAnswer === index + 1, Explain: a.explanation };
            }),
            BatchID: questionForAdd && questionForAdd.BatchID,
            Mode: 'single',
            Action: 'next',
          };
        } else {
          return q;
        }
      });
      localStorage.setItem('invalidSingleQuestionArr', JSON.stringify(invalidSingleQuestionArrGetUpdate));
    }

    const quesNextBackSet = {
      ...questionNextBack,
      ID: isFillAll
        ? questionNextBack?.Action === 'next'
          ? questionNextBack?.ID - 1
          : questionNextBack?.ID
        : questionNextBack?.ID,
    };
    if (questionNextBack?.Mode === 'single') {
      dispatch(SetQuestionAdd(quesNextBackSet));
    } else {
      dispatch(SetCompositeQuestionAdd(quesNextBackSet));
      navigate('/admin/question/addCompositeQuestion');
    }
    setState({ ...state, modalConfirmNextBackVisible: false });
  };

  const handleClickNoNextBack = () => {
    const id = JSON.parse(localStorage.getItem('currentQuestionID') + '');
    if (questionNextBack?.Action === 'next') {
      localStorage.setItem('currentQuestionID', id + 1 + '');
    } else {
      localStorage.setItem('currentQuestionID', id - 1 + '');
    }
    //Notify id is change to re-cal the title
    const event = new Event('currentQuestionIDChanged');
    window.dispatchEvent(event);

    if (questionNextBack && questionNextBack?.Mode === 'single') {
      dispatch(SetQuestionAdd(questionNextBack));
    } else {
      dispatch(SetCompositeQuestionAdd(questionNextBack));
      navigate('/admin/question/addCompositeQuestion');
    }
    setState({ ...state, modalConfirmNextBackVisible: false });
  };

  const invalidSingleQuestionArrGet = useMemo(() => {
    const data = localStorage.getItem('invalidSingleQuestionArr');
    return data ? JSON.parse(data) : [];
  }, []);

  const invalidCompositeQuestionArrGet = useMemo(() => {
    const data = localStorage.getItem('invalidCompositeQuestionArr');
    return data ? JSON.parse(data) : [];
  }, []);

  const handleBack = () => {
    navigate(`/admin/question`, { state: { page: page } });
  };
  const handleClickSave = () => {
    if (canSaveQuestionStatus()) {
      if (isDisable) {
        setState({
          ...state,
          modalNotifySaveToExam: true,
        });
      } else {
        handleSave();
        // navigate('/admin/question')
        handleBack();
      }
    }
  };

  let headerText = 'Information';
  // questionForAdd
  //   ? `ID: ${questionForAdd.ID}_Single Question`
  //   : questionForEdit
  //     ? `Question details: ${questionForEdit?.ExamTypeID?.toString().padStart(2, '0')}-Q${questionForEdit?.ID.toString().padStart(4, '0')}`
  //     : 'Question details';
  let isDisable = questionForEdit
    ? !(questionForEdit?.TopicSetID == 0 || questionForEdit?.TopicSetID == null)
      ? true
      : false
    : false;

  const BatchCode =
    questionForAdd && questionForAdd?.BaCode
      ? questionForAdd?.BaCode
      : questionForAdd?.BatchCode
        ? questionForAdd?.BatchCode
        : questionForEdit?.BaCode
          ? questionForEdit?.BaCode
          : questionForEdit?.BatchCode
            ? questionForEdit?.BatchCode
            : 'N/A';

  return (
    <StyledAddQuestion>
      {/* <PageHeader className="ninjadash-page-header-main" title="" routes={PageRoutes} /> */}
      <Main style={{}}>
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
                <Row style={{ marginBottom: 20 }}>
                  <Col span={1}></Col>
                  <Col style={{ fontSize: 20, color: 'black', fontWeight: 550 }} span={11}>
                    {headerText}
                  </Col>
                  <Col style={{ display: 'flex', justifyContent: 'flex-end' }} span={12}>
                    <Button
                      style={{
                        marginRight: 20,
                        width: 120,
                        backgroundColor: '#FFF',
                        color: themeColor['primary-color'],
                        border: `1px solid ${themeColor['primary-color']}`,
                      }}
                      mergetype="danger"
                      onClick={() =>
                        checkAnyThingChangeWhenEdit()
                          ? openModalConfirm()
                          : questionForAdd
                            ? navigate('/admin/question/errorQuestion')
                            : handleBack()
                      }
                    >
                      Exit
                    </Button>
                    <Button
                      style={{
                        width: 120,
                        opacity: canSaveQuestionStatus() && !isDisable ? 1 : 0.5,
                        cursor: canSaveQuestionStatus() && !isDisable ? 'pointer' : 'default',
                      }}
                      mergetype="primary"
                      onClick={handleClickSave}
                    >
                      Save
                    </Button>
                  </Col>
                </Row>

                <Row style={{}}>
                  <Col span={1}></Col>
                  <Col span={7}>
                    <Form.Item
                      name="ExamType"
                      label={
                        <span style={{ fontSize: 18, fontWeight: 600 }}>
                          <span style={{ color: 'red' }}>* </span> Subject (L1)
                        </span>
                      }
                      style={{ marginBottom: 10 }}
                    >
                      <Tooltip title={state.examTypeToolTipText}>
                        <Select
                          listHeight={155}
                          className="custom-select"
                          style={{ width: '100%' }}
                          showSearch
                          filterOption={(input, option) =>
                            removeAscent(option?.label?.toString() ?? '')
                              .toLowerCase()
                              .includes(input.toLowerCase()) ||
                            (option?.label?.toString() ?? '').toLowerCase().includes(input.toLowerCase())
                          }
                          optionLabelProp="label"
                          aria-required
                          disabled={isDisable}
                          placeholder="Exam Type"
                          onChange={(value) => {
                            handleExamTypeChange(value);
                            setState({
                              ...state,
                              examTypeToolTipText: listAllExamType?.filter((e) => e.ID == value)[0]?.Name ?? '',
                            });
                          }}
                          value={examTypeInput}
                          autoFocus
                        >
                          {getListSelectExamType().map((option) => (
                            <Select.Option key={option.value} value={option.value} label={option.label}>
                              {/* <Tooltip title={option.name}> */}
                              {option.label}
                              {/* </Tooltip> */}
                            </Select.Option>
                          ))}
                        </Select>
                      </Tooltip>
                    </Form.Item>
                  </Col>
                  <Col span={1}></Col>
                  <Col span={7}>
                    <Form.Item
                      name="L2Code"
                      label={
                        <span style={{ fontSize: 18, fontWeight: 600 }}>
                          <span style={{ color: 'red' }}>*</span> L2's Name
                        </span>
                      }
                      style={{ marginBottom: 10 }}
                    >
                      <Select
                        className={!l2CodeInput && questionForAdd ? 'custom-select border-red' : 'custom-select'}
                        style={{ width: '100%' }}
                        showSearch
                        filterOption={(input, option) =>
                          removeAscent(option?.label?.toString() ?? '')
                            .toLowerCase()
                            .includes(input.toLowerCase()) ||
                          (option?.label?.toString() ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        optionLabelProp="label"
                        onChange={handleL2Change}
                        aria-required
                        disabled={isDisable || examTypeInput == undefined}
                        placeholder={`L2's Name`}
                        value={l2CodeInput}
                        listHeight={155}
                      >
                        {getListSelectKA().map((option) => (
                          <Select.Option key={option.value} value={option.value} label={option.label}>
                            {/* <Tooltip title={option.name}> */}
                            {option.label}
                            {/* </Tooltip> */}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                    {!l2CodeInput && questionForAdd && (
                      <div style={{ fontSize: 16, color: '#D52929' }}>*Please select information</div>
                    )}
                  </Col>
                  <Col span={1}></Col>
                  <Col span={7}>
                    <Form.Item
                      name="L3Name"
                      label={
                        <span style={{ fontSize: 18, fontWeight: 600 }}>
                          <span style={{ color: 'red' }}>*</span> L3's Name
                        </span>
                      }
                      style={{ marginBottom: 10 }}
                    >
                      <Select
                        className={!l3NameInput && questionForAdd ? 'custom-select border-red' : 'custom-select'}
                        style={{ width: '100%', marginBottom: 10 }}
                        showSearch
                        filterOption={(input, option) =>
                          removeAscent(option?.label?.toString() ?? '')
                            .toLowerCase()
                            .includes(input.toLowerCase()) ||
                          (option?.label?.toString() ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        optionLabelProp="label"
                        onChange={handleL3Change}
                        aria-required
                        disabled={isDisable || examTypeInput == undefined || l2CodeInput == undefined}
                        placeholder={`L3's Name`}
                        value={l3NameInput}
                        listHeight={155}
                      >
                        {getListSelectTask().map((option) => (
                          <Select.Option key={option.value} value={option.value} label={option.label}>
                            {/* <Tooltip title={option.name}> */}
                            {option.label}
                            {/* </Tooltip> */}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                    {!l3NameInput && questionForAdd && (
                      <div style={{ fontSize: 16, color: '#D52929' }}>*Please select information</div>
                    )}
                  </Col>
                </Row>

                <Row style={{ marginBottom: 40 }}>
                  <Col span={1}></Col>
                  <Col span={7}>
                    <Form.Item
                      name="Status"
                      label={<span style={{ fontSize: 18, fontWeight: 600 }}>Status</span>}
                      style={{ marginBottom: 10 }}
                    >
                      <Select
                        className={
                          statusInput == 1
                            ? `custom-select statusStyleActive`
                            : statusInput == 0
                              ? `custom-select statusStyleInactive`
                              : 'custom-select statusStyleNormal'
                        }
                        filterOption={(input, option) =>
                          (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        options={listStatus}
                        disabled={isDisable}
                        value={statusInput}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={1}></Col>
                  <Col span={7}>
                    <Form.Item
                      name="Score"
                      label={<span style={{ fontSize: 18, fontWeight: 600 }}>Score</span>}
                      normalize={(value) => value.trimStart()}
                    >
                      <Input
                        value={scoreInput}
                        className="custom-input"
                        disabled={isDisable}
                        type="number"
                        min={1}
                        max={255}
                        placeholder="1"
                        onChange={handleChange1}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={1}></Col>
                  <Col span={7}>
                    <Form.Item
                      name="BatchID"
                      label={<span style={{ fontSize: 18, fontWeight: 600 }}>Batch ID</span>}
                      normalize={(value) => value.trimStart()}
                    >
                      <span
                        className="custom-input"
                        style={{
                          display: 'block',
                          height: 50,
                          border: '1px solid rgb(227, 230, 239)',
                          borderRadius: 4,
                          padding: '12px 20px',
                          cursor: 'not-allowed',
                          userSelect: 'none',
                          color: '#000',
                        }}
                      >
                        {BatchCode}
                      </span>
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={1}></Col>
                  <Col style={{ fontSize: 20, fontWeight: 550, color: 'black', marginBottom: 20 }} span={23}>
                    <span style={{ color: 'red' }}>*</span> Question
                  </Col>
                </Row>
                <Row>
                  <Col span={1}></Col>
                  <Col span={23}>
                    <QuestionBox
                      placeHolder="Enter question description here"
                      isDisable={isDisable}
                      initData={state.questionContentBase64 + ''}
                      setData={(data) => setState({ ...state, questionContentBase64: data })}
                      isFill={
                        questionForAdd === null ||
                        (state.questionContentBase64 !== '' &&
                          state.questionContentBase64 !== null &&
                          state.questionContentBase64 !== undefined)
                      }
                    />
                  </Col>
                </Row>

                <Row style={{ marginTop: 40 }}>
                  <Col span={1}></Col>
                  <Col style={{ fontSize: 20, color: 'black', fontWeight: 550 }}>
                    <span style={{ color: 'red' }}>*</span> Key
                  </Col>
                </Row>

                <Row style={{ marginTop: 20 }}>
                  <Col span={1}></Col>
                  <Col
                    style={{ border: !selectedAnswer && questionForAdd ? '1px solid red' : '', padding: 10 }}
                    span={23}
                  >
                    <Form layout="vertical">
                      <Form.Item>
                        <Radio.Group onChange={handleRadioChange} value={selectedAnswer} className="full-width">
                          {answers.map((answer, index) => (
                            <Row key={index} gutter={[16, 16]} align="middle" className="answer-row">
                              <Col>
                                <Radio disabled={isDisable} value={index + 1}>
                                  {index == 0 ? 'A' : index == 1 ? 'B' : index == 2 ? 'C' : 'D'}
                                </Radio>
                              </Col>
                              <Col flex="none" style={{ width: '50%' }}>
                                <Form.Item>
                                  <Row>
                                    <Col span={16}>
                                      <TextArea
                                        maxLength={500}
                                        className="custom-input"
                                        style={{
                                          height: '120px',
                                          width: '100%',
                                          borderColor: !answer.content && questionForAdd ? '#D52929' : '',
                                        }}
                                        value={answer.content}
                                        onChange={(e) => handleContentChange(index, e)}
                                        rows={2}
                                        placeholder={`Input text`}
                                        disabled={isDisable}
                                      />
                                      {!answer.content && questionForAdd && (
                                        <div style={{ fontSize: 16, color: '#D52929' }}>
                                          *Please fill in the information in this box
                                        </div>
                                      )}
                                    </Col>
                                    <Col span={2}></Col>
                                    <Col span={6}>
                                      {index + 1 === selectedAnswer ? (
                                        <div style={{ marginTop: '30px', color: '#3AC943', fontWeight: 550 }}>
                                          Correct
                                        </div>
                                      ) : (
                                        <div style={{ marginTop: '30px' }}></div>
                                      )}
                                    </Col>
                                  </Row>
                                </Form.Item>
                              </Col>
                              <Col style={{ textAlign: 'end' }} flex="auto">
                                <Form.Item>
                                  <Row justify="end">
                                    <Col span={1}></Col>
                                    <Col span={5}>
                                      {index === 0 ? (
                                        <div style={{ marginTop: '25px', fontWeight: 500 }}>
                                          <span style={{ color: 'red' }}>*</span> Explaination
                                        </div>
                                      ) : (
                                        <div style={{ marginTop: '25px' }}></div>
                                      )}
                                    </Col>

                                    <Col span={1}></Col>
                                    <Col span={17}>
                                      <TextArea
                                        maxLength={500}
                                        className="custom-input"
                                        style={{
                                          width: '100%',
                                          height: '120px',
                                          borderColor: !answer.explanation && questionForAdd ? '#D52929' : '',
                                        }}
                                        value={answer.explanation}
                                        onChange={(e) => handleExplanationChange(index, e)}
                                        rows={2}
                                        placeholder="Input text"
                                        disabled={isDisable}
                                      />
                                      {/* Align the validation message to the start */}
                                      {!answer.explanation && questionForAdd && (
                                        <div style={{ display: 'flex', justifyContent: 'start' }}>
                                          <div style={{ fontSize: 16, color: '#D52929' }}>
                                            *Please fill in the information in this box
                                          </div>
                                        </div>
                                      )}
                                    </Col>
                                  </Row>
                                </Form.Item>
                              </Col>
                            </Row>
                          ))}
                        </Radio.Group>
                      </Form.Item>
                    </Form>
                  </Col>
                  <Col span={1}></Col>
                  {!selectedAnswer && questionForAdd && (
                    <Col>
                      <div style={{ fontSize: 16, color: '#D52929', marginTop: 12 }}>
                        *Please mark the correct answer
                      </div>
                    </Col>
                  )}
                </Row>

                {questionForAdd && (
                  <Row>
                    <Col style={{ display: 'flex', justifyContent: 'flex-end' }} span={24}>
                      <Button
                        style={{
                          marginRight: 20,
                          width: 120,
                          backgroundColor: '#FFF',
                          color: themeColor['primary-color'],
                          border: `1px solid ${themeColor['primary-color']}`,
                        }}
                        disabled={questionForAdd?.ID === 1}
                        mergetype="primary"
                        onClick={handleClickBack}
                      >
                        Back
                      </Button>
                      <Button
                        disabled={
                          questionForAdd?.ID ===
                          invalidSingleQuestionArrGet?.length + invalidCompositeQuestionArrGet?.length
                        }
                        style={{ width: 120 }}
                        mergetype="primary"
                        onClick={handleClickNext}
                      >
                        Next
                      </Button>
                    </Col>
                  </Row>
                )}
              </Col>
            </Row>
          </Suspense>
        </Form>

        <Modal
          closable={false}
          centered
          open={state.modalConfirmEditVisible || state.modalNotifySaveToExam}
          onCancel={() => setState({ ...state, modalConfirmEditVisible: false, modalNotifySaveToExam: false })}
          footer={null}
          maskClosable={false}
        >
          <div style={{ justifyItems: 'center', display: 'grid', marginBottom: 20 }}>
            <div style={{ textAlign: 'center', fontSize: 24, color: '#000', fontWeight: 600 }}>
              {state.modalNotifySaveToExam
                ? 'Are you sure you save the question information?'
                : 'Are you sure you want to exit?'}
            </div>
          </div>
          <div style={{ textAlign: 'center', fontSize: 18, color: '#000', fontWeight: 600 }}>
            {state.modalNotifySaveToExam
              ? 'Related exams will be updated'
              : 'Any changes will not be saved if "Save" is not selected'}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            {state.modalConfirmEditVisible && (
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
                onClick={() => setState({ ...state, modalConfirmEditVisible: false })}
              >
                No
              </Button>
            )}
            <Button
              style={{ marginTop: 20, width: 160 }}
              type="primary"
              key="submit"
              onClick={() => (state.modalNotifySaveToExam ? handleSave() : handleExit())}
            >
              {state.modalNotifySaveToExam ? 'Ok' : 'Yes'}
            </Button>
          </div>
        </Modal>

        <Modal
          closable={false}
          centered
          open={state.modalConfirmNextBackVisible}
          onCancel={() => setState({ ...state, modalConfirmNextBackVisible: false })}
          footer={null}
          maskClosable={false}
        >
          <div style={{ justifyItems: 'center', display: 'grid', marginTop: 10 }}>
            <Heading as="h4">Do you want to save this question information</Heading>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
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
              onClick={handleClickNoNextBack}
            >
              No
            </Button>
            <Button style={{ marginTop: 20, width: 160 }} type="primary" key="submit" onClick={handleSaveNextBack}>
              Yes
            </Button>
          </div>
        </Modal>
      </Main>
    </StyledAddQuestion>
  );
};

export default AddQuestion;
