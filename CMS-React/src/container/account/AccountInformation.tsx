import { Form, Tooltip, Row, Col, DatePicker, Radio, Select, Input } from 'antd';
import { Button } from 'components/buttons/Buttons';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/RootReducer';
import React from 'react';
import { UpdateAccountInformationModel } from 'store/auth/Types';
import { updateAccountInformation } from 'store/auth/Actions';
import moment from 'moment';
import './Account.css'

interface IAccountInformation {
  type: string;
}

const AccountInformation = React.memo<IAccountInformation>(({ type }) => {
  const [form] = Form.useForm();
  const myInfo = useSelector((state: RootState) => state.auth.myInfo);
  const dispatch = useDispatch<any>();
  const emailInput = Form.useWatch('Email', form);
  const nameInput = Form.useWatch('Name', form);
  const birthdayInput = Form.useWatch('Birthday', form);
  const adressInput = Form.useWatch('Address', form);
  const phoneNumberInput = Form.useWatch('PhoneNumber', form);
  const genderInput = Form.useWatch('Gender', form);

  const handleKeyDown = (event: { code: string; preventDefault: () => void }) => {
    if (event.code === 'Space') event.preventDefault();
  };
  useEffect(() => {
    form.setFieldsValue({
      Email: myInfo?.Email,
      Name: myInfo?.Name,
      Birthday: myInfo?.Birthday && myInfo?.Birthday !== '1753-01-01T00:00:00' ? moment(myInfo?.Birthday) : '',
      Address: myInfo?.Address,
      PhoneNumber: myInfo?.PhoneNumber,
      Gender: myInfo?.Gender?.toString(),
    });
  }, [form]);
  const deleteAllText = () => {
    form.setFieldsValue({
      Email: myInfo?.Email,
      Name: myInfo?.Name,
      Birthday: moment(myInfo?.Birthday),
      Address: myInfo?.Address,
      PhoneNumber: myInfo?.PhoneNumber,
      Gender: myInfo?.Gender?.toString(),
    });
  };

  const handleChange = (e: any) => {
    const value = e.target.value;
    // Loại bỏ các ký tự không phải số và giới hạn tối đa 10 ký tự
    const newValue = value.replace(/\D/g, '').slice(0, 10);
    form.setFieldsValue({
      PhoneNumber: newValue,
    });
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      form.submit();
      const updateAccountInformationModel = {} as UpdateAccountInformationModel;
      updateAccountInformationModel.Email = emailInput;
      updateAccountInformationModel.Name = nameInput?.trim();
      updateAccountInformationModel.Birthday = birthdayInput ? moment(birthdayInput).format('YYYY-MM-DD') : '';
      updateAccountInformationModel.PhoneNumber = phoneNumberInput;
      updateAccountInformationModel.Gender = genderInput;
      updateAccountInformationModel.Address = adressInput?.trim();
      dispatch(updateAccountInformation(updateAccountInformationModel));
      form.setFieldsValue({
        Name: nameInput?.trim(),
        Address: adressInput?.trim(),
      });
    } catch (errorInfo) {}
  };
  const handleKeyDownEmail = (event: { key: string; preventDefault: () => void }) => {
    const regex = /^[a-zA-Z0-9@.]*$/;
    if (!regex.test(event.key)) event.preventDefault();
  };

  return (
    <div>
      <Row>
        <Col style={{ width: '100%', padding: 16, border: '1px solid rgba(0, 0, 0, 0.10)', marginBottom: 20, borderRadius: 4 }}>
          <Form
            name="updateAccountInfo"
            form={form}
            layout="horizontal"
            colon={false}
            labelCol={{ span: 6 }}
            labelAlign="left"
          >
            <Row>
              <Col span={5} lg={5} md={7}>
                <Form.Item name="role" initialValue={'1'}>
                  <div style={{ fontWeight: 'bold', fontSize: 18, color: '#000000' }}>Role</div>
                  <Row>
                    <Col span={24}>
                      <div style={{ border: '1px solid #ccc', padding: '10px 20px', borderRadius: '4px' }}>
                        <Radio value="1" checked={true}>
                          Admin
                        </Radio>
                      </div>
                    </Col>
                  </Row>
                </Form.Item>
              </Col>
              <Col span={1}></Col>
              <Col span={5} lg={5} md={7}>
                <div style={{ fontWeight: 'bold', fontSize: 18, color: '#000000' }}>Email</div>
                <Tooltip title={emailInput}>
                  <Form.Item
                    name="Email"
                    initialValue=""
                    // label={<span style={{ fontWeight: 'bold' }}>Email</span>}
                    rules={[{ type: 'email', message: 'Fail!' }]}
                    validateTrigger="onSubmit"
                  >
                    <Input className="custom-input" onKeyDown={handleKeyDownEmail} />
                  </Form.Item>
                </Tooltip>
              </Col>
              <Col span={1}></Col>
              <Col span={5} lg={5} md={7}>
                <div style={{ fontWeight: 'bold', fontSize: 18, color: '#000000' }}>Name</div>
                <Tooltip title={nameInput}>
                  <Form.Item
                    name="Name"
                    normalize={(value) => value.trimStart()}
                    initialValue=""
                    // label={<span style={{ fontWeight: 'bold' }}>Name</span>}
                  >
                    <Input className="custom-input" />
                  </Form.Item>
                </Tooltip>
              </Col>
              <Col span={1}></Col>
              <Col span={5} lg={5} md={7}>
                <div style={{ fontWeight: 'bold', fontSize: 18, color: '#000000' }}>Date of birth</div>
                <Form.Item name="Birthday">
                  <DatePicker style={{height: 49.7, width: '100%'}} format={'DD/MM/YYYY'} />
                </Form.Item>
              </Col>
              <Col span={1}></Col>
              <Col style={{height: 101}} span={5} lg={5} md={7}>
                <div style={{ fontWeight: 'bold', fontSize: 18, color: '#000000' }}>Address</div>
                <Tooltip title={adressInput}>
                  <Form.Item
                    name="Address"
                    normalize={(value) => value.trimStart()}
                    initialValue=""
                    // label={<span style={{ fontWeight: 'bold' }}>Address</span>}
                  >
                    <Input className="custom-input" />
                  </Form.Item>
                </Tooltip>
              </Col>
              <Col span={1}></Col>
              <Col style={{height: 101}} span={5} lg={5} md={7}>
                <div style={{ fontWeight: 'bold', fontSize: 18, color: '#000000' }}>Phone number</div>
                <Form.Item
                  name="PhoneNumber"
                  initialValue=""
                  // label={<span style={{ fontWeight: 'bold' }}>Phone number</span>}
                >
                  <Input className="custom-input" onChange={handleChange} maxLength={10} />
                </Form.Item>
              </Col>
              <Col span={1}></Col>
              <Col style={{height: 101}} span={5} lg={5} md={7}>
                <div style={{ fontWeight: 'bold', fontSize: 18, color: '#000000' }}>Gender</div>
                <Form name="updateAccountInfo2" form={form} layout="horizontal" colon={false} labelAlign="left">
                  <Form.Item name="Gender">
                    <Select style={{height: 100, width: '100%'}} placeholder="Select gender">
                      <Select.Option value="0">Male</Select.Option>
                      <Select.Option value="1">Female</Select.Option>
                    </Select>
                  </Form.Item>
                </Form>
              </Col>
              <Col style={{height: 101}} span={1}></Col>
            </Row>
          </Form>
        </Col>
        {/* <Col style={{ width: '5%' }}></Col>
        <Col style={{ width: '50%' }}>
          <Row style={{ height: '47%' }}></Row>
          <Row style={{ height: '43%' }}>
            
          </Row>
        </Col> */}
      </Row>
      <Row justify="end">
        <Button
          style={{ marginRight: '20px', width: 120 }}
          mergetype="light-gray"
          onClick={deleteAllText}
          disabled={
            emailInput === myInfo?.Email &&
            nameInput === myInfo?.Name &&
            moment(birthdayInput).format('YYYY-MM-DD') === moment(myInfo?.Birthday).format('YYYY-MM-DD') &&
            phoneNumberInput === myInfo?.PhoneNumber &&
            genderInput.toString() === myInfo?.Gender.toString() &&
            adressInput === myInfo?.Address
          }
        >
          Cancel
        </Button>
        <Button
          style={{ width: 120 }}
          htmlType="submit"
          mergetype="primary"
          onClick={handleSubmit}
          disabled={
            !emailInput ||
            emailInput === '' ||
            !nameInput ||
            nameInput === '' ||
            !genderInput ||
            genderInput === '' ||
            !phoneNumberInput ||
            phoneNumberInput === '' ||
            (emailInput === myInfo?.Email &&
              nameInput === myInfo?.Name &&
              moment(birthdayInput).format('YYYY-MM-DD') === moment(myInfo?.Birthday).format('YYYY-MM-DD') &&
              phoneNumberInput === myInfo?.PhoneNumber &&
              genderInput.toString() === myInfo?.Gender.toString() &&
              adressInput === myInfo?.Address)
          }
        >
          {'Save'}
        </Button>
      </Row>
    </div>
  );
});

export default AccountInformation;
