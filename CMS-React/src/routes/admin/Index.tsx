import { Suspense, lazy, useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import withAdminLayout from 'layout/withAdminLayout';
import React from 'react';
import ClassRoute from './Class';
import CategoryRoute from './Category';
import QuestionRoute from './Question';
import TopicRoute from './Topic';
import StudentRoute from './Student';
import AccountRoute from './Account';
import { Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/RootReducer';
import {
  createNotificationToken,
  fetchListNotificationMessageByUserID,
} from 'store/notification/Actions';
import ReportRoute from './Report';

const NotFound = lazy(() => import('container/pages/404'));

interface IAdmin {}

const Admin = React.memo<IAdmin>(() => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const dispatch = useDispatch<any>();
  const myInfo = useSelector((states: RootState) => states.auth.myInfo);

  const disPatchApi = (obj: any) => {
    dispatch(createNotificationToken(obj));
  };

  const dispatchFetchListMessage = () => {
    dispatch(fetchListNotificationMessageByUserID(myInfo?.ID ?? 0));
  };

  return (
    <Suspense
      fallback={
        <div className="spin">
          <Spin />
        </div>
      }
    >
      <Routes>
        <Route path="*" element={<Navigate to="class" replace />} />
        <Route index path="class/*" element={<ClassRoute />} />
        <Route index path="report/*" element={<ReportRoute />} />
        <Route path="category/*" element={<CategoryRoute />} />
        <Route path="question/*" element={<QuestionRoute />} />
        <Route path="topic/*" element={<TopicRoute />} />
        <Route path="student/*" element={<StudentRoute />} />
        <Route path="account/*" element={<AccountRoute />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
});

export default withAdminLayout(Admin);
