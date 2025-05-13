import UilHdd from '@iconscout/react-unicons/dist/icons/uil-hdd';
import { Badge } from 'antd';
import React, { CSSProperties, useEffect } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { RootState } from 'store/RootReducer';
import { Heading } from 'components/heading/Heading';
import { Popover } from 'components/popup/Popup';
import { UserActionDropDown } from './AuthInfoStyle';
import { BellOutlined } from '@ant-design/icons';
import {
  fetchListNotificationMessageByUserID,
  readAllNotificationMessageByUserID,
  readNotificationMessageByID,
} from 'store/notification/Actions';
import { fetchDetailsStudent } from 'store/student/Actions';
import moment from 'moment';

interface INotificationBox {}

export const NotificationBox = React.memo<INotificationBox>(() => {
  const navigate = useNavigate();
  const rtl = useSelector((state: RootState) => state.layout.rtlData);
  const myInfo = useSelector((states: RootState) => states.auth.myInfo);
  const listNotification = useSelector((states: RootState) => states.notification.listNotificationMessageByUserID);
  const dispatch = useDispatch<any>();

  //Call Api get all notification of current user
  useEffect(() => {
    getListNotification();
  }, []);

  const getListNotification = () => {
    dispatch(fetchListNotificationMessageByUserID(myInfo?.ID ?? 0));
  };

  const renderThumb = ({ style }: { style: CSSProperties }) => {
    const thumbStyle = {
      borderRadius: 6,
      backgroundColor: '#F1F2F6',
    };
    return <div style={{ ...style, ...thumbStyle }} />;
  };

  const renderTrackVertical = () => {
    const thumbStyle: CSSProperties = {
      position: 'absolute',
      width: '6px',
      transition: 'opacity 200ms ease 0s',
      opacity: 0,
      [rtl ? 'left' : 'right']: '2px',
      bottom: '2px',
      top: '2px',
      borderRadius: '3px',
    };
    return <div className="hello" style={thumbStyle} />;
  };

  const renderView = ({ style }: { style: CSSProperties }) => {
    const customStyle: CSSProperties = {
      overflow: 'none',
      marginRight: rtl ? 'auto' : '0px',
      [rtl ? 'marginLeft' : 'marginRight']: '-17px',
    };
    return <div style={{ ...style, ...customStyle }} />;
  };

  // function timeAgo(date: Date) {
  //   const now = new Date();
  //   const secondsAgo = Math.floor((now.getTime() - new Date(date).getTime()) / 1000);

  //   const units = [
  //     { name: 'year', seconds: 31536000 },
  //     { name: 'month', seconds: 2592000 },
  //     { name: 'week', seconds: 604800 },
  //     { name: 'day', seconds: 86400 },
  //     { name: 'hour', seconds: 3600 },
  //     { name: 'minute', seconds: 60 },
  //     { name: 'second', seconds: 1 },
  //   ];

  //   for (const unit of units) {
  //     const amount = Math.floor(secondsAgo / unit.seconds);
  //     if (amount >= 1) {
  //       return `${amount} ${unit.name}${amount > 1 ? 's' : ''} ago`;
  //     }
  //   }

  //   return 'just now';
  // }

  const handleClickReadAll = () => {
    if (myInfo?.ID) dispatch(readAllNotificationMessageByUserID(myInfo.ID));
  };

  const hanldeDoubleClickMessage = (userIDToNotify: number, notiID: number, notiStatus: number) => {
    var readNotificationObj = {
      notiID: notiID,
      userID: myInfo?.ID ?? 0,
    };
    if (notiStatus == 0) dispatch(readNotificationMessageByID(readNotificationObj));
    dispatch(fetchDetailsStudent(userIDToNotify));
    navigate('/admin/student/categoryInfoStudent');
  };

  var numberOfUnReadMessage = listNotification?.filter((n) => n.Status == 0)?.length;
  const height = 580;//listNotification?.length ? (listNotification?.length >= 10 ? 540 + (listNotification?.length * 2) : listNotification?.length * 78) : 200;
  const scrollbarStyles = {
    trackVertical: {
      background: 'transparent',
      width: '8px',
      right: '2px',
    },
    thumbVertical: {
      background: '#C1C1C1',
      borderRadius: '4px',
    },
    thumbVerticalHover: {
      background: '#A8A8A8',
    },
  };
  const content = (
    <UserActionDropDown className="ninjadash-top-dropdown">
      {/* <Heading as="h5" className="ninjadash-top-dropdown__title"> */}
      <div style={{display: 'flex', justifyContent: 'space-between', width: '100%', padding: '20px 14px', backgroundColor: '#DBE7FF', borderRadius: 2, alignItems: 'center'}}>
        <div>
          <span style={{fontSize: 24, fontWeight: 700}}>Notification</span>
          {/* <Badge className="badge-danger" count={numberOfUnReadMessage} /> */}
        </div>
        <div onClick={() => numberOfUnReadMessage ? handleClickReadAll() : ''} 
            style={{cursor: 'pointer', color: '#194F9F', textDecoration: 'underline', userSelect: 'none', fontSize: 18, }}>Read all</div>
      </div>
      {/* </Heading> */}
      <Scrollbars
        autoHeight
        autoHeightMax={height} // Set this to the height that fits 10 records
        renderView={
          listNotification?.length && listNotification?.length >= 10
            ? renderView
            : (props) => <div {...props} style={{ ...props.style, overflow: 'none' }} />
        }
        renderThumbVertical={({ style, ...props }) => (
          <div {...props} style={{ ...style, ...scrollbarStyles.thumbVertical }} />
        )}
        renderTrackVertical={({ style, ...props }) => (
          <div {...props} style={{ ...style, ...scrollbarStyles.trackVertical }} />
        )}
        renderTrackHorizontal={(props) => <div {...props} style={{ display: 'none' }} className="track-horizontal" />}
      >
        <ul style={{ height: height, width: '95.2%', overflowY: 'auto' }}>
          {
            listNotification?.map((noti, index) => (
              <>
                <li style={{ width: '100%', backgroundColor: noti?.Status === 0 ? '#F3F7FD' : '#FFF', borderRadius: 2, padding: '16px 4px 14px 4px', border: '1px solid rgba(0, 0, 0, 0.10)' }} key={noti.ID}>
                  <div style={{ cursor: 'pointer', userSelect: 'none' }} onDoubleClick={() =>
                    noti?.userIDToNotify && noti?.ID
                      ? hanldeDoubleClickMessage(noti?.userIDToNotify, noti?.ID, noti?.Status ?? 1)
                      : ''
                  }>
                    <div style={{ display: 'flex', alignItems: 'center' }} className="ninjadash-top-dropdown__content notifications">
                      <div className="notification-icon">
                        <BellOutlined style={{ fontSize: 20, color: noti?.Status === 0 ? '#194F9F' : '#8E8E93' }} />
                      </div>
                      <div className="notification-content d-flex">
                        <div className="notification-text">
                          <Heading as="h5">
                            <div style={{ color: noti?.Status === 0 ? '#000000' : '#8E8E93', fontSize: 18, fontWeight: 500 }}>{noti?.NotificationMessage}</div>
                          </Heading>
                          <p style={{ fontSize: 16, color: '#8E8E93', marginTop: 10 }}>{moment(noti?.CreatedDate ?? new Date()).format('MM/DD/YYYY')}</p>
                        </div>
                        <div style={{ marginRight: 10 }} className="notification-status">
                          <Badge 
                            dot 
                            style={{ width: 9, height: 9, backgroundColor: noti?.Status === 0 ? '#194F9F' : '#8E8E93', marginTop: 8 }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                {
                  index === (listNotification?.length-1) && 
                  <li style={{ width: '100%', backgroundColor: noti?.Status === 0 ? '#F3F7FD' : '#FFF', borderRadius: 2, padding: '0px 4px 12px 4px' }} key={noti.ID}>
                  </li>
                }
              </>
            ))
          }
        </ul>
      </Scrollbars>

      {/* <Link className="btn-seeAll" to="#">
        See all incoming activity
      </Link> */}
    </UserActionDropDown>
  );

  return (
    <div className="ninjadash-nav-actions__item ninjadash-nav-actions__notification">
      <Popover placement="bottomLeft" content={content} trigger="click">
        <Badge
          count={numberOfUnReadMessage}
          overflowCount={9}
          offset={[
            numberOfUnReadMessage && numberOfUnReadMessage >= 10 ? -4 : -8,
            numberOfUnReadMessage && numberOfUnReadMessage >= 10 ? -4 : -1,
          ]}
          style={{
            // Additional styles to ensure proper display
            fontSize: '14px', // Adjust font size as needed
            minWidth: '24px', // Ensure width is enough to display numbers
            height: '24px', // Ensure height is sufficient
            lineHeight: '24px', // Center text vertically
            backgroundColor: '#f5222d', // Example background color
            color: '#fff', // Text color
          }}
        >
          <Link to="#" className="ninjadash-nav-action-link">
            <BellOutlined style={{ fontSize: 20 }} />
          </Link>
        </Badge>
      </Popover>
    </div>
  );
});
