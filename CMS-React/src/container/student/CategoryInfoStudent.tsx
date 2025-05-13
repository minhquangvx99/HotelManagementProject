import { Col, Skeleton, Tabs } from 'antd';
import { Cards } from 'components/cards/frame/CardsFrame';
import { PageHeader } from 'components/page-headers/PageHeaders';
import { Main } from 'container/Style';
import { FC, Suspense, useState } from 'react';
import { themeColor } from 'config/theme/ThemeVariables';
import AddOrUpdateStudent from './AddOrUpdateStudent';
import ExamTypeStudent from './ExamTypeStudent';
import { useSelector } from 'react-redux';
import { RootState } from 'store/RootReducer';
import TabPane from 'antd/lib/tabs/TabPane';
import { Button } from 'components/buttons/Buttons';
import { useNavigate } from 'react-router-dom';

interface ICategoryInfoStudent {}

const CategoryInfoStudent: FC<ICategoryInfoStudent> = (props) => {
  const [type, setType] = useState('1');
  const studentForEdit = useSelector((state: RootState) => state.student.studentForEdit);
  const [checkStatus, setCheckStatus] = useState(false);
  const [btnRefuse, setBtnRefuse] = useState(false);
  const [btnApprove, setBtnApprove] = useState(false);
  const navigate = useNavigate();
 


  const tabData = [
    {
      key: '1',
      tabTitle: 'Student Information',
      content: <AddOrUpdateStudent type={type} 
      btnRefuse = {btnRefuse}
      btnApprove = {btnApprove}
      setBtnRefuse={setBtnRefuse}
      setBtnApprove={setBtnApprove}
     
      />,
      disabled: false,
      
    },
    {
      key: '2',
      tabTitle: 'Subject',
      content: <ExamTypeStudent type={type} />,
      disabled: !studentForEdit,
    },
  ];
  const openModalConfirmRefuse = () => {
    setBtnRefuse(true);
  };
  const openModalConfirmApprove = () => {
    console.log('Ngoaii');
    
    setBtnApprove(true);
  };
  const onChangeTab = (index: string) => {
    setType(index);
  };
  const navigateClick = () => {
    navigate('/admin/student');
  };

 
  return (
    <>
      {/* <PageHeader className="ninjadash-page-header-main" title="Manage student information"  /> */}
      <Main>
        <Suspense
          fallback={
            <Cards headless>
              <Skeleton active />
            </Cards>
          }
        >
          <Cards>
            <Tabs style={{ borderColor: themeColor['white-color'] }} onChange={onChangeTab}>
              {tabData.map(({ key, tabTitle, content, disabled }) => (
                <TabPane tab={tabTitle} key={key} disabled={disabled}>
                  {content}
                </TabPane>
              ))}
            </Tabs>
          </Cards>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              style={{
                marginRight: '20px',
                width: '160px',
                backgroundColor: '#fff',
                border: '1px solid blue',
                color: 'blue',
              }}
              hidden={studentForEdit?.Status !== 4 && studentForEdit?.Status !== 5}
              onClick={navigateClick}
            >
              Close
            </Button>
            <Button
              hidden={studentForEdit?.Status !== 4 && studentForEdit?.Status !== 5}
              style={{
                marginRight: '20px',
                width: '160px',
                backgroundColor: '#fff',
                border: '1px solid red',
                color: 'red',
              }}
              htmlType="submit"
              mergetype="primary"
              onClick={openModalConfirmRefuse}
              //hidden={statusInput === '4' || statusInput ==='5'}
              disabled={studentForEdit?.Status === 5}
            >
              {'Refuse'}
            </Button>
            <Button
              hidden={studentForEdit?.Status !== 4 && studentForEdit?.Status !== 5}
              style={{ width: '160px' }}
              htmlType="submit"
              mergetype="primary"
              onClick={openModalConfirmApprove}
              disabled={studentForEdit?.Status === 5}
            >
              {'Approve'}
            </Button>
          </div>
        </Suspense>
      </Main>
    </>
  );
};

export default CategoryInfoStudent;
