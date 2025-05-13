import { combineReducers } from 'redux';
import authReducer from './auth/Reducer';
import layoutReducer from './theme-layout/Reducer';
import hotelReducer from './hotel/Reducer';
import roomReducer from './room/Reducer';
import { report } from 'process';

const rootReducer = combineReducers({
  auth: authReducer,
  layout: layoutReducer,
  hotel: hotelReducer,
  room: roomReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
