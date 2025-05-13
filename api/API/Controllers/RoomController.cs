using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using BusinessLogicLayer.Interfaces.IRooms;
using System.Threading.Tasks;
using System;
using System.Linq;
using Entities.Room;
using API.Models.Room;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoomController : BaseController
    {
        private readonly IRoomBS _roomBS;

        public RoomController(IRoomBS roomBS)
        {
            _roomBS = roomBS;
        }

        [AllowAnonymous]
        [Route("getRoomFullPaging")]
        [HttpGet]
        public async Task<IActionResult> GetRoomPaging(int hotelId , string codeSearch = "", string type = "", string status ="", int pageIndex = 1, int pageSize = 1)
        {
            int totalRow = 0;
            try
            {
                var ListRoom = _roomBS.GetRoomPaging(hotelId, codeSearch, type, status, pageIndex, pageSize, ref totalRow).ToList();
                return ReturnSuccess(new { ListRoom, totalRow });
            }
            catch (Exception ex)
            {
                return ReturnError(ex);
            }
        }

        [AllowAnonymous]
        [Route("getRoomDetail")]
        [HttpGet]
        public async Task<IActionResult> GetRoomDetail(int roomId)
        {
            try
            {
                var RoomDetail = _roomBS.GetRoomDetailByRoomId(roomId);
                if(RoomDetail == null) return ReturnError("Room not found");
                return ReturnSuccess(RoomDetail);
            }
            catch (Exception ex)
            {
                return ReturnError(ex);
            }
        }

        [AllowAnonymous]
        [Route("createRoom")]
        [HttpPost]
        public async Task<IActionResult> CreateRoom(RoomCreateModel roomCreateModel)
        {
            try
            {
                RoomEntity roomsEntity = new RoomEntity()
                {
                    Number = roomCreateModel.Number,
                    Type = roomCreateModel.Type,
                    Price = roomCreateModel.Price,
                    HotelId = roomCreateModel.HotelId,
                    Status = roomCreateModel.Status,
                    CreatedDate = DateTime.Now,
                    ModifiedDate = DateTime.Now,
            };
                RoomEntity rs = _roomBS.Insert(roomsEntity);
                if(rs == null) return ReturnError("Can not create room");
                return ReturnSuccess("Create Room Successfully");
            }
            catch (Exception ex)
            {
                return ReturnError(ex);
            }
        }

        [Route("updateRoom")]
        [HttpPut]
        [AllowAnonymous]
        public async Task<IActionResult> UpdateRoom(RoomUpdateModel roomUpdateModel)
        {
            try
            {
                var roomByID = _roomBS.GetById(roomUpdateModel.ID);
                if (roomByID == null)
                {
                    return ReturnError("Can not find room");
                }
                roomByID.Type = roomUpdateModel.Type;
                roomByID.Number = roomUpdateModel.Number;
                roomByID.Price = roomUpdateModel.Price;
                roomByID.HotelId = roomUpdateModel.HotelId;
                roomByID.Status = roomUpdateModel.Status;
                roomByID.ModifiedDate = DateTime.Now;
                bool rs = _roomBS.Update(roomByID);
                if (!rs) ReturnError("Can not update room");
                return ReturnSuccess(rs);
            }
            catch (Exception ex)
            {
                return ReturnError(ex);
            }
        }

        [Route("delete")]
        [HttpDelete]
        [AllowAnonymous]
        public async Task<IActionResult> Delete(int roomID)
        {
            try
            {
                RoomEntity roomsEntity = new RoomEntity()
                {
                    ID = roomID
                };
                bool rs = _roomBS.Delete(roomsEntity);
                if (rs == false) return ReturnError("Can not delete room");
                return ReturnSuccess(rs);
            }
            catch (Exception ex)
            {
                return ReturnError(ex);
            }
        }

    }
}
