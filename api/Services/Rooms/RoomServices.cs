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

        public IEnumerable<RoomEntity> GetRoomByHotelId(int typeOfRoomID)
        {
            var parameters = new { TypeOfRoomID = typeOfRoomID };
            var sql = "SELECT * FROM Rooms r WHERE r.HotelId = @TypeOfRoomID;";
            return unitOfWork.Query<RoomEntity>(sql, parameters).ToList();
        }
        public IEnumerable<RoomEntity> GetRoomByName(string name)
        {
            var parameters = new { Name = name };
            var sql = "SELECT * FROM Rooms r WHERE r.Name Like @Name;";
            return unitOfWork.Query<RoomEntity>(sql, parameters).ToList();
        }


        public RoomDetailModel GetRoomDetailByRoomId(int roomId)
        {
            var parameters = new { RoomID = roomId };
            var sql = "select r.ID as RoomID, r.Code as RoomCode," +
                "\r\nr.Status as Status, r.ExamTypeID as ExamTypeID," +
                "\r\nr.HotelId as TypeOfRoomID, " +
                 "\r\nr.Name as Name, " +
                "\r\nh.NumberOfQuestion as NumberOfQuestion from Rooms r " +
                "\r\nleft join Hotel h on r.HotelId = h.ID" +
                "\r\nwhere r.ID = @RoomID;";
            return unitOfWork.Query<RoomDetailModel>(sql, parameters).FirstOrDefault();
        }

        public IEnumerable<RoomGetModel> GetRoomPaging(int typeOfRoomsID, string codeSearch, string name, string status, int pageIndex, int pageSize, string searchKey, ref int totalRow)
        {
            var parameters = new
            {
                Offset = (pageIndex - 1) * pageSize,
                PageSize = pageSize,
                SearchKey = "%" + searchKey + "%",
                HotelId = typeOfRoomsID,
                CodeSearch = "%" + codeSearch + "%",
                Name = "%" + name + "%",
                Status = "%" + status + "%"
            };

            var sqlCount = @"
                        SELECT *
                        FROM (
                            SELECT 
                                r.ID as RoomID,
                                et.ExamType as ExamType,
                                et.ID as ExamCode,
                                tos.Name as TypeOfRoom,
                                r.Code as Code,
ISNULL(tos.NumberOfQuestion, 0) as NumberOfQuestion,
                                u.Name as Admin,
                                r.Status as Status,
                                r.ExamTypeID as ExamTypeID,
		                        r.HotelId as HotelId,
		                        r.Name as Name,
                                r.CreatedDate as CreatedDate,
                                CAST(et.ID AS VARCHAR) + '-B' + RIGHT('00000' + CAST(r.ID AS VARCHAR), 5) AS CodeSearch,
                                CASE 
                                    WHEN r.Status = 1 THEN 'active'
                                    WHEN r.Status = 0 THEN 'inactive'
                                    WHEN r.Status = 2 THEN 'blocked'
                                    ELSE ''
                                END AS StatusText
                            FROM Rooms r
                            LEFT JOIN ExamType et on r.ExamTypeID = et.ID
                            LEFT JOIN Hotel tos on r.HotelId = tos.ID
                            LEFT JOIN Users u on r.UserID = u.ID
                        ) AS subquery
                        WHERE   
                           
                            (@ExamTypeID = 0 OR ExamTypeID = @ExamTypeID) AND
                            (@HotelId = 0 OR HotelId = @HotelId) AND
                            (@CodeSearch = '%%' OR CodeSearch LIKE @CodeSearch) AND
                            (@Name = '%%' OR Name LIKE @Name) AND
                            (@Status = '%%' OR CAST(Status AS VARCHAR) LIKE @Status)


                    ";
            totalRow = unitOfWork.Query<RoomGetModel>(sqlCount, parameters).ToList().Count();

            var sql = @"
                        SELECT *
                        FROM (
                            SELECT 
                                r.ID as RoomID,
                                et.ExamType as ExamType,
                                et.ID as ExamCode,
                                tos.Name as TypeOfRoom,
                                r.Code as Code,
ISNULL(tos.NumberOfQuestion, 0) as NumberOfQuestion,
                                u.Name as Admin,
                                r.Status as Status,
                                r.ExamTypeID as ExamTypeID,
		                        r.HotelId as HotelId,
		                        r.Name as Name,
                                r.CreatedDate as CreatedDate,
                                CAST(et.ID AS VARCHAR) + '-B' + RIGHT('00000' + CAST(r.ID AS VARCHAR), 5) AS CodeSearch,
                                CASE 
                                    WHEN r.Status = 1 THEN 'active'
                                    WHEN r.Status = 0 THEN 'inactive'
                                    WHEN r.Status = 2 THEN 'blocked'
                                    ELSE ''
                                END AS StatusText
                            FROM Rooms r
                            LEFT JOIN ExamType et on r.ExamTypeID = et.ID
                            LEFT JOIN Hotel tos on r.HotelId = tos.ID
                            LEFT JOIN Users u on r.UserID = u.ID
                        ) AS subquery
                        WHERE 
                          
                            (@ExamTypeID = 0 OR ExamTypeID = @ExamTypeID) AND
                            (@HotelId = 0 OR HotelId = @HotelId) AND
                            (@CodeSearch = '%%' OR CodeSearch LIKE @CodeSearch) AND
                            (@Name = '%%' OR Name LIKE @Name) AND
                            (@Status = '%%' OR CAST(Status AS VARCHAR) LIKE @Status)

                        ORDER BY CreatedDate DESC
                        OFFSET @Offset ROWS FETCH NEXT @PageSize ROWS ONLY;";
            return unitOfWork.Query<RoomGetModel>(sql, parameters).ToList();
        }

    }
}

