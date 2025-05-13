import { Col, Form, Input, Modal, Row } from 'antd';
import { FC, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { AuthFormWrap } from './Style';
import { RootState } from 'store/RootReducer';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { Checkbox } from 'components/checkbox/Checkbox';
import { Button } from 'components/buttons/Buttons';
import { login } from 'store/auth/Actions';
import { LoginState } from 'store/auth/Types';
import FontAwesome from 'react-fontawesome';
import { Heading } from 'components/heading/Heading';
import { themeColor } from 'config/theme/ThemeVariables';
import React, { startTransition } from 'react';

interface ISignIn {}

const SignIn: FC<ISignIn> = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const isLoading = useSelector((state: RootState) => state.auth.loading);
  const [form] = Form.useForm();
  const [state, setState] = useState({
    checked: localStorage.getItem('IsRemember') == 'false' ? false : true,
  });

  const handleSubmit = useCallback(
    (values: LoginState) => {
      values.isRemember = state.checked;
      dispatch(login(values, () => navigate('/main/exam-student')));
    },
    [navigate, dispatch],
  );
  const handleRegisterClick = () => {
    startTransition(() => {
      // If there are any state updates or side effects, put them here
      // If it's just a navigation, it's usually fine as is
    });
  };
  const onChange = (e: CheckboxChangeEvent) => {
    setState({ ...state, checked: e.target.checked });
    state.checked = e.target.checked;
  };

  const [open, setOpen] = useState(false);

  const usernameInput = Form.useWatch('Username', form);
  const passwordInput = Form.useWatch('Password', form);

  const handleKeyDown = (event: { code: string; preventDefault: () => void }) => {
    if (event.code === 'Space') event.preventDefault();
  };
  return (
    <>
      <Row justify="center">
        <Col span={18}>
          <AuthFormWrap>
            <div className="ninjadash-authentication-top">
              <h1 className="ninjadash-authentication-top__title">Log in</h1>
            </div>
            <div className="ninjadash-authentication-content">
              <Form name="login" form={form} onFinish={handleSubmit} layout="vertical">
                <Form.Item
                
                  name="Username"
                  initialValue={!localStorage.getItem('Username') ? '' : localStorage.getItem('Username')}
                  label={<span style={{fontWeight:"600"}}>Username</span>}
                >
                  <Input placeholder="Enter your username" onKeyDown={handleKeyDown} />
                </Form.Item>
                <Form.Item
                  name="Password"
                  initialValue={!localStorage.getItem('Password') ? '' : localStorage.getItem('Password')}
                  label={<span style={{fontWeight:"600"}}>Password</span>}
                  normalize={(value) => value.trim()}
                >
                  <Input.Password placeholder="Enter at least 8+ characters" onKeyDown={handleKeyDown} maxLength={20}/>
                </Form.Item>
                <div style={{display: "flex", justifyContent:"space-between"}} className="ninjadash-update auth-extra-links">
                  <Checkbox onChange={onChange} checked={state.checked} style={{ fontWeight: '600' }}>
                    Remember me
                  </Checkbox>
                </div>
                <Form.Item>
                  <Button
                    className="btn-signin"
                    htmlType="submit"
                    mergetype="primary"
                    size="large"
                    disabled={
                      !usernameInput ||
                      usernameInput === '' ||
                      !passwordInput ||
                      passwordInput === '' ||
                      passwordInput.length < 8 ||
                      passwordInput.length > 20 ||
                      !/[!@#$%^&*()_+{}[\]:;<>,.?/~`-]/.test(passwordInput) ||
                      !/\d/.test(passwordInput) ||
                      !/[A-Z]/.test(passwordInput) ||
                      !/[a-z]/.test(passwordInput)
                    }
                  >
                    {isLoading ? 'Loading...' : 'Log In'}
                  </Button>
                </Form.Item>
              </Form>
              <Modal centered open={open} onOk={() => setOpen(false)} onCancel={() => setOpen(false)} footer="">
                <div style={{ justifyItems: 'center', display: 'grid' }}>
                  <div
                    style={{
                      padding: 20,
                      borderRadius: 999,
                      background: themeColor['success-color'],
                      marginTop: 10,
                      marginBottom: 30,
                      height: 100,
                      width: 100,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <FontAwesome name="phone" size="4x" style={{ color: themeColor['white-color'] }} />
                  </div>
                  <Heading as="h2">012.345.6789</Heading>
                </div>
              </Modal>
            </div>
          </AuthFormWrap>
        </Col>
      </Row>
      <div>
        <Row justify="center" style={{ marginTop: '10px' }}>
          <h5
            style={{
              color: 'blue',
              textAlign: 'center',
              fontFamily: 'sans-serif',
            }}
          >
            [
            <Link to={''}>
              <u
                style={{
                  color: 'blue',
                  textAlign: 'center',
                  fontFamily: 'sans-serif',
                }}
                onClick={() => setOpen(true)}
              >
                Contact Us
              </u>
            </Link>
            ]&nbsp;&nbsp;&nbsp;&nbsp;[
            <u
              style={{
                color: 'blue',
                textAlign: 'center',
                fontFamily: 'sans-serif',
              }}
            >
              Learn More
            </u>
            ]&nbsp;&nbsp;&nbsp;&nbsp;[
            <u
              style={{
                color: 'blue',
                textAlign: 'center',
                fontFamily: 'sans-serif',
              }}
            >
              About Us
            </u>
            ]
          </h5>
        </Row>
      </div>
    </>
  );
};

export default SignIn;
