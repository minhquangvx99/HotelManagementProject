import { Form, Input, Row, Col } from 'antd';
import { Button } from 'components/buttons/Buttons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/RootReducer';
import React from 'react';
import { ChangePasswordModel } from 'store/auth/Types';
import { openNotification } from 'utility/Utility';
import { changePassword } from 'store/auth/Actions';

interface IChangePassword {
  type: string;
}
const { TextArea } = Input;
interface Answer {
  ID: number;
  content: string;
  explanation: string;
}

const ChangePassword = React.memo<IChangePassword>(({ type }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch<any>();
  const myInfo = useSelector((state: RootState) => state.auth.myInfo);
  const presentPasswordInput = Form.useWatch('PresentPassword', form);
  const newPasswordInput = Form.useWatch('NewPassword', form);
  const reenterPasswordInput = Form.useWatch('ReenterPassword', form);

  const handleKeyDown = (event: { code: string; preventDefault: () => void }) => {
    if (event.code === 'Space') event.preventDefault();
  };

  const deleteAllText = () => {
    form.resetFields();
  };

  // Custom validator function
  const validateString = (_: any, value: any) => {
    if (value === myInfo?.Password) {
      return Promise.resolve();
    }
    return Promise.reject(new Error('Wrong password'));
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      form.submit();
      if (newPasswordInput != reenterPasswordInput) {
        openNotification('error', '', 'Your new password does not match');
      } else {
        const changePasswordModel = {} as ChangePasswordModel;
        changePasswordModel.Password = presentPasswordInput;
        changePasswordModel.NewPassword = newPasswordInput;
        dispatch(changePassword(changePasswordModel));
      }
    } catch (errorInfo) {}
  };

  return (
    <>
      <Row>
        <Col style={{ width: '50%', border: '1px solid rgba(0, 0, 0, 0.10)', borderRadius: 4, padding: 16 }}>
          <Form name="changePassword" form={form} layout="vertical">
            <Form.Item
              name="PresentPassword"
              initialValue=""
              rules={[{ validator: validateString }]}
              label={
                <span style={{ fontWeight: 'bold' }}>
                  <span style={{ color: 'red' }}>*</span> Present password
                </span>
              }
              validateTrigger="onSubmit"
            >
              <Input.Password className="custom-input" placeholder="At least 8 characters" onKeyDown={handleKeyDown} />
            </Form.Item>
            <Form.Item
              name="NewPassword"
              initialValue=""
              label={
                <span style={{ fontWeight: 'bold' }}>
                  <span style={{ color: 'red' }}>*</span> New password
                </span>
              }
            >
              <Input.Password className="custom-input" placeholder="At least 8 characters" onKeyDown={handleKeyDown} />
            </Form.Item>
            <Form.Item
              name="ReenterPassword"
              initialValue=""
              label={
                <span style={{ fontWeight: 'bold' }}>
                  <span style={{ color: 'red' }}>*</span> Reenter new password
                </span>
              }
            >
              <Input.Password className="custom-input" placeholder="At least 8 characters" onKeyDown={handleKeyDown} />
            </Form.Item>
          </Form>
        </Col>
        <Col style={{ width: '10%' }}>
          <Row justify="end">
            <div style={{ color: 'red' }}>
              <br></br>
              <br></br>
              <svg
                viewBox="64 64 896 896"
                focusable="false"
                data-icon="exclamation-circle"
                width="1em"
                height="1em"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
                <path d="M464 688a48 48 0 1096 0 48 48 0 10-96 0zm24-112h48c4.4 0 8-3.6 8-8V296c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8z"></path>
              </svg>
              &emsp;
            </div>
          </Row>
        </Col>
        <Col style={{ width: '40%' }}>
          <Row>
            <div style={{ color: 'red' }}>
              <br></br>
              <br></br>
              Enter a password with at least 8 characters, maximum 20 characters.
              <br></br>
              <br></br>There are uppercase letters, lowercase letters, numbers and special characters.
              <br></br>
              <br></br>No spaces are recorded.
            </div>
          </Row>
        </Col>
      </Row>
      <Row style={{ marginTop: 24, marginLeft: 30 }} justify="start">
        <Button style={{ marginRight: '20px', width: 140 }} mergetype="light-gray" onClick={deleteAllText}>
          Cancel
        </Button>
        <Button
          style={{ width: 140 }}
          htmlType="submit"
          mergetype="primary"
          onClick={handleSubmit}
          disabled={
            !presentPasswordInput ||
            presentPasswordInput === '' ||
            !/[!@#$%^&*()_+{}[\]:;<>,.?/~`-]/.test(presentPasswordInput) ||
            !/\d/.test(presentPasswordInput) ||
            !/[A-Z]/.test(presentPasswordInput) ||
            !/[a-z]/.test(presentPasswordInput) ||
            presentPasswordInput.length < 8 ||
            presentPasswordInput.length > 20 ||
            !newPasswordInput ||
            newPasswordInput === '' ||
            !/[!@#$%^&*()_+{}[\]:;<>,.?/~`-]/.test(newPasswordInput) ||
            !/\d/.test(newPasswordInput) ||
            !/[A-Z]/.test(newPasswordInput) ||
            !/[a-z]/.test(newPasswordInput) ||
            newPasswordInput.length < 8 ||
            newPasswordInput.length > 20 ||
            !reenterPasswordInput ||
            reenterPasswordInput === '' ||
            !/[!@#$%^&*()_+{}[\]:;<>,.?/~`-]/.test(reenterPasswordInput) ||
            !/\d/.test(reenterPasswordInput) ||
            !/[A-Z]/.test(reenterPasswordInput) ||
            !/[a-z]/.test(reenterPasswordInput) ||
            reenterPasswordInput.length < 8 ||
            reenterPasswordInput.length > 20
          }
        >
          {'Save'}
        </Button>
      </Row>
    </>
  );
});

export default ChangePassword;
