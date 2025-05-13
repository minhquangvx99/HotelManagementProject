import { EndpointError } from './errors/Endpoints';

// authen
export const API_ENDPOINT_LOGIN = '/api/Home/loginCMS';
export const API_ENDPOINT_FORGOT_PASSWORD = '/api/forgot-password';
export const API_ENDPOINT_LOGOUT = '/api/logout';
export const API_ENDPOINT_MY_INFO = '/api/User/accountInformation';
export const API_CHANGE_PASSWORD = '/api/User/changePassword';
export const API_UPDATE_ACCOUNT_INFORMATION = '/api/User/updateMyInfomation';

// class
export const API_ENDPOINT_LIST_CLASS_PAGING = '/api/Class/getClassPaging';
export const API_ENDPOINT_LIST_CLASS_ALL = '/api/Class/getAll';
export const API_ENDPOINT_DETAILS_CLASS = '/api/Class/getClassByID/{classID}';
export const API_ENDPOINT_CREATE_CLASS = '/api/Class/createClass';
export const API_ENDPOINT_UPDATE_CLASS = '/api/Class/updateClass';
export const API_ENDPOINT_DELETE_CLASS = '/api/Class/delete';

// exam type
export const API_ENDPOINT_LIST_EXAM_TYPE_PAGING = '/api/ExamType/getExamTypePaging';
export const API_ENDPOINT_LIST_EXAM_TYPE_ALL = '/api/ExamType/getAllExamType';
export const API_ENDPOINT_LIST_EXAM_TYPE_DROP_LIST = '/api/ExamType/getDropListExamType';
export const API_ENDPOINT_DETAILS_EXAM_TYPE = '/api/ExamType/getExamTypeByID/{examTypeID}';
export const API_ENDPOINT_CREATE_EXAM_TYPE = '/api/ExamType/create';
export const API_ENDPOINT_UPDATE_EXAM_TYPE = '/api/ExamType/update';
export const API_ENDPOINT_DELETE_EXAM_TYPE = '/api/ExamType/delete';

// KA
export const API_ENDPOINT_LIST_KA_PAGING = '/api/KA/getKAPaging';
export const API_ENDPOINT_LIST_KA_ALL = '/api/KA/getAllKA';
export const API_ENDPOINT_DETAILS_KA = '/api/KA/getKAByID/{kaID}';
export const API_ENDPOINT_CREATE_KA = '/api/KA/create';
export const API_ENDPOINT_UPDATE_KA = '/api/KA/update';
export const API_ENDPOINT_DELETE_KA = '/api/KA/delete';

// task
export const API_ENDPOINT_LIST_TASK_PAGING = '/api/Task/getTaskPaging';
export const API_ENDPOINT_LIST_TASK_ALL = '/api/Task/getAllTask';
export const API_ENDPOINT_DETAILS_TASK = '/api/Task/getTaskByID/{taskID}';
export const API_ENDPOINT_CREATE_TASK = '/api/Task/create';
export const API_ENDPOINT_UPDATE_TASK = '/api/Task/update';
export const API_ENDPOINT_DELETE_TASK = '/api/Task/delete';

// topic set
export const API_ENDPOINT_LIST_TOPIC_SET_PAGING = '/api/TopicSet/getTopicSetFullPaging';
export const API_ENDPOINT_DETAILS_TOPIC_SET = '/api/TopicSet/getTopicSetDetail';
export const API_ENDPOINT_LIST_TOPIC_SET_BY_EXAMTYPEID = '/api/Question/getQuestionsInTopicSetByExamtypeID';
export const API_ENDPOINT_CREATE_TOPIC_SET = '/api/TopicSet/createTopicSet';
export const API_ENDPOINT_UPDATE_TOPIC_SET = '/api/TopicSet/updateTopicSet';
export const API_ENDPOINT_UPDATE_STATUS_OF_TOPIC_SET = '/api/TopicSet/updateStatusOfTopicSet';
export const API_ENDPOINT_DELETE_TOPIC_SET = '/api/TopicSet/delete';
export const API_ENDPOINT_LIST_REPORT_EXAM = '/api/TopicSet/getReportExamFullPaging';

