import {
  CREATE_ROOM,
  CREATE_ROOM_ERR,
  CREATE_ROOM_SUCCESS,
  DELETE_ROOM,
  DELETE_ROOM_ERR,
  DELETE_ROOM_SUCCESS,
  FETCH_DETAILS_ROOM,
  FETCH_DETAILS_ROOM_ERR,
  FETCH_DETAILS_ROOM_SUCCESS,
  FETCH_LIST_ROOM_PAGING,
  FETCH_LIST_ROOM_PAGING_ERR,
  FETCH_LIST_ROOM_PAGING_SUCCESS,
  PASS_ROOM_DETAILS,
  RoomActionTypes,
  RoomCreateModel,
  RoomDetailGetModel,
  RoomGetModel,
  RoomUpdateModel,
  UPDATE_ROOM,
  UPDATE_ROOM_ERR,
  UPDATE_ROOM_SUCCESS,
} from './Types';

export const fetchListRoomPaging = (
  page: number,
  pageSize: number,
  hotelId: number,
  codeSearch: string,
  type: string,
  status: string,
): RoomActionTypes => {
  return {
    type: FETCH_LIST_ROOM_PAGING,
    payload: { page, pageSize, hotelId, codeSearch, type, status },
  };
};

export const fetchListRoomPagingSuccess = (payload: RoomGetModel): RoomActionTypes => {
  return {
    type: FETCH_LIST_ROOM_PAGING_SUCCESS,
    payload,
  };
};

export const fetchListRoomPagingErr = (payload: string): RoomActionTypes => {
  return {
    type: FETCH_LIST_ROOM_PAGING_ERR,
    payload,
  };
};

export const fetchDetailsRoom = (roomID: number): RoomActionTypes => {
  return {
    type: FETCH_DETAILS_ROOM,
    payload: roomID,
  };
};

export const fetchDetailsRoomSuccess = (payload: RoomDetailGetModel): RoomActionTypes => {
  return {
    type: FETCH_DETAILS_ROOM_SUCCESS,
    payload,
  };
};

export const fetchDetailsRoomErr = (payload: string): RoomActionTypes => {
  return {
    type: FETCH_DETAILS_ROOM_ERR,
    payload,
  };
};

export const createRoom = (payload: RoomCreateModel): RoomActionTypes => {
  return {
    type: CREATE_ROOM,
    payload,
  };
};

export const createRoomSuccess = (): RoomActionTypes => {
  return {
    type: CREATE_ROOM_SUCCESS,
  };
};

export const createRoomErr = (payload: string): RoomActionTypes => {
  return {
    type: CREATE_ROOM_ERR,
    payload,
  };
};

export const updateRoom = (payload: RoomUpdateModel): RoomActionTypes => {
  return {
    type: UPDATE_ROOM,
    payload,
  };
};

export const updateRoomSuccess = (): RoomActionTypes => {
  return {
    type: UPDATE_ROOM_SUCCESS,
  };
};

export const updateRoomErr = (payload: string): RoomActionTypes => {
  return {
    type: UPDATE_ROOM_ERR,
    payload,
  };
};

export const deleteRoom = (roomID: number): RoomActionTypes => {
  return {
    type: DELETE_ROOM,
    payload: roomID,
  };
};

export const deleteRoomSuccess = (): RoomActionTypes => {
  return {
    type: DELETE_ROOM_SUCCESS,
  };
};

export const deleteRoomSetErr = (payload: string): RoomActionTypes => {
  return {
    type: DELETE_ROOM_ERR,
    payload,
  };
};

export const passRoomDetails = (payload: RoomDetailGetModel | null): RoomActionTypes => {
  return {
    type: PASS_ROOM_DETAILS,
    payload,
  };
};
