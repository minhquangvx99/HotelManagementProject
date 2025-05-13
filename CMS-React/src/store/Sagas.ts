import { all, call } from 'redux-saga/effects';
import { watchAuthActions } from './auth/Sagas';
import { watchHotelActions } from './hotel/Sagas';
import { watchRoomActions } from './room/Sagas';

export default function* rootSaga() {
  yield all([
    call(watchAuthActions),
    call(watchHotelActions),
    call(watchRoomActions),
  ]);
}
