import { WithLogoutAction } from "types/Global";
import { ADD_NOTIFICATION_MESSAGE, CREATE_NOTIFICATION_TOKEN, CREATE_NOTIFICATION_TOKEN_ERR, CREATE_NOTIFICATION_TOKEN_SUCCESS, FETCH_LIST_NOTIFICATION_MESSAGE_BY_USER_ID, FETCH_LIST_NOTIFICATION_MESSAGE_BY_USER_ID_ERR, FETCH_LIST_NOTIFICATION_MESSAGE_BY_USER_ID_SUCCESS, NotificationActionTypes, NotificationState, READ_ALL_NOTIFICATION_MESSAGE_BY_USER_ID, READ_ALL_NOTIFICATION_MESSAGE_BY_USER_ID_ERR, READ_ALL_NOTIFICATION_MESSAGE_BY_USER_ID_SUCCESS, READ_NOTIFICATION_MESSAGE_BY_ID, READ_NOTIFICATION_MESSAGE_BY_ID_ERR, READ_NOTIFICATION_MESSAGE_BY_ID_SUCCESS } from "./Types";


const initialState: NotificationState = {};

const notificationReducer = (state = initialState, action: WithLogoutAction<NotificationActionTypes>): NotificationState => {
    switch (action.type) {
      case CREATE_NOTIFICATION_TOKEN:
        return {
          ...state,
          loading: true,
        };
      case CREATE_NOTIFICATION_TOKEN_SUCCESS:
        return {
          ...state,
          loading: false,
        };
      case CREATE_NOTIFICATION_TOKEN_ERR:
        return {
          ...state,
          loading: false,
          error: action.payload
        };

      case FETCH_LIST_NOTIFICATION_MESSAGE_BY_USER_ID:
        return {
            ...state,
            loading: true,
        };
      case FETCH_LIST_NOTIFICATION_MESSAGE_BY_USER_ID_SUCCESS:
        return {
            ...state,
            loading: false,
            listNotificationMessageByUserID: action.payload
        };
      case FETCH_LIST_NOTIFICATION_MESSAGE_BY_USER_ID_ERR:
        return {
            ...state,
            loading: false,
            error: action.payload
        };

      case ADD_NOTIFICATION_MESSAGE:
        return {
            ...state,
            loading: false,
            listNotificationMessageByUserID: state.listNotificationMessageByUserID ? [ action.payload, ...state.listNotificationMessageByUserID] : [ action.payload ]
        };

      case READ_ALL_NOTIFICATION_MESSAGE_BY_USER_ID:
        return {
          ...state,
          loading: true,
        };
      case READ_ALL_NOTIFICATION_MESSAGE_BY_USER_ID_SUCCESS:
        return {
          ...state,
          loading: false,
        };
      case READ_ALL_NOTIFICATION_MESSAGE_BY_USER_ID_ERR:
        return {
          ...state,
          loading: false,
          error: action.payload
        };

      case READ_NOTIFICATION_MESSAGE_BY_ID:
        return {
          ...state,
          loading: true,
        };
      case READ_NOTIFICATION_MESSAGE_BY_ID_SUCCESS:
        return {
          ...state,
          loading: false,
        };
      case READ_NOTIFICATION_MESSAGE_BY_ID_ERR:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      default:
        return state;
    }
  };
  
  export default notificationReducer;