import { Suspense, lazy, useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import withAdminLayout from 'layout/withAdminLayout';
import React from 'react';
import HotelRoute from './Hotel';
// import TopicRoute from './Topic';
import AccountRoute from './Account';
import { Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/RootReducer';

const NotFound = lazy(() => import('container/pages/404'));

interface IAdmin {}

const Admin = React.memo<IAdmin>(() => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const dispatch = useDispatch<any>();
  const myInfo = useSelector((states: RootState) => states.auth.myInfo);

  return (
    <Suspense
      fallback={
        <div className="spin">
          <Spin />
        </div>
      }
    >
      <Routes>
        <Route path="*" element={<Navigate to="hotel" replace />} />
        <Route index path="hotel/*" element={<HotelRoute />} />
        {/* <Route path="topic/*" element={<TopicRoute />} /> */}
        <Route path="account/*" element={<AccountRoute />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
});

export default withAdminLayout(Admin);
