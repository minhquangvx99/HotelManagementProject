import { $PropertyType } from 'utility-types';
import {
  AuthActionTypes,
  ChangePasswordModel,
  FETCH_MY_INFO,
  FORGOT_PASSWORD,
  LOGIN,
  LOGIN_ERR,
  LOGIN_SUCCESS,
  LOGOUT,
  LoginResponse,
  LoginState,
  CHANGE_PASSWORD,
  UpdateAccountInformationModel,
  UPDATE_ACCOUNT_INFORMATION,
} from './Types';

export const login = (payload: LoginState, callback: () => void): AuthActionTypes => {
  return {
    type: LOGIN,
    payload,
    callback,
  };
};

export const changePassword = (payload: ChangePasswordModel): AuthActionTypes => {
  return {
    type: CHANGE_PASSWORD,
    payload,
  };
};

export const updateAccountInformation = (payload: UpdateAccountInformationModel): AuthActionTypes => {
  return {
    type: UPDATE_ACCOUNT_INFORMATION,
    payload,
  };
};

export const loginSuccess = (payload: LoginResponse): AuthActionTypes => {
  return {
    type: LOGIN_SUCCESS,
    payload,
  };
};

export const loginErr = (payload: string): AuthActionTypes => {
  return {
    type: LOGIN_ERR,
    payload,
  };
};

export const logout = (callback: () => void): AuthActionTypes => {
  return {
    type: LOGOUT,
    callback,
  };
};

export const fetchMyInfo = (): AuthActionTypes => {
  return {
    type: FETCH_MY_INFO,
  };
};

export const forgotPassword = (payload: $PropertyType<LoginState, 'Username'>): AuthActionTypes => {
  return {
    type: FORGOT_PASSWORD,
    payload,
  };
};
