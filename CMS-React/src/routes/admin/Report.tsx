import { Spin } from 'antd';
import { FC, Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';



const Report = lazy(() => import('container/report/Report'));
const NotFound = lazy(() => import('container/pages/404'));

interface IReportRoute {}

const ReportRoute: FC<IReportRoute> = () => {
  return (
    <Suspense
      fallback={
        <div className="spin">
          <Spin />
        </div>
      }
    >
      <Routes>
        <Route index element={<Report />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default ReportRoute;
