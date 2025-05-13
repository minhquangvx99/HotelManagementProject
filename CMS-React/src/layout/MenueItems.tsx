import UilHome from '@iconscout/react-unicons/dist/icons/uil-home';
import UilEllipsisV from '@iconscout/react-unicons/dist/icons/uil-ellipsis-v';
import { FC, ReactNode, Key, useState } from 'react';
import { Menu, MenuProps } from 'antd';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'store/RootReducer';

interface IMenuItems {
  toggleCollapsed(): void;
  topMenu?: boolean;
}

const MenuItems: FC<IMenuItems> = ({ toggleCollapsed }) => {
  const topMenu = useSelector((state: RootState) => state.layout.topMenu);

  const path = '/admin';
  const pathName = window.location.pathname;
  const pathArray = pathName && pathName !== '/' ? pathName.split(path) : undefined;
  const mainPath = pathArray && pathArray.length > 1 ? pathArray[1] : '';
  const mainPathSplit = mainPath.split('/');
  const navigate = useNavigate();

  const [openKeys, setOpenKeys] = useState<string[] | undefined>([
    `${mainPathSplit.length > 2 ? mainPathSplit[1] : 'dashboard'}`,
  ]);

  type MenuItem = Required<MenuProps>['items'][number];

  const getItem = (label: ReactNode, key: Key, children?: MenuItem[], icon?: ReactNode, type?: string) => {
    return {
      label,
      key,
      children,
      icon,
      type,
    } as MenuItem;
  };

  const onOpenChange = (keys: string[]) => {
    setOpenKeys(keys.length ? [keys[keys.length - 1]] : keys);
  };

  const onClick: MenuProps['onClick'] = (item) => {
    if (item.keyPath.length === 1) setOpenKeys(undefined);
    navigate(`${path}/${item.keyPath}`);
  };

  const items = [
    getItem(
      <NavLink onClick={toggleCollapsed} to={`${path}/hotel`}>
        Hotel Management
      </NavLink>,
      'hotel',
      undefined,
      <NavLink className="menuItem-icon" to={`${path}/hotel`}>
        <UilHome />
      </NavLink>,
    ),
    getItem(
      <NavLink onClick={toggleCollapsed} to={`${path}/room`}>
        Room Management
      </NavLink>,
      'room',
      undefined,
      <NavLink className="menuItem-icon" to={`${path}/room`}>
        <UilHome />
      </NavLink>,
    ),
  ];

  return (
    <>
      <style>
        {`
          /* For WebKit browsers (Chrome, Safari) */
          ::-webkit-scrollbar {
              width: 4px;
              height: 4px; 
          }
          ::-webkit-scrollbar-track {
              background: #f1f1f1;
          }
          ::-webkit-scrollbar-thumb {
              background: #888;
              border-radius: 4px;
          }
          ::-webkit-scrollbar-thumb:hover {
              background: #555;
          }
          `}
      </style>
      <Menu
        onOpenChange={onOpenChange}
        onClick={onClick}
        mode={!topMenu || window.innerWidth <= 991 ? 'inline' : 'horizontal'}
        // // eslint-disable-next-line no-nested-ternary
        defaultSelectedKeys={[
          `${mainPathSplit.length === 1 ? 'class' : mainPathSplit.length === 2 ? mainPathSplit[1] : mainPathSplit[2]}`,
        ]}
        defaultOpenKeys={[`${mainPathSplit.length > 2 ? mainPathSplit[1] : 'class'}`]}
        overflowedIndicator={<UilEllipsisV />}
        openKeys={openKeys}
        items={items}
      />
    </>
  );
};

export default MenuItems;
