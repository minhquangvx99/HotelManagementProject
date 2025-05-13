import { put, takeEvery } from 'redux-saga/effects';
import {
  CHANGE_PASSWORD,
  ChangePasswordAction,
  ChangePasswordModel,
  LOGIN,
  LoginAction,
  LoginResponse,
  MyInfo,
  UPDATE_ACCOUNT_INFORMATION,
  UpdateAccountInformationAction,
  UpdateAccountInformationModel,
} from './Types';
import { ApiResponse, apiCall, apiPostCall, apiPostCallAuthen } from 'store/saga-effects/api';
import { API_CHANGE_PASSWORD, API_ENDPOINT_LOGIN, API_UPDATE_ACCOUNT_INFORMATION } from 'services/Endpoints';
import { loginErr, loginSuccess } from './Actions';
import { openNotification } from 'utility/Utility';

function* login(action: LoginAction) {
  try {
    const response: ApiResponse<any> = yield apiCall(apiPostCallAuthen, API_ENDPOINT_LOGIN, {
      Username: action.payload.Username,
      Password: action.payload.Password,
    });
    if (response.data.Success) {
      localStorage.setItem('access_token', response.data.Data.Token);
      localStorage.setItem('Username', response.data.Data.User.Username);
      localStorage.setItem('Password', response.data.Data.User.Password);
      localStorage.setItem('LoginResponse', JSON.stringify(response.data.Data));
      if (action.payload.isRemember) {
        localStorage.setItem('IsRemember', 'true');
      } else {
        localStorage.setItem('IsRemember', 'false');
      }
      yield put(loginSuccess(response.data.Data));
      action.callback();
    } else {
      yield put(loginErr(response.data.Message));
      openNotification('error', '', response.data.Message);
    }
  } catch (error) {
    openNotification('error', '', 'Login Error');
    yield put(loginErr('Login Error'));
  }
}

function* changePassword(action: ChangePasswordAction) {
  try {
    const response: ApiResponse<any> = yield apiCall(apiPostCall, API_CHANGE_PASSWORD, {
      Password: action.payload.Password,
      NewPassword: action.payload.NewPassword,
    });
    if (response.data.Success) {
      const loginResString = localStorage.getItem('LoginResponse');
      if (loginResString) {
        const loginResponse: LoginResponse = JSON.parse(loginResString);
        loginResponse.User.Password = action.payload.NewPassword;
        localStorage.setItem('LoginResponse', JSON.stringify(loginResponse));
        yield put(loginSuccess(loginResponse));
      }
      openNotification('success', 'Success', 'Saved successfully');
    } else {
      openNotification('error', '', response.data.Message);
    }
  } catch (error) {
    openNotification('error', '', 'Saved Error');
  }
}

function* updateAccountInformation(action: UpdateAccountInformationAction) {
  try {
    const response: ApiResponse<any> = yield apiCall(apiPostCall, API_UPDATE_ACCOUNT_INFORMATION, {
      Email: action.payload.Email,
      Name: action.payload.Name,
      Birthday: action.payload.Birthday,
      PhoneNumber: action.payload.PhoneNumber,
      Gender: action.payload.Gender,
      Address: action.payload.Address,
    });
    if (response.data.Success) {
      const loginResString = localStorage.getItem('LoginResponse');
      if (loginResString) {
        const loginResponse: LoginResponse = JSON.parse(loginResString);
        loginResponse.User.Email = action.payload.Email;
        loginResponse.User.Name = action.payload.Name;
        loginResponse.User.Birthday = action.payload.Birthday;
        loginResponse.User.PhoneNumber = action.payload.PhoneNumber;
        loginResponse.User.Gender = action.payload.Gender;
        loginResponse.User.Address = action.payload.Address;
        localStorage.setItem('LoginResponse', JSON.stringify(loginResponse));
        yield put(loginSuccess(loginResponse));
      }
      openNotification('success', 'Success', 'Saved successfully');
    } else {
      openNotification('error', '', response.data.Message);
    }
  } catch (error) {
    openNotification('error', '', 'Saved Error');
  }
}

export function* watchAuthActions() {
  yield takeEvery(LOGIN, login);
  yield takeEvery(CHANGE_PASSWORD, changePassword);
  yield takeEvery(UPDATE_ACCOUNT_INFORMATION, updateAccountInformation);
}