// type of topic set
export const API_ENDPOINT_LIST_TYPE_OF_TOPIC_SET_PAGING = '/api/TypeOfTopicSet/getTypeOfTopicSetPaging';
export const API_ENDPOINT_LIST_TYPE_OF_TOPIC_SET_ALL = '/api/TypeOfTopicSet/getAllTypeOfTopicSet';
export const API_ENDPOINT_DETAILS_TYPE_OF_TOPIC_SET = '/api/TypeOfTopicSet/getTypeOfTopicSetByID/{typeOfTopicSetID}';
export const API_ENDPOINT_CREATE_TYPE_OF_TOPIC_SET = '/api/TypeOfTopicSet/create';
export const API_ENDPOINT_UPDATE_TYPE_OF_TOPIC_SET = '/api/TypeOfTopicSet/update';
export const API_ENDPOINT_DELETE_TYPE_OF_TOPIC_SET = '/api/TypeOfTopicSet/delete';

// batch
export const API_ENDPOINT_LIST_BATCH_ID = '/api/Batch/getAllBI';

// question
export const API_ENDPOINT_LIST_QUESTION = '/api/Question/getQuestionFullPaging';
export const API_ENDPOINT_ADD_QUESTION = '/api/Question/create';
export const API_ENDPOINT_UPDATE_QUESTION = '/api/Question/update';
export const API_ENDPOINT_DETAILS_QUESTION = '/api/Question/getQuestionFullByQuestionId';
export const API_ENDPOINT_DELETE_QUESTION = '/api/Question/delete';
export const API_ENDPOINT_DELETE_COMPOSITE_QUESTION = '/api/Question/deleteComposite';
export const API_ENDPOINT_DOWNLOAD_TEMPLATE_FILL_QUESTION = '/api/Question/download-template-fill-question';
export const API_ENDPOINT_CREATE_BATCH = '/api/Question/createBatch';
export const API_ENDPOINT_CREATE_COMPOSITE_QUESTION = '/api/Question/createCompositeQuestion';
export const API_ENDPOINT_FILTER_QUESTION = '/api/Question/filterQuestion';
export const API_ENDPOINT_UPDATE_COMPOSITE_QUESTION = '/api/Question/updateCompositeQuestion';

export const API_ENDPOINT_FETCH_COMPOSITE_QUESTION_DETAIL = '/api/Question/getListQuestionFullByCompositeQuestionId';

// topic
export const API_ENDPOINT_LIST_TOPIC = '/api/topic/list';
export const API_ENDPOINT_DETAILS_TOPIC = '/api/topic/details';


// student
export const API_ENDPOINT_LIST_STUDENT_PAGING = '/api/User/getStudentPaging';
export const API_ENDPOINT_DETAILS_STUDENT = '/api/User/getStudentByID/{UserID}';
export const API_ENDPOINT_CREATE_UPDATE_STUDENT = '/api/User/addOrUpdateStudentInfomation';
export const API_ENDPOINT_DELETE_STUDENT = '/api/User/deleteStudent';
export const API_ENDPOINT_UPDATE_STATUS_STUDENT = '/api/User/changeStatusStudent';
export const API_GET_EXAMTYPE_STUDENT = '/api/User/getExamTypeStudent';
export const API_ENDPOINT_CREATE_UPDATE_EXAMTYPESTUDENT = '/api/User/addOrUpdateExamTypeStudent';
export const API_ENDPOINT_DELETE_EXAMTYPESTUDENT = '/api/User/deleteExamTypeStudent';
export const API_ENDPOINT_RESET_PASSWORD = '/api/Mail/sendMailResetPass';
export const API_ENDPOINT_APPROVE = '/api/Mail/sendMailApprove';
export const API_ENDPOINT_MAIL_CREATE_ACCOUNT = '/api/Mail/sendMailCreateAccount';
export const API_ENDPOINT_REFUSE = '/api/Mail/sendMailRefuse';

//notification
export const API_ENDPOINT_CREATE_NOTIFICATION_TOKEN = '/api/NotificationToken/createOrUpdate';
export const API_ENDPOINT_FETCH_LIST_NOTIFICATION_MESSAGE_BY_USER_ID =
  '/api/NotificationMessage/getNotificationMessagesByUserID';

export const API_ENDPOINT_READ_ALL_NOTIFICATION_MESSAGE_BY_USER_ID =
  '/api/NotificationMessage/readAllNotificationByUserID';
export const API_ENDPOINT_READ_NOTIFICATION_MESSAGE_BY_ID = '/api/NotificationMessage/readNotificationByID';

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
