import { Col, Form, FormInstance, Input, Modal, Radio, RadioChangeEvent, Row, Select, Skeleton, Tooltip } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { Cards } from 'components/cards/frame/CardsFrame';
import QuestionBox from 'components/questionInput/QuestionBox';
import { themeColor } from 'config/theme/ThemeVariables';
import { Main } from 'container/Style';
import React, { FC, forwardRef, Suspense, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchListExamTypeAll } from 'store/exam-type/Actions';
import { fetchListKAAll } from 'store/ka/Actions';
import { QuestionCreateModel } from 'store/question/Types';
import { RootState } from 'store/RootReducer';
import { fetchListTaskAll } from 'store/task/Actions';
import UilTrashAlt from '@iconscout/react-unicons/dist/icons/uil-trash-alt';
import { Button } from 'components/buttons/Buttons';
import { KAModel } from 'store/ka/Types';
import { TaskModel } from 'store/task/Types';
import { FormValues } from './AddCompositeQuestion';
import { Heading } from 'components/heading/Heading';

interface IQuestionComponent {
  index: number;
  examTypeID: number;
  allKa: KAModel[];
  allTask: TaskModel[];
  question?: QuestionCreateModel | any;
  onFieldChange: () => void;
  handleDeleteChildQuestion: (index: number) => void;
  mode?: string;
  hideShow?: string;
  ExamID?: number | null;
  hideDelete?: boolean | null;
}

export interface QuestionComponentHandle {
  getValues: () => FormValues;
}

interface Answer {
  ID: number;
  content: string;
  explanation: string;
}

