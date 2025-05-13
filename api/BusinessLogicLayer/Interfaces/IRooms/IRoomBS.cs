using System.Collections.Generic;
using Entities.Room;
using Services.Rooms;

namespace BusinessLogicLayer.Interfaces.IRooms
{
    public interface IRoomBS : IBaseBS<IRoom, RoomEntity, int>
    {
        IEnumerable<RoomEntity> GetRoomByHotelId(int hotelId);
        IEnumerable<RoomEntity> GetRoomByName(string name);
        IEnumerable<RoomGetModel> GetRoomPaging(int hotelId, string codeSearch, string name, string status, int pageIndex, int pageSize, string searchKey, ref int totalRow);
        RoomDetailModel GetRoomDetailByRoomId(int roomId);
    }
}

