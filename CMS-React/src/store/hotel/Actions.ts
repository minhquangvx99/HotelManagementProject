import { $PropertyType } from 'utility-types';
import {
  HotelModel,
  HotelActionTypes,
  FETCH_DETAILS_HOTEL,
  FETCH_DETAILS_HOTEL_ERR,
  FETCH_DETAILS_HOTEL_SUCCESS,
  FETCH_LIST_HOTEL_PAGING,
  FETCH_LIST_HOTEL_PAGING_ERR,
  FETCH_LIST_HOTEL_PAGING_SUCCESS,
  SAVE_HOTEL,
  SAVE_HOTEL_ERR,
  DELETE_HOTEL,
  DELETE_HOTEL_ERR,
  UPDATE_HOTEL_FOR_EDIT,
  FETCH_LIST_HOTEL_ALL,
  FETCH_LIST_HOTEL_ALL_ERR,
  FETCH_LIST_HOTEL_ALL_SUCCESS,
  DataHotelPaging,
  SAVE_HOTEL_SUCCESS,
  DELETE_HOTEL_SUCCESS,
} from './Types';

export const fetchListHotelPaging = (page: number, pageSize: number, searchKey: string): HotelActionTypes => {
  return {
    type: FETCH_LIST_HOTEL_PAGING,
    payload: { page, pageSize, searchKey },
  };
};

export const fetchListHotelPagingSuccess = (payload: DataHotelPaging): HotelActionTypes => {
  return {
    type: FETCH_LIST_HOTEL_PAGING_SUCCESS,
    payload,
  };
};

export const fetchListHotelPagingErr = (payload: string): HotelActionTypes => {
  return {
    type: FETCH_LIST_HOTEL_PAGING_ERR,
    payload,
  };
};

export const fetchListHotelAll = (): HotelActionTypes => {
  return {
    type: FETCH_LIST_HOTEL_ALL,
  };
};

export const fetchListHotelAllSuccess = (payload: HotelModel[]): HotelActionTypes => {
  return {
    type: FETCH_LIST_HOTEL_ALL_SUCCESS,
    payload,
  };
};

export const fetchListHotelAllErr = (payload: string): HotelActionTypes => {
  return {
    type: FETCH_LIST_HOTEL_ALL_ERR,
    payload,
  };
};

export const fetchDetailsHotel = (payload: $PropertyType<HotelModel, 'ID'>): HotelActionTypes => {
  return {
    type: FETCH_DETAILS_HOTEL,
    payload,
  };
};

export const fetchDetailsHotelSuccess = (payload: HotelModel): HotelActionTypes => {
  return {
    type: FETCH_DETAILS_HOTEL_SUCCESS,
    payload,
  };
};

export const fetchDetailsHotelErr = (payload: string): HotelActionTypes => {
  return {
    type: FETCH_DETAILS_HOTEL_ERR,
    payload,
  };
};

export const saveHotel = (payload: HotelModel, page: number): HotelActionTypes => {
  return {
    type: SAVE_HOTEL,
    payload,
    page
  };
};

export const saveHotelSuccess = (): HotelActionTypes => {
  return {
    type: SAVE_HOTEL_SUCCESS,
  };
};

export const saveHotelErr = (payload: string): HotelActionTypes => {
  return {
    type: SAVE_HOTEL_ERR,
    payload,
  };
};

export const deleteHotel = (payload: number, page: number): HotelActionTypes => {
  return {
    type: DELETE_HOTEL,
    payload,
    page
  };
};

export const deleteHotelSuccess = (): HotelActionTypes => {
  return {
    type: DELETE_HOTEL_SUCCESS,
  };
};

export const deleteHotelErr = (payload: string): HotelActionTypes => {
  return {
    type: DELETE_HOTEL_ERR,
    payload,
  };
};

export const updateHotelForEdit = (payload: HotelModel, callback: void): HotelActionTypes => {
  return {
    type: UPDATE_HOTEL_FOR_EDIT,
    payload,
    callback
  };
};
