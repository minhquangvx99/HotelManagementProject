using System.Collections.Generic;
using System.Data;
using System.Linq;
using Dapper;
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
            var parameters = new DynamicParameters();
            parameters.Add("SearchKey", searchKey);
            parameters.Add("Offset", (pageIndex - 1) * pageSize);
            parameters.Add("PageSize", pageSize);

            using (var multi = unitOfWork.ProcedureQueryMulti("GetHotelPaging", parameters))
            {
                totalRow = multi.Read<int>().FirstOrDefault(); // Lấy totalRow từ dòng đầu tiên
                return multi.Read<HotelEntity>().ToList();     // Lấy danh sách hotel phân trang
            }
        }

        public HotelEntity GetHotelByName(string name)
        {
            var parameters = new { Name = name };
            var sql = "SELECT * FROM Hotel h WHERE LOWER(h.Name) = @Name";
            return unitOfWork.Query<HotelEntity>(sql, parameters).FirstOrDefault();
        }
    }
}

