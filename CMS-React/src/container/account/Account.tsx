import { Skeleton } from 'antd';
import { Cards } from 'components/cards/frame/CardsFrame';
import { Tab } from 'components/tabs/Tabs';
import { Main } from 'container/Style';
import { FC, Suspense, useState } from 'react';
import { themeColor } from 'config/theme/ThemeVariables';
import AccountInformation from './AccountInformation';
import ChangePassword from './ChangePassword';

interface IAccount {}

const Account: FC<IAccount> = (props) => {

  const [type, setType] = useState('1');

  const tabData = [
    {
      key: '1',
      tabTitle: 'Account Information',
      content: <AccountInformation type={type} />,
    },
    {
      key: '2',
      tabTitle: 'Change Password',
      content: <ChangePassword type={type} />,
    },
  ];

  const onChangeTab = (index: string) => {
    setType(index);
  };

  return (
    <>
      <Main>
        <Suspense
          fallback={
            <Cards headless>
              <Skeleton active />
            </Cards>
          }
        >
          <Cards>
            <Tab style={{ borderColor: themeColor['white-color'] }} data={tabData} onChange={onChangeTab} />
          </Cards>
        </Suspense>
      </Main>
    </>
  );
};

export default Account;
