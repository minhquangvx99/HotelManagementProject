export interface RoomState {
    dataPaging?: RoomGetModel;
    dataAll?: RoomGetModel;
    roomForEdit?: RoomDetailGetModel | null;
    loading?: boolean;
    error?: string;
}

export interface RoomModel {
    ID?: number;
    Code?: string;
    Number?: string;
    Type?: string;
    Price?: number;
    Status?: number;
    HotelName?: string;
    CreatedDate?: string;
}

export interface RoomGetModel {
    ListRoom: RoomModel[];
    totalRow?: number;
}

export interface RoomDetailGetModel {
    ID?: number;
    Number?: string;
    HotelId?: number;
    Status?: number;
    Type?: string;
    Price?: number;
}

export interface RoomCreateModel {
    Number?: string;
    Status?: number;
    HotelId?: number;
    Type?: string;
    Price?: number;
}

export interface RoomUpdateModel {
    ID?: number;
    Number?: string;
    Status?: number;
    HotelId?: number;
    Type?: string;
    Price?: number;
}

export const FETCH_LIST_ROOM_PAGING = 'FETCH_LIST_ROOM_PAGING';
export const FETCH_LIST_ROOM_PAGING_SUCCESS = 'FETCH_LIST_ROOM_PAGING_SUCCESS';
export const FETCH_LIST_ROOM_PAGING_ERR = 'FETCH_LIST_ROOM_PAGING_PAGING_ERR';

export const FETCH_DETAILS_ROOM = 'FETCH_DETAILS_ROOM';
export const FETCH_DETAILS_ROOM_SUCCESS = 'FETCH_DETAILS_ROOM_SUCCESS';
export const FETCH_DETAILS_ROOM_ERR = 'FETCH_DETAILS_ROOM_ERR';

export const CREATE_ROOM = 'CREATE_ROOM';
export const CREATE_ROOM_SUCCESS = 'CREATE_ROOM_SUCCESS';
export const CREATE_ROOM_ERR = 'CREATE_ROOM_ERR';

export const UPDATE_ROOM = 'UPDATE_ROOM';
export const UPDATE_ROOM_SUCCESS = 'UPDATE_ROOM_SUCCESS';
export const UPDATE_ROOM_ERR = 'UPDATE_ROOM_ERR';

export const DELETE_ROOM = 'DELETE_ROOM';
export const DELETE_ROOM_SUCCESS = 'DELETE_ROOM_SUCCESS';
export const DELETE_ROOM_ERR = 'DELETE_ROOM_ERR';

export const PASS_ROOM_DETAILS = 'PASS_ROOM_DETAILS';

export interface FetchListRoomPagingAction {
    type: typeof FETCH_LIST_ROOM_PAGING;
    payload: {
        page: number;
        pageSize: number;
        hotelId: number;
        codeSearch: string;
        type: string;
        status: string;
    };
}

export interface FetchListRoomPagingSuccessAction {
    type: typeof FETCH_LIST_ROOM_PAGING_SUCCESS;
    payload: RoomGetModel;
}

export interface FetchListRoomPagingErrorAction {
    type: typeof FETCH_LIST_ROOM_PAGING_ERR;
    payload: string;
}

export interface FetchDetailsRoomAction {
    type: typeof FETCH_DETAILS_ROOM;
    payload: number;
}

export interface FetchDetailsRoomSuccessAction {
    type: typeof FETCH_DETAILS_ROOM_SUCCESS;
    payload: RoomDetailGetModel;
}

export interface FetchDetailsRoomErrorAction {
    type: typeof FETCH_DETAILS_ROOM_ERR;
    payload: string;
}

export interface CreateRoomAction {
    type: typeof CREATE_ROOM;
    payload: RoomCreateModel;
}

export interface CreateRoomSuccessAction {
    type: typeof CREATE_ROOM_SUCCESS;
}

export interface CreateRoomErrorAction {
    type: typeof CREATE_ROOM_ERR;
    payload: string;
}

export interface UpdateRoomAction {
    type: typeof UPDATE_ROOM;
    payload: RoomUpdateModel;
}

export interface UpdateRoomSuccessAction {
    type: typeof UPDATE_ROOM_SUCCESS;
}

export interface UpdateRoomErrorAction {
    type: typeof UPDATE_ROOM_ERR;
    payload: string;
}

export interface DeleteRoomAction {
    type: typeof DELETE_ROOM;
    payload: number;
}

export interface DeleteRoomSuccessAction {
    type: typeof DELETE_ROOM_SUCCESS;
}

export interface DeleteRoomErrorAction {
    type: typeof DELETE_ROOM_ERR;
    payload: string;
}

export interface PassRoomDetailsAction {
    type: typeof PASS_ROOM_DETAILS;
    payload: RoomDetailGetModel | null;
}

export type RoomActionTypes =
    | FetchListRoomPagingAction
    | FetchListRoomPagingSuccessAction
    | FetchListRoomPagingErrorAction
    | FetchDetailsRoomAction
    | FetchDetailsRoomSuccessAction
    | FetchDetailsRoomErrorAction
    | CreateRoomAction
    | CreateRoomSuccessAction
    | CreateRoomErrorAction
    | UpdateRoomAction
    | UpdateRoomSuccessAction
    | UpdateRoomErrorAction
    | DeleteRoomAction
    | DeleteRoomSuccessAction
    | DeleteRoomErrorAction
    | PassRoomDetailsAction;
