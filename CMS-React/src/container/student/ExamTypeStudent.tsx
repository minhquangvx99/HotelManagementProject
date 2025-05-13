import UilPlus from '@iconscout/react-unicons/dist/icons/uil-plus';
import UilTrashAlt from '@iconscout/react-unicons/dist/icons/uil-trash-alt';
import UilPen from '@iconscout/react-unicons/dist/icons/uil-pen';
import { FormInstance, Form, Tooltip, Input, Table, Modal, Empty, Select, DatePicker } from 'antd';
import { Button } from 'components/buttons/Buttons';
import { Heading } from 'components/heading/Heading';
import { DataTableStyleWrap } from 'components/table/Style';
import { themeColor } from 'config/theme/ThemeVariables';
import { TableWrapper } from 'container/Style';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from 'store/RootReducer';
import { fetchListExamTypeStudentPaging, deleteExamTypeStudent, addUpdateExamTypeStudent, addOrUpdateExamTypeStudentSuccess } from 'store/student/Actions';
import { ExamTypeStudentModel } from 'store/student/Types';
import React from 'react';
import moment from 'moment';
import { fetchListExamTypeDropList } from 'store/exam-type/Actions';

interface IExamTypeStudentTableData {
  ID?: number;
  key?: number;
  ExamType?: ReactNode;
  Content?: ReactNode;
  ActiveDate?: ReactNode;
  ExpireDate?: ReactNode;
  action1?: ReactNode;
  action2?: ReactNode;
}

interface IExamTypeStudent {
  type: string;
}

