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
      {/* <Row align="middle" justify="space-between" style={{marginTop:'5px'}}>
        <Col>
          <h1 style={{ marginLeft:'30px', color:'#1F3D99', fontFamily:'Manrope', fontSize:'35px'}}>Online Study Exam</h1>
          <h2 style={{ marginTop:'-20px', marginLeft:'30px', color:'#1F3D99', fontFamily:'Manrope', fontSize:'25px'}}>Simulator and practice exams for IIBA<sup>&reg;</sup> and PMI<sup>&reg;</sup> certifications</h2>
        </Col>
        <Col>
          <img src={require(`../../static/img/logo_dark.png`)} alt="" style={{marginRight: '30px' }}/>
        </Col>
        </Row> */}
      <Row justify="space-between" style={{ minHeight: '100vh' }}>
        <Col span={10}>
          <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <img
              src={require(`../../static/img/logo_dark.png`)}
              alt=""
              style={{ padding: '31px 40px', width: '594px', maxWidth: '100%' }}
            />
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
            src={require(`../../static/img/school-supplies-with-back-to-school-theme_9336036.png`)}
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
