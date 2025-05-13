import UilSearch from '@iconscout/react-unicons/dist/icons/uil-search';
import UilPlus from '@iconscout/react-unicons/dist/icons/uil-plus';
import UilTrashAlt from '@iconscout/react-unicons/dist/icons/uil-trash-alt';
import UilPen from '@iconscout/react-unicons/dist/icons/uil-pen';
import { FormInstance, Form, Tooltip, Input, Table, Modal, Empty, Pagination } from 'antd';
import React, { ChangeEvent, ReactNode, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/RootReducer';
import {
  deleteTypeOfTopicSet,
  fetchListTypeOfTopicSetPaging,
  saveTypeOfTopicSet,
  updateTypeOfTopicSetForEdit,
} from 'store/type-of-topic-set/Actions';
import { themeColor } from 'config/theme/ThemeVariables';
import { Link } from 'react-router-dom';
import { TypeOfTopicSetModel } from 'store/type-of-topic-set/Types';
import { DataTableStyleWrap } from 'components/table/Style';
import { Button } from 'components/buttons/Buttons';
import { TableWrapper } from 'container/Style';
import { Heading } from 'components/heading/Heading';
import { TopicSetModel } from 'store/topic-set/Types';

interface ITypeOfTopicSetTableData {
  ID?: number;
  key?: number;
  Name?: ReactNode;
  NumberOfQuestion?: ReactNode;
  SetUpTime?: ReactNode;
  topicsets?: TopicSetModel[];
  action1?: ReactNode;
  action2?: ReactNode;
}

interface ITypeOfTopicSet {
  type: string;
}

const TypeOfTopicSet = React.memo<ITypeOfTopicSet>(({ type }) => {
  const typeOfTopicSetDataPaging = useSelector((states: RootState) => states.typeOfTopicSet.dataPaging);
  const typeOfTopicSetForEdit = useSelector((states: RootState) => states.typeOfTopicSet.typeOfTopicSetForEdit);
  const loading = useSelector((states: RootState) => states.typeOfTopicSet.loading);

  const dispatch = useDispatch<any>();
  const formRef = useRef<FormInstance<any>>(null);
  const [form] = Form.useForm();
  const nameInput = Form.useWatch('Name', form);
  const numberOfQuestionInput = Form.useWatch('NumberOfQuestion', form);
  const setUpTimeInput = Form.useWatch('SetUpTime', form);
  const [state, setState] = useState({
    searchKey: '',
    modalConfirmVisible: false,
    typeConfirm: 1,
    page: 1,
  });

  useEffect(() => {
    type === '4' && getListTypeOfTopicSet();
  }, [state.page, type]);

  const getListTypeOfTopicSet = () => {
    // call API lấy list exam type
    let keyWord = state.searchKey.trim();
    setState({ ...state, searchKey: keyWord });
    dispatch(fetchListTypeOfTopicSetPaging(state.page, 10, keyWord));
  };

  const onChangePage = (page: number) => {
    setState((state) => ({ ...state, page }));
  };

  const [previousValue, setPreviousValue] = useState(null);

  const handleChange = (event: any) => {
    if (event.target.value != '' && (event.target.value > 255 || event.target.value < 1)) {
      setPreviousValue(previousValue);
      form.setFieldsValue({ NumberOfQuestion: previousValue });
    } else {
      setPreviousValue(event.target.value);
      form.setFieldsValue({ NumberOfQuestion: event.target.value });
    }
  };

  const [previousValue1, setPreviousValue1] = useState(null);

  const handleChange1 = (event: any) => {
    if (event.target.value != '' && (event.target.value > 300 || event.target.value < 1)) {
      setPreviousValue1(previousValue1);
      form.setFieldsValue({ SetUpTime: previousValue1 });
    } else {
      setPreviousValue1(event.target.value);
      form.setFieldsValue({ SetUpTime: event.target.value });
    }
  };

  const save = () => {
    // call API save
    let typeOfTopicSet = {
      ID: typeOfTopicSetForEdit?.ID,
      Name: formRef.current?.getFieldValue('Name')?.trim(),
      NumberOfQuestion: formRef.current?.getFieldValue('NumberOfQuestion'),
      SetUpTime: formRef.current?.getFieldValue('SetUpTime'),
    };
    dispatch(saveTypeOfTopicSet(typeOfTopicSet, state.page));
    !loading && closeModalConfirm();
    setState((state) => ({ ...state, searchKey: '', page: 1 }));
  };

  const deleteCate = () => {
    // call API delete
    typeOfTopicSetForEdit?.ID && dispatch(deleteTypeOfTopicSet(typeOfTopicSetForEdit?.ID, state.page));
    !loading && closeModalConfirm();
    setState((state) => ({ ...state, searchKey: '', page: 1 }));
  };

  const onChangeSearchBar = (e: ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, searchKey: e.currentTarget.value });
  };

  const filter = () => {
    if (state.page === 1) {
      getListTypeOfTopicSet();
    } else {
      setState((state) => ({ ...state, page: 1 }));
    }
  };

  const dataTableColumn = [
    {
      title: () => {
        return <div style={{ fontWeight: 550, textAlign: 'center' }}>Name</div>;
      },
      dataIndex: 'Name',
      key: 'Name',
      width: '50vw',
    },
    {
      title: () => {
        return <div style={{ fontWeight: 550, textAlign: 'center' }}>Number of question</div>;
      },
      dataIndex: 'NumberOfQuestion',
      key: 'NumberOfQuestion',
      width: '15vw',
      align: 'center' as const,
    },
    {
      title: () => {
        return <div style={{ fontWeight: 550, textAlign: 'center' }}>Set up time (minute)</div>;
      },
      dataIndex: 'SetUpTime',
      key: 'SetUpTime',
      width: '15vw',
      align: 'center' as const,
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

  let tableDataSource: ITypeOfTopicSetTableData[] = [];
  typeOfTopicSetDataPaging?.listTypeOfTopicSet?.map((item) => {
    const { ID, Name, NumberOfQuestion, SetUpTime, topicSets } = item;
    return tableDataSource.push({
      key: ID,
      ID,
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
      NumberOfQuestion,
      SetUpTime,
      action1: (
        <div className="table-actions">
          <Tooltip title={topicSets && topicSets.length > 0 ? 'Can not edit this item' : 'Edit'}>
            <Link
              className="edit"
              to="#"
              onClick={() => (topicSets && topicSets.length > 0 ? {} : openModalConfirm(1, item))}
            >
              <UilPen style={{ width: 20 }} color={themeColor['dark-gray']} />
            </Link>
          </Tooltip>
        </div>
      ),
      action2: (
        <div className="table-actions">
          <Tooltip title={topicSets && topicSets.length > 0 ? 'Can not delete this item' : 'Delete'}>
            <Link
              className="delete"
              to="#"
              onClick={() => (topicSets && topicSets.length > 0 ? {} : openModalConfirm(2, item))}
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
        formRef.current?.getFieldInstance('Name')?.focus();
      }, 0);
    }
  }, [state.modalConfirmVisible, state.typeConfirm]);
  useEffect(() => {
    state.typeConfirm === 1 &&
      formRef.current?.setFieldsValue({
        Name: typeOfTopicSetForEdit?.Name?.trim(),
        NumberOfQuestion: typeOfTopicSetForEdit?.NumberOfQuestion,
        SetUpTime: typeOfTopicSetForEdit?.SetUpTime,
      });

    state.typeConfirm === 2 &&
      formRef.current?.setFieldsValue({
        Name: '',
        NumberOfQuestion: undefined,
        SetUpTime: undefined,
      });
  }, [typeOfTopicSetForEdit, state.typeConfirm]);

  const openModalConfirm = (typeConfirm: number, cate: TypeOfTopicSetModel) => {
    typeConfirm === 1 &&
      formRef.current?.setFieldsValue({
        Name: cate?.Name?.trim(),
        NumberOfQuestion: cate?.NumberOfQuestion,
        SetUpTime: cate?.SetUpTime,
      });
    dispatch(
      updateTypeOfTopicSetForEdit(
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

  const onlyNumberKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    ['e', 'E', 'g', 'G', '+', '-', '.', ','].includes(e.key) && e.preventDefault();
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
            <Button
              style={{ width: 130 }}
              mergetype="dark-success"
              onClick={() => openModalConfirm(1, {} as TypeOfTopicSetModel)}
            >
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
                  total: typeOfTopicSetDataPaging?.totalRow,
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
              (!nameInput ||
                nameInput === '' ||
                !numberOfQuestionInput ||
                numberOfQuestionInput === 0 ||
                !setUpTimeInput ||
                setUpTimeInput === 0)
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
            {state.typeConfirm === 1 ? 'Type of exams details' : 'Are you sure you want to delete this item?'}
          </Heading>
        </div>

        <Form
          hidden={state.typeConfirm === 1 ? false : true}
          form={form}
          ref={formRef}
          name="ninjadash-vertical-form"
          layout="vertical"
        >
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
            name="NumberOfQuestion"
            label={
              <span style={{ fontSize: 18, fontWeight: 600 }}>
                <span style={{ color: 'red' }}>*</span> Number of question
              </span>
            }
            style={{ marginBottom: 30 }}
            normalize={(value) => value.trimStart()}
          >
            <Input
              type="number"
              placeholder="Enter from 1 - 255"
              min={1}
              max={255}
              onChange={handleChange}
              onKeyDown={onlyNumberKey}
              onKeyUp={onlyNumberKey}
            />
          </Form.Item>

          <Form.Item
            name="SetUpTime"
            label={
              <span style={{ fontSize: 18, fontWeight: 600 }}>
                <span style={{ color: 'red' }}>*</span> Set up time
              </span>
            }
            normalize={(value) => value.trimStart()}
          >
            <Input
              type="number"
              placeholder="Enter from 1 - 300"
              min={1}
              max={300}
              onChange={handleChange1}
              onKeyDown={onlyNumberKey}
              onKeyUp={onlyNumberKey}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
});

export default TypeOfTopicSet;
