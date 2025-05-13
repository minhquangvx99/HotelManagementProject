import { Spin } from 'antd';
import CategoryInfoStudent from 'container/student/CategoryInfoStudent';
import { FC, Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const Student = lazy(() => import('container/student/Student'));
const NotFound = lazy(() => import('container/pages/404'));

interface IStudentRoute {}

const StudentRoute: FC<IStudentRoute> = () => {
  return (
    <Suspense
      fallback={
        <div className="spin">
          <Spin />
        </div>
      }
    >
      <Routes>
        <Route index element={<Student />} />
        <Route path="/categoryInfoStudent" element={<CategoryInfoStudent />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default StudentRoute;
