import { Child, TabBasic } from './Style';
import { TabsProps } from 'antd';
import { FC, ReactNode } from 'react';
import UilSmile from '@iconscout/react-unicons/dist/icons/uil-smile';
import UilCamera from '@iconscout/react-unicons/dist/icons/uil-camera';
import UilAt from '@iconscout/react-unicons/dist/icons/uil-at';
import UilHome from '@iconscout/react-unicons/dist/icons/uil-home';
import UilAirplay from '@iconscout/react-unicons/dist/icons/uil-airplay';

interface IData {
  key: string;
  title?: string;
  content?: ReactNode;
  icon?: string;
  tabTitle?: string;
}

export interface ITab extends TabsProps {
  data?: IData[];
  customType?: string;
  extraMenu?: ReactNode;
}

export const Tab: FC<ITab> = (props) => {
  const { data, tabPosition, customType, color, onChange, extraMenu } = props;

  return (
    <TabBasic
      className={`ninjadash-tab-${customType}`}
      color={color && color}
      defaultActiveKey="1"
      tabPosition={tabPosition !== undefined ? tabPosition : 'top'}
      onChange={onChange}
      tabBarExtraContent={extraMenu}
    >
      {data &&
        data.map((item) => {
          const { key, title, content, icon, tabTitle } = item;

          const renderIcon = () => {
            switch (icon) {
              case 'UilSmile':
                return <UilSmile />;
              case 'UilCamera':
                return <UilCamera />;
              case 'UilAt':
                return <UilAt />;
              case 'UilHome':
                return <UilHome />;
              case 'UilAirplay':
                return <UilAirplay />;
              default:
                <></>;
                break;
            }
          };

          return (
            <Child
              color={color && color}
              tab={
                icon === undefined ? (
                  tabTitle
                ) : (
                  <span>
                    {renderIcon()}
                    {tabTitle}
                  </span>
                )
              }
              key={key}
              activeKey={key}
            >
              <h2>{title}</h2>

              {content}
            </Child>
          );
        })}
    </TabBasic>
  );
};
