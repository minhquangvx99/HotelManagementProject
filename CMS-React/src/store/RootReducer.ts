import { combineReducers } from 'redux';
import authReducer from './auth/Reducer';
import layoutReducer from './theme-layout/Reducer';
import examTypeReducer from './exam-type/Reducer';
import classReducer from './class/Reducer';
import questionReducer from './question/Reducer';
import studentReducer from './student/Reducer';
import topicReducer from './topic/Reducer';
import kaReducer from './ka/Reducer';
import taskReducer from './task/Reducer';
import typeOfTopicSetReducer from './type-of-topic-set/Reducer';
import topicSetReducer from './topic-set/Reducer';
import notificationReducer from './notification/Reducer';
import batchReducer from './batch/Reducer';
import { report } from 'process';
import ReportExamReducer from './report/Reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  layout: layoutReducer,
  class: classReducer,
  examType: examTypeReducer,
  ka: kaReducer,
  task: taskReducer,
  typeOfTopicSet: typeOfTopicSetReducer,
  topic: topicReducer,
  topicSet: topicSetReducer,
  question: questionReducer,
  student: studentReducer,
  notification: notificationReducer,
  batch: batchReducer,
  report: ReportExamReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
