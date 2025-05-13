using System.Collections.Generic;
using System.Linq;
using Entities.Hotel;

namespace Services.Hotels
{
	public class HotelServices : BaseService<HotelEntity, int>, IHotel
    {
		public HotelServices(string connection = "") : base(connection)
        {
            _connection = connection;
        }

        public HotelEntity GetHotelByRoomId(int roomId)
        {
            var parameters = new { RoomId = roomId };
            var sql = "SELECT h.*" +
                "\r\nFROM Hotel h" +
                "\r\nJOIN Room r ON h.ID = r.HotelId" +
                "\r\nWHERE r.ID = @RoomId;";
            return unitOfWork.Query<HotelEntity>(sql, parameters).FirstOrDefault();
        }

        public IEnumerable<HotelEntity> GetHotelPaging(int pageIndex, int pageSize, string searchKey, ref int totalRow)
        {
            var parameters = new { Offset = (pageIndex - 1) * pageSize, PageSize = pageSize, SearchKey = searchKey };
            var sqlCount = "SELECT h.* FROM Hotel h " +
                        "WHERE h.Name LIKE '%'+@SearchKey+'%' OR h.Address LIKE '%'+@SearchKey+'%' OR CAST(h.StarsNumber AS VARCHAR) + ' sao' LIKE '%'+@SearchKey+'%' OR h.PhoneNumber LIKE '%'+@SearchKey+'%' ";
            totalRow = unitOfWork.Query<HotelEntity>(sqlCount, parameters).ToList().Count();
            var sql = "SELECT h.* FROM Hotel h " +
                        "WHERE h.Name LIKE '%'+@SearchKey+'%' OR h.Address LIKE '%'+@SearchKey+'%' OR  CAST(h.StarsNumber AS VARCHAR) + ' sao' LIKE '%'+@SearchKey+'%' OR h.PhoneNumber LIKE '%'+@SearchKey+'%' " +
                        "ORDER BY h.ModifiedDate DESC OFFSET @Offset ROWS FETCH NEXT @PageSize ROWS ONLY;";
            return unitOfWork.Query<HotelEntity>(sql, parameters).ToList();
        }

        public HotelEntity GetHotelByName(string name)
        {
            var parameters = new { Name = name };
            var sql = "SELECT * FROM Hotel h WHERE LOWER(h.Name) = @Name";
            return unitOfWork.Query<HotelEntity>(sql, parameters).FirstOrDefault();
        }
    }
}

