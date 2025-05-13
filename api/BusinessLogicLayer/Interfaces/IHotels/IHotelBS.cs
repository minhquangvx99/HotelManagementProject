using System;
using System.Collections.Generic;
using Entities.Hotel;
using Services.Hotels;

namespace BusinessLogicLayer.Interfaces.IHotels
{
	public interface IHotelBS : IBaseBS<IHotel, HotelEntity, int>
    {
        IEnumerable<HotelEntity> GetHotelPaging(int pageIndex, int pageSize, string searchKey, ref int totalRow);
        HotelEntity GetHotelByName(string name);
        HotelEntity GetHotelByRoomId(int roomId);
    }
}

