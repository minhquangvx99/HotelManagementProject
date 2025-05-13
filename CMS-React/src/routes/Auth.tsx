import { AuthLayout } from 'container/authentication/Index';
import React, { FC, lazy, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

const Login = lazy(() => import('container/authentication/overview/SignIn'));

interface IAuthRoot {}

const AuthRoot: FC<IAuthRoot> = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    (!token || token === '') && navigate('/');
  });

  return <></>;
};

const FrontendRoutes = React.memo(() => {
  return (
    <Routes>
      <Route index element={<Login />} />
      <Route path="*" element={<AuthRoot />} />
    </Routes>
  );
});

 export default AuthLayout(FrontendRoutes);
