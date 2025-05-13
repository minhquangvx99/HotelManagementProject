import { WithLogoutAction } from 'types/Global';
import { CREATE_ROOM, CREATE_ROOM_ERR, CREATE_ROOM_SUCCESS, DELETE_ROOM, DELETE_ROOM_ERR, DELETE_ROOM_SUCCESS, FETCH_DETAILS_ROOM, FETCH_DETAILS_ROOM_ERR, FETCH_DETAILS_ROOM_SUCCESS, FETCH_LIST_ROOM_PAGING, FETCH_LIST_ROOM_PAGING_ERR, FETCH_LIST_ROOM_PAGING_SUCCESS, PASS_ROOM_DETAILS, RoomActionTypes, RoomState, UPDATE_ROOM, UPDATE_ROOM_ERR, UPDATE_ROOM_SUCCESS } from './Types';

const initialState: RoomState = {};

const roomReducer = (state = initialState, action: WithLogoutAction<RoomActionTypes>): RoomState => {
    switch (action.type) {
        case FETCH_LIST_ROOM_PAGING:
            return {
                ...state,
                loading: true,
            };
        case FETCH_LIST_ROOM_PAGING_SUCCESS:
            return {
                ...state,
                loading: false,
                dataPaging: action.payload,
            };
        case FETCH_LIST_ROOM_PAGING_ERR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case FETCH_DETAILS_ROOM:
            return {
                ...state,
                loading: true,
            };
        case FETCH_DETAILS_ROOM_SUCCESS:
            return {
                ...state,
                roomForEdit: action.payload,
                loading: false,
            };
        case FETCH_DETAILS_ROOM_ERR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case CREATE_ROOM:
            return {
                ...state,
                loading: true,
            };
        case CREATE_ROOM_SUCCESS:
            return {
                ...state,
                loading: false,
            };
        case CREATE_ROOM_ERR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case UPDATE_ROOM:
            return {
                ...state,
                loading: true,
            };
        case UPDATE_ROOM_SUCCESS:
            return {
                ...state,
                loading: false,
            };
        case UPDATE_ROOM_ERR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case DELETE_ROOM:
            return {
                ...state,
                loading: true,
            };
        case DELETE_ROOM_SUCCESS:
            return {
                ...state,
                loading: false,
            };
        case DELETE_ROOM_ERR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case PASS_ROOM_DETAILS:
            return {
                ...state,
                loading: false,
                roomForEdit: action.payload,
            };
        default:
            return state;
    }
};

export default roomReducer;