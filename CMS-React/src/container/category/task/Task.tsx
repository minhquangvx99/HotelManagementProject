import UilSearch from '@iconscout/react-unicons/dist/icons/uil-search';
import UilPlus from '@iconscout/react-unicons/dist/icons/uil-plus';
import UilTrashAlt from '@iconscout/react-unicons/dist/icons/uil-trash-alt';
import UilPen from '@iconscout/react-unicons/dist/icons/uil-pen';
import { FormInstance, Form, Tooltip, Input, Table, Modal, Select, Empty } from 'antd';
import { themeColor } from 'config/theme/ThemeVariables';
import React, { ChangeEvent, ReactNode, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from 'store/RootReducer';
import { deleteTask, fetchListTaskPaging, saveTask, updateTaskForEdit } from 'store/task/Actions';
import { TaskModel } from 'store/task/Types';
import { DataTableStyleWrap } from 'components/table/Style';
import { Button } from 'components/buttons/Buttons';
import { TableWrapper } from 'container/Style';
import { Heading } from 'components/heading/Heading';
import { fetchListKAAll } from 'store/ka/Actions';

interface ITaskTableData {
  key?: number;
  Code?: ReactNode;
  Name?: ReactNode;
  KAID?: ReactNode;
  action1?: ReactNode;
  action2?: ReactNode;
}

interface ITask {
  type: string;
}

const Task = React.memo<ITask>(({ type }) => {
  const taskDataPaging = useSelector((states: RootState) => states.task.dataPaging);
  const listAllKA = useSelector((states: RootState) => states.ka.dataAll);
  const taskForEdit = useSelector((states: RootState) => states.task.taskForEdit);
  const loading = useSelector((states: RootState) => states.task.loading);

  const dispatch = useDispatch<any>();
  const formRef = useRef<FormInstance<any>>(null);
  const [form] = Form.useForm();
  const nameInput = Form.useWatch('Name', form);
  const L2CodeSelect = Form.useWatch('KAID', form);
  const [state, setState] = useState({
    searchKey: '',
    modalConfirmVisible: false,
    typeConfirm: 1,
    page: 1,
  });
  useEffect(() => {
    if (state.modalConfirmVisible && state.typeConfirm === 1) {
      setTimeout(() => {
        formRef.current?.getFieldInstance('Name')?.focus();
      }, 0);
      
    }
  }, [state.modalConfirmVisible, state.typeConfirm]);

  useEffect(() => {
    if (type === '3') {
      getListTask();
      getListAllKA();
    }
  }, [state.page, type]);

  const getListTask = () => {
    // call API lấy list exam type
    let keyWord = state.searchKey.trim();
    setState({ ...state, searchKey: keyWord });
    dispatch(fetchListTaskPaging(state.page, 10, keyWord));
  };

  const getListAllKA = () => {
    // call API lấy list exam for select
    dispatch(fetchListKAAll());
  };

  const onChangePage = (page: number) => {
    setState((state) => ({ ...state, page }));
  };

  const save = () => {
    // call API save
    let task = {
      ID: taskForEdit?.ID,
      Name: formRef.current?.getFieldValue('Name')?.trim(),
      KAID: formRef.current?.getFieldValue('KAID'),
    };
    dispatch(saveTask(task, state.page));
    !loading && closeModalConfirm();
    setState((state) => ({ ...state, searchKey: '', page: 1 }));
  };

  const deleteCate = () => {
    // call API delete
    taskForEdit?.ID && dispatch(deleteTask(taskForEdit?.ID, state.page));
    !loading && closeModalConfirm();
    setState((state) => ({ ...state, searchKey: '', page: 1 }));
  };

  const onChangeSearchBar = (e: ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, searchKey: e.currentTarget.value });
  };

  const filter = () => {
    if (state.page === 1) {
      getListTask();
    } else {
      setState((state) => ({ ...state, page: 1 }));
    }
  };

  const dataTableColumn = [
    {
      title: () => { 
        return <div style={{fontWeight: 550}}>Code</div>;
      } ,
      dataIndex: 'Code',
      key: 'Code',
      align: 'center' as const,
      width: '10vw',
    },
    {
      title: () => { 
        return <div style={{fontWeight: 550,textAlign: 'center'}}>Name</div>;
      } ,
      dataIndex: 'Name',
      key: 'Name',
      width: '40vw',
    },
    {
      title: () => { 
        return <div style={{fontWeight: 550,textAlign: 'center'}}>L2 Code</div>;
      } ,
      dataIndex: 'KAID',
      key: 'KAID',
      width: '40vw',
    },
    {
      title: '',
      dataIndex: 'action1',
      key: 'action1',
      width: '5vw',
    },
    {
      title: '',
      dataIndex: 'action2',
      key: 'action2',
      width: '5vw',
    },
  ];

  let tableDataSource: ITaskTableData[] = [];
  taskDataPaging?.listTask?.map((item) => {
    const { ID, ka, Name, questions, examType } = item;
    return tableDataSource.push({
      key: ID,
      Code: `T${ID?.toLocaleString(undefined, { useGrouping: false, minimumIntegerDigits: 4 })}`,
      Name,
      KAID: `[${ka?.Name}]-[${examType?.ExamType}]`,
      action1: (
        <div className="table-actions">
          <Tooltip title={questions && questions.length > 0 ? 'Can not edit this item' : 'Edit'}>
            <Link
              className="edit"
              to="#"
              onClick={() => (questions && questions.length > 0 ? {} : openModalConfirm(1, item))}
            >
              <UilPen style={{ width: 20 }} color={themeColor['dark-gray']} />
            </Link>
          </Tooltip>
        </div>
      ),
      action2: (
        <div className="table-actions">
          <Tooltip title={questions && questions.length > 0 ? 'Can not delete this item' : 'Delete'}>
            <Link
              className="delete"
              to="#"
              onClick={() => (questions && questions.length > 0 ? {} : openModalConfirm(2, item))}
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
        Name: taskForEdit?.Name?.trim(),
        KAID: taskForEdit?.KAID,
      });

    state.typeConfirm === 2 &&
      formRef.current?.setFieldsValue({
        Name: '',
        KAID: undefined,
      });
  }, [taskForEdit, state.typeConfirm]);

  const openModalConfirm = (typeConfirm: number, task: TaskModel) => {
    typeConfirm === 1 &&
      formRef.current?.setFieldsValue({
        Name: task.Name?.trim(),
        KAID: task.KAID,
      });
    dispatch(
      updateTaskForEdit(
        task,
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

  const getListSelectKA = () => {
    let listKA = [] as { value?: number; label: string }[];
    listAllKA?.map((e) => listKA.push({ value: e.ID, label: `[${e.Name}] - [${e.examType?.ExamType}]` }));

    return listKA;
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
            <Button style={{width: 130}} mergetype="dark-success" onClick={() => openModalConfirm(1, {} as TaskModel)}>
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
                  total: taskDataPaging?.totalRow,
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
            disabled={state.typeConfirm === 1 && (!nameInput || nameInput === '' || !L2CodeSelect)}
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
            {state.typeConfirm === 1 ? 'L3 Details' : 'Are you sure you want to delete this item?'}
          </Heading>
        </div>

        <Form hidden={state.typeConfirm === 1 ? false : true} form={form} ref={formRef} name="ninjadash-vertical-form" layout="vertical">
          <Form.Item
            name="Name"
            label={
              <span style={{ fontSize: 18, fontWeight: 600 }}>
                <span style={{ color: 'red' }}>*</span> Name
              </span>
            }
            style={{ marginBottom: 30 }}
            normalize={(value) => value.trimStart()}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="KAID"
            label={
              <span style={{ fontSize: 18, fontWeight: 600 }}>
                <span style={{ color: 'red' }}>*</span> L2 Code
              </span>
            }
          >
            <Select
              showSearch
              filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
              options={getListSelectKA()}
            />
          </Form.Item>
        </Form>

      </Modal>
    </div>
  );
});

export default Task;
