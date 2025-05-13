import { EndpointError } from './errors/Endpoints';

// authen
export const API_ENDPOINT_LOGIN = '/api/Home/login';
export const API_ENDPOINT_FORGOT_PASSWORD = '/api/forgot-password';
export const API_ENDPOINT_LOGOUT = '/api/logout';
export const API_ENDPOINT_MY_INFO = '/api/User/accountInformation';
export const API_CHANGE_PASSWORD = '/api/User/changePassword';
export const API_UPDATE_ACCOUNT_INFORMATION = '/api/User/updateMyInfomation';

// room
export const API_ENDPOINT_LIST_ROOM_PAGING = '/api/Room/getRoomFullPaging';
export const API_ENDPOINT_DETAILS_ROOM = '/api/Room/getRoomDetail';
export const API_ENDPOINT_CREATE_ROOM = '/api/Room/createRoom';
export const API_ENDPOINT_UPDATE_ROOM = '/api/Room/updateRoom';
export const API_ENDPOINT_UPDATE_STATUS_OF_ROOM = '/api/Room/updateStatusOfRoom';
export const API_ENDPOINT_DELETE_ROOM = '/api/Room/delete';

// hotel
export const API_ENDPOINT_LIST_HOTEL_PAGING = '/api/Hotel/getHotelPaging';
export const API_ENDPOINT_LIST_HOTEL_ALL = '/api/Hotel/getAllHotel';
export const API_ENDPOINT_DETAILS_HOTEL = '/api/Hotel/getHotelById/{HotelId}';
export const API_ENDPOINT_CREATE_HOTEL = '/api/Hotel/create';
export const API_ENDPOINT_UPDATE_HOTEL = '/api/Hotel/update';
export const API_ENDPOINT_DELETE_HOTEL = '/api/Hotel/delete';


export const prepare = (
  endpoint: string,
  params: { [key: string]: string | number } = {},
  query: { [key: string]: string | number | boolean | string[] | undefined | null } = {},
) => {
  let preparedEndpoint = endpoint;
  Object.keys(params).forEach((param) => {
    const paramPlaceholder = `{${param}}`;
    if (preparedEndpoint.includes(paramPlaceholder)) {
      let paramValue = params[param];
      if (typeof paramValue === 'number') {
        paramValue = paramValue.toString();
      }
      preparedEndpoint = preparedEndpoint.replace(paramPlaceholder, paramValue);
    } else {
      throw new EndpointError('Invalid parameter.');
    }
  });
  let preparedQueryString = '?';
  const queryKeys = Object.keys(query);
  queryKeys.forEach((queryKey, index) => {
    if (index !== 0) {
      preparedQueryString += '&';
    }
    const queryValue = query[queryKey];
    if (Array.isArray(queryValue)) {
      queryValue.forEach((queryValueItem, itemIndex) => {
        if (itemIndex !== 0) {
          preparedQueryString += '&';
        }
        preparedQueryString += `${queryKey}[]=${queryValueItem}`;
      });
    } else {
      if (queryValue !== undefined && queryValue !== null) {
        preparedQueryString += `${queryKey}=${queryValue}`;
      }
    }
  });
  return encodeURI(preparedEndpoint + (queryKeys.length === 0 ? '' : preparedQueryString));
};
