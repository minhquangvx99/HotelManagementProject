import { Middleware } from '@reduxjs/toolkit';

const SessionStorageMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);
  window.addEventListener('beforeunload', () => {
    const state = store.getState();
    const stateToPersist = {
      student: {
        studentForEdit: state.student.studentForEdit,
      },
      topicSet: {
        topicSetForEdit: {
          TopicSetID: state.topicSet.topicSetForEdit?.TopicSetID,
        },
      },
      question: {
        questionForEdit: state.question.questionForEdit,
        compositeQuestionForEdit: state.question.compositeQuestionForEdit,
      },
    };
    sessionStorage.setItem('reduxState', JSON.stringify(stateToPersist));
  });
  return result;
};

export default SessionStorageMiddleware;
