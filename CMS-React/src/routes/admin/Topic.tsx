// import { Spin } from 'antd';
// import { FC, Suspense, lazy } from 'react';
// import { Route, Routes } from 'react-router-dom';

// const Topic = lazy(() => import('container/topic/Topic'));
// const AddTopic = lazy(() => import('container/topic/AddTopic'));
// const NotFound = lazy(() => import('container/pages/404'));

// interface ITopicRoute {}

// const TopicRoute: FC<ITopicRoute> = () => {
//   return (
//     <Suspense
//       fallback={
//         <div className="spin">
//           <Spin />
//         </div>
//       }
//     >
//       <Routes>
//         <Route index element={<Topic />} />
//         <Route path="/addTopic" element={<AddTopic />} />
//         <Route path="*" element={<NotFound />} />
//       </Routes>
//     </Suspense>
//   );
// };

// export default TopicRoute;
