/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import UilEllipsisV from '@iconscout/react-unicons/dist/icons/uil-ellipsis-v';
import { Col, Layout, Row, Button, Modal } from 'antd';
import { CSSProperties, FC, useEffect, useMemo, useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { useSelector } from 'react-redux';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import MenueItems from './MenueItems';
import { FooterStyle, LayoutContainer, SmallScreenAuthInfo, TopMenuSearch } from './Style';
import { AuthInfo } from 'components/utilities/Info';
import { RootState } from 'store/RootReducer';
import { themeColor } from 'config/theme/ThemeVariables';
import FontAwesome from 'react-fontawesome';
import { Heading } from 'components/heading/Heading';
import { PageHeader } from 'components/page-headers/PageHeaders';
const { theme } = require('config/theme/ThemeVariables');

const { Header, Sider, Content } = Layout;

interface IWrappedComponent {
  layoutMode?: string;
  rtl?: boolean;
  topMenu?: boolean;
}

const withAdminLayout = (WrappedComponent: FC<IWrappedComponent>) => {
  interface ILayoutComponent {}

  const LayoutComponent: FC<ILayoutComponent> = () => {
    const layout = useSelector((state: RootState) => state.layout);
    const rtl = useSelector((state: RootState) => state.layout.rtlData);
    const topMenu = useSelector((state: RootState) => state.layout.topMenu);
    const location = useLocation();
    const props = { layoutMode: layout.mode, rtl, topMenu };

    const [state, setState] = useState({
      modalContactVisible: false,
      collapsed: false,
      hide: false,
      // currentPath: '',
    });
    const [currentQuestionID, setCurrentQuestionID] = useState(localStorage.getItem('currentQuestionID'));
    const [currentQuestionCode, setCurrentQuestionCode] = useState(localStorage.getItem('currentSingleQuestionCode'));
    const ExamTypeID = useSelector((state: RootState) => state.topicSet.topicSetForEdit?.ExamTypeID) || null;
    const TopicSetID = useSelector((state: RootState) => state.topicSet.topicSetForEdit?.TopicSetID) || null;
    const getExamTypeCode = () => {
      if (ExamTypeID && TopicSetID) {
        return `${ExamTypeID}-D${TopicSetID}`;
      }

      return null; // Return null or any default value if either ID is missing
    };
    useEffect(() => {
      window.addEventListener('resize', updateDimensions);
      updateDimensions();
      return () => {
        window.removeEventListener('resize', updateDimensions);
      };
    }, []);

    useEffect(() => {
      const handleCustomEvent = () => {
        setCurrentQuestionID(localStorage.getItem('currentQuestionID') || '');
        setCurrentQuestionCode(localStorage.getItem('currentSingleQuestionCode') || '');
      };
      window.addEventListener('currentQuestionIDChanged', handleCustomEvent);
      return () => {
        window.removeEventListener('currentQuestionIDChanged', handleCustomEvent);
      };
    }, []);

    const updateDimensions = () => {
      setState({
        ...state,
        collapsed: window.innerWidth <= 1200 && true,
      });
    };

    const toggleCollapsed = () => {
      setState({
        ...state,
        collapsed: !state.collapsed,
      });
    };

    const toggleCollapsedMobile = () => {
      if (window.innerWidth <= 990) {
        setState({ ...state, collapsed: !state.collapsed });
      }
    };

    const onShowHide = () => {
      setState({
        ...state,
        hide: !state.hide,
      });
    };

    const sideBarStyle: CSSProperties = {
      margin: '45px 0 0 0',
      padding: `${!rtl ? '20px 20px 55px 0' : '20px 0 55px 20px'}`,
      overflowY: 'auto',
      height: '100vh',
      position: 'fixed',
      [!rtl ? 'left' : 'right']: 0,
      zIndex: 988,
      background: 'rgb(243, 248, 255)',
    };

    const renderView = ({ style }: { style: CSSProperties }) => {
      const customStyle = {
        marginRight: 'auto',
        [rtl ? 'marginLeft' : 'marginRight']: '-17px',
      };
      return <div style={{ ...style, ...customStyle }} />;
    };

    const renderThumbVertical = ({ style }: { style: CSSProperties }) => {
      const thumbStyle = {
        borderRadius: 6,
        backgroundColor: layout ? '#ffffff16' : '#F1F2F6',
        [!rtl ? 'left' : 'right']: '2px',
      };
      return <div style={{ ...style, ...thumbStyle }} />;
    };

    const renderThumbHorizontal = ({ style }: { style: CSSProperties }) => {
      const thumbStyle = {
        borderRadius: 6,
        backgroundColor: layout ? '#ffffff16' : '#F1F2F6',
      };
      return <div style={{ ...style, ...thumbStyle }} />;
    };

    const showModal = () => {
      setState({
        ...state,
        modalContactVisible: true,
      });
    };

    const closeModal = () => {
      setState({
        ...state,
        modalContactVisible: false,
      });
    };

    const titleNameFunc = () => {
      switch (location.pathname) {
        case '/admin/account':
          return 'Account';
        case '/admin/question':
          return 'Question Management';
        case '/admin/topic':
          return `Exam Management`;
        case '/admin/student':
          return 'Student Information Management';
        case '/admin/class':
          return 'Class Management';
        case '/admin/category':
          return 'Category Management';
        case '/admin/student/categoryInfoStudent':
          return 'Student Information Management';
        case '/admin/question/errorQuestion':
          return 'Review Import Questions';
        case '/admin/question/addQuestion':
          return currentQuestionID
            ? `ID: ${currentQuestionID}_Single Question`
            : currentQuestionCode
              ? `Single Question ${currentQuestionCode}`
              : 'Single Question';
        case '/admin/question/addCompositeQuestion':
          return currentQuestionID?.includes('CQ')
            ? `Composite Question ${currentQuestionID}`
            : currentQuestionID
              ? `ID: ${currentQuestionID}_Composite Question`
              : 'Composite Question';
        case '/admin/topic/addTopic':
          return `Exam Detail${getExamTypeCode() ? `: ${getExamTypeCode()}` : ''}`;
        default:
          return '';
      }
    };

    const titleName = titleNameFunc();

    return (
      <LayoutContainer>
        <Layout className="layout">
          <Header
            style={{
              position: 'fixed',
              width: '100%',
              top: 0,
              [!rtl ? 'left' : 'right']: 0,
            }}
          >
            <div className="ninjadash-header-content d-flex">
              <div className="ninjadash-header-content__left">
                <div className="navbar-brand align-cener-v">
                  {!topMenu || window.innerWidth <= 991 ? (
                    <Button type="link" onClick={toggleCollapsed} style={{ height: '100%', width: '80px' }}>
                      <img
                        src={require(`../static/img/icon/${state.collapsed ? 'left-bar.svg' : 'left-bar.svg'}`)}
                        alt="menu"
                      />
                    </Button>
                  ) : null}
                  <Link
                    className={`ninjadash-logo ${topMenu && window.innerWidth > 991 ? 'top-menu' : ''} link-transition ${state.collapsed ? 'collapsed' : ''}`}
                    style={{ height: '100%' }}
                    to="/main"
                  >
                    <img src={require(`../static/img/logo_dark.png`)} alt="" />
                  </Link>
                </div>
              </div>
              <div className="ninjadash-header-content__right d-flex">
                <div style={{ marginLeft: 52, fontSize: 24, color: '#000', fontWeight: 600, marginTop: 4 }}>
                  {titleName}
                </div>
                <div className="ninjadash-nav-actions">
                  {topMenu && window.innerWidth > 991 ? (
                    <TopMenuSearch>
                      <div className="top-right-wrap d-flex">
                        <AuthInfo />
                      </div>
                    </TopMenuSearch>
                  ) : (
                    // <></>
                    <AuthInfo />
                  )}
                </div>
              </div>
              <div className="ninjadash-header-content__mobile">
                <div className="ninjadash-mobile-action">
                  <Link className="btn-auth" onClick={onShowHide} to="#">
                    <UilEllipsisV />
                  </Link>
                </div>
              </div>
            </div>
          </Header>
          <div className="ninjadash-header-more">
            <Row>
              <Col md={0} sm={24} xs={24}>
                <div className="ninjadash-header-more-inner">
                  <SmallScreenAuthInfo hide={state.hide}>
                    <AuthInfo rtl={rtl} />
                  </SmallScreenAuthInfo>
                </div>
              </Col>
            </Row>
          </div>
          <Layout>
            {!topMenu || window.innerWidth <= 991 ? (
              <ThemeProvider theme={theme}>
                <Sider
                  width={300}
                  style={sideBarStyle}
                  collapsed={state.collapsed}
                  theme={layout.mode === 'lightMode' ? 'light' : 'dark'}
                >
                  <Scrollbars
                    className="custom-scrollbar"
                    autoHide
                    autoHideTimeout={500}
                    autoHideDuration={200}
                    renderThumbHorizontal={renderThumbHorizontal}
                    renderThumbVertical={renderThumbVertical}
                    renderView={renderView}
                    renderTrackVertical={(props) => <div {...props} className="ninjadash-track-vertical" />}
                  >
                    <MenueItems topMenu={topMenu} toggleCollapsed={toggleCollapsedMobile} />
                  </Scrollbars>
                </Sider>
              </ThemeProvider>
            ) : null}
            <Layout className="atbd-main-layout">
              <Content>
                <WrappedComponent {...props} />
                <FooterStyle className="admin-footer">
                  <Row>
                    <Col md={12} xs={24}>
                      <span className="admin-footer__copyright">
                        Copyright © 2024, <Link to="#">Smart Learning All rights reserved</Link>
                      </span>
                    </Col>
                    <Col md={12} xs={24}>
                      <div className="admin-footer__links">
                        <NavLink to="#" onClick={showModal}>
                          Contact Us
                        </NavLink>
                        <NavLink to="#">Learn More</NavLink>
                        <NavLink to="#">About Us</NavLink>
                      </div>
                    </Col>
                  </Row>
                </FooterStyle>
              </Content>
            </Layout>
          </Layout>
        </Layout>
        <Modal centered width={300} open={state.modalContactVisible} onCancel={closeModal} footer={null}>
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
            <Heading as="h2">091.334.5162</Heading>
          </div>
        </Modal>
        {window.innerWidth <= 991 ? (
          <span className={state.collapsed ? 'ninjadash-shade' : 'ninjadash-shade show'} onClick={toggleCollapsed} />
        ) : (
          ''
        )}
      </LayoutContainer>
    );
  };

  return LayoutComponent;
};

export default withAdminLayout;
