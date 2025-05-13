/* eslint-disable react-hooks/exhaustive-deps */
import { Main } from 'container/Style';
// import '../question/AddQuestion.css';
import { FC, Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Cards } from 'components/cards/frame/CardsFrame';
import { Col, Form, FormInstance, Input, Modal, Row, Select, Skeleton, Tooltip } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/RootReducer';
import { Button } from 'components/buttons/Buttons';
import { themeColor } from 'config/theme/ThemeVariables';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchListExamTypeAll } from 'store/exam-type/Actions';
import { fetchListKAAll } from 'store/ka/Actions';
import { fetchListTaskAll } from 'store/task/Actions';
import QuestionBox from 'components/questionInput/QuestionBox';
import QuestionComponent from './QuestionComponent';
import { TaskModel } from 'store/task/Types';
import { KAModel } from 'store/ka/Types';
import {
  createCompositeQuestion,
  fetchCompositeQuestion,
  SetCompositeQuestionAdd,
  SetQuestionAdd,
  updateCompositeQuestion,
} from 'store/question/Actions';
import { Heading } from 'components/heading/Heading';
import { CreateCompositeQuestionModel, QuestionCreateModel, QuestionModel } from 'store/question/Types';
import moment from 'moment';
import { openNotification } from 'utility/Utility';
import { StyledAddQuestion } from './Style';

interface IAddCompositeQuestion {}
export interface ChildComponentHandle {
  getValues: () => FormValues;
}

export interface FormValues {
  IsKaidTaskidValidExamtypeID: boolean;
  l2CodeInput: number;
  l3NameInput: number;
  score: number;
  question: string;
  answers: any[];
  selectedAnswer: number;
  mode?: string;
}

