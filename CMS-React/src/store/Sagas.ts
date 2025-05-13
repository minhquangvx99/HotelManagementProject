import { all, call } from 'redux-saga/effects';
import { watchAuthActions } from './auth/Sagas';
import { watchClassActions } from './class/Sagas';
import { watchExamTypeActions } from './exam-type/Sagas';
import { watchQuestionActions } from './question/Sagas';
import { watchTopicActions } from './topic/Sagas';
import { watchStudentActions } from './student/Sagas';
import { watchKAActions } from './ka/Sagas';
import { watchTaskActions } from './task/Sagas';
import { watchTypeOfTopicSetActions } from './type-of-topic-set/Sagas';
import { watchTopicSetActions } from './topic-set/Sagas';
import { watchNotificationActions } from './notification/Sagas';
import { watchBatchActions } from './batch/Saga';
import { watchReportActions } from './report/Sagas';

export default function* rootSaga() {
  yield all([
    call(watchAuthActions),
    call(watchClassActions),
    call(watchExamTypeActions),
    call(watchKAActions),
    call(watchTaskActions),
    call(watchTypeOfTopicSetActions),
    call(watchQuestionActions),
    call(watchTopicSetActions),
    call(watchStudentActions),
    call(watchNotificationActions),
    call(watchBatchActions),
    call(watchReportActions),
  ]);
}
