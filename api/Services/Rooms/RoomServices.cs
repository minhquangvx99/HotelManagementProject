using System;
using System.Collections.Generic;
using System.Linq;
using Entities.Room;
using Entities.Hotel;
using Services.Hotels;
using System.Text.RegularExpressions;

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

        public IEnumerable<RoomGetModel> GetRoomPaging(int typeOfRoomsID, string codeSearch, string type, string status, int pageIndex, int pageSize, ref int totalRow)
        {
            var parameters = new
            {
                Offset = (pageIndex - 1) * pageSize,
                PageSize = pageSize,
                HotelId = typeOfRoomsID,
                CodeSearch = "%" + codeSearch + "%",
                Type = "%" + type + "%",
                Status = "%" + status + "%"
            };

            var sqlCount = @"
                        SELECT Count(*)
                        FROM (
                            SELECT 
                                r.ID as ID,
                                'KS' + CAST(h.ID AS VARCHAR) + '-' + r.Number as Code,
                                r.Number,
                                r.Type,
                                r.Price,
                                r.Status,
		                        h.Name as HotelName,
                                r.CreatedDate as CreatedDate,
                                r.HotelId
                            FROM Room r
                            LEFT JOIN Hotel h on r.HotelId = h.ID
                        ) AS subquery
                        WHERE   
                            (@HotelId = 0 OR HotelId = @HotelId) AND
                            (@CodeSearch = '%%' OR Code LIKE @CodeSearch) AND
                            (@Type = '%%' OR Type LIKE @Type) AND
                            (@Status = '%%' OR CAST(Status AS VARCHAR) LIKE @Status)";
            totalRow = unitOfWork.Query<int>(sqlCount, parameters).FirstOrDefault();

            var sql = @"
                        SELECT *
                        FROM (
                            SELECT 
                                r.ID as ID,
                                'KS' + CAST(h.ID AS VARCHAR) + '-' + r.Number as Code,
                                r.Number,
                                r.Type,
                                r.Price,
                                r.Status,
		                        h.Name as HotelName,
                                r.CreatedDate as CreatedDate,
                                r.HotelId
                            FROM Room r
                            LEFT JOIN Hotel h on r.HotelId = h.ID
                        ) AS subquery
                        WHERE   
                            (@HotelId = 0 OR HotelId = @HotelId) AND
                            (@CodeSearch = '%%' OR Code LIKE @CodeSearch) AND
                            (@Type = '%%' OR Type LIKE @Type) AND
                            (@Status = '%%' OR CAST(Status AS VARCHAR) LIKE @Status)
                        ORDER BY CreatedDate DESC
                        OFFSET @Offset ROWS FETCH NEXT @PageSize ROWS ONLY;";
            return unitOfWork.Query<RoomGetModel>(sql, parameters).ToList();
        }

    }
}

