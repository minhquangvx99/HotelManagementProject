import { call } from 'redux-saga/effects';
import AxiosInstance, { AxiosInstanceTypeBlob } from 'store/SetupAxios';
import store from 'store/Store';

export interface ApiResponse<Data, Meta = {}> {
  data: Data;
  meta: Meta;
  getResponse: () => Response;
}

export function* apiCall<Fn extends (...args: any[]) => any>(fn: Fn, ...args: Parameters<Fn>) {
  const result: object = yield call(fn, ...args);
  return result;
}

export function* apiGetCall(endpoint: string) {
  const {
    auth: { access_token },
  } = store.getState();

  if (access_token) {
    const response: Response = yield AxiosInstance.get(endpoint);
    return response;
  }
  throw new Error("Couldn't call with empty accessToken.");
}

export function* apiGetCallBlob(endpoint: string) {
  const {
    auth: { access_token },
  } = store.getState();

  if (access_token) {
    const response: Response = yield AxiosInstanceTypeBlob.get(endpoint);
    return response;
  }
  throw new Error("Couldn't call with empty accessToken.");
}

export function* apiPostCall(endpoint: string, body: object) {
  const {
    auth: { access_token },
  } = store.getState();

  if (access_token) {
    const response: Response = yield AxiosInstance.post(endpoint, body);
    return response;
  }
  throw new Error("Couldn't call with empty accessToken.");
}

export function* apiPostCallAuthen(endpoint: string, body: object) {
  const response: Response = yield AxiosInstance.post(endpoint, body);
  return response;
}

export function* apiPutCall(endpoint: string, body: object) {
  const {
    auth: { access_token },
  } = store.getState();

  if (access_token) {
    const response: Response = yield AxiosInstance.put(endpoint, body);
    return response;
  }
  throw new Error("Couldn't call with empty accessToken.");
}

export function* apiDeleteCall(endpoint: string, body: object) {
  const {
    auth: { access_token },
  } = store.getState();

  if (access_token) {
    const response: Response = yield AxiosInstance.delete(endpoint, body);
    return response;
  }
  throw new Error("Couldn't call with empty accessToken.");
}
