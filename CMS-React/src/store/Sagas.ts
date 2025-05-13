import { all, call } from 'redux-saga/effects';
import { watchAuthActions } from './auth/Sagas';
import { watchHotelActions } from './hotel/Sagas';
// import { watchTopicActions } from './topic/Sagas';
// import { watchTopicSetActions } from './topic-set/Sagas';

export default function* rootSaga() {
  yield all([
    call(watchAuthActions),
    call(watchHotelActions),
    // call(watchTopicSetActions),
    // call(watchTopicActions),
  ]);
}
