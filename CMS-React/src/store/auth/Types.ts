import { $PropertyType } from 'utility-types';

export interface AuthState {
  access_token?: string;
  shortName?: string;
  myInfo?: MyInfo;
  loading?: boolean;
  error?: string;
}

export interface LoginResponse {
  Token: string;
  ShortName: string;
  User: MyInfo;
}

export interface ChangePasswordModel {
  Password: string;
  NewPassword: string;
}

export interface UpdateAccountInformationModel {
  Email: string;
  Name: string;
  Birthday: string;
  PhoneNumber: string;
  Gender: number;
  Address: string;
}

export interface MyInfo {
  ID: number;
  RoleID: number;
  ClassID: number;
  Name: string;
  Status: number;
  Email: string;
  Username: string;
  Birthday: string;
  Title: string;
  Company: string;
  Address: string;
  PhoneNumber: string;
  Password: string;
  Gender: number;
  ActiveDate: string;
  ExpireDate: string;
  TuitionFee: number;
}

export interface LoginState {
  Username: string;
  Password: string;
  isRemember: boolean | null;
}

export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERR = 'LOGIN_ERR';
export const FORGOT_PASSWORD = 'FORGOT_PASSWORD';
export const LOGOUT = 'LOGOUT';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_ERR = 'LOGOUT_ERR';
export const FETCH_MY_INFO = 'FETCH_MY_INFO';
export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';
export const UPDATE_ACCOUNT_INFORMATION = 'UPDATE_ACCOUNT_INFORMATION';

export interface LoginAction {
  type: typeof LOGIN;
  payload: LoginState;
  callback(): void;
}

export interface ChangePasswordAction {
  type: typeof CHANGE_PASSWORD;
  payload: ChangePasswordModel;
}

export interface UpdateAccountInformationAction {
  type: typeof UPDATE_ACCOUNT_INFORMATION;
  payload: UpdateAccountInformationModel;
}

export interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  payload: LoginResponse;
}

export interface LoginErrorAction {
  type: typeof LOGIN_ERR;
  payload: string;
}

export interface ForgotPasswordAction {
  type: typeof FORGOT_PASSWORD;
  payload: $PropertyType<LoginState, 'Username'>;
}

export interface LogoutAction {
  type: typeof LOGOUT;
  callback(): void;
}

export interface FetchMyInfoAction {
  type: typeof FETCH_MY_INFO;
}

export type AuthActionTypes =
  | LoginAction
  | LoginSuccessAction
  | LoginErrorAction
  | LogoutAction
  | ForgotPasswordAction
  | FetchMyInfoAction
  | ChangePasswordAction
  | UpdateAccountInformationAction;
