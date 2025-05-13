using System;
using System.Collections.Generic;
using System.Linq;
using Entities.Room;
using Entities.Hotel;
using Services.Hotels;
using System.Text.RegularExpressions;
using Dapper;
using System.Data;

namespace Services.Rooms
{
    public class RoomServices : BaseService<RoomEntity, int>, IRoom
    {
        public RoomServices(string connection = "") : base(connection)
        {
            _connection = connection;
        }

        public IEnumerable<RoomEntity> GetRoomByHotelId(int hotelId)
        {
            var parameters = new { HotelId = hotelId };
            var sql = "SELECT * FROM Room r WHERE r.HotelId = @HotelId;";
            return unitOfWork.Query<RoomEntity>(sql, parameters).ToList();
        }

        public IEnumerable<RoomEntity> GetRoomByName(string name)
        {
            var parameters = new { Name = name };
            var sql = "SELECT * FROM Room r WHERE r.Number Like @Name;";
            return unitOfWork.Query<RoomEntity>(sql, parameters).ToList();
        }


        public RoomDetailModel GetRoomDetailByRoomId(int roomId)
        {
            var parameters = new { RoomId = roomId };
            var sql = "select r.ID, r.Number," +
                "\r\nr.Status," +
                "\r\nr.HotelId as HotelId, " +
                 "\r\nr.Type, " +
                "\r\nr.Price from Room r " +
                "\r\nleft join Hotel h on r.HotelId = h.ID" +
                "\r\nwhere r.ID = @RoomId;";
            return unitOfWork.Query<RoomDetailModel>(sql, parameters).FirstOrDefault();
        }

        public IEnumerable<RoomGetModel> GetRoomPaging(
           int typeOfRoomsID, string codeSearch, string type, string status,
           int pageIndex, int pageSize, ref int totalRow)
        {
            var parameters = new DynamicParameters();
            parameters.Add("HotelId", typeOfRoomsID);
            parameters.Add("CodeSearch", $"%{codeSearch}%");
            parameters.Add("Type", $"%{type}%");
            parameters.Add("Status", $"%{status}%");
            parameters.Add("Offset", (pageIndex - 1) * pageSize);
            parameters.Add("PageSize", pageSize);

            using (var multi = unitOfWork.ProcedureQueryMulti("GetRoomPaging", parameters))
            {
                totalRow = multi.Read<int>().FirstOrDefault();
                return multi.Read<RoomGetModel>().ToList();
            }
        }

    }
}