const QuestionComponent = forwardRef<QuestionComponentHandle, IQuestionComponent>((props, ref) => {
  const [form] = Form.useForm();
  const formRef = useRef<FormInstance<any>>(null);
  const dispatch = useDispatch<any>();

  const compositeQuestionForAdd = useSelector((states: RootState) => states.question.compositeQuestionForAdd);

  const listAllExamType = useSelector((states: RootState) => states.examType.dataAll);
  const listAllKA = props.allKa;

  const listAllTask = props.allTask;

  const examTypeInput = Form.useWatch('ExamType', form);
  const l2CodeInput = Form.useWatch('L2Code', form);
  const l3NameInput = Form.useWatch('L3Name', form);
  const statusInput = Form.useWatch('Status', form);
  const scoreInput = Form.useWatch('Score', form);

  const [state, setState] = useState({
    questionContentBase64: '',
    modalConfirmEditVisible: false,
    examTypeToolTipText: '',
    modalConfirmDeleteVisible: false,
  });

  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState([
    { ID: 0, content: '', explanation: '' },
    { ID: 0, content: '', explanation: '' },
    { ID: 0, content: '', explanation: '' },
    { ID: 0, content: '', explanation: '' },
  ]);

  const listStatus = [
    { value: 1, label: 'Active' },
    { value: 0, label: 'Inactive' },
  ];

  const inputRef = useRef<HTMLInputElement>(null);
  useImperativeHandle(ref, () => ({
    getValues() {
      return {
        l2CodeInput: l2CodeInput,
        l3NameInput: l3NameInput,
        score: scoreInput,
        question: state.questionContentBase64,
        answers: answers,
        selectedAnswer: selectedAnswer ?? 0,
        IsKaidTaskidValidExamtypeID: l2CodeInput && l3NameInput,
        mode: props.hideShow,
      };
    },
  }));

  useEffect(() => {
    formRef.current?.setFieldsValue({
      ExamType: props.question?.ExamTypeID,
      L2Code: props.question?.KAID,
      L3Name: props.question?.TaskID,
      Status: props.question?.Status ? props.question?.Status : 0,
      Score: props.question?.Score ? props.question?.Score : 1,
      BatchID: props.question?.BatchID,
    });
    setState({ ...state, questionContentBase64: props.question?.Question ?? '' });
    let answerList = [] as Answer[];
    let correctAns = null;
    props.question?.answers?.map((a: any, index: number) => {
      var id = parseInt(a.ID + '');
      answerList.push({ ID: id, content: a.Key ?? '', explanation: a.Explain ?? '' });
      if (a.State) correctAns = index + 1;
    });
    while (answerList.length < 4) {
      answerList.push({ ID: 0, content: '', explanation: '' });
    }
    setAnswers(answerList);
    setSelectedAnswer(correctAns);
  }, [props.question]);

  useEffect(() => {
    // formRef.current?.setFieldsValue({
    //   Status: statusInput ? statusInput : 0,
    //   Score: scoreInput ? scoreInput : 1,
    // });
    getListAllExamType();
    getListAllKA();
    getListAllTask();
  }, []);

  useEffect(() => {
    props.onFieldChange();
  }, [l2CodeInput, l3NameInput, state.questionContentBase64, answers, selectedAnswer, scoreInput]);

  useEffect(() => {
    if (props.examTypeID && props.allKa?.length > 0) {
      const l2 = props.allKa?.find((k) => k.ID == (l2CodeInput ? l2CodeInput : props?.question?.KAID));

      const isCurrentL2InExamTypeCode = l2?.ExamTypeID == props.examTypeID;
      if (!isCurrentL2InExamTypeCode)
        formRef.current?.setFieldsValue({
          L2Code: undefined,
          L3Name: undefined,
        });
    }
  }, [props.examTypeID]);

  const getListAllExamType = () => {
    // call API lấy list exam for select
    if (!listAllExamType) dispatch(fetchListExamTypeAll());
  };

  const getListAllKA = () => {
    // call API lấy list exam for select
    if (!listAllKA) dispatch(fetchListKAAll());
  };

  const getListAllTask = () => {
    // call API lấy list exam for select
    if (!listAllTask) dispatch(fetchListTaskAll());
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

  const disableField = props.ExamID ? true : false;

  return (
    <>
      {/* <Main> */}
      <Form
        style={{ display: props.hideShow === 'hide' ? 'none' : 'block' }}
        form={form}
        ref={formRef}
        name="ninjadash-vertical-form"
        layout="vertical"
      >
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
                style={{
                  marginBottom: 20,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  backgroundColor: '#EDEDED',
                  padding: 20,
                }}
              >
                <div
                  style={{ fontSize: 28, color: '#000', fontWeight: 600 }}
                >{`${props.index + 1}. Question Details`}</div>
                <Col style={{ display: 'flex', justifyContent: 'flex-end' }} span={12}>
                  {!disableField && !props.hideDelete && (
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: themeColor['primary-color'],
                        borderRadius: '50%',
                        cursor: 'pointer',
                      }}
                      onClick={() => setState({ ...state, modalConfirmDeleteVisible: true })}
                    >
                      <Tooltip title="Delete">
                        <UilTrashAlt style={{ width: 24 }} color={themeColor.white} />
                      </Tooltip>
                    </div>
                  )}
                </Col>
              </Row>

              <Row style={{}}>
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
                      className={
                        !l2CodeInput && props.mode === 'fixError' ? 'custom-select border-red' : 'custom-select'
                      }
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
                      disabled={!props.examTypeID || disableField}
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
                  {!l2CodeInput && props.mode === 'fixError' && (
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
                    style={{}}
                  >
                    <Select
                      className={
                        !l3NameInput && props.mode === 'fixError' ? 'custom-select border-red' : 'custom-select'
                      }
                      style={{ width: '100%' }}
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
                      disabled={!props.examTypeID || disableField || !l2CodeInput}
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
                  {!l3NameInput && props.mode === 'fixError' && (
                    <div style={{ fontSize: 16, color: '#D52929' }}>*Please select information</div>
                  )}
                </Col>
                <Col span={1}></Col>
                <Col span={7}>
                  <Form.Item
                    name="Score"
                    label={<span style={{ fontSize: 18, fontWeight: 600 }}>Score</span>}
                    normalize={(value) => value.trimStart()}
                    initialValue={scoreInput}
                  >
                    <Input
                      disabled={disableField}
                      value={scoreInput}
                      className="custom-input"
                      type="number"
                      min={1}
                      max={255}
                      step={1}
                      placeholder="1"
                      maxLength={3}
                      onKeyPress={(e: any) => {
                        const key = e.key;
                        const currentValue = e.target.value;
                        if (!/^[0-9]$/.test(key)) {
                          e.preventDefault();
                        }
                        if (parseInt(currentValue + key, 10) > 255 || parseInt(currentValue + key, 10) === 0) {
                          e.preventDefault();
                        }
                      }}
                      onChange={(e: any) => {
                        if (parseInt(e.target.value, 10) > 255 || parseInt(e.target.value, 10) === 0) {
                          e.target.value = 255;
                        }
                      }}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col span={1}></Col>
                <Col>
                  <div style={{ fontSize: 24, color: '#000', marginTop: 10, fontWeight: 600 }}>Question</div>
                </Col>
              </Row>

              <Row style={{ marginBottom: 40, marginTop: 20 }}>
                <Col span={1}></Col>
                <Col span={23}>
                  <QuestionBox
                    placeHolder="Enter question description here"
                    isDisable={disableField}
                    initData={state.questionContentBase64 + ''}
                    setData={(data) => {
                      setState({ ...state, questionContentBase64: data });
                    }}
                    isFill={
                      props.mode !== 'fixError' ||
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
                  style={{
                    border: !selectedAnswer && props.mode === 'fixError' ? '1px solid red' : '',
                    padding: 10,
                    marginBottom: 20,
                  }}
                  span={23}
                >
                  <Form layout="vertical">
                    <Form.Item>
                      <Radio.Group onChange={handleRadioChange} value={selectedAnswer} className="full-width">
                        {answers.map((answer, index) => (
                          <Row key={index} gutter={[16, 16]} align="middle" className="answer-row">
                            <Col>
                              <Radio value={index + 1}>
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
                                        borderColor: !answer.content && props.mode === 'fixError' ? '#D52929' : '',
                                      }}
                                      value={answer.content}
                                      onChange={(e) => handleContentChange(index, e)}
                                      rows={2}
                                      placeholder={`Input text`}
                                      disabled={disableField}
                                    />
                                    {!answer.content && props.mode === 'fixError' && (
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
                                        borderColor: !answer.explanation && props.mode === 'fixError' ? '#D52929' : '',
                                      }}
                                      value={answer.explanation}
                                      onChange={(e) => handleExplanationChange(index, e)}
                                      rows={2}
                                      placeholder="Input text"
                                      disabled={disableField}
                                    />
                                    {/* Align the validation message to the start */}
                                    {!answer.explanation && props.mode === 'fixError' && (
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
              </Row>
              <Row>
                <Col span={1}></Col>
                {!selectedAnswer && props.mode === 'fixError' && (
                  <Col>
                    <div style={{ fontSize: 16, color: '#D52929' }}>*Please mark the correct answer</div>
                  </Col>
                )}
              </Row>
            </Col>
          </Row>
        </Suspense>
      </Form>
      <Modal
        closable={false}
        centered
        open={state.modalConfirmDeleteVisible}
        onCancel={() => setState({ ...state, modalConfirmDeleteVisible: false })}
        footer={null}
        maskClosable={false}
      >
        <div style={{ justifyItems: 'center', display: 'grid', marginBottom: 20 }}>
          <Heading as="h4">Are you sure you want to delete this item?</Heading>
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
            onClick={() => setState({ ...state, modalConfirmDeleteVisible: false })}
          >
            No
          </Button>
          <Button
            style={{ marginTop: 20, width: 160 }}
            type="primary"
            key="submit"
            onClick={() => {
              props.handleDeleteChildQuestion(props.index);
              setState({ ...state, modalConfirmDeleteVisible: false });
            }}
          >
            Yes
          </Button>
        </div>
      </Modal>
      {/* </Main> */}
    </>
  );
});

export default QuestionComponent;
