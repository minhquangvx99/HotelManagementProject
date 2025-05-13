import { configureStore } from '@reduxjs/toolkit';
import SessionStorageMiddleware from './sessionStorageMiddleware';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './RootReducer';
import rootSaga from './Sagas';

const sagaMiddleware = createSagaMiddleware();

const persistedState = sessionStorage.getItem('reduxState') ? JSON.parse(sessionStorage.getItem('reduxState')!) : {};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
      thunk: true,
    }).concat(sagaMiddleware, SessionStorageMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState: persistedState,
  enhancers: (getDefaultEnhancers) => getDefaultEnhancers(),
});

sagaMiddleware.run(rootSaga);

export default store;
