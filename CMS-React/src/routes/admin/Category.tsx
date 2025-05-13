import { Spin } from 'antd';
import { FC, Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const Category = lazy(() => import('container/category/Category'));
const NotFound = lazy(() => import('container/pages/404'));

interface ICategoryRoute {}

const CategoryRoute: FC<ICategoryRoute> = () => {
  return (
    <Suspense
      fallback={
        <div className="spin">
          <Spin />
        </div>
      }
    >
      <Routes>
        <Route index element={<Category />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default CategoryRoute;
