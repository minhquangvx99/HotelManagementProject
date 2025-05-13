
export interface NotificationState {
    listNotificationMessageByUserID?: NotificationMessageModel[];
    loading?: boolean;
    error?: string;
}

export interface NotificationTokenModel {
    ID?: number;
    UserID?: number;
    NotificationToken?: string;
}

export interface NotificationMessageModel {
    ID?: number;
    UserID?: number;
    NotificationMessage?: string;
    Status?: number;
    CreatedDate?: Date; 
    Link?: string;
    userIDToNotify?: number;
}
export interface ReadNotificationMessageByIDModel {
  notiID: number;
  userID: number;
}

export const CREATE_NOTIFICATION_TOKEN = 'CREATE_NOTIFICATION_TOKEN';
export const CREATE_NOTIFICATION_TOKEN_SUCCESS = 'CREATE_NOTIFICATION_TOKEN_SUCCESS';
export const CREATE_NOTIFICATION_TOKEN_ERR = 'CREATE_NOTIFICATION_TOKEN_ERR';

export const FETCH_LIST_NOTIFICATION_MESSAGE_BY_USER_ID = 'FETCH_LIST_NOTIFICATION_MESSAGE_BY_USER_ID';
export const FETCH_LIST_NOTIFICATION_MESSAGE_BY_USER_ID_SUCCESS = 'FETCH_LIST_NOTIFICATION_MESSAGE_BY_USER_ID_SUCCESS';
export const FETCH_LIST_NOTIFICATION_MESSAGE_BY_USER_ID_ERR = 'FETCH_LIST_NOTIFICATION_MESSAGE_BY_USER_ID_ERR';

export const ADD_NOTIFICATION_MESSAGE = 'ADD_NOTIFICATION_MESSAGE';

export const READ_ALL_NOTIFICATION_MESSAGE_BY_USER_ID = 'READ_ALL_NOTIFICATION_MESSAGE_BY_USER_ID'
export const READ_ALL_NOTIFICATION_MESSAGE_BY_USER_ID_SUCCESS = 'READ_ALL_NOTIFICATION_MESSAGE_BY_USER_ID_SUCCESS'
export const READ_ALL_NOTIFICATION_MESSAGE_BY_USER_ID_ERR = 'READ_ALL_NOTIFICATION_MESSAGE_BY_USER_ID_ERR'

export const READ_NOTIFICATION_MESSAGE_BY_ID = 'READ_NOTIFICATION_MESSAGE_BY_ID'
export const READ_NOTIFICATION_MESSAGE_BY_ID_SUCCESS = 'READ_NOTIFICATION_MESSAGE_BY_ID_SUCCESS'
export const READ_NOTIFICATION_MESSAGE_BY_ID_ERR = 'READ_NOTIFICATION_MESSAGE_BY_ID_ERR'


export interface CreateNotificationTokenAction {
    type: typeof CREATE_NOTIFICATION_TOKEN;
    payload: NotificationTokenModel;
  }
  
  export interface CreateNotificationTokenSuccessAction {
    type: typeof CREATE_NOTIFICATION_TOKEN_SUCCESS;
  }
  
  export interface CreateNotificationTokenERRAction {
    type: typeof CREATE_NOTIFICATION_TOKEN_ERR;
    payload: string;
  }

  export interface FetchListNotificationMessageByUserIDAction {
    type: typeof FETCH_LIST_NOTIFICATION_MESSAGE_BY_USER_ID;
    payload: number;
  }
  
  export interface FetchListNotificationMessageByUserIDSuccessAction {
    type: typeof FETCH_LIST_NOTIFICATION_MESSAGE_BY_USER_ID_SUCCESS;
    payload: NotificationMessageModel[];
  }
  
  export interface FetchListNotificationMessageByUserIDErrorAction {
    type: typeof FETCH_LIST_NOTIFICATION_MESSAGE_BY_USER_ID_ERR;
    payload: string;
  }

  export interface AddNotificationMessageAction {
    type: typeof ADD_NOTIFICATION_MESSAGE;
    payload: NotificationMessageModel;
  }

  export interface ReadAllNotificationMessageByUserIDAction {
    type: typeof READ_ALL_NOTIFICATION_MESSAGE_BY_USER_ID;
    payload: number;
  }
  
  export interface ReadAllNotificationMessageByUserIDSuccessAction {
    type: typeof READ_ALL_NOTIFICATION_MESSAGE_BY_USER_ID_SUCCESS;
  }
  
  export interface ReadAllNotificationMessageByUserIDERRAction {
    type: typeof READ_ALL_NOTIFICATION_MESSAGE_BY_USER_ID_ERR;
    payload: string;
  }

  export interface ReadNotificationMessageByIDAction {
    type: typeof READ_NOTIFICATION_MESSAGE_BY_ID;
    payload: ReadNotificationMessageByIDModel;
  }
  
  export interface ReadNotificationMessageByIDSuccessAction {
    type: typeof READ_NOTIFICATION_MESSAGE_BY_ID_SUCCESS;
  }
  
  export interface ReadNotificationMessageByIDERRAction {
    type: typeof READ_NOTIFICATION_MESSAGE_BY_ID_ERR;
    payload: string;
  }

export type NotificationActionTypes =
| CreateNotificationTokenAction
| CreateNotificationTokenSuccessAction
| CreateNotificationTokenERRAction
| FetchListNotificationMessageByUserIDAction
| FetchListNotificationMessageByUserIDSuccessAction
| FetchListNotificationMessageByUserIDErrorAction
| AddNotificationMessageAction
| ReadAllNotificationMessageByUserIDAction
| ReadAllNotificationMessageByUserIDSuccessAction
| ReadAllNotificationMessageByUserIDERRAction
| ReadNotificationMessageByIDAction
| ReadNotificationMessageByIDSuccessAction
| ReadNotificationMessageByIDERRAction