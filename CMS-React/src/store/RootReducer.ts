import { combineReducers } from 'redux';
import authReducer from './auth/Reducer';
import layoutReducer from './theme-layout/Reducer';
import hotelReducer from './hotel/Reducer';
// import topicReducer from './topic/Reducer';
// import topicSetReducer from './topic-set/Reducer';
import { report } from 'process';

const rootReducer = combineReducers({
  auth: authReducer,
  layout: layoutReducer,
  hotel: hotelReducer,
  // topic: topicReducer,
  // topicSet: topicSetReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
