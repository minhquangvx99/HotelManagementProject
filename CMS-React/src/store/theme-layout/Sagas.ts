import { put, takeEvery } from 'redux-saga/effects';
import {
  CHANGE_LAYOUT_MODE,
  CHANGE_MENU_MODE,
  CHANGE_RTL_MODE,
  ChangeLayoutAction,
  ChangeMenuModeAction,
  ChangeRtlModeAction,
} from 'store/theme-layout/Types';
import { changeLayoutModeSuccess, changeMenuModeSuccess, changeRtlModeSuccess } from './Actions';

function* changeLayoutMode(action: ChangeLayoutAction) {
  try { 
    yield put(changeLayoutModeSuccess(action.payload));
  } catch (error) {
    console.log(error);
  }
}

function* changeRtlMode(action: ChangeRtlModeAction) {
  try {
    yield put(changeRtlModeSuccess(action.payload));
  } catch (error) {
    console.log(error);
  }
}

function* changeMenuMode(action: ChangeMenuModeAction) {
  try {
    yield put(changeMenuModeSuccess(action.payload));
  } catch (error) {
    console.log(error);
  }
}

export function* watchLayoutActions() {
  yield takeEvery(CHANGE_LAYOUT_MODE, changeLayoutMode);
  yield takeEvery(CHANGE_RTL_MODE, changeRtlMode);
  yield takeEvery(CHANGE_MENU_MODE, changeMenuMode);
}
