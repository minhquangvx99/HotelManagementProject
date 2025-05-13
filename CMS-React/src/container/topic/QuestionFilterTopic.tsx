// import { Form, Input, Col, Row, Button, Select, Tooltip, Card } from 'antd';
// import TextArea from 'antd/lib/input/TextArea';
// import { ChangeEvent, FC, useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { fetchListQuestion, filterQuestion } from 'store/question/Actions';
// import { AnswerModel, QuestionApiModel, QuestionModel } from 'store/question/Types';
// import { FilterContainer } from './Style';
// import DropSearch from 'components/dropSearch/dropSearch';
// import { ExamTypeModel } from 'store/exam-type/Types';
// import { TaskModel } from 'store/task/Types';
// import { KAModel } from 'store/ka/Types';
// import { BatchModel } from 'store/batch/Types';
// import { DownOutlined } from '@ant-design/icons';
// import { check } from 'prettier';
// interface IFilterQuestion {
//   type?: string;
//   BatchIdAll: BatchModel[] | undefined;
//   examTypeAll: ExamTypeModel[] | undefined;
//   taskAll: TaskModel[] | undefined;
//   KaAll: KAModel[] | undefined;
//   setFilterForm: (values: QuestionApiModel) => void;
//   selectedExamtypeID?: number;
//   checkl1?: boolean;
//   status?: number;
// }

// const QuestionFilterTopic: FC<IFilterQuestion> = (props) => {
//   const dispatch = useDispatch<any>();
//   const [form] = Form.useForm();
//   const [state, setState] = useState({
//     searchKey: '',
//     keyChange: '',
//     modalConfirmVisible: false,
//     typeConfirm: 1,
//     questionSelectToDelete: {} as QuestionModel,
//     page: 1,
//   });
//   const l1Filter = props.examTypeAll
//     ?.map((examType) => ({
//       label: String(examType.ExamType).trim() || '',
//       value: examType.ID || 0,
//     }))
//     .filter((examType) => examType.label !== undefined && examType.value !== undefined) || [{ label: '', value: '' }];

//   const l2Filter = props.KaAll?.map((ka) => ({
//     label: String(ka.Name).trim() || '',
//     value: ka.ID || 0,
//   })).filter((ka) => ka.label !== undefined && ka.value !== undefined) || [{ label: '', value: '' }];

//   const l3Filter = props.taskAll
//     ?.map((task) => ({
//       label: String(task.Name).trim() || '',
//       value: task.ID || 0,
//     }))
//     .filter((task) => task.label !== undefined && task.value !== undefined) || [{ label: '', value: '' }];

//   const BatchIdFilter = props.BatchIdAll?.map((task) => ({
//     label: task.Code.trim() || '',
//     value: task.ID || 0,
//   })).filter((task) => task.label !== undefined && task.value !== undefined) || [{ label: '', value: '' }];

//   const onChangeSearchBar = (e: ChangeEvent<HTMLInputElement>) => {
//     setState({ ...state, searchKey: e.currentTarget.value });
//   };
//   const getListQuestion = () => {
//     let keyWord = state.searchKey.trim();
//     setState({ ...state, searchKey: keyWord });
//     dispatch(fetchListQuestion(keyWord, state.page, 10));
//   };
//   const filter = async () => {
//     const values = (await form.validateFields()) as QuestionApiModel;
//     values.type = props.type || '1';
//     values.page = 1;
//     values.content = values.content?.trim();
//     values.l1 = props.selectedExamtypeID;
//     values.code = values.code?.trim();
//     values.status = 1;
//     form.setFieldsValue(values);

//     form.submit();
//     try {
//       console.log('valuesvaluesvalues: ', values);

//       dispatch(filterQuestion(values));
//       props.setFilterForm(values);
//     } catch (error) {}
//   };

//   const handleDropSearchChange = (field: string, value: string | number) => {
//     form.setFieldsValue({ [field]: value });
//   };

//   const handleReset = () => {
//     try {
//       form.resetFields();
//       filter();
//     } catch (error) {
//       console.error('Error resetting fields:', error);
//     }
//   };

