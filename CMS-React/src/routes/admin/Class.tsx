import { Spin } from 'antd';
import { FC, Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const Class = lazy(() => import('container/class/Class'));
const NotFound = lazy(() => import('container/pages/404'));

interface IClassRoute {}

const ClassRoute: FC<IClassRoute> = () => {
  return (
    <Suspense
      fallback={
        <div className="spin">
          <Spin />
        </div>
      }
    >
      <Routes>
        <Route index element={<Class />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default ClassRoute;
