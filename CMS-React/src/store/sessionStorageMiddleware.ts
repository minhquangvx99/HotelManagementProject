import { Middleware } from '@reduxjs/toolkit';

const SessionStorageMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);
  return result;
};

export default SessionStorageMiddleware;
