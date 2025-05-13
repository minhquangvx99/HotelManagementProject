import { Route } from '@ant-design/pro-layout/es/typing';
import { Skeleton } from 'antd';
import { Cards } from 'components/cards/frame/CardsFrame';
import { Tab } from 'components/tabs/Tabs';
import { Main } from 'container/Style';
import { FC, Suspense, useState } from 'react';
import { themeColor } from 'config/theme/ThemeVariables';
import ExamType from './exam-type/ExamType';
import KA from './ka/KA';
import TypeOfTopicSet from './type-of-topic-set/TypeOfTopicSet';
import Task from './task/Task';
import { PageHeader } from 'components/page-headers/PageHeaders';

interface ICategory {}

const Category: FC<ICategory> = (props) => {
  const PageRoutes: Route[] = [
    {
      path: '',
      breadcrumbName: 'Category',
    },
    {
      path: '',
      breadcrumbName: 'List',
    },
  ];

  const [type, setType] = useState('1');

  const tabData = [
    {
      key: '1',
      tabTitle: 'Category Information L1',
      content: <ExamType type={type} />,
    },
    {
      key: '2',
      tabTitle: 'Category Information L2',
      content: <KA type={type} />,
    },
    {
      key: '3',
      tabTitle: 'Category Information L3',
      content: <Task type={type} />,
    },
    {
      key: '4',
      tabTitle: 'Type Of Exams',
      content: <TypeOfTopicSet type={type} />,
    },
  ];

  const onChangeTab = (index: string) => {
    setType(index);
  };

  return (
    <>
      <Main style={{}}>
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

export default Category;
