import { Spin } from 'antd';
import { FC, Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const Account = lazy(() => import('container/account/Account'));
const NotFound = lazy(() => import('container/pages/404'));

interface IAccountRoute {}

const AccountRoute: FC<IAccountRoute> = () => {
  return (
    <Suspense
      fallback={
        <div className="spin">
          <Spin />
        </div>
      }
    >
      <Routes>
        <Route index element={<Account />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AccountRoute;