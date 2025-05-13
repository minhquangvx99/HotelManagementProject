using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Collections.Generic;
using BusinessLogicLayer.Interfaces.IHotels;
using BusinessLogicLayer.Interfaces.IRooms;
using API.Models.Hotel;
using Entities.Hotel;
using BusinessLogicLayer.Interfaces;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HotelController : BaseController
    {
        private readonly IHotelBS _hotelBS;
        private readonly IRoomBS _roomBS;
        private readonly IUserBS _userBS;
        public HotelController(IHotelBS hotelBS, IRoomBS roomBS, IUserBS userBS)
        {
            _hotelBS = hotelBS;
            _roomBS = roomBS;
            _userBS = userBS;
        }

        [Route("getHotelPaging")]
        [HttpGet]
        public IActionResult GetHotelPaging(int pageIndex = 1, int pageSize = 1, string searchKey = "")
        {
            try
            {
                int totalRow = 0;
                var listHotel = new List<HotelGetFullModel>();
                var listHotelRaw = _hotelBS.GetHotelPaging(pageIndex, pageSize, searchKey, ref totalRow);
                foreach (var tots in listHotelRaw)
                {
                    var hotelModel = new HotelGetFullModel()
                    {
                        Id = tots.ID,
                        Name = tots.Name,
                    };
                    var listRoom = _roomBS.GetRoomByHotelId(tots.ID);
                    hotelModel.rooms = listRoom.ToList();
                    listHotel.Add(hotelModel);
                }
                return ReturnSuccess(new { listHotel, pageIndex, pageSize, totalRow });
            }
            catch (Exception ex)
            {
                return ReturnError(ex);
            }
        }

        [Route("getAllHotel")]
        [HttpGet]
        public IActionResult GetAllHotel()
        {
            try
            {
                var listHotel = new List<HotelGetFullModel>();
                var listHotelRaw = _hotelBS.GetAll();
                foreach (var hotel in listHotelRaw)
                {
                    var hotelModel = new HotelGetFullModel()
                    {
                        Id = hotel.ID,
                        Name = hotel.Name,
                    };
                    var listRoom = _roomBS.GetRoomByHotelId(hotel.ID);
                    hotelModel.rooms = listRoom.ToList();
                    listHotel.Add(hotelModel);
                }
                return ReturnSuccess(new { listHotel });
            }
            catch (Exception ex)
            {
                return ReturnError(ex);
            }
        }


        [Route("getHotelByID/{hotelID}")]
        [HttpGet]
        public IActionResult GetHotelByID(int hotelId)
        {
            try
            {
                var hotel = _hotelBS.GetById(hotelId);
                var hotelModel = new HotelGetFullModel()
                {
                    Id = hotel.ID,
                    Name = hotel.Name,
                };
                var listRoom = _roomBS.GetRoomByHotelId(hotelId);
                hotelModel.rooms = listRoom.ToList();

                return ReturnSuccess(hotelModel);
            }
            catch (Exception ex)
            {
                return ReturnError(ex);
            }
        }

        [Route("create")]
        [HttpPost]
        public IActionResult Create(HotelCreateModel hotelCreateModel)
        {
            try
            {
                var typeOfRoomEntity = new HotelEntity()
                {
                    Name = hotelCreateModel.Name,
                    CreatedDate = DateTime.Now,
                };

                HotelEntity existed = _hotelBS.GetHotelByName(hotelCreateModel.Name.ToLower());
                if (existed != null) return ReturnError("Name " + hotelCreateModel.Name + " existed");

                HotelEntity rs = _hotelBS.Insert(typeOfRoomEntity);
                if (rs == null) return ReturnError("Add new Type Of Topic Set failed");

                return ReturnSuccess(new { }, "Saved successfully");
            }
            catch (Exception ex)
            {
                return ReturnError(ex);
            }
        }

        [Route("delete")]
        [HttpPost]
        public IActionResult Delete(int hotelId)
        {
            try
            {
                var hotel = _hotelBS.GetById(hotelId);
                if (hotel == null) return ReturnError("Type Of Topic Set does not exist");

                var typeOfRoomEntity = new HotelEntity()
                {
                    ID = hotelId
                };

                var listRoom = _roomBS.GetRoomByHotelId(hotelId);
                if (listRoom != null && listRoom.Count() > 0)
                {
                    return ReturnError("Can not delete Type Of Topic Set that have Topic Sets");
                }

                bool rs = _hotelBS.Delete(typeOfRoomEntity);
                if (rs == false) return ReturnError("Delete Type Of Topic Set failed");

                return ReturnSuccess(new { }, "Deleted successfully");               
            }
            catch (Exception ex)
            {
                return ReturnError(ex);
            }
        }

        [Route("update")]
        [HttpPost]
        public IActionResult Update(HotelUpdateModel hotelUpdateModel)
        {
            try
            {
                var hotel = _hotelBS.GetById(hotelUpdateModel.hotel.ID);
                if (hotel == null) return ReturnError("Type Of Topic Set does not exist");

                hotel.ID = hotelUpdateModel.hotel.ID;
                hotel.Name = hotelUpdateModel.hotel.Name;
                hotel.ModifiedDate = DateTime.Now;

                var listRoom = _roomBS.GetRoomByHotelId(hotelUpdateModel.hotel.ID);
                if (listRoom != null && listRoom.Count() > 0)
                {
                    return ReturnError("Can not update Type Of Topic Set that have Topic Sets");
                }

                // check tên đã tồn tại
                if (hotel.Name.ToLower() != hotelUpdateModel.hotel.Name.ToLower())
                {
                    HotelEntity existed = _hotelBS.GetHotelByName(hotelUpdateModel.hotel.Name.ToLower());
                    if (existed != null) return ReturnError("Name " + hotelUpdateModel.hotel.Name + " existed");
                }

                bool rs = _hotelBS.Update(hotel);
                if (rs == false) return ReturnError("Update Type Of Topic Set failed");

                return ReturnSuccess(new { }, "Saved successfully");       
            }
            catch (Exception ex)
            {
                return ReturnError(ex);
            }
        }
    }
}

