import { Form, Tooltip, Input, Modal, Row, Col, DatePicker, Select } from 'antd';
import { Button } from 'components/buttons/Buttons';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/RootReducer';
import React from 'react';
import { AddOrUpdateStudentModel, ApproveModel, RefuseModel, ResetPasswordModel } from 'store/student/Types';
import { addOrUpdateStudent, approve, createAccount, refuse, resetPassword } from 'store/student/Actions';
import moment from 'moment';
import { fetchListClassAll } from 'store/class/Actions';
import './student.css';
import { Heading } from 'components/heading/Heading';
import { useNavigate } from 'react-router-dom';
import { StyledAddOrUpdateStudent } from './style';

interface IAddOrUpdateStudent {
  type: string;
  btnRefuse: boolean;
  btnApprove: boolean;
  setBtnRefuse: (status: boolean) => void;
  setBtnApprove: (status: boolean) => void;
}

const AddOrUpdateStudent = React.memo<IAddOrUpdateStudent>(
  ({ type, btnRefuse, btnApprove, setBtnRefuse, setBtnApprove }) => {
    const [form] = Form.useForm();
    const studentForEdit = useSelector((state: RootState) => state.student.studentForEdit);
    const loadingResetPassword = useSelector((state: RootState) => state.student.loadingResetPassword);
    const listAllClass = useSelector((states: RootState) => states.class.data);
    const errorEmail = useSelector((states: RootState) => states.student.error);
    
    const dispatch = useDispatch<any>();
    const emailInput = Form.useWatch('Email', form);
    const nameInput = Form.useWatch('Name', form);
    const usernameInput = Form.useWatch('Username', form);
    const birthdayInput = Form.useWatch('Birthday', form);
    const titleInput = Form.useWatch('Title', form);
    const companyInput = Form.useWatch('Company', form);
    const adressInput = Form.useWatch('Address', form);
    const phoneNumberInput = Form.useWatch('PhoneNumber', form);
    // const passwordInput = Form.useWatch('Password', form);
    const classInput = Form.useWatch('Class', form);
    const genderInput = Form.useWatch('Gender', form);
    const activeDateInput = Form.useWatch('ActiveDate', form);
    const expireDateInput = Form.useWatch('ExpireDate', form);
    const tuitionFeeInput = Form.useWatch('TuitionFee', form);
    const reasonRefuseInput = Form.useWatch('ReasonRefuse', form);
    const statusInput = Form.useWatch('Status', form);
    console.log('statusInput___: ', statusInput);
    console.log('reasonRefuseInput', studentForEdit);

    const navigate = useNavigate();
    console.log('statusInput', statusInput);

    const navigateClick = () => {
      navigate('/admin/student');
    };
    const [state, setState] = useState({
      modalConfirmVisible: false,
      modalRefuse: false,
    });
    useEffect(() => {
      if (btnRefuse) {
        openModalConfirmRefuse();
      }
    }, [btnRefuse]);

    useEffect(() => {
      console.log('VaOOOOeff');

      if (btnApprove) {
        console.log('VaOOOif');
        handleSubmitApprove();
      }
    }, [btnApprove]);
    function generatePassword() {
      const length = Math.floor(Math.random() * (20 - 8 + 1)) + 8;
      const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+{}[]|:;<>,.?/~`-=';

      let password = '';
      let hasUpperCase = false;
      let hasLowerCase = false;
      let hasNumber = false;
      let hasSpecialChar = false;

      while (!hasUpperCase || !hasLowerCase || !hasNumber || !hasSpecialChar) {
        password = '';
        hasUpperCase = hasLowerCase = hasNumber = hasSpecialChar = false;

        for (let i = 0; i < length; i++) {
          const char = charset.charAt(Math.floor(Math.random() * charset.length));
          password += char;

          if (/[A-Z]/.test(char)) hasUpperCase = true;
          if (/[a-z]/.test(char)) hasLowerCase = true;
          if (/[0-9]/.test(char)) hasNumber = true;
          if (/[!@#$%^&*()_+{}[\]:;<>,.?/~`-]/.test(char)) hasSpecialChar = true;
        }
      }

      return password;
    }
    const handleKeyDownEmail = (event: { key: string; preventDefault: () => void }) => {
      const regex = /^[a-zA-Z0-9@.]*$/;
      if (!regex.test(event.key)) event.preventDefault();
    };
    useEffect(() => {
      form.getFieldInstance('Username').focus()
      getListAllClass();
      type === '1' &&
        form.setFieldsValue({
          Email: studentForEdit?.Email,
          Name: studentForEdit?.Name,
          Username: studentForEdit?.Username,
          Birthday:
            studentForEdit?.Birthday && studentForEdit?.Birthday !== '1753-01-01T00:00:00'
              ? moment(studentForEdit?.Birthday)
              : '',
          Title: studentForEdit?.Title,
          Company: studentForEdit?.Company,
          Address: studentForEdit?.Address,
          PhoneNumber: studentForEdit?.PhoneNumber,
          Password: studentForEdit?.Password ? studentForEdit?.Password : generatePassword(),
          Class: studentForEdit?.ClassID === 0 ? undefined : studentForEdit?.ClassID?.toString(),
          Gender: studentForEdit?.Gender?.toString(),
          ActiveDate:
            studentForEdit?.ActiveDate && studentForEdit?.ActiveDate !== '1753-01-01T00:00:00'
              ? moment(studentForEdit?.ActiveDate)
              : '',
          ExpireDate:
            studentForEdit?.ExpireDate && studentForEdit?.ExpireDate !== '1753-01-01T00:00:00'
              ? moment(studentForEdit?.ExpireDate)
              : '',
          TuitionFee: studentForEdit?.TuitionFee
            ? currencyFormatter(studentForEdit?.TuitionFee)
            : currencyFormatter('0'),
          Status: studentForEdit?.Status?.toString(),
          ReasonRefuse: studentForEdit?.ReasonRefuse,
        });
      console.log('ReasonRefuse:____', studentForEdit?.ReasonRefuse);

      if (studentForEdit == null) {
        form.setFieldsValue({ Status: '0' });
      }
    }, [form, studentForEdit]);
    const deleteAllText = () => {
      form.setFieldsValue({
        Email: studentForEdit?.Email,
        Name: studentForEdit?.Name,
        Birthday:
          studentForEdit?.Birthday && studentForEdit?.Birthday !== '1753-01-01T00:00:00'
            ? moment(studentForEdit?.Birthday)
            : '',
        Title: studentForEdit?.Title,
        Company: studentForEdit?.Company,
        Address: studentForEdit?.Address,
        PhoneNumber: studentForEdit?.PhoneNumber,
        Class: studentForEdit?.ClassID?.toString(),
        Gender: studentForEdit?.Gender?.toString(),
        ActiveDate:
          studentForEdit?.ActiveDate && studentForEdit?.ActiveDate !== '1753-01-01T00:00:00'
            ? moment(studentForEdit?.ActiveDate)
            : '',
        ExpireDate:
          studentForEdit?.ExpireDate && studentForEdit?.ExpireDate !== '1753-01-01T00:00:00'
            ? moment(studentForEdit?.ExpireDate)
            : '',
        TuitionFee: studentForEdit?.TuitionFee ? currencyFormatter(studentForEdit?.TuitionFee) : currencyFormatter('0'),
        Status: studentForEdit?.Status?.toString(),
      });
      if (studentForEdit == null) {
        form.setFieldsValue({ Status: '0' });
      }
    };

    const getListAllClass = () => {
      // call API lấy list exam for select
      dispatch(fetchListClassAll());
    };
    const getListSelectClass = () => {
      let listClass = [] as { value?: number; label: string; name: string }[];
      listAllClass?.forEach((e) => {
        // Gán giá trị value khi có ID, nếu không để undefined
        listClass.push({ value: e.ID || undefined, label: e.Content ?? '', name: e.Content ?? '' });//listClass.push({ value: e.ID  undefined, label: ${'G' + e?.ID}, name: 'G' + (e.ID ?? '') });
      });
      return listClass;
    };
    const handleChange = (e: any) => {
      const value = e.target.value;
      // Loại bỏ các ký tự không phải số và giới hạn tối đa 10 ký tự
      const newValue = value.replace(/\D/g, '').slice(0, 10);
      form.setFieldsValue({
        PhoneNumber: newValue,
      });
    };

    const currencyFormatter = (value: any) => {
      const formattedValue = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(value);

      return formattedValue.replace('₫', 'VND');
    };
    const handleChangeTuitionFee = (e: any) => {
      const value = e.target.value;
      // Loại bỏ các ký tự không phải số và giới hạn tối đa 10 ký tự
      const newValue = value.replace(/\D/g, '');
      form.setFieldsValue({
        TuitionFee: currencyFormatter(newValue),
      });
    };

    const openModalConfirm = () => {
      setState({ ...state, modalConfirmVisible: true });
    };

    const closeModalConfirm = () => {
      setState({ ...state, modalConfirmVisible: false });
      navigateClick();
    };
    const openModalConfirmRefuse = () => {
      setState({ ...state, modalRefuse: true });
    };

    const closeModalConfirmRefuse = () => {
      setState({ ...state, modalRefuse: false });
      setBtnRefuse(false);
    };

    const handleSubmit = async () => {
      try {
        const passwordInput = studentForEdit?.Password ? studentForEdit?.Password : generatePassword();
        const values = await form.validateFields();
        form.submit();
        const addOrUpdateStudentModel = {} as AddOrUpdateStudentModel;
        addOrUpdateStudentModel.ID = studentForEdit?.ID ? studentForEdit?.ID : 0;
        addOrUpdateStudentModel.Email = emailInput;
        addOrUpdateStudentModel.Username = usernameInput;
        addOrUpdateStudentModel.Name = nameInput;
        addOrUpdateStudentModel.Birthday = birthdayInput ? moment(birthdayInput).format('YYYY-MM-DD') : '';
        addOrUpdateStudentModel.Title = titleInput;
        addOrUpdateStudentModel.Company = companyInput;
        addOrUpdateStudentModel.Address = adressInput;
        addOrUpdateStudentModel.PhoneNumber = phoneNumberInput;
        addOrUpdateStudentModel.Password = passwordInput;
        addOrUpdateStudentModel.ClassID = classInput;
        addOrUpdateStudentModel.Gender = genderInput;
        addOrUpdateStudentModel.ActiveDate = activeDateInput ? moment(activeDateInput).format('YYYY-MM-DD') : '';
        addOrUpdateStudentModel.ExpireDate = expireDateInput ? moment(expireDateInput).format('YYYY-MM-DD') : '';
        addOrUpdateStudentModel.TuitionFee = tuitionFeeInput.replace(/\D/g, '');
        addOrUpdateStudentModel.Status = statusInput;
        dispatch(addOrUpdateStudent(addOrUpdateStudentModel));
        console.log("errorEmail",errorEmail);       
        if (errorEmail === "Email already exists") {    
          return;
        }
       if(!studentForEdit){
        handleCreateAccountEmail(passwordInput);
       }
        
        form.setFieldsValue({
          Name: nameInput?.trim(),
          Title: titleInput?.trim(),
          Company: companyInput?.trim(),
          Address: adressInput?.trim(),
        });
        setState({ ...state, modalConfirmVisible: false });
      } catch (errorInfo) {
        setState({ ...state, modalConfirmVisible: false });
      }
    };

    const handleSubmitApprove = async () => {
      try {
        console.log('HAHAHHA');
        const passwordInput = studentForEdit?.Password ? studentForEdit?.Password : generatePassword();
        const values = await form.validateFields();
        form.submit();
        const addOrUpdateStudentModel = {} as AddOrUpdateStudentModel;
        addOrUpdateStudentModel.ID = studentForEdit?.ID ? studentForEdit?.ID : 0;
        addOrUpdateStudentModel.Email = emailInput;
        addOrUpdateStudentModel.Username = usernameInput;
        addOrUpdateStudentModel.Name = nameInput;
        addOrUpdateStudentModel.Birthday = birthdayInput ? moment(birthdayInput).format('YYYY-MM-DD') : '';
        addOrUpdateStudentModel.Title = titleInput;
        addOrUpdateStudentModel.Company = companyInput;
        addOrUpdateStudentModel.Address = adressInput;
        addOrUpdateStudentModel.PhoneNumber = phoneNumberInput;
        addOrUpdateStudentModel.Password = passwordInput;
        addOrUpdateStudentModel.ClassID = classInput;
        addOrUpdateStudentModel.Gender = genderInput;
        addOrUpdateStudentModel.ActiveDate = activeDateInput ? moment(activeDateInput).format('YYYY-MM-DD') : '';
        addOrUpdateStudentModel.ExpireDate = expireDateInput ? moment(expireDateInput).format('YYYY-MM-DD') : '';
        addOrUpdateStudentModel.TuitionFee = tuitionFeeInput.replace(/\D/g, '');
        addOrUpdateStudentModel.Status = statusInput;
        addOrUpdateStudentModel.ReasonRefuse = reasonRefuseInput;
        dispatch(addOrUpdateStudent(addOrUpdateStudentModel));
        handleApproveEmail(passwordInput);

        form.setFieldsValue({
          Name: nameInput?.trim(),
          Title: titleInput?.trim(),
          Company: companyInput?.trim(),
          Address: adressInput?.trim(),
          ReasonRefuse: reasonRefuseInput?.trim(),
        });
        setState({ ...state, modalConfirmVisible: false });
      } catch (errorInfo) {
        setBtnApprove(false);
        setState({ ...state, modalConfirmVisible: false });
      }
    };

    const handleSubmitRefuse = async () => {
      try {
        // const values = await form.validateFields();

        //form.submit();
        const addOrUpdateStudentModel = {} as AddOrUpdateStudentModel;
        addOrUpdateStudentModel.ID = studentForEdit?.ID ? studentForEdit?.ID : 0;
        addOrUpdateStudentModel.Email = emailInput;
        addOrUpdateStudentModel.Username = usernameInput;
        addOrUpdateStudentModel.Name = nameInput;
        addOrUpdateStudentModel.Birthday = birthdayInput ? moment(birthdayInput).format('YYYY-MM-DD') : '';
        addOrUpdateStudentModel.Title = titleInput;
        addOrUpdateStudentModel.Company = companyInput;
        addOrUpdateStudentModel.Address = adressInput;
        addOrUpdateStudentModel.PhoneNumber = phoneNumberInput;
        addOrUpdateStudentModel.Password = studentForEdit?.Password ? studentForEdit?.Password : generatePassword();
        addOrUpdateStudentModel.ClassID = classInput;
        addOrUpdateStudentModel.Gender = genderInput;
        addOrUpdateStudentModel.ActiveDate = activeDateInput ? moment(activeDateInput).format('YYYY-MM-DD') : '';
        addOrUpdateStudentModel.ExpireDate = expireDateInput ? moment(expireDateInput).format('YYYY-MM-DD') : '';
        addOrUpdateStudentModel.TuitionFee = tuitionFeeInput.replace(/\D/g, '');
        addOrUpdateStudentModel.Status = 5;
        addOrUpdateStudentModel.ReasonRefuse = reasonRefuseInput;
        setBtnRefuse(false);
        dispatch(addOrUpdateStudent(addOrUpdateStudentModel));
        handleRefuseEmail();
        form.setFieldsValue({
          Name: nameInput?.trim(),
          Title: titleInput?.trim(),
          Company: companyInput?.trim(),
          Address: adressInput?.trim(),
        });
        setState({ ...state, modalRefuse: false });
      } catch (errorInfo) {
        setBtnRefuse(false);
        console.log();

        setState({ ...state, modalRefuse: false });
      }
    };

    const handleResetPassword = () => {
      const name = studentForEdit?.Name;
      const email = studentForEdit?.Email;
      const password = generatePassword();
      const resetPasswordModel = { Name: name, Email: email, Password: password } as ResetPasswordModel;
      dispatch(resetPassword(resetPasswordModel));
    };
    const handleApproveEmail = (password: string) => {
      const name = studentForEdit?.Name;
      const username = studentForEdit?.Username;
      const email = studentForEdit?.Email;     
      const approveModel = { Name: name, Email: email, Username: username, Password: password } as ApproveModel;
      dispatch(approve(approveModel));
    };

    const handleCreateAccountEmail = (password: string) => {
      const name = nameInput;
      const username = usernameInput;
      const email = emailInput;
      
      console.log('passworddayyy',password);
      
      const approveModel = { Name: name, Email: email, Username: username, Password: password } as ApproveModel;
      console.log('approveModel:______',approveModel);
      
      dispatch(createAccount(approveModel));
    };
    console.log('ClassInputttt"__', classInput);

    const handleRefuseEmail = () => {
      const name = studentForEdit?.Name;
      const email = studentForEdit?.Email;
      const reasonRefuse = reasonRefuseInput;
      const refuseModel = { Name: name, ReasonRefuse: reasonRefuse, Email: email } as RefuseModel;
      dispatch(refuse(refuseModel));
    };
    console.log('ReasonRefuse:____', studentForEdit?.ReasonRefuse);

    return (
      <StyledAddOrUpdateStudent>
        <Row justify="end"></Row>
        <Row>
          <Col style={{ width: '20%' }}>
            <Form
              name="updateStudentInfo"
              form={form}
              layout="horizontal"
              requiredMark={false}
              colon={false}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
              labelAlign="left"
            >
              <Form.Item
                name="Status"
                label={<span style={{ paddingTop: '10px', fontWeight: 'bold' }}>Status</span>}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Select
                  disabled={statusInput === '4' || statusInput === '5'}
                  style={{ width: '100%', height: '40px' }}
                  className={
                    statusInput == '0'
                      ? 'statusStyleInactive'
                      : statusInput == '1'
                        ? 'statusStyleActive'
                        : statusInput == '4'
                          ? 'statusStyleInactive'
                          : statusInput == '5'
                            ? 'statusStyleRefuse'
                            : statusInput == '2'
                              ? 'statusStyleBlocked'
                              : 'statusStyleNormal'
                  }
                  placeholder="Select status"
                >
                  <Select.Option
                    value="0"
                    hidden={statusInput === '1' || statusInput === '2' || statusInput === '4' || statusInput === '5'}
                  >
                    Inactive
                  </Select.Option>
                  <Select.Option value="1" hidden={statusInput !== '1' && statusInput !== '2'}>
                    Active
                  </Select.Option>
                  <Select.Option value="2" hidden={statusInput !== '1' && statusInput !== '2'}>
                    Blocked
                  </Select.Option>
                  <Select.Option
                    value="4"
                    hidden={
                      statusInput === '1' ||
                      statusInput === '2' ||
                      statusInput === '4' ||
                      statusInput === '5' ||
                      statusInput === '0'
                    }
                  >
                    Pending
                  </Select.Option>
                  <Select.Option
                    value="5"
                    hidden={
                      statusInput === '1' ||
                      statusInput === '2' ||
                      statusInput === '4' ||
                      statusInput === '5' ||
                      statusInput === '0'
                    }
                  >
                    Refuse
                  </Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="ActiveDate"
                label={<span style={{ fontWeight: 'bold' }}>Active Date</span>}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <DatePicker disabled style={{ width: '100%', height: '40px' }} format={'DD/MM/YYYY'} />
              </Form.Item>

              <Tooltip title={titleInput}>
                <Form.Item
                  name="Title"
                  initialValue=""
                  normalize={(value) => value.trimStart()}
                  label={<span style={{ fontWeight: 'bold' }}>Title</span>}
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                >
                  <Input
                    disabled={statusInput === '4' || statusInput === '5'}
                    style={{ width: '100%', height: '40px' }}
                    className="custom-input"
                  />
                </Form.Item>
              </Tooltip>

              <Form.Item
                name="Class"
                rules={[{ required: true, message: 'Please input Class!' }]}
                validateTrigger="onSubmit"
                label={
                  <span style={{ paddingTop: '10px', fontWeight: 'bold' }}>
                    {' '}
                    <span style={{ color: 'red' }}>*</span> Class
                  </span>
                }
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                initialValue={classInput === 0 ? undefined : classInput}
              >
                <Select
                  disabled={statusInput === '5'}
                  style={{ width: '100%', height: '40px' }}
                  showSearch
                  filterOption={(input, option) =>
                    (option?.label?.toString() ?? '').toLowerCase().includes(input.toLowerCase())
                  }
                  optionLabelProp="label"
                  // dropdownStyle={{ maxHeight: 170 }} // Set height limit to enable scroll
                  placeholder="Choose Class"
                  allowClear
                  aria-required
                >
                  {getListSelectClass().map((option) => (
                    <Select.Option
                      key={option.value}
                      value={option.value + ''}
                      label={option.label}
                      style={{ width: '100%', height: '40px' }}
                    >
                      <Tooltip title={option.name}>{option.label}</Tooltip>
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Form>
          </Col>
          <Col style={{ width: '5%' }}></Col>
          <Col style={{ width: '20%' }}>
            <Form
              name="updateStudentInfo"
              form={form}
              layout="horizontal"
              requiredMark={false}
              colon={false}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
              labelAlign="left"
            >
              <Tooltip title={usernameInput}>
                <Form.Item
                  name="Username"
                  initialValue=""
                  rules={[{ required: true, message: 'Please input Username!' }]}
                  validateTrigger="onSubmit"
                  normalize={(value) => value.trimStart()}
                  label={
                    <span style={{ fontWeight: 'bold' }}>
                      {' '}
                      <span style={{ color: 'red' }}>*</span> Username
                    </span>
                  }
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                >
                  <Input
                    disabled={statusInput === '4' || statusInput === '5'}
                    style={{ width: '100%', height: '40px' }}
                    className="custom-input"
                  />
                </Form.Item>
              </Tooltip>
              <Form.Item
                name="ExpireDate"
                label={<span style={{ fontWeight: 'bold' }}>Expire Date</span>}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <DatePicker disabled style={{ width: '100%', height: '40px' }} format={'DD/MM/YYYY'} />
              </Form.Item>

              <Tooltip title={companyInput}>
                <Form.Item
                  name="Company"
                  initialValue=""
                  normalize={(value) => value.trimStart()}
                  label={<span style={{ fontWeight: 'bold' }}>Company</span>}
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                >
                  <Input.TextArea
                    disabled={statusInput === '4' || statusInput === '5'}
                    style={{ width: '100%', height: '40px', resize: 'none', padding: 7 }}
                    className="custom-input"
                  />
                </Form.Item>
              </Tooltip>
              <Form.Item
                name="TuitionFee"
                initialValue={tuitionFeeInput === '0 VND' ? undefined : tuitionFeeInput}
                rules={[{ required: true, message: 'Please input Tuition fee!' }]}
                validateTrigger="onSubmit"
                label={<span style={{ fontWeight: 'bold' }}>Tuition fee</span>}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Input
                  disabled={statusInput === '5'}
                  className="custom-input"
                  style={{ width: '100%', height: '40px' }}
                  maxLength={25}
                  onChange={handleChangeTuitionFee}
                  placeholder="0 VND"
                />
              </Form.Item>
            </Form>
          </Col>
          <Col style={{ width: '5%' }}></Col>
          <Col style={{ width: '20%' }}>
            <Form
              name="updateStudentInfo2"
              form={form}
              requiredMark={false}
              layout="horizontal"
              colon={false}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
              labelAlign="left"
            >
              <Tooltip title={emailInput}>
                <Form.Item
                  name="Email"
                  initialValue=""
                  label={
                    <span style={{ fontWeight: 'bold' }}>
                      {' '}
                      <span style={{ color: 'red' }}>*</span> Email
                    </span>
                  }
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  rules={[
                    { type: 'email', message: 'Fail!' },
                    { required: true, message: 'Please input Email!' },
                  ]}
                  validateTrigger="onSubmit"
                >
                  <Input
                    disabled={statusInput === '4' || statusInput === '5'}
                    className="custom-input"
                    style={{ width: '100%', height: '40px' }}
                    onKeyDown={handleKeyDownEmail}
                  />
                </Form.Item>
              </Tooltip>
              <Form.Item
                name="Birthday"
                rules={[{ required: true, message: 'Please input Date of birth!' }]}
                validateTrigger="onSubmit"
                label={
                  <span style={{ fontWeight: 'bold' }}>
                    <span style={{ color: 'red' }}>*</span> Date of birth
                  </span>
                }
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <DatePicker
                  disabled={statusInput === '4' || statusInput === '5'}
                  style={{ width: '100%', height: '40px' }}
                  format={'DD/MM/YYYY'}
                />
              </Form.Item>
              <Tooltip title={adressInput}>
                <Form.Item
                  name="Address"
                  initialValue=""
                  rules={[{ required: true, message: 'Please input Address!' }]}
                  validateTrigger="onSubmit"
                  normalize={(value) => value.trimStart()}
                  label={
                    <span style={{ fontWeight: 'bold' }}>
                      {' '}
                      <span style={{ color: 'red' }}>*</span> Address
                    </span>
                  }
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                >
                  <Input.TextArea
                    disabled={statusInput === '4' || statusInput === '5'}
                    style={{ width: '100%', height: '40px', resize: 'none', padding: 7 }}
                    className="custom-input"
                  />
                </Form.Item>
              </Tooltip>
            </Form>
          </Col>
          <Col style={{ width: '5%' }}></Col>
          <Col style={{ width: '20%' }}>
            <Form
              name="updateStudentInfo4"
              form={form}
              layout="horizontal"
              requiredMark={false}
              colon={false}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
              labelAlign="left"
            >
              <Tooltip title={nameInput}>
                <Form.Item
                  name="Name"
                  initialValue=""
                  rules={[{ required: true, message: 'Please input Name!' }]}
                  validateTrigger="onSubmit"
                  normalize={(value) => value.trimStart()}
                  label={
                    <span style={{ fontWeight: 'bold' }}>
                      {' '}
                      <span style={{ color: 'red' }}>*</span> Name
                    </span>
                  }
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                >
                  <Input
                    disabled={statusInput === '4' || statusInput === '5'}
                    style={{ width: '100%', height: '40px' }}
                    className="custom-input"
                  />
                </Form.Item>
              </Tooltip>

              {/* <Form.Item name="Password" initialValue="" label={<span style={{ fontWeight: 'bold' }}>Password</span>}>
              <Input disabled />
            </Form.Item> */}
              <Form.Item
                name="Gender"
                rules={[{ required: true, message: 'Please input Gender!' }]}
                validateTrigger="onSubmit"
                label={
                  <span style={{ paddingTop: '10px', fontWeight: 'bold' }}>
                    {' '}
                    <span style={{ color: 'red' }}>*</span> Gender
                  </span>
                }
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Select
                  disabled={statusInput === '4' || statusInput === '5'}
                  style={{ width: '100%', height: '40px' }}
                  placeholder="Select gender"
                >
                  <Select.Option value="0">Male</Select.Option>
                  <Select.Option value="1">Female</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="PhoneNumber"
                initialValue=""
                rules={[{ required: true, message: 'Please input PhoneNumber!' }]}
                validateTrigger="onSubmit"
                label={
                  <span style={{ fontWeight: 'bold' }}>
                    {' '}
                    <span style={{ color: 'red' }}>*</span> Phone number
                  </span>
                }
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Input
                  className="custom-input"
                  style={{ width: '100%', height: '40px' }}
                  onChange={handleChange}
                  maxLength={10}
                  disabled={statusInput === '4' || statusInput === '5'}
                />
              </Form.Item>
            </Form>
          </Col>
        </Row>
        <Col span={24}>
          <Form name="updateStudentInfo" form={form}>
            {statusInput === '5' && (
              <Form.Item
                name="ReasonRefuse"
                initialValue=""
                validateTrigger="onSubmit"
                normalize={(value) => value.trimStart()}
                label={<span style={{ fontWeight: 'bold' }}>Reason for rejection </span>}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Input.TextArea
                  disabled={statusInput === '4' || statusInput === '5'}
                  style={{ width: '100%', minHeight: '250px', resize: 'none', padding: 7 }}
                  className="custom-input"
                />
              </Form.Item>
            )}
          </Form>
        </Col>
        <Row justify="end">
          <Button
            style={{
              marginRight: '20px',
              width: '160px',
              backgroundColor: '#fff',
              border: '1px solid blue',
              color: 'blue',
            }}
            hidden={statusInput === '4' || statusInput === '5'}
            onClick={navigateClick}
          >
            Close
          </Button>
          <Button
            hidden={statusInput === '4' || statusInput === '5'}
            style={{ marginRight: '20px', width: '160px', backgroundColor: '#8E8E93' }}
            onClick={deleteAllText}
          >
            Cancel
          </Button>

          <Button
            hidden={statusInput === '4' || statusInput === '5'}
            loading={loadingResetPassword}
            style={{ marginRight: '20px', width: '160px' }}
            disabled={studentForEdit?.Status !== 1}
            mergetype="primary"
            onClick={() => handleResetPassword()}
          >
            Reset password
          </Button>
          <Button
            style={{ width: '160px' }}
            htmlType="submit"
            mergetype="primary"
            onClick={handleSubmit}
            hidden={statusInput === '4' || statusInput === '5'}
            disabled={
              !emailInput ||
              emailInput === '' ||
              !usernameInput ||
              usernameInput === '' ||
              !nameInput ||
              nameInput === '' ||
              !genderInput ||
              genderInput === '' ||
              !phoneNumberInput ||
              phoneNumberInput === '' ||
              !birthdayInput ||
              birthdayInput === '' ||
              !classInput ||
              classInput === '' ||
              !adressInput ||
              adressInput === '' ||
              tuitionFeeInput === '' ||
              !statusInput ||
              statusInput === '' ||
              (emailInput === studentForEdit?.Email &&
                usernameInput === studentForEdit?.Username &&
                nameInput === studentForEdit?.Name &&
                moment(birthdayInput).format('YYYY-MM-DD') === moment(studentForEdit?.Birthday).format('YYYY-MM-DD') &&
                ((!titleInput && !studentForEdit?.Title) || titleInput === studentForEdit?.Title) &&
                ((!companyInput && !studentForEdit?.Company) || companyInput === studentForEdit?.Company) &&
                adressInput === studentForEdit?.Address &&
                phoneNumberInput === studentForEdit?.PhoneNumber &&
                // passwordInput === studentForEdit?.Password &&
                classInput.toString() === studentForEdit?.ClassID?.toString() &&
                genderInput.toString() === studentForEdit?.Gender?.toString() &&
                moment(activeDateInput).format('YYYY-MM-DD') ===
                  moment(studentForEdit?.ActiveDate).format('YYYY-MM-DD') &&
                moment(expireDateInput).format('YYYY-MM-DD') ===
                  moment(studentForEdit?.ExpireDate).format('YYYY-MM-DD') &&
                tuitionFeeInput?.toString() === currencyFormatter(studentForEdit?.TuitionFee?.toString()) &&
                statusInput.toString() === studentForEdit?.Status?.toString())
            }
          >
            {'Save'}
          </Button>
        </Row>
        <Modal
          closable={false}
          centered
          open={state.modalConfirmVisible}
          onCancel={closeModalConfirm}
          footer={[
            <Button mergetype="primary" key="submit" onClick={handleSubmit}>
              Yes
            </Button>,
            <Button mergetype="primary" outlined key="back" onClick={closeModalConfirm}>
              No
            </Button>,
          ]}
        >
          <div style={{ justifyItems: 'center', display: 'grid', marginBottom: 20 }}>
            <Heading as="h4">Do you want to save the changes?</Heading>
          </div>
        </Modal>
        <Modal
          title={[<h1 style={{ textAlign: 'center', paddingTop: '10px', fontWeight: '550' }}>Refuse</h1>]}
          width="600px"
          closable={false}
          centered
          open={state.modalRefuse}
          footer={[
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '15px' }}>
              <Button
                style={{ width: '140px', backgroundColor: '#fff', border: '1px solid red', color: 'red' }}
                mergetype="primary"
                outlined
                key="back"
                onClick={closeModalConfirmRefuse}
              >
                Cancel
              </Button>
              <Button style={{ width: '140px' }} mergetype="primary" key="submit" onClick={handleSubmitRefuse}>
                Confirm
              </Button>
            </div>,
          ]}
        >
          <Form name="updateStudentInfo" form={form}>
            <Form.Item
              name="ReasonRefuse"
              initialValue=""
              validateTrigger="onSubmit"
              normalize={(value) => value.trimStart()}
              label={<span style={{ fontWeight: 'bold' }}> Reason of rejection</span>}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Input.TextArea
                placeholder="Enter reason for rejection here"
                style={{ width: '100%', height: '100px', resize: 'none', padding: 7 }}
                className="custom-input"
                maxLength={500}
              />
            </Form.Item>
          </Form>
          <span className="text-custom">* Reasons for refusal will be sent to the student</span>
        </Modal>
      </StyledAddOrUpdateStudent>
    );
  },
);

export default AddOrUpdateStudent;
