import { Col, Row, Spin } from 'antd';
import { MemoExoticComponent, Suspense } from 'react';
import { AuthenticationWrap } from './overview/Style';

export const AuthLayout = (WraperContent: MemoExoticComponent<() => JSX.Element>) => {
  return (
    <Suspense
      fallback={
        <div className="spin">
          <Spin />
        </div>
      }
    >
      <Row justify="space-between" style={{ minHeight: '100vh' }}>
        <Col span={10}>
          <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <AuthenticationWrap>
              <div className="ninjadash-authentication-wrap">
                <WraperContent />
              </div>
            </AuthenticationWrap>
          </div>
        </Col>

        <Col
          span={14}
          style={{
            backgroundImage: `url(${require('../../static/img/auth-background.png')})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100%',
          }}
        >
          <img
            src={require(`../../static/img/quan-ly-khach-san.jpg`)}
            alt=""
            width={1314}
            max-width="80%"
            style={{ maxWidth: '100%' }}
          />
        </Col>
      </Row>
    </Suspense>
  );
};