const AddCompositeQuestion: FC<IAddCompositeQuestion> = (props) => {
  const location = useLocation();
  const { id,page } = location.state || {};
  const navigate = useNavigate();
  console.log('ID:', id);
  console.log('PageAdđ:', page);
  const dispatch = useDispatch<any>();
  const [form] = Form.useForm();
  const formRef = useRef<FormInstance<any>>(null);
  const childRefs = useRef<(ChildComponentHandle | null)[]>([]);

  const loadingSave = useSelector((states: RootState) => states.question.loadingSave);
  const compositeQuestionForAdd = useSelector((states: RootState) => states.question.compositeQuestionForAdd);
  const compositeQuestionForEdit = useSelector((states: RootState) => states.question.compositeQuestionForEdit);

  const [questionInCompoModify, setQuestionInCompoModify] = useState<QuestionCreateModel[] | []>([]);
  const [questionLengthArr, setQuestionLengthArr] = useState(['show']);

  const listAllExamType = useSelector((states: RootState) => states.examType.dataAll);
  const listAllKA = useSelector((states: RootState) => states.ka.dataAll);
  const listAllTask = useSelector((states: RootState) => states.task.dataAll);

  const examTypeInput = Form.useWatch('ExamType', form);
  const l2CodeInput = Form.useWatch('L2Code', form);
  const statusInput = Form.useWatch('Status', form);

  const [state, setState] = useState({
    questionContentBase64: '',
    modalConfirmExitVisible: false,
    modalNotifySaveToExam: false,
    examTypeToolTipText: '',
    modalConfirmNextBackVisible: false,
  });

  const [listCompositeLength, setListCompositeLength] = useState(0);

  const [canSave, setCanSave] = useState(false);
  const [questionNextBack, setQuestionNextBack] = useState<any>();

  const listStatus = [
    { value: 1, label: 'Active' },
    { value: 0, label: 'Inactive' },
  ];
  useEffect(() => {
    if (id) {
      dispatch(fetchCompositeQuestion(id));
    }
  }, [id]);

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
    if (compositeQuestionForAdd) {
      setQuestionInCompoModify(compositeQuestionForAdd?.questions as QuestionCreateModel[]);
      var invalidCompositeQuestionArrGet = JSON.parse(localStorage.getItem('invalidCompositeQuestionArr') + '');
      if (invalidCompositeQuestionArrGet === null) invalidCompositeQuestionArrGet = [];
      if (listCompositeLength === 0) setListCompositeLength(invalidCompositeQuestionArrGet.length);
      if (compositeQuestionForAdd) {
        formRef.current?.setFieldsValue({
          ExamType: compositeQuestionForAdd?.ExamtypeID,
          Status: compositeQuestionForAdd?.Status >= 2 ? 0 : compositeQuestionForAdd?.Status,
          Score: compositeQuestionForAdd?.Score,
          BatchID: compositeQuestionForAdd.BatchID,
        });
        setState({
          ...state,
          questionContentBase64: compositeQuestionForAdd.Question,
        });
      }
    }
  }, [compositeQuestionForAdd]);

  useEffect(() => {
    if (compositeQuestionForEdit) {
      setQuestionInCompoModify(compositeQuestionForEdit?.questions as QuestionCreateModel[]);
      if (compositeQuestionForEdit) {
        formRef.current?.setFieldsValue({
          ExamType: compositeQuestionForEdit?.ExamtypeID,
          Status: compositeQuestionForEdit?.Status >= 2 ? 0 : compositeQuestionForEdit?.Status,
          Score: compositeQuestionForEdit?.Score,
          BatchID: compositeQuestionForEdit.BatchID,
        });
        setState({
          ...state,
          questionContentBase64: compositeQuestionForEdit.Question,
        });
        setQuestionLengthArr(compositeQuestionForEdit?.questions?.map((_) => 'show'));
      }
      if (compositeQuestionForEdit?.ID && compositeQuestionForEdit?.ExamtypeID) {
        const idText =
          compositeQuestionForEdit.ExamtypeID + '-CQ' + String(compositeQuestionForEdit.ID).padStart(4, '0');
        localStorage.setItem('currentQuestionID', idText);
        const event = new Event('currentQuestionIDChanged');
        window.dispatchEvent(event);
      }
    }
  }, [compositeQuestionForEdit]);

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
  //check all empty
  //if all disable save
  //else
  //check but except the empty???

  const checkQuestionChildIsEmpty = (values: any) => {
    var check = true;
    if (
      (values?.l2CodeInput || values?.l3NameInput || values.question || values.score != 1 || values.selectedAnswer) &&
      values?.mode !== 'hide'
    ) {
      check = false;
    }
    if (values?.mode !== 'hide') {
      values?.answers?.forEach((a: any) => {
        if (a?.content || a?.explanation) {
          check = false;
        }
      });
    }
    return check;
  };

  const checkAllQuestionChildIsEmpty = () => {
    var isAllEmpty = true;
    childRefs.current.forEach((ref, index) => {
      if (ref) {
        const values = ref.getValues();
        if (!checkQuestionChildIsEmpty(values)) {
          isAllEmpty = false;
        }
      }
    });
    return isAllEmpty;
  };

  const getCompositeQuestionForCreate = (mode: string | null = null): any => {
    const questionFormats: any[] = [];
    childRefs.current.forEach((ref, index) => {
      if (ref) {
        const values = ref.getValues();
        var checkQuesEmpty = checkQuestionChildIsEmpty(values);
        if (!checkQuesEmpty) {
          if (values?.mode !== 'hide') {
            const question = {
              ExamTypeID: examTypeInput,
              Code: 'No Code::>',
              TaskID: values.l3NameInput,
              BatchID: compositeQuestionForAdd?.BatchID,
              Status: statusInput,
              Score: values.score,
              Question: values.question,
              answers: values.answers?.map((a, index) => {
                return {
                  ID: 0,
                  QuestionID: 0,
                  Key: a?.content?.trim(),
                  State: index + 1 === values.selectedAnswer ? true : false,
                  Explain: a?.explanation?.trim(),
                };
              }),
            };
            questionFormats.push(question);
          }
        }
      }
    });

    const compositeQuestionObject = {
      ExamtypeID: examTypeInput,
      Status: statusInput,
      Score: 0,
      Question: state.questionContentBase64,
      BatchID: compositeQuestionForAdd?.BatchID,
      questions: questionFormats,
      callbackFunc: mode === 'nextBack' ? callbackWhenCreateNextBackSuccess : callbackWhenCreateSuccess,
      Mode: mode,
    };
    return compositeQuestionObject;
  };

  const checkAllFieldIsFill = () => {
    var allFieldIsFill = true;
    if (!examTypeInput || !state.questionContentBase64) allFieldIsFill = false;
    childRefs.current.forEach((ref, index) => {
      if (ref) {
        const values = ref.getValues();
        if (
          (!values?.l2CodeInput ||
            !values?.l3NameInput ||
            !values.question ||
            !values.score ||
            !values.selectedAnswer) &&
          values?.mode !== 'hide'
        ) {
          allFieldIsFill = false;
        }
        if (values?.mode !== 'hide') {
          values?.answers?.forEach((a) => {
            if (!a?.content || !a?.explanation) {
              allFieldIsFill = false;
            }
          });
        }
      }
    });
    return allFieldIsFill;
  };

  const handleBack = () => {
    navigate(`/admin/question`,{ state: { page: page } });
  };

  const handleSave = () => {
    if (compositeQuestionForEdit) {
      if (!questionLengthArr?.includes('show')) {
        openNotification('error', '', 'Can not save composite question');
      } else {
        const questionFormats: any[] = [];
        childRefs.current.forEach((ref, indexNgoai) => {
          if (ref) {
            const values = ref.getValues();
            if (values?.mode !== 'hide') {
              var checkQuesEmpty = checkQuestionChildIsEmpty(values);
              if (!checkQuesEmpty) {
                const question = {
                  ID: compositeQuestionForEdit?.questions[indexNgoai]?.ID,
                  ExamTypeID: examTypeInput,
                  Code: 'No Code::>',
                  TaskID: values.l3NameInput,
                  BatchID: compositeQuestionForAdd?.BatchID,
                  Status: statusInput,
                  Score: values.score,
                  Question: values.question,
                  answers: values.answers?.map((a, index) => {
                    return {
                      ID: a?.ID,
                      QuestionID: compositeQuestionForEdit?.questions[indexNgoai]?.ID,
                      Key: a?.content?.trim(),
                      State: index + 1 === values.selectedAnswer ? true : false,
                      Explain: a?.explanation?.trim(),
                    };
                  }),
                };
                questionFormats.push(question);
              }
            }
          }
        });
        const compositeQuestionObject = {
          ID: compositeQuestionForEdit?.ID,
          ExamtypeID: examTypeInput,
          Status: statusInput,
          Score: 0,
          Question: state.questionContentBase64,
          BatchID: compositeQuestionForEdit?.BatchID ?? 0,
          BatchCode: compositeQuestionForEdit?.BatchCode,
          questions: questionFormats,
          callbackFunc: handleBack,
        };
        dispatch(updateCompositeQuestion(compositeQuestionObject));
      }
    } else {
      if (!questionLengthArr?.includes('show')) {
        openNotification('error', '', 'Can not save composite question');
      } else {
        if (compositeQuestionForAdd) {
          var isValid = true;
          isValid = !checkAllQuestionChildIsEmpty();
          if (!examTypeInput || !state.questionContentBase64) isValid = false;
          childRefs.current.forEach((ref, index) => {
            if (ref) {
              const values = ref.getValues();
              var checkQuesEmpty = checkQuestionChildIsEmpty(values);
              if (!checkQuesEmpty) {
                if (
                  (!values?.l2CodeInput ||
                    !values?.l3NameInput ||
                    !values.question ||
                    !values.score ||
                    !values.selectedAnswer) &&
                  values?.mode !== 'hide'
                ) {
                  isValid = false;
                }
                if (values?.mode !== 'hide') {
                  values?.answers?.forEach((a) => {
                    if (!a?.content || !a?.explanation) {
                      isValid = false;
                    }
                  });
                }
              }
            }
          });
          if (isValid) {
            //handle save to db
            const compositeQuestionObject = getCompositeQuestionForCreate();
            dispatch(createCompositeQuestion(compositeQuestionObject));
          } else {
            //handle save to error question
            var invalidCompositeQuestionArrGet = JSON.parse(localStorage.getItem('invalidCompositeQuestionArr') + '');
            if (invalidCompositeQuestionArrGet === null) invalidCompositeQuestionArrGet = [];
            const examTypeName = listAllExamType?.find((e) => e.ID === examTypeInput)?.Name;
            const invalidCompositeQuestionArrGetUpdate = invalidCompositeQuestionArrGet?.map(
              (q: any, index: number) => {
                if ((compositeQuestionForAdd?.ID ?? 0) - 1 === index) {
                  var compositeQuestionSubmit: any = {};
                  compositeQuestionSubmit.ID = compositeQuestionForAdd?.ID;
                  compositeQuestionSubmit.ExamtypeID = examTypeInput;
                  compositeQuestionSubmit.ExamtypeName = examTypeName;
                  compositeQuestionSubmit.Status = statusInput;
                  compositeQuestionSubmit.Score = 0;
                  compositeQuestionSubmit.Question = state.questionContentBase64;
                  compositeQuestionSubmit.BatchID = compositeQuestionForAdd?.BatchID;
                  compositeQuestionSubmit.BatchCode = compositeQuestionForAdd?.BatchCode;
                  compositeQuestionSubmit.Mode = 'composite';
                  compositeQuestionSubmit.Action = 'next';

                  const questions: any[] = [];
                  childRefs.current.forEach((ref, index) => {
                    if (ref) {
                      const values = ref.getValues();
                      const ques = {
                        IsKaidTaskidValidExamtypeID: values?.l2CodeInput && values?.l3NameInput,
                        ExamTypeID: examTypeInput,
                        KAID: values?.l2CodeInput,
                        L2ID: values?.l2CodeInput,
                        Code: 'no',
                        TaskID: values?.l3NameInput,
                        Status: statusInput,
                        Score: values.score,
                        Question: values.question,
                        answers: [
                          ...values?.answers?.map((a: any, index: number) => {
                            return {
                              QuestionID: 0,
                              Key: a?.content?.trim(),
                              State: values?.selectedAnswer === index + 1,
                              Explain: a?.explanation?.trim(),
                            };
                          }),
                        ],
                        notShowToastSuccess: true,
                        BatchID: 1,
                      };
                      questions.push(ques);
                    }
                  });
                  compositeQuestionSubmit.questions = questions;
                  dispatch(SetCompositeQuestionAdd(compositeQuestionSubmit));
                  return compositeQuestionSubmit;
                } else {
                  return q;
                }
              },
            );
            localStorage.setItem('invalidCompositeQuestionArr', JSON.stringify(invalidCompositeQuestionArrGetUpdate));
            openNotification('success', 'Success', 'Question information has been updated');
          }
        } else {
          const questionFormats: any[] = [];
          childRefs.current.forEach((ref, index) => {
            if (ref) {
              const values = ref.getValues();
              var checkQuesEmpty = checkQuestionChildIsEmpty(values);
              if (!checkQuesEmpty) {
                if (values?.mode !== 'hide') {
                  const question = {
                    ExamTypeID: examTypeInput,
                    Code: 'No Code::>',
                    TaskID: values.l3NameInput,
                    BatchID: 0,
                    Status: statusInput,
                    Score: values.score,
                    Question: values.question,
                    answers: values.answers?.map((a, index) => {
                      return {
                        ID: 0,
                        QuestionID: 0,
                        Key: a?.content?.trim(),
                        State: index + 1 === values.selectedAnswer ? true : false,
                        Explain: a?.explanation?.trim(),
                      };
                    }),
                  };
                  questionFormats.push(question);
                }
              }
            }
          });

          const compositeQuestionObject = {
            ExamtypeID: examTypeInput,
            Status: statusInput,
            Score: 0,
            Question: state.questionContentBase64,
            BatchID: 0,
            questions: questionFormats,
            callbackFunc: handleBack
          };
          dispatch(createCompositeQuestion(compositeQuestionObject));
        }
      }
    }
    setState({ ...state, modalNotifySaveToExam: false });
  };



  const callbackWhenCreateSuccess = () => {
    if (compositeQuestionForAdd) {
      var invalidCompositeQuestionArrGet = JSON.parse(localStorage.getItem('invalidCompositeQuestionArr') + '');
      if (invalidCompositeQuestionArrGet === null) invalidCompositeQuestionArrGet = [];
      if (compositeQuestionForAdd?.ID) invalidCompositeQuestionArrGet.splice(compositeQuestionForAdd?.ID - 1, 1);
      localStorage.setItem('invalidCompositeQuestionArr', JSON.stringify(invalidCompositeQuestionArrGet));
      navigate('/admin/question/errorQuestion');
    }
  };

  const callbackWhenCreateNextBackSuccess = () => {
    if (compositeQuestionForAdd) {
      var invalidCompositeQuestionArrGet = JSON.parse(localStorage.getItem('invalidCompositeQuestionArr') + '');
      if (invalidCompositeQuestionArrGet === null) invalidCompositeQuestionArrGet = [];
      if (compositeQuestionForAdd?.ID) invalidCompositeQuestionArrGet.splice(compositeQuestionForAdd?.ID - 1, 1);
      localStorage.setItem('invalidCompositeQuestionArr', JSON.stringify(invalidCompositeQuestionArrGet));
    }
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

  const getListSelectExamType = () => {
    let listExamType = [] as { value?: number; label: string; name: string }[];
    listAllExamType?.map((e) => {
      listExamType.push({ value: e.ID, label: `${e?.ExamType}`, name: `${e?.Name}` });
    });
    return listExamType;
  };

  const getListSelectTask = () => {
    let listTask: TaskModel[] = [];
    listAllTask?.map((e) => {
      if (l2CodeInput == undefined) {
        if (examTypeInput == undefined) listTask.push(e);
        else if (examTypeInput == e.examType?.ID) listTask.push(e);
      } else {
        if (e.KAID == l2CodeInput) listTask.push(e);
      }
    });
    return listTask;
  };

  const getListSelectKA = () => {
    let listKA: KAModel[] = [];
    listAllKA?.map((e) => {
      if (examTypeInput == undefined) {
        listKA.push(e);
      } else {
        if (e.ExamTypeID == examTypeInput) listKA.push(e);
      }
    });

    return listKA;
  };

  const listKaPass = useMemo(() => {
    return getListSelectKA();
  }, [listAllKA, examTypeInput]);

  const listTaskPass = useMemo(() => {
    return getListSelectTask();
  }, [listAllTask, examTypeInput]);

  const onFieldChange = () => {
    if (compositeQuestionForEdit) {
      //check
      var isValid = true;
      var pass = false;
      isValid = !checkAllQuestionChildIsEmpty();
      var questionChecks = compositeQuestionForEdit?.questions;
      childRefs.current.forEach((ref, indexNgoai) => {
        if (ref) {
          const values = ref.getValues();
          var checkQuesEmpty = checkQuestionChildIsEmpty(values);
          if (!checkQuesEmpty) {
            if (
              (!values?.l2CodeInput ||
                !values?.l3NameInput ||
                !values.question ||
                !values.score ||
                !values.selectedAnswer) &&
              values?.mode !== 'hide'
            ) {
              isValid = false;
            }
            if (values?.mode !== 'hide') {
              values?.answers?.forEach((a) => {
                if (!a?.content || !a?.explanation) {
                  isValid = false;
                }
              });
            }
          }
          if (questionChecks?.length === questionLengthArr?.length) {
            if (values?.mode !== 'hide') {
              if (
                values?.l2CodeInput === questionChecks[indexNgoai]?.KAID &&
                values?.l3NameInput === questionChecks[indexNgoai]?.TaskID &&
                extractQuestionContent(values.question) ===
                  extractQuestionContent(questionChecks[indexNgoai]?.Question) &&
                values.score == questionChecks[indexNgoai]?.Score
              ) {
                var selectedAns = 0;
                questionChecks[indexNgoai]?.answers?.forEach((a, i) => {
                  if (a.State) {
                    selectedAns = i + 1;
                  }
                });
                values?.answers?.forEach((a, index) => {
                  if (
                    a?.content !== questionChecks[indexNgoai]?.answers[index]?.Key ||
                    a?.explanation !== questionChecks[indexNgoai]?.answers[index]?.Explain
                  ) {
                    pass = true;
                  }
                });
                if (values?.selectedAnswer !== selectedAns) {
                  pass = true;
                }
              } else {
                pass = true;
              }
            }
          } else {
            pass = true;
          }
        }
      });
      if (!pass) isValid = false;
      setCanSave(isValid);
    } else {
      //check
      if (compositeQuestionForAdd) {
        setCanSave(checkChange());
      } else {
        var isValid = true;
        isValid = !checkAllQuestionChildIsEmpty();
        childRefs.current.forEach((ref, index) => {
          if (ref) {
            const values = ref.getValues();
            var checkQuesEmpty = checkQuestionChildIsEmpty(values);
            if (!checkQuesEmpty) {
              if (
                (!values?.l2CodeInput ||
                  !values?.l3NameInput ||
                  !values.question ||
                  !values.score ||
                  !values.selectedAnswer) &&
                values?.mode !== 'hide'
              ) {
                isValid = false;
              }
              if (values?.mode !== 'hide') {
                values?.answers?.forEach((a) => {
                  if (!a?.content || !a?.explanation) {
                    isValid = false;
                  }
                });
              }
            }
          }
          setCanSave(isValid);
        });
      }
    }
  };

  const handleExit = () => {
    if (compositeQuestionForAdd) {
      dispatch(SetCompositeQuestionAdd(null));
      navigate('/admin/question/errorQuestion');
    } else {
      console.log('Vaoexxiut');
      
      handleBack()
    }
  };

  const extractQuestionContent = (htmlString: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    var textContent = doc.body.textContent;
    return textContent?.trim();
  };

  function cleanCKEditorContent(content: string) {
    // Remove all tags except <img> and leave plain text and <img> tags intact
    return content
      .replace(/<(?!img\b)[^>]*>/gi, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  const checkChange = () => {
    const checkObj = compositeQuestionForEdit ? compositeQuestionForEdit : compositeQuestionForAdd;
    if (checkObj == null) {
      var check = false;
      if (
        examTypeInput ||
        (statusInput && statusInput != 0) ||
        state.questionContentBase64 ||
        questionLengthArr?.length > 1
      ) {
        check = true;
      }

      childRefs.current.forEach((ref, indexTrong) => {
        if (ref) {
          const values = ref.getValues();
          if (
            values?.l2CodeInput ||
            values?.l3NameInput ||
            values?.question ||
            values?.score != 1 ||
            values?.selectedAnswer != 0
          ) {
            check = true;
          }
          values?.answers?.forEach((a) => {
            if (a?.content || a?.explanation) {
              check = true;
            }
          });
        }
      });
      return check;
    } else {
      var check = false;
      const questionContentAdd = cleanCKEditorContent(checkObj?.Question + '') || '';
      const questionContentState = cleanCKEditorContent(state.questionContentBase64 + '') || '';
      if (
        checkObj?.ExamtypeID !== examTypeInput ||
        (checkObj?.Status !== 2 && checkObj?.Status !== undefined && checkObj?.Status !== statusInput) ||
        (questionContentAdd !== questionContentState && questionContentAdd !== '' && questionContentState !== '')
      ) {
        check = true;
      }

      if (checkObj?.questions?.length !== questionInCompoModify?.length) {
        check = true;
      } else {
        checkObj?.questions?.forEach((q, indexNgoai) => {
          childRefs.current.forEach((ref, indexTrong) => {
            if (ref) {
              const values = ref.getValues();
              if (indexNgoai === indexTrong) {
                //check
                if (
                  cleanCKEditorContent(q?.Question) !== cleanCKEditorContent(values?.question) ||
                  q?.Score != values?.score
                ) {
                  check = true;
                }
                if (
                  values?.IsKaidTaskidValidExamtypeID &&
                  (q?.KAID !== values?.l2CodeInput || q?.TaskID !== values?.l3NameInput)
                ) {
                  check = true;
                }
                var selectedAnswerRaw = 0;
                q?.answers?.forEach((a, index) => {
                  if (
                    (a?.Key ?? '') !== values?.answers[index]?.content ||
                    (a?.Explain ?? '') !== values?.answers[index]?.explanation
                  ) {
                    check = true;
                  }
                  if (a?.State === true) selectedAnswerRaw = index + 1;
                });

                if (selectedAnswerRaw === 0 && values?.selectedAnswer !== null && values?.selectedAnswer !== 0) {
                  check = true;
                } else if (
                  selectedAnswerRaw !== values?.selectedAnswer &&
                  values?.selectedAnswer !== null &&
                  values?.selectedAnswer !== 0
                ) {
                  check = true;
                }
              }
            }
          });
        });
      }
      return check;
    }
  };

  const handleClickBack = () => {
    if (compositeQuestionForAdd?.ID && compositeQuestionForAdd?.ID > 1) {
      const currentIndex = compositeQuestionForAdd?.ID - 1;
      var invalidCompositeQuestionArrGet = JSON.parse(localStorage.getItem('invalidCompositeQuestionArr') + '');
      if (invalidCompositeQuestionArrGet === null) invalidCompositeQuestionArrGet = [];
      const compositeQuestionPick = invalidCompositeQuestionArrGet[currentIndex - 1];
      const questions: any[] = [];
      compositeQuestionPick?.questions?.map((q: any) => {
        const singleQuestion = {
          ID: currentIndex,
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
        ID: currentIndex,
        ExamtypeID: compositeQuestionPick.ExamtypeID,
        Status: compositeQuestionPick.Status,
        Score: compositeQuestionPick.Score,
        Question: compositeQuestionPick.Question,
        BatchID: compositeQuestionPick.BatchID,
        questions: questions,
        Mode: 'composite',
        Action: 'back',
      } as CreateCompositeQuestionModel;
      if (checkChange()) {
        setState({ ...state, modalConfirmNextBackVisible: true });
        setQuestionNextBack(compositeQuestion);
      } else {
        const id = JSON.parse(localStorage.getItem('currentQuestionID') + '');
        localStorage.setItem('currentQuestionID', id - 1 + '');
        //Notify id is change to re-cal the title
        const event = new Event('currentQuestionIDChanged');
        window.dispatchEvent(event);
        dispatch(SetCompositeQuestionAdd(compositeQuestion));
      }
    } else {
      var invalidSingleQuestionArrGet = JSON.parse(localStorage.getItem('invalidSingleQuestionArr') + '');
      if (invalidSingleQuestionArrGet === null) invalidSingleQuestionArrGet = [];

      const questionForAddPick = invalidSingleQuestionArrGet[invalidSingleQuestionArrGet?.length - 1];
      const singleQuestion = {
        ID: invalidSingleQuestionArrGet?.length,
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
        navigate('/admin/question/addQuestion');
      }
    }
  };
  const handleDeleteChildQuestion = (index: number) => {
    if (compositeQuestionForAdd) {
      const filteredQuestions = questionInCompoModify?.filter((_, i) => i !== index);
      setQuestionInCompoModify(filteredQuestions);
    } else {
      setQuestionLengthArr(
        questionLengthArr?.map((q, i) => {
          if (i === index) return 'hide';
          else return q;
        }),
      );
    }
    openNotification('success', 'Success', 'Deleted successfully');
  };

  useEffect(() => {
    onFieldChange();
  }, [questionInCompoModify, questionLengthArr]);

  const handleClickAddQuestion = () => {
    setQuestionLengthArr([...questionLengthArr, 'show']);
  };

  const handleClickNext = () => {
    if (compositeQuestionForAdd?.ID) {
      const currentIndex = compositeQuestionForAdd?.ID - 1;
      var invalidCompositeQuestionArrGet = JSON.parse(localStorage.getItem('invalidCompositeQuestionArr') + '');
      if (invalidCompositeQuestionArrGet === null) invalidCompositeQuestionArrGet = [];
      const compositeQuestionPick = invalidCompositeQuestionArrGet[currentIndex + 1];
      const questions: any[] = [];
      compositeQuestionPick?.questions?.map((q: any) => {
        const singleQuestion = {
          ID: currentIndex + 2,
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
          Action: 'next',
        } as QuestionModel;
        questions.push(singleQuestion);
      });
      const compositeQuestion = {
        ID: currentIndex + 2,
        ExamtypeID: compositeQuestionPick.ExamtypeID,
        Status: compositeQuestionPick.Status,
        Score: compositeQuestionPick.Score,
        Question: compositeQuestionPick.Question,
        BatchID: compositeQuestionPick.BatchID,
        questions: questions,
        Mode: 'composite',
        Action: 'next',
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
      }
    }
  };

  if (childRefs.current[0] && childRefs.current[0].getValues()) {
    const values = childRefs.current[0].getValues();
  }

  const handleSaveNextBack = () => {
    const id = JSON.parse(localStorage.getItem('currentQuestionID') + '');
    if (checkAllFieldIsFill()) {
      if (questionNextBack?.Action === 'next') {
        localStorage.setItem('currentQuestionID', id + '');
      } else {
        localStorage.setItem('currentQuestionID', id - 1 + '');
      }
      setListCompositeLength(listCompositeLength - 1);
    } else {
      if (questionNextBack?.Action === 'next') {
        localStorage.setItem('currentQuestionID', id + 1 + '');
      } else {
        localStorage.setItem('currentQuestionID', id - 1 + '');
      }
    }
    //Notify id is change to re-cal the title
    const event = new Event('currentQuestionIDChanged');
    window.dispatchEvent(event);

    if (checkAllFieldIsFill()) {
      const compositeQuestionObject = getCompositeQuestionForCreate('nextBack');
      dispatch(createCompositeQuestion(compositeQuestionObject));
    } else {
      var invalidCompositeQuestionArrGet = JSON.parse(localStorage.getItem('invalidCompositeQuestionArr') + '');
      if (invalidCompositeQuestionArrGet === null) invalidCompositeQuestionArrGet = [];
      var invalidSingleQuestionArrGet = JSON.parse(localStorage.getItem('invalidSingleQuestionArr') + '');
      if (invalidSingleQuestionArrGet === null) invalidSingleQuestionArrGet = [];

      var currentQuesIndex = questionNextBack?.Action === 'next' ? questionNextBack?.ID - 2 : questionNextBack?.ID;

      if (questionNextBack?.Mode !== 'composite') {
        currentQuesIndex = invalidSingleQuestionArrGet?.length - 1;
      }

      const invalidCompositeQuestionArrGetUpdate = invalidCompositeQuestionArrGet?.map((q: any, index: number) => {
        if (currentQuesIndex == index) {
          const examTypeName = listAllExamType?.find((e) => e.ID === examTypeInput)?.Name;
          var compositeQuestionSubmit: any = {};
          compositeQuestionSubmit.ID = questionNextBack?.ID;
          compositeQuestionSubmit.ExamtypeID = examTypeInput;
          compositeQuestionSubmit.ExamtypeName = examTypeName;
          compositeQuestionSubmit.BatchCode = compositeQuestionForAdd?.BatchCode;
          compositeQuestionSubmit.Status = statusInput;
          compositeQuestionSubmit.Score = 0;
          compositeQuestionSubmit.Question = state.questionContentBase64;
          compositeQuestionSubmit.BatchID = compositeQuestionForAdd?.BatchID;
          compositeQuestionSubmit.Mode = 'composite';
          compositeQuestionSubmit.Action = 'next';
          const questions: any[] = [];
          childRefs.current.forEach((ref, index) => {
            if (ref) {
              const values = ref.getValues();
              const ques = {
                IsKaidTaskidValidExamtypeID: values?.l2CodeInput && values?.l3NameInput,
                ExamTypeID: examTypeInput,
                L2ID: values?.l2CodeInput,
                ExamTypeCode: examTypeName,
                Code: 'no',
                TaskID: values?.l3NameInput,
                Status: statusInput,
                Score: values.score,
                Question: extractQuestionContent(values.question),
                answers: [
                  ...values?.answers?.map((a: any, index: number) => {
                    return {
                      QuestionID: 0,
                      Key: a?.content?.trim(),
                      State: values?.selectedAnswer === index + 1,
                      Explain: a?.explanation?.trim(),
                    };
                  }),
                ],
                notShowToastSuccess: true,
                BatchID: 1,
              };
              questions.push(ques);
            }
          });
          compositeQuestionSubmit.questions = questions;
          return compositeQuestionSubmit;
        } else {
          return q;
        }
      });
      localStorage.setItem('invalidCompositeQuestionArr', JSON.stringify(invalidCompositeQuestionArrGetUpdate));
    }

    if (questionNextBack?.Mode === 'single') {
      dispatch(SetQuestionAdd(questionNextBack));
      navigate('/admin/question/addQuestion');
    } else {
      if (checkAllFieldIsFill()) {
        dispatch(
          SetCompositeQuestionAdd({
            ...questionNextBack,
            ID: questionNextBack?.Action === 'next' ? questionNextBack?.ID - 1 : questionNextBack?.ID,
          }),
        );
      } else {
        dispatch(SetCompositeQuestionAdd(questionNextBack));
      }
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

    if (questionNextBack && questionNextBack?.Mode === 'composite') {
      dispatch(SetCompositeQuestionAdd(questionNextBack));
    } else {
      dispatch(SetQuestionAdd(questionNextBack));
      navigate('/admin/question/addQuestion');
    }
    setState({ ...state, modalConfirmNextBackVisible: false });
  };

  const invalidSingleQuestionArrGet = useMemo(() => {
    const data = localStorage.getItem('invalidSingleQuestionArr');
    return data ? JSON.parse(data) : [];
  }, [listCompositeLength]);

  const invalidCompositeQuestionArrGet = useMemo(() => {
    const data = localStorage.getItem('invalidCompositeQuestionArr');
    return data ? JSON.parse(data) : [];
  }, []);

  const handleClickExit = () => {
    if (!checkChange()) {
      if (compositeQuestionForAdd) {
        dispatch(SetCompositeQuestionAdd(null));
        navigate('/admin/question/errorQuestion');
      } else {
        navigate('/admin/question');
      }
    } else {
      setState({ ...state, modalConfirmExitVisible: true });
    }
  };

  var indexCountQues = 0;
  const disableField = compositeQuestionForEdit?.ExamID ? true : false;
  const hideDelete = questionLengthArr?.filter((q) => q !== 'hide')?.length <= 1;
  const disableSaveBtn = disableField
    ? !checkChange()
    : compositeQuestionForEdit
      ? (!examTypeInput || !state.questionContentBase64 || !canSave) &&
        statusInput === compositeQuestionForEdit?.Status &&
        examTypeInput === compositeQuestionForEdit?.ExamtypeID &&
        cleanCKEditorContent(state.questionContentBase64 + '') ===
          cleanCKEditorContent(compositeQuestionForEdit?.Question + '')
      : compositeQuestionForAdd
        ? !canSave &&
          examTypeInput === compositeQuestionForAdd?.ExamtypeID &&
          extractQuestionContent(state.questionContentBase64) ===
            extractQuestionContent(compositeQuestionForAdd?.Question)
        : !examTypeInput || !state.questionContentBase64 || !canSave;

  return (
    <StyledAddQuestion>
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
                <Row
                  style={{ marginBottom: 20, justifyContent: 'space-between', backgroundColor: '#EDEDED', padding: 20 }}
                >
                  <div style={{ fontSize: 28, color: '#000', fontWeight: 600 }}>Overview Description</div>
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
                      onClick={handleClickExit}
                    >
                      Exit
                    </Button>
                    <Button
                      loading={loadingSave}
                      style={{
                        width: 120,
                      }}
                      disabled={disableSaveBtn}
                      mergetype="primary"
                      onClick={() => {
                        disableField ? setState({ ...state, modalNotifySaveToExam: true }) : handleSave();
                      }}
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
                          disabled={disableField}
                          placeholder="Subject"
                          onChange={(value) => {
                            handleExamTypeChange(value);
                            setState({
                              ...state,
                              examTypeToolTipText: listAllExamType?.filter((e) => e.ID == value)[0]?.Name ?? '',
                            });
                          }}
                          value={examTypeInput}
                          listHeight={155}
                          autoFocus
                        >
                          {getListSelectExamType().map((option) => (
                            <Select.Option key={option.value} value={option.value} label={option.label}>
                              {option.label}
                            </Select.Option>
                          ))}
                        </Select>
                      </Tooltip>
                    </Form.Item>
                  </Col>

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
                        disabled={disableField}
                        value={statusInput}
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
                        {compositeQuestionForAdd && compositeQuestionForAdd.BatchCode
                          ? compositeQuestionForAdd.BatchCode
                          : compositeQuestionForEdit && compositeQuestionForEdit.BatchCode
                            ? compositeQuestionForEdit.BatchCode
                            : 'N/A'}
                      </span>
                    </Form.Item>
                  </Col>
                </Row>

                <Row style={{ marginTop: 40, marginBottom: 40 }}>
                  <Col span={1}></Col>
                  <Col span={23}>
                    <QuestionBox
                      placeHolder="Enter question description here"
                      isDisable={disableField}
                      initData={state.questionContentBase64 ? state.questionContentBase64 + '' : ''}
                      setData={(data) => setState({ ...state, questionContentBase64: data })}
                      isFill={
                        compositeQuestionForAdd === null ||
                        (state.questionContentBase64 !== '' &&
                          state.questionContentBase64 !== null &&
                          state.questionContentBase64 !== undefined)
                      }
                    />
                  </Col>
                </Row>

                {/* Component Here */}
                {compositeQuestionForAdd
                  ? questionInCompoModify?.map((ques, index) => {
                      return (
                        <QuestionComponent
                          ref={(el: any) => (childRefs.current[index] = el)}
                          index={index}
                          examTypeID={examTypeInput ? examTypeInput : compositeQuestionForAdd?.ExamtypeID}
                          allKa={listKaPass ?? []}
                          allTask={listTaskPass ?? []}
                          question={ques}
                          onFieldChange={onFieldChange}
                          handleDeleteChildQuestion={handleDeleteChildQuestion}
                          mode={'fixError'}
                          hideDelete={questionInCompoModify?.length <= 1}
                        />
                      );
                    })
                  : questionLengthArr?.map((item, index) => {
                      if (item !== 'hide') indexCountQues++;
                      if (questionInCompoModify[index]) {
                        return (
                          <QuestionComponent
                            ref={(el: any) => (childRefs.current[index] = el)}
                            index={indexCountQues - 1}
                            examTypeID={examTypeInput ? examTypeInput : compositeQuestionForEdit?.ExamtypeID}
                            allKa={listKaPass ?? []}
                            allTask={listTaskPass ?? []}
                            question={questionInCompoModify[index]}
                            onFieldChange={onFieldChange}
                            handleDeleteChildQuestion={handleDeleteChildQuestion}
                            hideShow={item}
                            ExamID={compositeQuestionForEdit ? compositeQuestionForEdit.ExamID : null}
                            hideDelete={hideDelete}
                          />
                        );
                      } else {
                        return (
                          <QuestionComponent
                            ref={(el: any) => (childRefs.current[index] = el)}
                            index={indexCountQues - 1}
                            examTypeID={examTypeInput}
                            allKa={listKaPass ?? []}
                            allTask={listTaskPass ?? []}
                            question={null}
                            onFieldChange={onFieldChange}
                            handleDeleteChildQuestion={() => handleDeleteChildQuestion(index)}
                            hideShow={item}
                            ExamID={compositeQuestionForEdit ? compositeQuestionForEdit.ExamID : null}
                            hideDelete={hideDelete}
                          />
                        );
                      }
                    })}
                {compositeQuestionForAdd ? (
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
                        disabled={invalidSingleQuestionArrGet?.length === 0 && compositeQuestionForAdd?.ID === 1}
                        mergetype="primary"
                        onClick={handleClickBack}
                      >
                        Back
                      </Button>
                      <Button
                        disabled={compositeQuestionForAdd?.ID === listCompositeLength}
                        style={{ width: 120 }}
                        mergetype="primary"
                        onClick={handleClickNext}
                      >
                        Next
                      </Button>
                    </Col>
                  </Row>
                ) : (
                  !disableField && (
                    <Row style={{ justifyContent: 'end' }}>
                      <Button style={{ width: 120 }} mergetype="primary" onClick={handleClickAddQuestion}>
                        Add question
                      </Button>
                    </Row>
                  )
                )}
              </Col>
            </Row>
          </Suspense>
        </Form>
        <Modal
          closable={false}
          centered
          open={state.modalConfirmExitVisible || state.modalNotifySaveToExam}
          onCancel={() => setState({ ...state, modalConfirmExitVisible: false, modalNotifySaveToExam: false })}
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
            {state.modalConfirmExitVisible && (
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
                key="cancel"
                onClick={() => setState({ ...state, modalConfirmExitVisible: false, modalNotifySaveToExam: false })}
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

export default AddCompositeQuestion;
