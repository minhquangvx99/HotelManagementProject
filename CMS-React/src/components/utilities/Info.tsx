import UilSignout from '@iconscout/react-unicons/dist/icons/uil-signout';
import UilUser from '@iconscout/react-unicons/dist/icons/uil-user';
import { Avatar } from 'antd';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { InfoWraper, UserDropDown } from './AuthInfoStyle';
import { Popover } from 'components/popup/Popup';
import { logout } from 'store/auth/Actions';
import { themeColor } from 'config/theme/ThemeVariables';
import { Heading } from 'components/heading/Heading';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/RootReducer';
import FontAwesome from 'react-fontawesome';

interface IAuthInfo {
  rtl?: boolean;
}

export const AuthInfo = React.memo<IAuthInfo>(() => {
  const auth = useSelector((states: RootState) => states.auth);
  const dispatch = useDispatch<any>();

  const navigate = useNavigate();

  const signOut = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    dispatch(logout(() => navigate('/')));
  };

  const userContent = (
    <UserDropDown>
      <div className="user-dropdwon">
        <figure className="user-dropdwon__info">
          <div
            style={{
              background: themeColor['primary-color'],
              padding: 10,
              marginRight: 15,
              color: themeColor['white-color'],
            }}
          >
            {auth.shortName}
          </div>
          <figcaption style={{textTransform: 'uppercase'}}>
            <Heading as="h5">{auth.myInfo?.Name}</Heading>
            <p style={{textTransform: 'initial'}}>Admin</p>
          </figcaption>
        </figure>
        <ul className="user-dropdwon__links">
          <li>
            <Link to="/admin/account">
              <UilUser /> Account
            </Link>
          </li>
        </ul>
        <Link className="user-dropdwon__bottomAction" onClick={signOut} to="#">
          <UilSignout /> Log Out
        </Link>
      </div>
    </UserDropDown>
  );

  return (
    <InfoWraper>
      <Avatar
        src=""
        className="h1"
        style={{
          background: themeColor['primary-color'],
          width: 50,
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
          fontSize: 18,
        }}
      >
        {auth.shortName}
      </Avatar>
      <div style={{ marginRight: 10, lineHeight: 0 }}>
        <span
          className="ninjadash-nav-actions__author--name"
          style={{ textTransform: 'uppercase', fontWeight: 'bold' }}
        >
          {auth.myInfo?.Name}
        </span>
        <div
          style={{
            padding: '12px 10px',
            background: '#F0E68C',
            textAlign: 'center',
            lineHeight: 0,
            width: 'fit-content',
            marginLeft: 10,
            marginTop: 18,
            fontSize: 13,
            marginBottom: -5
          }}
        >
          Admin
        </div>
      </div>
      <div className="ninjadash-nav-actions__item ninjadash-nav-actions__author" style={{ marginRight: 20, marginLeft: 5 }}>
        <Popover placement="bottomRight" content={userContent} trigger="click">
          <Link to="#" className="ninjadash-nav-action-link">
            <FontAwesome name="sort-down" size="lg" style={{ color: themeColor['dark-color'] }} />
          </Link>
        </Popover>
      </div>
    </InfoWraper>
  );
});
