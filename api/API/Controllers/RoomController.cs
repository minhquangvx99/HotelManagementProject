using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using BusinessLogicLayer.Interfaces.IRooms;
using System.Threading.Tasks;
using System;
using System.Linq;
using Entities.Room;
using API.Models.Room;
using BusinessLogicLayer.Interfaces;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoomController : BaseController
    {
        private readonly IRoomBS _roomBS;
        private readonly IUserBS _userBS;

        public RoomController(IUserBS userBS,IRoomBS roomBS)
        {
            _roomBS = roomBS;
            _userBS = userBS;
        }

        [Route("getRoomFullPaging")]
        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetRoomPaging(int hotelId , string codeSearch = "", string name = "", string status ="", int pageIndex = 1, int pageSize = 1, string searchKey = "")
        {
            int totalRow = 0;
            try
            {
                var ListRoom = _roomBS.GetRoomPaging(hotelId, codeSearch,name,status, pageIndex, pageSize, searchKey, ref totalRow).ToList();
                return ReturnSuccess(new { ListRoom, totalRow });
            }
            catch (Exception ex)
            {
                return ReturnError(ex);
            }
        }

        [Route("getRoomDetail")]
        [HttpGet]
        [AllowAnonymous]
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

        [Route("createRoom")]
        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> CreateRoom(RoomCreateModel roomCreateModel)
        {
            try
            {
                var checkNameTopic = _roomBS.GetRoomByName(roomCreateModel.Name);
                if (checkNameTopic.Count() > 0)
                {
                    return ReturnError("Name already exists");
                }
                RoomEntity roomsEntity = new RoomEntity()
                {
                    Status = roomCreateModel.Status,
                    CreatedDate = DateTime.Now
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
       
        public async Task<IActionResult> UpdateRoom(RoomUpdateModel roomUpdateModel)
        {
            try
            {
                var roomByID = _roomBS.GetById(roomUpdateModel.RoomId);
                if (roomByID == null)
                {
                    return ReturnError("Can not find room");
                }
                roomByID.Status = roomUpdateModel.Status;
                bool rs = _roomBS.Update(roomByID);
                if (!rs) ReturnError("Can not update room");
                return ReturnSuccess(rs);
            }
            catch (Exception ex)
            {
                return ReturnError(ex);
            }
        }

        [Route("updateStatusOfRoom")]
        [HttpPut]
        
        public async Task<IActionResult> UpdateStatusOfRoom(int roomID, int roomStatus)
        {
            try
            {
                var roomByID = _roomBS.GetById(roomID);
                if (roomByID == null)
                {
                    return ReturnError("Can not find room");
                }
                roomByID.Status = roomStatus;
                roomByID.CreatedDate = DateTime.Now;
                bool rs = _roomBS.Update(roomByID);
                if(!rs) ReturnError("Can not update room");
                return ReturnSuccess(rs);
            }
            catch (Exception ex)
            {
                return ReturnError(ex);
            }
        }

        [Route("delete")]
        [HttpDelete]
     
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
