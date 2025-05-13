import UilSearch from '@iconscout/react-unicons/dist/icons/uil-search';
import UilPlus from '@iconscout/react-unicons/dist/icons/uil-plus';
import UilTrashAlt from '@iconscout/react-unicons/dist/icons/uil-trash-alt';
import UilPen from '@iconscout/react-unicons/dist/icons/uil-pen';
import { Empty, Form, FormInstance, Input, Modal, Select, Table, Tooltip } from 'antd';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { ReactNode, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/RootReducer';
import { fetchListExamTypeAll } from 'store/exam-type/Actions';
import { deleteKA, fetchListKAPaging, saveKA, updateKAForEdit } from 'store/ka/Actions';
import { themeColor } from 'config/theme/ThemeVariables';
import { Link } from 'react-router-dom';
import { KAModel } from 'store/ka/Types';
import { DataTableStyleWrap } from 'components/table/Style';
import { Button } from 'components/buttons/Buttons';
import { TableWrapper } from 'container/Style';
import { Heading } from 'components/heading/Heading';

interface IKATableData {
  key?: number;
  Code?: ReactNode;
  Name?: ReactNode;
  ExamType?: ReactNode;
  action1?: ReactNode;
  action2?: ReactNode;
}

interface IKA {
  type: string;
}

const KA = React.memo<IKA>(({ type }) => {
  const kaDataPaging = useSelector((states: RootState) => states.ka.dataPaging);
  const listAllExamType = useSelector((states: RootState) => states.examType.dataAll);
  const kaForEdit = useSelector((states: RootState) => states.ka.kaForEdit);
  const loading = useSelector((states: RootState) => states.ka.loading);

  const dispatch = useDispatch<any>();
  const formRef = useRef<FormInstance<any>>(null);
  const [form] = Form.useForm();
  const nameInput = Form.useWatch('Name', form);
  const codeInput = Form.useWatch('Code', form);
  const examTypeSelect = Form.useWatch('ExamType', form);
  const [state, setState] = useState({
    searchKey: '',
    modalConfirmVisible: false,
    typeConfirm: 1,
    page: 1,
    selectedExamType: 0,
  });
  useEffect(() => {
    if (state.modalConfirmVisible && state.typeConfirm === 1) {
      setTimeout(() => {
        formRef.current?.getFieldInstance('Code')?.focus();
      }, 0);
      
    }
  }, [state.modalConfirmVisible, state.typeConfirm]);
  useEffect(() => {
    if (type === '2') {
      getListKA();
      getListAllExamType();
    }
  }, [state.page, type]);

  const getListKA = () => {
    // call API lấy list ka
    let keyWord = state.searchKey.trim();
    setState({ ...state, searchKey: keyWord });
    dispatch(fetchListKAPaging(state.page, 10, keyWord));
  };

  const getListAllExamType = () => {
    // call API lấy list exam for select
    dispatch(fetchListExamTypeAll());
  };

  const onChangePage = (page: number) => {
    setState((state) => ({ ...state, page }));
  };

  const save = () => {
    // call API save
    let ka = {
      ID: kaForEdit?.ID,
      CodeL2: formRef.current?.getFieldValue('Code')?.toUpperCase(),
      Name: formRef.current?.getFieldValue('Name')?.trim(),
      ExamTypeID: formRef.current?.getFieldValue('ExamType'),
    };

    dispatch(saveKA(ka, state.page));
    !loading && closeModalConfirm();
    setState((state) => ({ ...state, searchKey: '', page: 1 }));
  };

  const deleteCate = () => {
    // call API delete
    kaForEdit?.ID && dispatch(deleteKA(kaForEdit?.ID, state.page));
    !loading && closeModalConfirm();
    setState((state) => ({ ...state, searchKey: '', page: 1 }));
  };

  const onChangeSearchBar = (e: ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, searchKey: e.currentTarget.value });
  };

  const filter = () => {
    if (state.page === 1) {
      getListKA();
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
      width: '10vw'
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
        return <div style={{fontWeight: 550,textAlign: 'center'}}>Subject (L1)</div>;
      } ,
      dataIndex: 'ExamType',
      key: 'ExamType',
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

  let tableDataSource: IKATableData[] = [];
  kaDataPaging?.listKA?.map((item) => {
    const { ID, CodeL2, examType, Name, tasks } = item;
    return tableDataSource.push({
      key: ID,
      Code: CodeL2,
      Name,
      ExamType: `[${examType?.ExamType}]-[${examType?.Name}]`,
      action1: (
        <div className="table-actions">
          <Tooltip title={tasks && tasks.length > 0 ? 'Can not edit this item' : 'Edit'}>
            <Link className="edit" to="#" onClick={() => (tasks && tasks.length > 0 ? {} : openModalConfirm(1, item))}>
              <UilPen style={{ width: 20 }} color={themeColor['dark-gray']} />
            </Link>
          </Tooltip>
        </div>
      ),
      action2: (
        <div className="table-actions">
          <Tooltip title={tasks && tasks.length > 0 ? 'Can not delete this item' : 'Delete'}>
            <Link
              className="delete"
              to="#"
              onClick={() => (tasks && tasks.length > 0 ? {} : openModalConfirm(2, item))}
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
        Code: kaForEdit?.CodeL2?.trim(),
        Name: kaForEdit?.Name?.trim(),
        ExamType: kaForEdit?.ExamTypeID,
      });

    state.typeConfirm === 2 &&
      formRef.current?.setFieldsValue({
        Code: '',
        Name: '',
        ExamType: undefined,
      });
  }, [kaForEdit, state.typeConfirm]);

  const openModalConfirm = (typeConfirm: number, ka: KAModel) => {
    typeConfirm === 1 &&
      formRef.current?.setFieldsValue({
        Code: ka.CodeL2?.trim(),
        Name: ka.Name?.trim(),
        ExamType: ka.ExamTypeID,
      });

    dispatch(
      updateKAForEdit(
        ka,
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

  const getListSelectExamType = () => {
    let listExamType = [] as { value?: number; label: string }[];
    listAllExamType?.map((e) => listExamType.push({ value: e.ID, label: `[${e?.ExamType}]-[${e?.Name}]` }));

    return listExamType;
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
            <Button style={{width: 130}} mergetype="dark-success" onClick={() => openModalConfirm(1, {} as KAModel)}>
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
                  total: kaDataPaging?.totalRow,
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
              state.typeConfirm === 1 &&
              (!nameInput || nameInput === '' || !codeInput || codeInput === '' || !examTypeSelect)
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
            {state.typeConfirm === 1 ? 'L2 Details' : 'Are you sure you want to delete this item?'}
          </Heading>
        </div>

        <Form hidden={state.typeConfirm === 1 ? false : true} form={form} ref={formRef} name="ninjadash-vertical-form" layout="vertical">
          <Form.Item
            name="Code"
            label={
              <span style={{ fontSize: 18, fontWeight: 600 }}>
                <span style={{ color: 'red' }}>*</span> Code
              </span>
            }
            style={{ marginBottom: 30 }}
            normalize={(value) => value.replace(/\s/g, '')}
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
            style={{ marginBottom: 30 }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="ExamType"
            label={
              <span style={{ fontSize: 18, fontWeight: 600 }}>
                <span style={{ color: 'red' }}>*</span> Subject (L1)
              </span>
            }
          >
            <Select
              showSearch
              filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
              options={getListSelectExamType()}
            />
          </Form.Item>
        </Form>

      </Modal>
    </div>
  );
});

export default KA;
