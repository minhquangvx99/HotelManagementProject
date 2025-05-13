import UilSearch from '@iconscout/react-unicons/dist/icons/uil-search';
import UilPlus from '@iconscout/react-unicons/dist/icons/uil-plus';
import UilTrashAlt from '@iconscout/react-unicons/dist/icons/uil-trash-alt';
import UilPen from '@iconscout/react-unicons/dist/icons/uil-pen';
import { FormInstance, Form, Tooltip, Input, Table, Modal, Empty } from 'antd';
import { Button } from 'components/buttons/Buttons';
import { Heading } from 'components/heading/Heading';
import { DataTableStyleWrap } from 'components/table/Style';
import { themeColor } from 'config/theme/ThemeVariables';
import { TableWrapper } from 'container/Style';
import { ChangeEvent, ReactNode, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from 'store/RootReducer';
import { fetchListExamTypePaging, saveExamType, deleteExamType, updateExamTypeForEdit } from 'store/exam-type/Actions';
import { ExamTypeModel } from 'store/exam-type/Types';
import React from 'react';
import { removeAscent } from 'utility/regularExpression';

interface IExamTypeStudentTableData {
  ID?: number;
  key?: number;
  ExamType?: ReactNode;
  Name?: ReactNode;
  action1?: ReactNode;
  action2?: ReactNode;
}

interface IExamType {
  type: string;
}

const ExamType = React.memo<IExamType>(({ type }) => {
  const examTypeDataPaging = useSelector((states: RootState) => states.examType.dataPaging);
  const examTypeForEdit = useSelector((states: RootState) => states.examType.examTypeForEdit);
  const loading = useSelector((states: RootState) => states.examType.loading);

  const dispatch = useDispatch<any>();
  const formRef = useRef<FormInstance<any>>(null);
  const [form] = Form.useForm();
  const examTypeInput = Form.useWatch('ExamType', form);
  const nameInput = Form.useWatch('Name', form);
  const [state, setState] = useState({
    searchKey: '',
    modalConfirmVisible: false,
    typeConfirm: 1,
    page: 1,
  });

  useEffect(() => {
    type === '1' && getListExamType();
  }, [state.page, type]);

  const getListExamType = () => {
    // call API lấy list exam type
    let keyWord = state.searchKey.trim();
    setState({ ...state, searchKey: keyWord });
    dispatch(fetchListExamTypePaging(state.page, 10, keyWord));
  };

  const onChangePage = (page: number) => {
    setState((state) => ({ ...state, page }));
  };

  const save = () => {
    // call API save
    let examType = {
      ID: examTypeForEdit?.ID,
      ExamType: formRef.current?.getFieldValue('ExamType')?.toUpperCase(),
      Name: formRef.current?.getFieldValue('Name')?.trim(),
    };
    dispatch(saveExamType(examType, state.page));
    !loading && closeModalConfirm();
    setState((state) => ({ ...state, searchKey: '', page: 1 }));
  };

  const deleteCate = () => {
    // call API delete
    examTypeForEdit?.ID && dispatch(deleteExamType(examTypeForEdit?.ID, state.page));
    !loading && closeModalConfirm();
    setState((state) => ({ ...state, searchKey: '', page: 1 }));
  };

  const onChangeSearchBar = (e: ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, searchKey: e.currentTarget.value });
  };

  const filter = () => {
    if (state.page === 1) {
      getListExamType();
    } else {
      setState((state) => ({ ...state, page: 1 }));
    }
  };

  const dataTableColumn = [
    {
      title: () => { 
        return <div style={{fontWeight: 550}}>Code</div>;
      } ,
      dataIndex: 'ID',
      key: 'ID',
      align: 'center' as const,
      width: '5vw',
    },
    {
      title: () => { 
        return <div style={{fontWeight: 550 ,textAlign: 'center'}}>Subject</div>;
      } ,
      dataIndex: 'ExamType',
      key: 'ExamType',
     
      width: '15vw',
    },
    {
      title: () => { 
        return <div style={{fontWeight: 550,textAlign: 'center'}}>Name</div>;
      } ,
      dataIndex: 'Name',
      key: 'Name',
      width: '65vw',
     
    },
    {
      title: '',
      dataIndex: 'action1',
      key: 'action1',
      width: 50,
    },
    {
      title: '',
      dataIndex: 'action2',
      key: 'action2',
      width: 50,
    },
  ];

  let tableDataSource: IExamTypeStudentTableData[] = [];
  examTypeDataPaging?.listExamType?.map((item) => {
    const { ID, ExamType, Name, kas, examTypeStudents } = item;
    return tableDataSource.push({
      key: ID,
      ID,
      ExamType: <pre className="custom-pre">{ExamType}</pre>,
      Name: (
        <Tooltip
          title={Name}
          placement="bottom"
          style={{ display: 'block', maxWidth: '100%' }}
          overlayInnerStyle={{ background: '#000' }}
        >
          {Name}
        </Tooltip>
      ),
      action1: (
        <div className="table-actions">
          <Tooltip
            title={
              (kas && kas.length > 0) || (examTypeStudents && examTypeStudents.length > 0)
                ? 'Can not edit this item'
                : 'Edit'
            }
          >
            <Link
              className="edit"
              to="#"
              onClick={() =>
                (kas && kas.length > 0) || (examTypeStudents && examTypeStudents.length > 0)
                  ? {}
                  : openModalConfirm(1, item)
              }
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
              (kas && kas.length > 0) || (examTypeStudents && examTypeStudents.length > 0)
                ? 'Can not delete this item'
                : 'Delete'
            }
          >
            <Link
              className="delete"
              to="#"
              onClick={() =>
                (kas && kas.length > 0) || (examTypeStudents && examTypeStudents.length > 0)
                  ? {}
                  : openModalConfirm(2, item)
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
    if (state.modalConfirmVisible && state.typeConfirm === 1) {
      setTimeout(() => {
        formRef.current?.getFieldInstance('ExamType')?.focus();
      }, 0);
     
    }
  }, [state.modalConfirmVisible, state.typeConfirm]);

  useEffect(() => {
    state.typeConfirm === 1 &&
      formRef.current?.setFieldsValue({
        ExamType: examTypeForEdit?.ExamType?.trim(),
        Name: examTypeForEdit?.Name?.trim(),
      });

    state.typeConfirm === 2 &&
      formRef.current?.setFieldsValue({
        ExamType: '',
        Name: '',
      });
  }, [examTypeForEdit, state.typeConfirm]);

  const openModalConfirm = (typeConfirm: number, cate: ExamTypeModel) => {
    typeConfirm === 1 &&
      formRef.current?.setFieldsValue({
        ExamType: cate.ExamType?.trim(),
        Name: cate.Name?.trim(),
      });
    dispatch(
      updateExamTypeForEdit(
        cate,
        setState((state) => ({ ...state, modalConfirmVisible: true, typeConfirm })),
      ),
    );
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

  return (
    <div>
      <DataTableStyleWrap>
        {/* Filter side */}
        <div className="ninjadash-datatable-filter">
          <div className="ninjadash-datatable-filter__left">
            <div className="ninjadash-datatable-filter__input" style={{ minWidth: '50%' }}>
              <Input
                className="ninjadash-data-id"
                value={state.searchKey}
                allowClear
                onChange={onChangeSearchBar}
                onPressEnter={filter}
                prefix={<UilSearch style={{ color: 'black' }} onClick={filter} />}
              />
            </div>
          </div>
          <div className="ninjadash-datatable-filter__action" style={{ display: 'flex' }}>
            <Button style={{width: 130}} mergetype="dark-success" onClick={() => openModalConfirm(1, {} as ExamTypeModel)}>
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
              pagination={
                tableDataSource.length > 0 && {
                  pageSize: 10,
                  onChange: onChangePage,
                  total: examTypeDataPaging?.totalRow,
                  current: state.page,
                }
              }
              loading={loading}
              locale={{
                emptyText: (
                  <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description={state.searchKey.trim() !== '' ? 'Not found' : 'No data'}
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
        // onCancel={closeModalConfirm}
        footer={  <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button mergetype="primary" outlined key="back" onClick={closeModalConfirm}>
            {state.typeConfirm === 1 ? 'Cancel' : 'No'}
          </Button>,
          <Button
            disabled={
              state.typeConfirm === 1 && (!nameInput || nameInput === '' || !examTypeInput || examTypeInput === '')
            }
            loading={loading}
            mergetype="primary"
            key="submit"
            onClick={onSubmit}
          >
            {state.typeConfirm === 1 ? 'Save' : 'Yes'}
          </Button>,
          
          </div>}
      >
        <div style={{ justifyItems: 'center', display: 'grid', marginBottom: 20 }}>
          <Heading as="h4">
            {state.typeConfirm === 1 ? 'Subject Details' : 'Are you sure you want to delete this item?'}
          </Heading>
        </div>

        <Form hidden={state.typeConfirm === 1 ? false : true} form={form} ref={formRef} name="ninjadash-vertical-form" layout="vertical">
          <Form.Item
            name="ExamType"
            label={
              <span style={{ fontSize: 18, fontWeight: 600 }}>
                <span style={{ color: 'red' }}>*</span> Subject
              </span>
            }
            style={{ marginBottom: 30 }}
            normalize={(value) => removeAscent(value.replace(/\s/g, ''))}
          >
            <Input style={{ textTransform: 'uppercase' }} />
          </Form.Item>

          <Form.Item
            name="Name"
            label={
              <span style={{ fontSize: 18, fontWeight: 600 }}>
                <span style={{ color: 'red' }}>*</span> Name
              </span>
            }
            normalize={(value) => value.trimStart()}
          >
            <Input />
          </Form.Item>
        </Form>

      </Modal>
    </div>
  );
});

export default ExamType;
