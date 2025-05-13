// import { NullableString } from 'types/Global';
// import { $PropertyType } from 'utility-types';

// export interface Topic {
//   id: number;
//   name?: NullableString;
//   code?: NullableString;
//   exam_type?: NullableString;
// }

// export interface TopicState {
//   data?: Topic[];
//   topicForEdit?: Topic;
//   loading?: boolean;
//   error?: string;
// }

// export const FETCH_LIST_TOPIC = 'FETCH_LIST_TOPIC';
// export const FETCH_LIST_TOPIC_SUCCESS = 'FETCH_LIST_TOPIC_SUCCESS';
// export const FETCH_LIST_TOPIC_ERR = 'FETCH_LIST_TOPIC_ERR';
// export const FETCH_DETAILS_TOPIC = 'FETCH_DETAILS_TOPIC';
// export const FETCH_DETAILS_TOPIC_SUCCESS = 'FETCH_DETAILS_TOPIC_SUCCESS';
// export const FETCH_DETAILS_TOPIC_ERR = 'FETCH_DETAILS_TOPIC_ERR';

// export interface FetchListTopicAction {
//   type: typeof FETCH_LIST_TOPIC;
// }

// export interface FetchListTopicSuccessAction {
//   type: typeof FETCH_LIST_TOPIC_SUCCESS;
//   payload: Topic[];
// }

// export interface FetchListTopicErrorAction {
//   type: typeof FETCH_LIST_TOPIC_ERR;
//   payload: string;
// }

// export interface FetchDetailsTopicAction {
//   type: typeof FETCH_DETAILS_TOPIC;
//   payload: $PropertyType<Topic, 'id'>;
// }

// export interface FetchDetailsTopicSuccessAction {
//   type: typeof FETCH_DETAILS_TOPIC_SUCCESS;
//   payload: Topic;
// }

// export interface FetchDetailsTopicErrorAction {
//   type: typeof FETCH_DETAILS_TOPIC_ERR;
//   payload: string;
// }

// export type TopicActionTypes =
//   | FetchListTopicAction
//   | FetchListTopicSuccessAction
//   | FetchListTopicErrorAction
//   | FetchDetailsTopicAction
//   | FetchDetailsTopicSuccessAction
//   | FetchDetailsTopicErrorAction;