//   return (
//     <FilterContainer>
//       <Form form={form} style={{ marginTop: 20 }}>
//         <Row gutter={32} style={{ padding: '10px 16px' }}>
//           <Col span={8}>
//             <Form.Item
//               name="content"
//               labelCol={{ span: 24 }}
//               wrapperCol={{ span: 24 }}
//               label={
//                 <span style={{ fontSize: 17, fontWeight: 550 }}>
//                   <span style={{ color: 'red' }}></span> Content of question
//                 </span>
//               }
//             >
//               <TextArea
//                 placeholder="Filter by content of question"
//                 size="small"
//                 style={{ resize: 'none', padding: '7px' }}
//               ></TextArea>
//             </Form.Item>
//           </Col>
//           <Col span={8}>
//             <Form.Item
//               name="code"
//               labelCol={{ span: 24 }}
//               wrapperCol={{ span: 24 }}
//               label={
//                 <span style={{ fontSize: 17, fontWeight: 550 }}>
//                   <span style={{ color: 'red' }}></span> Code of question
//                 </span>
//               }
//             >
//               {/* <TextArea placeholder="Filter by code of question" size="small" style={{ resize: 'none' }}></TextArea> */}
//               <Input type="text" placeholder="Filter by code of question" size="small"></Input>
//             </Form.Item>
//           </Col>
//           <Col span={8}>
//             <Form.Item
//               name="id"
//               labelCol={{ span: 24 }}
//               wrapperCol={{ span: 24 }}
//               label={
//                 <span style={{ fontSize: 17, fontWeight: 550 }}>
//                   <span style={{ color: 'red' }}></span> Batch ID
//                 </span>
//               }
//             >
//               <Select
//                 allowClear
//                 placeholder="Filter by batch ID"
//                 style={{ width: '100%' }}
//                 showSearch
//                 filterOption={(input, option) =>
//                   (option?.label?.toString() ?? '').toLowerCase().includes(input.toLowerCase())
//                 }
//                 optionLabelProp="label"
//                 aria-required
//                 notFoundContent="Not found"
//                 suffixIcon={<DownOutlined />}
//               >
//                 {BatchIdFilter.map((option) => (
//                   <Select.Option
//                     key={option.value}
//                     value={option.value + ''}
//                     label={option.label}
//                     style={{ width: '100%' }}
//                   >
//                     <Tooltip title={option.label}>{option.label}</Tooltip>
//                   </Select.Option>
//                 ))}
//               </Select>
//             </Form.Item>
//           </Col>
//         </Row>
//         <Row gutter={32} style={{ padding: '10px 16px' }}>
//           <Col span={8}>
//             <Form.Item
//               name="l2"
//               labelCol={{ span: 24 }}
//               wrapperCol={{ span: 24 }}
//               label={
//                 <span style={{ fontSize: 17, fontWeight: 550 }}>
//                   <span style={{ color: 'red' }}></span> L2 (KA,Module)
//                 </span>
//               }
//             >
//               {/* <Input placeholder="Filter by L2 (KA,Module)" size="small"></Input> */}
//               <Select
//                 placeholder="Filter by L2 (KA,Module)"
//                 style={{ width: '100%' }}
//                 showSearch
//                 filterOption={(input, option) =>
//                   (option?.label?.toString() ?? '').toLowerCase().includes(input.toLowerCase())
//                 }
//                 optionLabelProp="label"
//                 aria-required
//                 notFoundContent="Not found"
//                 allowClear
//                 suffixIcon={<DownOutlined />}
//               >
//                 {l2Filter.map((option) => (
//                   <Select.Option
//                     key={option.value}
//                     value={option.value + ''}
//                     label={option.label}
//                     style={{ width: '100%' }}
//                   >
//                     <Tooltip title={option.label}>{option.label}</Tooltip>
//                   </Select.Option>
//                 ))}
//               </Select>
//             </Form.Item>
//           </Col>
//           <Col span={8}>
//             <Form.Item
//               name="l3"
//               labelCol={{ span: 24 }}
//               wrapperCol={{ span: 24 }}
//               label={
//                 <span style={{ fontSize: 17, fontWeight: 550 }}>
//                   <span style={{ color: 'red' }}></span> L3 (Task)
//                 </span>
//               }
//             >
//               {/* <Input placeholder="Filter by L3 (Task)" size="small"></Input> */}
//               <Select
//                 placeholder="Filter by L3 (Task)"
//                 style={{ width: '100%' }}
//                 showSearch
//                 filterOption={(input, option) =>
//                   (option?.label?.toString() ?? '').toLowerCase().includes(input.toLowerCase())
//                 }
//                 optionLabelProp="label"
//                 allowClear
//                 aria-required
//                 notFoundContent="Not found"
//               >
//                 {l3Filter.map((option) => (
//                   <Select.Option
//                     key={option.value}
//                     value={option.value + ''}
//                     label={option.label}
//                     style={{ width: '100%' }}
//                   >
//                     <Tooltip title={option.label}>{option.label}</Tooltip>
//                   </Select.Option>
//                 ))}
//               </Select>
//             </Form.Item>
//           </Col>
//         </Row>

//         <Row gutter={32} justify="center" style={{ paddingBottom: '16px', paddingTop: '16px' }}>
//           <Col>
//             <Button
//               style={{
//                 minWidth: 120,
//                 color: '#194F9F',
//                 fontWeight: 'bold',
//               }}
//               onClick={handleReset}
//             >
//               Reset
//             </Button>
//           </Col>
//           <Col>
//             <Button
//               style={{ minWidth: 120, backgroundColor: '#194F9F', color: 'white', fontWeight: 'bold' }}
//               htmlType="submit"
//               onClick={filter}
//             >
//               Search
//             </Button>
//           </Col>
//         </Row>
//       </Form>
//     </FilterContainer>
//   );
// };

// export default QuestionFilterTopic;
