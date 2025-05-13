import { $PropertyType } from 'utility-types';
import { TopicActionTypes, FETCH_LIST_TOPIC, Topic, FETCH_LIST_TOPIC_SUCCESS, FETCH_LIST_TOPIC_ERR, FETCH_DETAILS_TOPIC, FETCH_DETAILS_TOPIC_SUCCESS, FETCH_DETAILS_TOPIC_ERR } from './Types';

export const fetchListTopic = (): TopicActionTypes => {
  return {
    type: FETCH_LIST_TOPIC,
  };
};

export const fetchListTopicSuccess = (payload: Topic[]): TopicActionTypes => {
  return {
    type: FETCH_LIST_TOPIC_SUCCESS,
    payload,
  };
};

export const fetchListTopicErr = (payload: string): TopicActionTypes => {
  return {
    type: FETCH_LIST_TOPIC_ERR,
    payload,
  };
};

export const fetchDetailsTopic = (payload: $PropertyType<Topic, 'id'>): TopicActionTypes => {
  return {
    type: FETCH_DETAILS_TOPIC,
    payload,
  };
};

export const fetchDetailsTopicSuccess = (payload: Topic): TopicActionTypes => {
  return {
    type: FETCH_DETAILS_TOPIC_SUCCESS,
    payload,
  };
};

export const fetchDetailsTopicErr = (payload: string): TopicActionTypes => {
  return {
    type: FETCH_DETAILS_TOPIC_ERR,
    payload,
  };
};
