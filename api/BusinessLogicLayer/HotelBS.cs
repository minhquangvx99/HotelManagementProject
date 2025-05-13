using System;
using System.Collections.Generic;
using System.Text;
using BusinessLogicLayer.Interfaces.IHotels;
using Entities.Hotel;
using Services.Hotels;

namespace BusinessLogicLayer
{
    public class HotelBS : BaseBS<IHotel, HotelEntity, int>, IHotelBS
    {
        /// <summary></summary>
        /// <param name="_ctx"></param>
        public HotelBS(IHotel _ctx) : base(_ctx)
        {
        }

        public HotelEntity GetHotelByRoomId(int roomId)
        {
            return _ctx.GetHotelByRoomId(roomId);
        }

        public IEnumerable<HotelEntity> GetHotelPaging(int pageIndex, int pageSize, string searchKey, ref int totalRow)
        {
            return _ctx.GetHotelPaging(pageIndex, pageSize, searchKey, ref totalRow);
        }

        public HotelEntity GetHotelByName(string name)
        {
            return _ctx.GetHotelByName(name);
        }
    }
}

