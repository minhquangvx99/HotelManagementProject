using System;
using System.Collections.Generic;
using Entities.Hotel;

namespace Services.Hotels
{
	public interface IHotel : IBaseService<HotelEntity, int>
    {
        IEnumerable<HotelEntity> GetHotelPaging(int pageIndex, int pageSize, string searchKey, ref int totalRow);
        HotelEntity GetHotelByName(string name);
        HotelEntity GetHotelByRoomId(int topicSetID);
    }
}

