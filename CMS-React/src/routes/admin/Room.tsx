import { Spin } from 'antd';
import { FC, Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const Room = lazy(() => import('container/room/Room'));
// const AddRoom = lazy(() => import('container/room/AddRoom'));
const NotFound = lazy(() => import('container/pages/404'));

interface IRoomRoute {}

const RoomRoute: FC<IRoomRoute> = () => {
  return (
    <Suspense
      fallback={
        <div className="spin">
          <Spin />
        </div>
      }
    >
      <Routes>
        <Route index element={<Room />} />
        {/* <Route path="/addRoom" element={<AddRoom />} /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default RoomRoute;
