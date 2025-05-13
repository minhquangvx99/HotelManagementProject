using System;
using System.Collections.Generic;
using System.Text;
using BusinessLogicLayer.Interfaces.IRooms;
using BusinessLogicLayer;
using Entities.Room;
using Services.Rooms;

namespace BusinessLogicLayer
{
    public class RoomBS : BaseBS<IRoom, RoomEntity, int>, IRoomBS
    {
        /// <summary></summary>
        /// <param name="_ctx"></param>
        public RoomBS(IRoom _ctx) : base(_ctx)
        {
        }

        public IEnumerable<RoomEntity> GetRoomByHotelId(int hotelId)
        {
            return _ctx.GetRoomByHotelId(hotelId);
        }
        public IEnumerable<RoomEntity> GetRoomByName(string name)
        {
            return _ctx.GetRoomByName(name);
        }

        public RoomDetailModel GetRoomDetailByRoomId(int roomId)
        {
            return _ctx.GetRoomDetailByRoomId(roomId);
        }

        public IEnumerable<RoomGetModel> GetRoomPaging(int hotelId, string codeSearch, string name, string status, int pageIndex, int pageSize, string searchKey, ref int totalRow)
        {
            return _ctx.GetRoomPaging(hotelId, codeSearch, name, status, pageIndex, pageSize, searchKey, ref totalRow);
        }

    }
}