const ExamTypeStudent = React.memo<IExamTypeStudent>(({ type }) => {
  const examTypeStudentDataPaging = useSelector((states: RootState) => states.student.dataExamTypeStudentPaging);
  const examTypeStudentForEdit = useSelector((states: RootState) => states.student.examTypeStudentForEdit);
  const listAllExamType = useSelector((states: RootState) => states.examType.dataDropList);
  const loading = useSelector((states: RootState) => states.student.loading);
  const studentForEdit = useSelector((state: RootState) => state.student.studentForEdit);
  const dispatch = useDispatch<any>();
  const formRef = useRef<FormInstance<any>>(null);
  const [form] = Form.useForm();
  const examTypeInput = Form.useWatch('ExamType', form);
  const activeDateInput = Form.useWatch('ActiveDate', form);
  const expireDateInput = Form.useWatch('ExpireDate', form);
  const contentInput = Form.useWatch('Content', form);
  const [state, setState] = useState({
    modalConfirmVisible: false,
    typeConfirm: 1,
    page: 1,
  });

  useEffect(() => {
    type === '2' && getListExamTypeStudent();
  }, [state.page, type]);

  const getListExamTypeStudent = () => {
    // call API lấy list exam type
    dispatch(fetchListExamTypeStudentPaging(state.page, 10, studentForEdit?.ID ? studentForEdit?.ID : 0));
  };


  const getListSelectExamType = () => {
    let listExamType = [] as { value?: number; label: string }[];
    listAllExamType?.map((e) => listExamType.push({ value: e.ID, label: `[${e?.ExamType}]-[${e?.Name}]` }));

    return listExamType;
  };

  const onChangePage = (page: number) => {
    setState((state) => ({ ...state, page }));
  };

  const save = () => {
    // call API save
    let examTypeStudent = {
      ID: examTypeStudentForEdit?.ID,
      UserID: studentForEdit?.ID,
      ExamTypeID: examTypeInput,
      Content: contentInput ? contentInput.trim() : contentInput,
      ActiveDate: activeDateInput ? moment(activeDateInput).format("YYYY-MM-DD") : "",
      ExpireDate: expireDateInput ? moment(expireDateInput).format("YYYY-MM-DD") : "",
    };
    dispatch(addUpdateExamTypeStudent(examTypeStudent, state.page, studentForEdit?.ID ? studentForEdit?.ID : 0));
    !loading && closeModalConfirm();
    setState((state) => ({ ...state, page: 1 }));
  };

  const deleteCate = () => {
    // call API delete
    examTypeStudentForEdit?.ID && dispatch(deleteExamTypeStudent(examTypeStudentForEdit?.ID, state.page, studentForEdit?.ID ? studentForEdit?.ID : 0));
    !loading && closeModalConfirm();
    setState((state) => ({ ...state, page: 1 }));
  };

  let dataTableColumn :({
    title: () => JSX.Element;
    dataIndex: string;
    key: string;
    align: "left";
    width: string;
  } | {
    title: () => JSX.Element;
    dataIndex: string;
    key: string;
    align: "center";
    width: string;
  })[] = [
    {
      title: () => {
        return <div style={{ textAlign: 'center' }}><div style={{ fontWeight: 'bold' }}>Subject</div></div>;
      },
      dataIndex: 'ExamType',
      key: 'ExamType',
      align: 'left' as const,
      width: '20vw'
    },
    
    
  ];
  if (studentForEdit?.Status !== 4 && studentForEdit?.Status !== 5) {
    dataTableColumn = [
      ...dataTableColumn,
     
      {
        title: () => {
          return <div style={{ textAlign: 'center' }}><div style={{ fontWeight: 'bold' }}>Note</div></div>;
        },
        dataIndex: 'Content',
        key: 'Content',
        align: 'left' as const,
        width: '30vw'
      },
    ];
  }

  if (studentForEdit?.Status !== 6) {
    dataTableColumn = [
      ...dataTableColumn,
      {
        title: () => {
          return <div style={{ textAlign: 'center' }}><div style={{ fontWeight: 'bold' }}>Active Date</div></div>;
        },
        dataIndex: 'ActiveDate',
        key: 'ActiveDate',
        align: 'center' as const,
        width: '15vw'
      },
      {
        title: () => {
          return <div style={{ textAlign: 'center' }}><div style={{ fontWeight: 'bold' }}>Expire Date</div></div>;
        },
        dataIndex: 'ExpireDate',
        key: 'ExpireDate',
        align: 'center' as const,
        width: '15vw'
      },
      
    ];
  }


  if (studentForEdit?.Status !== 4 && studentForEdit?.Status !== 5) {
    dataTableColumn = [
      ...dataTableColumn,
     
      {
        title: () => <></>, // Sử dụng hàm trả về phần tử JSX trống thay vì chuỗi
        dataIndex: 'action1',
        key: 'action1',
        align: 'center',
        width: '5vw'
      },
      {
        title: () => <></>, // Sử dụng hàm trả về phần tử JSX trống thay vì chuỗi
        dataIndex: 'action2',
        key: 'action2',
        align: 'center',
        width: '5vw'
      },
    ];
  }

  let tableDataSource: IExamTypeStudentTableData[] = [];
  examTypeStudentDataPaging?.ListExamTypeStudentPaging?.map((item) => {
    const { ID, ExamType, Content, ActiveDate, ExpireDate, Status } = item;
    return tableDataSource.push({
      key: ID,
      ExamType: (
        <Tooltip
          title={ExamType}
          placement="bottom"
          overlayStyle = {{maxWidth: '100%' }}
          style={{ display: 'block', maxWidth: '100%' }}
          overlayInnerStyle={{ background: '#000' }}
        >
          {ExamType}
        </Tooltip>
      ),
      Content: (
        <Tooltip
          title={<pre className="custom-pre">{Content}</pre>}
          placement="bottom"
          overlayStyle = {{maxWidth: '100%' }}
          style={{ display: 'block', maxWidth: '100%' }}
          overlayInnerStyle={{ background: '#000' }}
        >
          <pre className="custom-pre">{Content}</pre>
        </Tooltip>
      ),
      ActiveDate: (
        <Tooltip
          title={ActiveDate ? moment(ActiveDate).format("DD/MM/YYYY") : ""}
          placement="bottom"
          overlayStyle = {{maxWidth: '100%' }}
          style={{ display: 'block', maxWidth: '100%' }}
          overlayInnerStyle={{ background: '#000' }}
        >
          {ActiveDate ? moment(ActiveDate).format("DD/MM/YYYY") : ""}
        </Tooltip>
      ),
      ExpireDate: (
        <Tooltip
          title={ExpireDate ? moment(ExpireDate).format("DD/MM/YYYY") : ""}
          placement="bottom"
          overlayStyle = {{maxWidth: '100%' }}
          style={{ display: 'block', maxWidth: '100%' }}
          overlayInnerStyle={{ background: '#000' }}
        >
          {ExpireDate ? moment(ExpireDate).format("DD/MM/YYYY") : ""}
        </Tooltip>
      ),
      
      action1: studentForEdit?.Status !== 4 && (
        <div className="table-actions">
          <Tooltip
            title='Edit'
          >
            <Link
              className="edit"
              to="#"
              onClick={() => openModalConfirm(1, item)}
            >
              <UilPen style={{ width: 20 }} color={themeColor['dark-gray']} />
            </Link>
          </Tooltip>
        </div>
      ),
      action2: (
        <div className="table-actions">
          <Tooltip
            title={
              (Status == 1)

                ? 'Can not delete this item'
                :
                'Delete'
            }
          >
            <Link
              className="delete"
              to="#"
              onClick={() =>
                (Status == 1)
                  ? 'Can not edit this item' :
                  openModalConfirm(2, item)
              }

            >
              <UilTrashAlt style={{ width: 24 }} color={themeColor['danger-color']} />
            </Link>
          </Tooltip>
        </div>
      ),
    });
  });

  useEffect(() => {
    state.typeConfirm === 1 &&
      formRef.current?.setFieldsValue({
        ExamType: examTypeStudentForEdit?.ExamTypeID,
        Content: examTypeStudentForEdit?.Content,
        ActiveDate: (examTypeStudentForEdit?.ActiveDate && examTypeStudentForEdit?.ActiveDate !== "1753-01-01T00:00:00") ? moment(examTypeStudentForEdit?.ActiveDate) : "",
        ExpireDate: (examTypeStudentForEdit?.ExpireDate && examTypeStudentForEdit?.ExpireDate !== "1753-01-01T00:00:00") ? moment(examTypeStudentForEdit?.ExpireDate) : "",
      });
    state.typeConfirm === 2 &&
      formRef.current?.setFieldsValue({
        ExamType: '',
        Content: '',
        ActiveDate: '',
        ExpireDate: '',
      });
  }, [examTypeStudentForEdit, state.typeConfirm]);

  const openModalConfirm = (typeConfirm: number, cate: ExamTypeStudentModel) => {
    if (typeConfirm === 1) {
      setState({ ...state });
      dispatch(fetchListExamTypeDropList(studentForEdit?.ID ? studentForEdit?.ID : 0, cate.ExamTypeID ? cate.ExamTypeID : 0));
      formRef.current?.setFieldsValue({
        ExamType: cate?.ExamTypeID,
        Content: cate?.Content,
        ActiveDate: (cate?.ActiveDate && cate?.ActiveDate !== "1753-01-01T00:00:00") ? moment(cate?.ActiveDate) : "",
        ExpireDate: (cate?.ExpireDate && cate?.ExpireDate !== "1753-01-01T00:00:00") ? moment(cate?.ExpireDate) : "",
      });
    }
    else {
      setState({ ...state });
      dispatch(fetchListExamTypeDropList(studentForEdit?.ID ? studentForEdit?.ID : 0, 0));
    }
    dispatch(addOrUpdateExamTypeStudentSuccess(cate));
    setState((state) => ({ ...state, modalConfirmVisible: true, typeConfirm }));
  };

  const closeModalConfirm = () => {
    setState((state) => ({ ...state, modalConfirmVisible: false }));
  };

  const onSubmit = () => {
    formRef.current?.submit();
    if (formRef.current?.getFieldsError().length !== 0) {
      if (state.typeConfirm === 1) {
        save();
      } else {
        deleteCate();
      }
    }
  };
  const disabledAtiveDate = (current: any) => {
    return current && (expireDateInput != '' ? (current > moment(expireDateInput)) : false);
  };
  const disabledExpireDate = (current: any) => {
    return current && (activeDateInput != '' ? (current < moment(activeDateInput)) : false);
  };
  return (
    <div>
      <DataTableStyleWrap>
        {/* Filter side */}
        <div className="ninjadash-datatable-filter" style={{ justifyContent: 'flex-end' }}>
          <div className="ninjadash-datatable-filter__action" style={{ display: 'flex' }}>
            <Button hidden={studentForEdit?.Status ===4 || studentForEdit?.Status === 5} style={{width: 130}} mergetype="dark-success" onClick={() => openModalConfirm(1, {} as ExamTypeStudentModel)}>
              Add
            </Button>
          </div>
        </div>

        {/* Table side */}
        <div className="ninjadasj-datatable">
          <TableWrapper className="table-data-view table-responsive">
            <Table
              bordered
              className="table-responsive"
              dataSource={tableDataSource}
              columns={dataTableColumn}
              pagination={{
                pageSize: 10,
                onChange: onChangePage,
                total: examTypeStudentDataPaging?.totalRow,
                current: state.page,
              }}
              loading={loading}
              locale={{
                emptyText: (
                  <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description={'No data'}
                  />
                ),
              }}
            />
          </TableWrapper>
        </div>
      </DataTableStyleWrap>

      <Modal
        closable={false}
        centered
        open={state.modalConfirmVisible}
        onCancel={closeModalConfirm}
        footer={[
          <Button
            disabled={
              state.typeConfirm === 1 && (!examTypeInput || examTypeInput === '' || !activeDateInput || activeDateInput === '' || !expireDateInput || expireDateInput === '' || (examTypeInput.toString() === examTypeStudentForEdit?.ExamTypeID?.toString() && moment(activeDateInput).format("YYYY-MM-DD") === moment(examTypeStudentForEdit?.ActiveDate).format("YYYY-MM-DD") && moment(expireDateInput).format("YYYY-MM-DD") === moment(examTypeStudentForEdit?.ExpireDate).format("YYYY-MM-DD") && (contentInput === examTypeStudentForEdit?.Content)))
            }
            loading={loading}
            mergetype="primary"
            key="submit"
            onClick={onSubmit}
          >
            {state.typeConfirm === 1 ? 'Save' : 'Yes'}
          </Button>,
          <Button mergetype="primary" outlined key="back" onClick={closeModalConfirm}>
            {state.typeConfirm === 1 ? 'Cancel' : 'No'}
          </Button>,
        ]}
      >
        <div style={{ justifyItems: 'center', display: 'grid', marginBottom: 20 }}>
          <Heading as="h4">
            {state.typeConfirm === 1 ? 'Subject Detail' : 'Do you want to delete the selected item?'}
          </Heading>
        </div>
          <Form form={form} hidden={state.typeConfirm === 1?false:true} ref={formRef} name="ninjadash-vertical-form" layout="vertical">
            <Form.Item
              name="ExamType"
              label={
                <span style={{ fontSize: 18, fontWeight: 600 }}>
                  <span style={{ color: 'red' }}>*</span> Subject
                </span>
              }
            >
              <Select
                showSearch
                filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                options={getListSelectExamType()}
              />
            </Form.Item>
            <Form.Item
              name="Content"
              label={
                <span style={{ fontSize: 18, fontWeight: 600 }}>
                  <span style={{ color: 'red' }}></span> Content
                </span>
              }
              normalize={(value) => value.trimStart()}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item name="ActiveDate" label={<span style={{ fontSize: 18, fontWeight: 600 }}><span style={{ color: 'red' }}>*</span> Active Date</span>}>
              <DatePicker disabledDate={(current) =>disabledAtiveDate(current)} style={{ width: '100%' }} format={"DD/MM/YYYY"} />
            </Form.Item>
            <Form.Item name="ExpireDate" label={<span style={{ fontSize: 18, fontWeight: 600 }}><span style={{ color: 'red' }}>*</span> Expire Date</span>}>
              <DatePicker disabledDate={(current) =>disabledExpireDate(current)} style={{ width: '100%' }} format={"DD/MM/YYYY"} />
            </Form.Item>
          </Form>
      </Modal>
    </div>
  );
});

export default ExamTypeStudent;
