import UilSearch from '@iconscout/react-unicons/dist/icons/uil-search';
import UilPlus from '@iconscout/react-unicons/dist/icons/uil-plus';
import UilTrashAlt from '@iconscout/react-unicons/dist/icons/uil-trash-alt';
import UilPen from '@iconscout/react-unicons/dist/icons/uil-pen';
import { FormInstance, Form, Tooltip, Input, Table, Modal, Skeleton, Empty } from 'antd';
import { Button } from 'components/buttons/Buttons';
import { Heading } from 'components/heading/Heading';
import { DataTableStyleWrap } from 'components/table/Style';
import { themeColor } from 'config/theme/ThemeVariables';
import { Main, TableWrapper } from 'container/Style';
import { ChangeEvent, FC, ReactNode, Suspense, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from 'store/RootReducer';
import { fetchListClassPaging, saveClass, deleteClass, updateClassForEdit } from 'store/class/Actions';
import { ClassModel } from 'store/class/Types';
import { Route } from '@ant-design/pro-layout/es/typing';
import { PageHeader } from 'components/page-headers/PageHeaders';
import { Cards } from 'components/cards/frame/CardsFrame';
import { AuthInfo } from 'components/utilities/Info';
import { TopMenuSearch } from 'layout/Style';
interface IClassTableData {
  ID?: string;
  key?: number;
  Content?: ReactNode;
  action1?: ReactNode;
  action2?: ReactNode;
}

interface IClass {}

const Classes: FC<IClass> = (props) => {
  const PageRoutes: Route[] = [
    {
      path: '',
      breadcrumbName: 'Classes',
    },
    {
      path: '',
      breadcrumbName: 'List',
    },
  ];

  const classDataPaging = useSelector((states: RootState) => states.class.dataPaging);
  const classForEdit = useSelector((states: RootState) => states.class.classForEdit);
  const loading = useSelector((states: RootState) => states.class.loading);
  const topMenu = useSelector((state: RootState) => state.layout.topMenu);
  const dispatch = useDispatch<any>();
  const formRef = useRef<FormInstance<any>>(null);
  const [form] = Form.useForm();
  const contentInput = Form.useWatch('Content', form);
  const [state, setState] = useState({
    searchKey: '',
    modalConfirmVisible: false,
    typeConfirm: 1,
    page: 1,
  });

  useEffect(() => {
    getListClass();
  }, [state.page]);

  const getListClass = () => {
    // call API lấy list exam type
    let keyWord = state.searchKey.trim();
    setState({ ...state, searchKey: keyWord });
    dispatch(fetchListClassPaging(state.page, 10, keyWord));
  };

  const onChangePage = (page: number) => {
    setState((state) => ({ ...state, page }));
  };

  const save = () => {
    // call API save
    let clas = {
      ID: classForEdit?.ID,
      Content: formRef.current?.getFieldValue('Content')?.trim(),
    };
    dispatch(saveClass(clas, state.page));
    !loading && closeModalConfirm();
    setState((state) => ({ ...state, searchKey: '', page: 1 }));
  };
  const deleteCate = () => {
    // call API delete
    classForEdit?.ID && dispatch(deleteClass(classForEdit?.ID, state.page));
    !loading && closeModalConfirm();
    setState((state) => ({ ...state, searchKey: '', page: 1 }));
  };

  const onChangeSearchBar = (e: ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, searchKey: e.currentTarget.value });
  };

  const filter = () => {
    if (state.page === 1) {
      getListClass();
    } else {
      setState((state) => ({ ...state, page: 1 }));
    }
  };

  const dataTableColumn = [
    {
      title: () => {
        return (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontWeight: 550 }}>Code</div>
          </div>
        );
      },
      dataIndex: 'ID',
      key: 'ID',
      align: 'center' as const,
      width: '5vw',
    },

    {
      title: () => {
        return <div style={{ fontWeight: 550, textAlign: 'center' }}>Name</div>;
      },
      dataIndex: 'Content',
      key: 'Content',
      width: '85vw',
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

  let tableDataSource: IClassTableData[] = [];
  classDataPaging?.listClass?.map((item) => {
    const { ID, Content, Usercls } = item;
    return tableDataSource.push({
      key: ID,
      ID: `G${ID}`,
      Content: (
        <Tooltip
          title={<pre className="custom-pre">{Content}</pre>}
          placement="bottom"
          overlayStyle={{ maxWidth: '100%' }}
          style={{ display: 'block', maxWidth: '100%' }}
          overlayInnerStyle={{ background: '#000' }}
        >
          <pre className="custom-pre">{Content}</pre>
        </Tooltip>
      ),
      action1: (
        <div className="table-actions">
          <Tooltip title={Usercls && Usercls.length > 0 ? 'Can not edit this item' : 'Edit'}>
            <Link
              className="edit"
              to="#"
              onClick={() => (Usercls && Usercls.length > 0 ? 'Can not edit this item' : openModalConfirm(1, item))}
            >
              <UilPen style={{ width: 20 }} color={themeColor['dark-gray']} />
            </Link>
          </Tooltip>
        </div>
      ),
      action2: (
        <div className="table-actions">
          <Tooltip title={Usercls && Usercls.length > 0 ? 'Can not delete this item' : 'Delete'}>
            <Link
              className="delete"
              to="#"
              onClick={() => (Usercls && Usercls.length > 0 ? 'Can not edit this item' : openModalConfirm(2, item))}
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
        Content: classForEdit?.Content,
      });

    state.typeConfirm === 2 &&
      formRef.current?.setFieldsValue({
        Content: '',
      });
  }, [classForEdit, state.typeConfirm]);

  const openModalConfirm = (typeConfirm: number, cate: ClassModel) => {
    dispatch(
      updateClassForEdit(
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
      <Main>
        <Suspense
          fallback={
            <Cards headless>
              <Skeleton active />
            </Cards>
          }
        >
          <Cards border>
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
                    onClick={() => openModalConfirm(1, {} as ClassModel)}
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
                        total: classDataPaging?.totalRow,
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
          </Cards>
        </Suspense>
      </Main>

      <Modal
        closable={false}
        centered
        open={state.modalConfirmVisible}
        // onCancel={closeModalConfirm}
        footer={
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button mergetype="primary" outlined key="back" onClick={closeModalConfirm}>
              {state.typeConfirm === 1 ? 'Cancel' : 'No'}
            </Button>
            ,
            <Button
              disabled={state.typeConfirm === 1 && (!contentInput || contentInput === '')}
              loading={loading}
              mergetype="primary"
              key="submit"
              onClick={onSubmit}
            >
              {state.typeConfirm === 1 ? 'Save' : 'Yes'}
            </Button>
            ,
          </div>
        }
      >
        <div style={{ justifyItems: 'center', display: 'grid', marginBottom: 20 }}>
          <Heading as="h4">
            {state.typeConfirm === 1 ? 'Class Details' : 'Are you sure you want to delete the item?'}
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
            name="Content"
            label={
              <span style={{ fontSize: 18, fontWeight: 600 }}>
                {' '}
                <span style={{ color: 'red' }}>*</span>Content
              </span>
            }
            normalize={(value) => value.trimStart()}
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Classes;
