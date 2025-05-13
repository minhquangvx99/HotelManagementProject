import { Spin } from 'antd';
import { FC, Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const Question = lazy(() => import('container/question/Question'));
const AddQuestion = lazy(() => import('container/question/AddQuestion'));
const ErrorQuestion = lazy(() => import('container/question/ErrorQuestion'));
const AddCompositeQuestion = lazy(() => import('container/question/AddCompositeQuestion'));
const NotFound = lazy(() => import('container/pages/404'));

interface IQuestionRoute {}

const QuestionRoute: FC<IQuestionRoute> = () => {
  return (
    <Suspense
      fallback={
        <div className="spin">
          <Spin />
        </div>
      }
    >
      <Routes>
        <Route index element={<Question />} />
        <Route path="/addQuestion" element={<AddQuestion />} />
        <Route path="/errorQuestion" element={<ErrorQuestion />} />
        <Route path="/addCompositeQuestion" element={<AddCompositeQuestion />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default QuestionRoute;
