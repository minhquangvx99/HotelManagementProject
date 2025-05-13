import { ADD_NOTIFICATION_MESSAGE, CREATE_NOTIFICATION_TOKEN, CREATE_NOTIFICATION_TOKEN_ERR, CREATE_NOTIFICATION_TOKEN_SUCCESS, FETCH_LIST_NOTIFICATION_MESSAGE_BY_USER_ID, FETCH_LIST_NOTIFICATION_MESSAGE_BY_USER_ID_ERR, FETCH_LIST_NOTIFICATION_MESSAGE_BY_USER_ID_SUCCESS, NotificationActionTypes, NotificationMessageModel, NotificationTokenModel, READ_ALL_NOTIFICATION_MESSAGE_BY_USER_ID, READ_ALL_NOTIFICATION_MESSAGE_BY_USER_ID_ERR, READ_ALL_NOTIFICATION_MESSAGE_BY_USER_ID_SUCCESS, READ_NOTIFICATION_MESSAGE_BY_ID, READ_NOTIFICATION_MESSAGE_BY_ID_ERR, READ_NOTIFICATION_MESSAGE_BY_ID_SUCCESS, ReadNotificationMessageByIDModel } from "./Types";


export const createNotificationToken = (payload: NotificationTokenModel): NotificationActionTypes => {
    return {
      type: CREATE_NOTIFICATION_TOKEN,
      payload,
    };
  };
  
  export const createNotificationTokenSuccess = (): NotificationActionTypes => {
    return {
      type: CREATE_NOTIFICATION_TOKEN_SUCCESS,
    };
  };
  
  export const createNotificationTokenError = (error: string): NotificationActionTypes => {
    return {
      type: CREATE_NOTIFICATION_TOKEN_ERR,
      payload: error
    };
  };


export const fetchListNotificationMessageByUserID = (payload: number): NotificationActionTypes => {
    return {
      type: FETCH_LIST_NOTIFICATION_MESSAGE_BY_USER_ID,
      payload,
    };
  };
  
  export const fetchListNotificationMessageByUserIDSuccess = (payload: NotificationMessageModel[]): NotificationActionTypes => {
    return {
      type: FETCH_LIST_NOTIFICATION_MESSAGE_BY_USER_ID_SUCCESS,
      payload
    };
  };
  
  export const fetchListNotificationMessageByUserIDError = (error: string): NotificationActionTypes => {
    return {
      type: FETCH_LIST_NOTIFICATION_MESSAGE_BY_USER_ID_ERR,
      payload: error
    };
  };

  export const addNotificationMessage = (payload: NotificationMessageModel): NotificationActionTypes => {
    return {
      type: ADD_NOTIFICATION_MESSAGE,
      payload: payload
    };
  };

  export const readAllNotificationMessageByUserID = (payload: number): NotificationActionTypes => {
    return {
      type: READ_ALL_NOTIFICATION_MESSAGE_BY_USER_ID,
      payload,
    };
  };
  
  export const readAllNotificationMessageByUserIDSuccess = (): NotificationActionTypes => {
    return {
      type: READ_ALL_NOTIFICATION_MESSAGE_BY_USER_ID_SUCCESS,
    };
  };
  
  export const readAllNotificationMessageByUserIDError = (error: string): NotificationActionTypes => {
    return {
      type: READ_ALL_NOTIFICATION_MESSAGE_BY_USER_ID_ERR,
      payload: error
    };
  };
  
  export const readNotificationMessageByID = (payload: ReadNotificationMessageByIDModel): NotificationActionTypes => {
    return {
      type: READ_NOTIFICATION_MESSAGE_BY_ID,
      payload,
    };
  };
  
  export const readNotificationMessageByIDSuccess = (): NotificationActionTypes => {
    return {
      type: READ_NOTIFICATION_MESSAGE_BY_ID_SUCCESS,
    };
  };
  
  export const readNotificationMessageByIDError = (error: string): NotificationActionTypes => {
    return {
      type: READ_NOTIFICATION_MESSAGE_BY_ID_ERR,
      payload: error
    };
  };