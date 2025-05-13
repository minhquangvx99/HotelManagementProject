using System;
using System.Collections.Generic;
using Entities.Room;

namespace Services.Rooms
{
    public interface IRoom : IBaseService<RoomEntity, int>
    {
        IEnumerable<RoomEntity> GetRoomByHotelId(int hotelId);
        IEnumerable<RoomGetModel> GetRoomPaging(int hotelId, string codeSearch, string name, string status, int pageIndex, int pageSize, string searchKey, ref int totalRow);
        IEnumerable<RoomEntity> GetRoomByName(string name);
        RoomDetailModel GetRoomDetailByRoomId(int  topicSetID);
    }
}

