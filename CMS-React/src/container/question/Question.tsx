import { Route } from '@ant-design/pro-layout/es/typing';
import { UploadOutlined } from '@ant-design/icons';
import UilTrashAlt from '@iconscout/react-unicons/dist/icons/uil-trash-alt';
import UilPen from '@iconscout/react-unicons/dist/icons/uil-pen';
import { Modal, Skeleton, Tooltip, Dropdown, MenuProps } from 'antd';
import { Button } from 'components/buttons/Buttons';
import { Cards } from 'components/cards/frame/CardsFrame';
import { Main } from 'container/Style';
import { ChangeEvent, FC, ReactNode, Suspense, useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/RootReducer';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { themeColor } from 'config/theme/ThemeVariables';
import { AnswerModel, BatchModel, QuestionApiModel, QuestionModel } from 'store/question/Types';
import {
  addQuestion,
  createBatch,
  createCompositeQuestion,
  deleteQuestion,
  downloadTemplateFillQuestion,
  fetchListQuestion,
  filterQuestion,
  passDetailsQuestion,
  SetCompositeQuestionAdd,
  SetCompositeQuestionDetail,
  SetQuestionAdd,
} from 'store/question/Actions';
import { Heading } from 'components/heading/Heading';
import '../question/Question.css';
import * as XLSX from 'xlsx';
import { fetchListExamTypeAll } from 'store/exam-type/Actions';
import { fetchListTaskAll } from 'store/task/Actions';
import { openNotification } from 'utility/Utility';
import QuestionFilter from './QuestionFilter';
import { Tab } from 'components/tabs/Tabs';
import CompositeQuestion from './composite-question/CompositeQuestion';
import SingleQuestion from './single-question/SingleQuestion';
import { fetchListKAAll } from 'store/ka/Actions';
import { fetchListBatchID } from 'store/batch/Action';
import { is } from 'date-fns/locale';
import { get } from 'http';

// const SingleQuestion = lazy(() => import('./single-question/SingleQuestion'));
// const CompositeQuestion = lazy(() => import('./composite-question/CompositeQuestion'));

interface IQuestionTableData {
  ID: number;
  Code?: string | undefined;
  TaskID?: ReactNode;
  Status?: number;
  Score?: number;
  Question?: string;
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

interface IQuestion {}

const Question: FC<IQuestion> = (props) => {
  const PageRoutes: Route[] = [
    {
      path: '',
      breadcrumbName: 'Category',
    },
    {
      path: '',
      breadcrumbName: 'List',
    },
  ];

  const navigate = useNavigate();
  const location = useLocation();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const questionList = useSelector((states: RootState) => states.question.data);
  const examTypeAll = useSelector((states: RootState) => states.examType.dataAll);
  const taskAll = useSelector((states: RootState) => states.task.dataAll);
  const loading = useSelector((states: RootState) => states.question.loading);
  const KaAll = useSelector((state: RootState) => state.ka.dataAll);
  const BatchIdAll = useSelector((state: RootState) => state.batch.data);
  const [type, setType] = useState('1');
  const dispatch = useDispatch<any>();
  const [state, setState] = useState({
    searchKey: '',
    keyChange: '',
    // chỉ dùng khi fake data, khi nào ghép API thì k sử dụng nữa, sử dụng redux (categoryList)
    modalConfirmVisible: false,
    typeConfirm: 1,
    questionSelectToDelete: {} as QuestionModel,
    filter: {} as QuestionApiModel,
    page: 1,
  });
  const [isSingleImportFullSuccess, setIsSingleImportFullSuccess] = useState(false);
  const [isCompositeImportFullSuccess, setIsCompositeImportFullSuccess] = useState(false);
  const [isShowModalImportSuccess, setIsShowModalImportSuccess] = useState(false);
  const [showToastImportSuccess, setShowToastImportSuccess] = useState(false);

  const [flagHasErrorQues, setFlagHasErrorQues] = useState(false);
  const [first, setFirst] = useState(true);

  const [emptySheet1, setEmptySheet1] = useState(false);
  const [emptySheet2, setEmptySheet2] = useState(false);

  useEffect(() => {
    if (isSingleImportFullSuccess && isCompositeImportFullSuccess) {
      setIsShowModalImportSuccess(true);
    } else if (isSingleImportFullSuccess) {
      setShowToastImportSuccess(true);
    } else if (isCompositeImportFullSuccess) {
      setShowToastImportSuccess(true);
    }
  }, [isSingleImportFullSuccess, isCompositeImportFullSuccess]);

  useEffect(() => {
    if (emptySheet1 && emptySheet2) {
      openNotification('error', 'Import failed', 'Empty file!');
      setEmptySheet1(false);
      setEmptySheet2(false);
    }
  }, [emptySheet1, emptySheet2]);

  useEffect(() => {
    if (showToastImportSuccess) {
      openNotification('success', 'Success', 'Saved successfully');
      setShowToastImportSuccess(false);
      const values = {} as QuestionApiModel;
      values.id = state.filter.id;
      values.content = state.filter.content;
      values.code = state.filter.code;
      values.l1 = state.filter.l1;
      values.l2 = state.filter.l2;
      values.l3 = state.filter.l3;
      values.type = type;
      values.page = state.page;
      values.status = state.filter.status;
      try {
        dispatch(filterQuestion(values));
        
      } catch (error) {}
    }
  }, [showToastImportSuccess]);

  useEffect(() => {
    if (!first) {
      var invalidSingleQuestionArrGet = JSON.parse(localStorage.getItem('invalidSingleQuestionArr') + '');
      if (invalidSingleQuestionArrGet === null) invalidSingleQuestionArrGet = [];
      var invalidCompositeQuestionArrGet = JSON.parse(localStorage.getItem('invalidCompositeQuestionArr') + '');
      if (invalidCompositeQuestionArrGet === null) invalidCompositeQuestionArrGet = [];

      if (invalidSingleQuestionArrGet?.length > 0 || invalidCompositeQuestionArrGet?.length > 0) {
        navigate('/admin/question/errorQuestion');
      }
    }
    setFirst(false);
  }, [flagHasErrorQues]);

  useEffect(() => {
    getListQuestion();
    dispatch(fetchListExamTypeAll());
    dispatch(fetchListTaskAll());
    dispatch(fetchListKAAll());
    dispatch(fetchListBatchID());
  }, [state.page]);

  useEffect(() => {
    //Reset
    dispatch(SetQuestionAdd(null));
    dispatch(passDetailsQuestion(null));
    dispatch(SetCompositeQuestionAdd(null));
    dispatch(SetCompositeQuestionDetail());

    getListQuestion();
  }, [type, state.page]);

  useEffect(() => {
    const currentPage = location.state?.page || 1;
    console.log('currentPage123: ',currentPage);
    setState({ ...state, page: currentPage, filter: { ...state.filter, page: currentPage } });
  }, []);



  const getListQuestion = () => {
    // let keyWord = state.searchKey.trim();
    // setState({ ...state, searchKey: keyWord });
    // dispatch(fetchListQuestion(keyWord, state.page, 10));

    const values = {} as QuestionApiModel;
    values.id = state.filter.id;
    values.content = state.filter.content;
    values.code = state.filter.code;
    values.l1 = state.filter.l1;
    values.l2 = state.filter.l2;
    values.l3 = state.filter.l3;
    values.type = type;
    values.page = state.page;
    values.status = state.filter.status;
    try { 
      dispatch(filterQuestion(values));
    } catch (error) {}
  };

  const onChangePage = (page: number) => {
    setState({ ...state, page, filter: { ...state.filter, page } });
  };

  const onChangeSearchBar = (e: ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, searchKey: e.currentTarget.value });
  };

  const openModalConfirm = (question: QuestionModel) => {
    setState({ ...state, modalConfirmVisible: true, questionSelectToDelete: question });
  };

  const closeModalConfirm = () => {
    setState({ ...state, modalConfirmVisible: false });
  };

  const deleteQuestionConfirm = () => {
    if (state?.questionSelectToDelete?.ID) {
      dispatch(deleteQuestion(state?.questionSelectToDelete?.ID));
      
    
    }
    setState({ ...state, modalConfirmVisible: false, questionSelectToDelete: {} as QuestionModel });
    
  };
  const changeFilterForm = (values: QuestionApiModel) => {
    values.page = 1;

    setState({ ...state, filter: values, page: 1 });
  };
  const handleDownloadTemplateFillQuestion = async () => {
    dispatch(downloadTemplateFillQuestion());
  };

  // const dataTableColumn = [

  const handleImportFileXls = () => {
    // Programmatically open the file input dialog
    fileInputRef.current?.click();
  };
  const handleReview = () => {
 
    navigate('/admin/question/errorQuestion');
  };


  const tabData = [
    {
      key: '1',
      tabTitle: 'Single Question',
      content: (
        <SingleQuestion
          handleDownloadTemplateFillQuestion={handleDownloadTemplateFillQuestion}
          handleImportFileXls={handleImportFileXls}
          hanldePageChange={onChangePage}
          type={type}
          page={state.filter.page}
        />
      ),
    },
    {
      key: '2',
      tabTitle: 'Composite Question',
      content: (
        <CompositeQuestion
          handleDownloadTemplateFillQuestion={handleDownloadTemplateFillQuestion}
          handleImportFileXls={handleImportFileXls}
          hanldePageChange={onChangePage}
          type={type}
          page={state.filter.page}
        />
      ),
    },
  ];

  const onChangeTab = (index: string) => {
    setType(index);
    setState({ ...state, page: state.page });
  };

  const handleAdd = () => {
    localStorage.removeItem('currentQuestionID');
    localStorage.removeItem('currentSingleQuestionCode');
    const event = new Event('currentQuestionIDChanged');
    window.dispatchEvent(event);
    dispatch(SetQuestionAdd(null));
    dispatch(SetCompositeQuestionAdd(null));
    dispatch(passDetailsQuestion(null));
    navigate('/admin/question/addQuestion');
  };

  const handleAddCompositeQuestion = () => {
    localStorage.removeItem('currentQuestionID');
    localStorage.removeItem('currentSingleQuestionCode');
    const event = new Event('currentQuestionIDChanged');
    window.dispatchEvent(event);
    dispatch(SetQuestionAdd(null));
    dispatch(SetCompositeQuestionAdd(null));
    dispatch(passDetailsQuestion(null));
    navigate('/admin/question/addCompositeQuestion');
  };

  const isFirstNumbersValuesEmpty = (arr: any[], numbers: number): boolean => {
    const firstTwenty = arr?.slice(0, numbers);
    return firstTwenty?.every((value) => value === undefined || value === null || value === '');
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      if (fileExtension !== 'xls') {
        openNotification('error', '', 'The uploaded files must be in XLS');
        return;
      }

      const maxSizeInMB = 5;
      const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
      if (file.size > maxSizeInBytes) {
        openNotification('error', '', 'The uploaded file must be <= 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook: XLSX.WorkBook = XLSX.read(data, { type: 'array' });

        // Get the first and second sheets
        const sheetName1 = workbook.SheetNames[0];
        const worksheet1 = workbook.Sheets[sheetName1];

        const sheetName2 = workbook.SheetNames[1];
        const worksheet2 = workbook.Sheets[sheetName2];
        const options = {
          raw: true,
          header: 1,
          skipHidden: true,
        };

        // Convert both sheets to JSON and filter out unwanted columns
        var jsonDataSheet1 = XLSX.utils.sheet_to_json(worksheet1, options) as any[];
        jsonDataSheet1.map((row): { [key: string]: any } => {
          const obj: { [key: string]: any } = {};
          row.forEach((value: any, index: any) => {
            const columnLetter = XLSX.utils.encode_col(index);
            if (!['X', 'Y', 'Z'].includes(columnLetter)) {
              obj[columnLetter] = value;
            }
          });
          return obj;
        });
        jsonDataSheet1 = jsonDataSheet1.slice(2);
        var indexSlice1 = 0;
        for (let i = 0; i < jsonDataSheet1.length; i++) {
          if (
            isFirstNumbersValuesEmpty(jsonDataSheet1[i], 8) &&
            isFirstNumbersValuesEmpty(jsonDataSheet1[i + 1], 8) &&
            isFirstNumbersValuesEmpty(jsonDataSheet1[i + 2], 8) &&
            isFirstNumbersValuesEmpty(jsonDataSheet1[i + 3], 8)
          ) {
            indexSlice1 = i + 1;
            break;
          }
        }
        if (indexSlice1 !== 0) {
          jsonDataSheet1 = jsonDataSheet1?.slice(0, indexSlice1 - 1);
        }

        var jsonDataSheet2 = XLSX.utils.sheet_to_json(worksheet2, options) as any[];
        jsonDataSheet2.map((row): { [key: string]: any } => {
          const obj: { [key: string]: any } = {};
          row.forEach((value: any, index: any) => {
            const columnLetter = XLSX.utils.encode_col(index);
            if (!['X', 'Y', 'Z'].includes(columnLetter)) {
              obj[columnLetter] = value;
            }
          });
          return obj;
        });
        jsonDataSheet2 = jsonDataSheet2.slice(2);

        var indexSlice2 = 0;
        for (let i = 0; i < jsonDataSheet2.length; i++) {
          if (
            isFirstNumbersValuesEmpty(jsonDataSheet2[i], 10) &&
            isFirstNumbersValuesEmpty(jsonDataSheet2[i + 1], 10) &&
            isFirstNumbersValuesEmpty(jsonDataSheet2[i + 2], 10) &&
            isFirstNumbersValuesEmpty(jsonDataSheet2[i + 3], 10)
          ) {
            indexSlice2 = i + 1;
            break;
          }
        }

        if (indexSlice2 !== 0) {
          jsonDataSheet2 = jsonDataSheet2?.slice(0, indexSlice2 - 1);
        }
        const callBackWhenCreateBatchSuccess = (batch: BatchModel) => {
          //Clear storage
          localStorage.removeItem('invalidCompositeQuestionArr');
          localStorage.removeItem('invalidSingleQuestionArr');

          handleImportSheet1(jsonDataSheet1, batch);
          handleImportSheet2(jsonDataSheet2, batch);
        };
        dispatch(createBatch(callBackWhenCreateBatchSuccess));

        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleImportSheet1 = (data: any, batch: BatchModel) => {
    console.log('dataSheet1: ',data);
    
    var quesArr: any[] = [];
    var rsCheck = true;
    var showToastSuccess = false;
    if (data?.length === 0) {
      setEmptySheet1(true);
      return;
    }
    data?.forEach((row: any, index: number) => {
      if (quesArr.length > 0 && row[1] !== undefined && row[1] !== '' && row[1] !== null) {
        if (quesArr.length > 4) {
          quesArr = quesArr.slice(0, 4);
        }
        const rs = handleImportSingleQuestion(quesArr, batch);
        if (!rs) rsCheck = false;
        else showToastSuccess = true;
        quesArr = [];
      }

      if (quesArr.length === 0 && row[1] !== undefined && row[1] !== '' && row[1] !== null) {
        quesArr.push(row);
      } else {
        if (quesArr.length > 0) {
          quesArr.push(row);
        }
      }
    });

    if (quesArr.length > 0) {
      if (quesArr.length > 4) {
        quesArr = quesArr.slice(0, 4);
      }
      const rs = handleImportSingleQuestion(quesArr, batch);
      if (!rs) rsCheck = false;
      else showToastSuccess = true;
      quesArr = [];
    }
    if (showToastSuccess) setShowToastImportSuccess(true);
    if (rsCheck) {
      setIsSingleImportFullSuccess(true);
    } else {
      setFlagHasErrorQues(true);
    }
  };

  const isNullEmpty = (value: any) => {
    return value === undefined || value === null || value === '';
  };

  const handleImportSingleQuestion = (quesArr: any[], batch: BatchModel): boolean => {
    try {
      const realStatus = ['Inactive', 'Active'];
      var arrAnswer: any = [];
      var isValidQues = true;
      // var examtypeID = 0;//Gan luon bang ids
      // var taskID = 0;//Gan luon bang ids
      var score = 0;
      var status = '';
      var question = '';
      var correctIndex = 0;
      // var numberOfCorrect = 0;
      console.log(quesArr);
      // if (quesArr.length === 0) {
      //   // openNotification('error', '', 'Save failed');
      //   console.log('hehehehehe');
      //   setFlagHasErrorQues(true);
      //   return false;
      // }
      quesArr.forEach((element, index) => {
        if (score === 0 && !isNullEmpty(element[2])) {
          const scp = parseInt(element[2]);
          if (scp > 0 && scp <= 255) score = scp;
          else score = 1;
        }
        if (status === '' && !isNullEmpty(element[3])) {
          if (realStatus.includes(element[3])) status = element[3];
        }
        if (status === '') status = 'Inactive';
        if (question === '' && !isNullEmpty(element[4])) {
          question = element[4];
        }
        if (!isNullEmpty(element[6])) {
          if (element[6] == 1) {
            correctIndex = index + 1;
            // numberOfCorrect++;
          }
        }
        if (isNullEmpty(element[5]) || isNullEmpty(element[7])) {
          isValidQues = false;
        }
        // if (numberOfCorrect != 1) {
        //   isValidQues = false;
        // }
        arrAnswer.push({ content: element[5], explanation: element[7] });
      });
      if (question === '' || correctIndex === 0 || arrAnswer.length !== 4) {
        isValidQues = false;
      }

      const l3Arr = quesArr?.[0]?.[1]?.split('-') || [];
      const listExamtypeIds: string[] = []; //format: l2id-l1id
      const listTaskIds: string[] = []; //format: l3id-l2id-l1id
      var getIds: string = ''; //format: l3id-l2id-l1id
      const [l3, l2, l1] = l3Arr.length >= 3 ? l3Arr : [undefined, undefined, undefined];
      examTypeAll?.forEach((examTypeE) => {
        if (examTypeE.ExamType === l1) {
          examTypeE.kas?.forEach((ka) => {
            if (ka.Name === l2) listExamtypeIds.push(ka.ID + '-' + examTypeE.ID);
          });
        }
      }); 
      taskAll?.forEach((taskE) => {
        if (taskE.Name === l3) listTaskIds.push(taskE.ID + '-' + taskE.KAID + '-' + taskE.examType?.ID);
      });

      listTaskIds.forEach((tIds) => {
        listExamtypeIds.forEach((eIds) => {
          const tArr = tIds.split('-');
          if (tArr[1] + '-' + tArr[2] === eIds && getIds === '') {
            getIds = tIds;
          }
        });
      });

      if (isNullEmpty(getIds)) {
        isValidQues = false;
      }
      console.log('id?', getIds);
      console.log(correctIndex);
      console.log(isValidQues);
      const ids = getIds.split('-');
      let questionSubmit = {
        ExamTypeName: l1,
        L2ID: parseInt(ids[1]),
        ExamTypeID: parseInt(ids[2]),
        Code: 'no',
        TaskID: parseInt(ids[0]),
        Status: realStatus.indexOf(status),
        Score: score === 0 || score > 255 ? 1 : score,
        Question: typeof question === 'string' ? question.trim() : question,
        answers: [
          ...arrAnswer?.map((a: any, index: number) => {
            return {
              QuestionID: 0,
              Key: typeof a?.content === 'string' ? a.content.trim() : '',
              State: correctIndex === index + 1,
              Explain: typeof a?.explanation === 'string' ? a.explanation.trim() : '',
            };
          }),
        ],
        notShowToastSuccess: true,
        BatchID: batch.ID,
        BatchCode: batch.Code,
      };
      console.log(questionSubmit);
      if (
        !Number.isInteger(questionSubmit.ExamTypeID) ||
        !Number.isInteger(questionSubmit.TaskID) ||
        !Number.isInteger(questionSubmit.Score)
      ) {
        isValidQues = false;
      }

      if (isValidQues) {
        dispatch(addQuestion(questionSubmit));
      } else {
        var invalidSingleQuestionArrGet = JSON.parse(localStorage.getItem('invalidSingleQuestionArr') + '');
        if (invalidSingleQuestionArrGet === null) invalidSingleQuestionArrGet = [];
        if (invalidSingleQuestionArrGet.length < 999) {
          invalidSingleQuestionArrGet.push(questionSubmit);
        }
        localStorage.setItem('invalidSingleQuestionArr', JSON.stringify(invalidSingleQuestionArrGet));
      }
      return isValidQues;
    } catch (error) {
      // openNotification('error', '', 'Save failed');
      console.log('ERRROR: ', error);
      // openNotification('error', 'Import failed', 'Empty file!');
      setFlagHasErrorQues(true);
      return false;
    }
  };

  const handleImportCompositeQuestion = (quesArr: any[], batch: BatchModel): boolean => {
    const realStatus = ['Inactive', 'Active'];
    var isValidQues = true;

    const examType =
      quesArr.length > 0 && quesArr[0][1] ? examTypeAll?.find((e) => e.ExamType === quesArr[0][1]) : null;
    var compositeQuestionSubmit: any = {};
    var arrQuestion: any[] = [];
    if (quesArr.length > 0 && examType) {
      compositeQuestionSubmit.ExamtypeID = examType?.ID;
      compositeQuestionSubmit.ExamtypeName = examType?.ExamType;
    } else {
      isValidQues = false;
    }

    if (isNullEmpty(quesArr[0][0]) || isNullEmpty(quesArr[0][2])) {
      isValidQues = false;
    }
    var status = realStatus.indexOf(quesArr[0][2]);
    if (![0, 1, 2].includes(status)) status = 0;

    compositeQuestionSubmit.BatchID = batch.ID;
    compositeQuestionSubmit.Status = status;
    compositeQuestionSubmit.Score = 0;
    compositeQuestionSubmit.Question = quesArr[0][0];
    compositeQuestionSubmit.BatchCode = batch.Code;
    // var examtypeID = 0;//Gan luon bang ids
    // var taskID = 0;//Gan luon bang ids
    quesArr.slice(1).forEach((arr) => {
      try {
        var arrAnswer: any = [];
        var score = 0;

        var question = '';
        var correctIndex = 0;
        const l3Arr = arr?.[0]?.[1]?.split('-') || [];
        const listExamtypeIds: string[] = []; //format: l2id-l1id
        const listTaskIds: string[] = []; //format: l3id-l2id-l1id
        var getIds: string = ''; //format: l3id-l2id-l1id
        const [l3, l2, l1] = l3Arr.length >= 3 ? l3Arr : [undefined, undefined, undefined];
        examTypeAll?.forEach((examTypeE) => {
          if (examTypeE.ExamType === l1) {
            examTypeE.kas?.forEach((ka) => {
              if (ka.Name === l2) listExamtypeIds.push(ka.ID + '-' + examTypeE.ID);
            });
          }
        });
        taskAll?.forEach((taskE) => {
          if (taskE.Name === l3) listTaskIds.push(taskE.ID + '-' + taskE.KAID + '-' + taskE.examType?.ID);
        });
        listTaskIds.forEach((tIds) => {
          listExamtypeIds.forEach((eIds) => {
            const tArr = tIds.split('-');
            if (tArr[1] + '-' + tArr[2] === eIds && getIds === '') {
              getIds = tIds;
            }
          });
        });

        if (isNullEmpty(getIds)) {
          isValidQues = false;
        }

        const ids = getIds.split('-');

        if (parseInt(ids[2]) !== examType?.ID) {
          isValidQues = false;
        }
        arr.forEach((element: any, index: number) => {
          if (score === 0 && !isNullEmpty(element[2])) {
            const scp = parseInt(element[2]);
            if (scp > 0 && scp <= 255) score = scp;
            else score = 1;
          }
          // if (status === '' && !isNullEmpty(element[3])) {
          //   if (realStatus.includes(element[3])) status = element[3];
          // }
          if (question === '' && !isNullEmpty(element[0])) {
            question = element[0];
          }
          if (correctIndex === 0 && !isNullEmpty(element[4])) {
            if (element[4]) correctIndex = index + 1;
          }
          if (isNullEmpty(element[3]) || isNullEmpty(element[5])) {
            isValidQues = false;
          }
          arrAnswer.push({ content: element[3] + '', explanation: element[5] + '' });
        });
        let questionSubmit = {
          IsKaidTaskidValidExamtypeID: parseInt(ids[2]) === examType?.ID,
          ExamTypeID: parseInt(ids[2]),
          L2ID: parseInt(ids[1]),
          Code: 'no',
          TaskID: parseInt(ids[0]),
          Status: status,
          Score: score === 0 || score > 255 ? 1 : score,
          Question: typeof question === 'string' ? question.trim() : question,
          answers: [
            ...arrAnswer?.map((a: any, index: number) => {
              return {
                QuestionID: 0,
                Key: typeof a?.content === 'string' ? a.content.trim() : '',
                State: correctIndex === index + 1,
                Explain: typeof a?.explanation === 'string' ? a.explanation.trim() : '',
              };
            }),
          ],
          notShowToastSuccess: true,
          BatchID: batch.ID,
        };
        if (question === '' || correctIndex === 0 || arrAnswer.length !== 4) {
          isValidQues = false;
        }
        arrQuestion.push(questionSubmit);
      } catch (error) {
        console.log('ERRROR: ', error);
      }
    });
    compositeQuestionSubmit.questions = arrQuestion;
    const firstExamtypeID = arrQuestion?.[0]?.ExamtypeID;
    const allSame = arrQuestion?.every((item) => item.ExamtypeID === firstExamtypeID);
    if (!allSame || arrQuestion.length === 0) {
      isValidQues = false;
    }

    if (compositeQuestionSubmit.Status === -1) {
      isValidQues = false;
    }

    if (isValidQues) {
      compositeQuestionSubmit.callbackFunc = () => {};
      compositeQuestionSubmit.Mode = 'nextBack';
      dispatch(createCompositeQuestion(compositeQuestionSubmit));
    } else {
      var invalidSingleQuestionArrGet = JSON.parse(localStorage.getItem('invalidSingleQuestionArr') + '');
      if (invalidSingleQuestionArrGet === null) invalidSingleQuestionArrGet = [];
      var invalidCompositeQuestionArrGet = JSON.parse(localStorage.getItem('invalidCompositeQuestionArr') + '');
      if (invalidCompositeQuestionArrGet === null) invalidCompositeQuestionArrGet = [];
      if (invalidSingleQuestionArrGet.length + invalidCompositeQuestionArrGet.length < 999) {
        invalidCompositeQuestionArrGet.push(compositeQuestionSubmit);
      }
      localStorage.setItem('invalidCompositeQuestionArr', JSON.stringify(invalidCompositeQuestionArrGet));
    }
    return isValidQues;
  };

  const handleImportSheet2 = (data: any, batch: BatchModel) => {
    console.log('data: ',data);
    
    var quesCompoArr: any[] = [];
    var quesArr: any[] = [];
    var checkHasCompoQues = false;
    var rsCheck = true;
    var showToastSuccess = false;
    if (data?.length === 0) {
      setEmptySheet2(true);
      return;
    }
    data?.forEach((row: any, index: number) => {
      if (!isNullEmpty(row[2])) {
        if (checkHasCompoQues && quesArr.length > 0) {
          if (quesArr.length > 4) quesArr = quesArr.slice(0, 4);
          quesCompoArr.push(quesArr);
          //handle CompoQues
          const rs = handleImportCompositeQuestion(quesCompoArr, batch);
          if (!rs) rsCheck = false;
          else showToastSuccess = true;
          quesCompoArr = [];
          quesArr = [];
        }
        quesCompoArr.push(row.slice(1, 4));
        checkHasCompoQues = true;
      }
      if (!isNullEmpty(row[5])) {
        if (quesArr.length > 0 && !isNullEmpty(quesArr[0][1])) {
          if (quesArr.length > 4) quesArr = quesArr.slice(0, 4);
          quesCompoArr.push(quesArr);
        }
        quesArr = [];
      }
      quesArr.push(row.slice(4, 10));
    });
    if (quesArr.length > 0 && !isNullEmpty(quesArr[0][1])) {
      if (quesArr.length > 4) quesArr = quesArr.slice(0, 4);
      quesCompoArr.push(quesArr);
    }

    if (checkHasCompoQues) {
      //handle CompoQues
      const rs = handleImportCompositeQuestion(quesCompoArr, batch);
      if (!rs) rsCheck = false;
      else showToastSuccess = true;
    }
    if (showToastSuccess) setShowToastImportSuccess(true);
    if (rsCheck) {
      setIsCompositeImportFullSuccess(true);
    } else {
      setFlagHasErrorQues(true);
    }
    if (!checkHasCompoQues) {
      quesCompoArr = [];
    }
  };

  //const handleEdit = (item: any) => {};
  const handleEdit = (item: any) => {
    const searchParams = new URLSearchParams(window.location.search);
    const currentPage = searchParams.get("page") || "1"; // Lấy page từ URL
  console.log('vaoedit');
  
    navigate(`/admin/question/addQuestion`, { state: { page: state.page, item } });
  };
  const tableDataScource: IQuestionTableData[] = [];

  questionList?.map((item) => {
    const {
      ID,
      TaskID,
      Status,
      Score,
      Question,
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
              width: 120,
              height: 52,
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
              width: 120,
              height: 52,
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
            <Link className="edit" to="#" onClick={() => handleEdit(item)}>
              <UilPen style={{ width: 24 }} color={themeColor['dark-gray']} />
            </Link>
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
  const menuTab = (
    <div className="ninjadash-datatable-filter__action" style={{ display: 'flex' }}>
      <Dropdown menu={{ items }} trigger={['click']} placement="bottomRight">
        <Button
          style={{
            backgroundColor: '#2DA354',
            color: '#FFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0px 10px',
          }}
        >
          <span style={{ width: 100 }}>+ Add</span>
          <span style={{ borderLeft: '1px solid #FFF', height: 30, marginRight: 4 }}></span>
          <svg
            viewBox="0 0 1024 1024"
            focusable="false"
            data-icon="caret-down"
            width="1em"
            height="1em"
            fill="#FFF"
            aria-hidden="true"
          >
            <path d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z"></path>
          </svg>
        </Button>
      </Dropdown>
      <Button
        style={{
          marginLeft: 20,
          marginRight: 20,
          backgroundColor: '#FFF',
          border: '1px solid #194F9F',
          color: '#194F9F',
        }}
        onClick={handleImportFileXls}
      >
        <UploadOutlined style={{ color: '#194F9F' }} />
        Import
      </Button>
      <Button
        style={{
          marginLeft: 20,
          marginRight: 20,
          backgroundColor: '#FFF',
          border: '1px solid #194F9F',
          color: '#194F9F',
        }}
        onClick={handleReview}
      >
        Review
      </Button>
    </div>
  );
  return (
    <>
      <style>
        {`
          .ant-tabs-nav::before {
    border: none !important;
}
          `}
      </style>
      <Main style={{ marginBottom: 45 }}>
        <Suspense
          fallback={
            <Cards headless>
              <Skeleton active />
            </Cards>
          }
        >
          <input
            id="fileInput"
            type="file"
            accept=".xls,.xlsx"
            style={{ display: 'none' }}
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          <Modal
            closable={false}
            centered
            open={state.modalConfirmVisible}
            onCancel={closeModalConfirm}
            footer={[
              <Button loading={loading} mergetype="primary" key="submit" onClick={deleteQuestionConfirm}>
                Yes
              </Button>,
              <Button mergetype="primary" outlined key="back" onClick={closeModalConfirm}>
                No
              </Button>,
            ]}
          >
            <div style={{ justifyItems: 'center', display: 'grid', marginBottom: 20 }}>
              <Heading as="h4">Are you want to delete the item?</Heading>
            </div>
          </Modal>
          <Modal
            width={650}
            closable={false}
            centered
            open={isShowModalImportSuccess}
            onCancel={() => setIsShowModalImportSuccess(false)}
            footer={null}
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
                Questions have been imported successfully
              </div>
              <div style={{ fontSize: 24, fontWeight: 600, color: '#000', marginTop: 4 }}>
                All questions have been saved
              </div>
              <Button
                style={{ marginTop: 20, width: 160 }}
                type="primary"
                key="submit"
                onClick={() => setIsShowModalImportSuccess(false)}
              >
                Ok
              </Button>
            </div>
          </Modal>
          <div>
            <QuestionFilter
              type={type}
              examTypeAll={examTypeAll}
              taskAll={taskAll}
              KaAll={KaAll}             
              BatchIdAll={BatchIdAll}
              setFilterForm={changeFilterForm}
            />
            <div style={{ marginTop: '25px' }}>
              <Tab
                style={{ borderColor: themeColor['white-color'], width: '50%' }}
                data={tabData}
                onChange={onChangeTab}
                extraMenu={menuTab}
              />
            </div>
          </div>
        </Suspense>
      </Main>
    </>
  );
};

export default Question;
