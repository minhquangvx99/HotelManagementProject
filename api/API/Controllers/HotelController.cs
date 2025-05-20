using Microsoft.AspNetCore.Mvc;
using System;
using BusinessLogicLayer.Interfaces.IHotels;
using API.Models.Hotel;
using Entities.Hotel;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HotelController : BaseController
    {
        private readonly IHotelBS _hotelBS;
        public HotelController(IHotelBS hotelBS)
        {
            _hotelBS = hotelBS;
        }

        [Route("getHotelPaging")]
        [HttpGet]
        public IActionResult GetHotelPaging(int pageIndex = 1, int pageSize = 1, string searchKey = "")
        {
            try
            {
                int totalRow = 0;
                var listHotel = _hotelBS.GetHotelPaging(pageIndex, pageSize, searchKey, ref totalRow);
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
                var listHotel = _hotelBS.GetAll();
                return ReturnSuccess(new { listHotel });
            }
            catch (Exception ex)
            {
                return ReturnError(ex);
            }
        }

        [Route("getHotelById/{hotelId}")]
        [HttpGet]
        public IActionResult GetHotelByID(int hotelId)
        {
            try
            {
                var hotel = _hotelBS.GetById(hotelId);
                return ReturnSuccess(hotel);
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
                var hotelEntity = new HotelEntity()
                {
                    Name = hotelCreateModel.Name,
                    Address = hotelCreateModel.Address,
                    PhoneNumber = hotelCreateModel.PhoneNumber,
                    StarsNumber = hotelCreateModel.StarsNumber,
                    ManagerName = hotelCreateModel.ManagerName,
                    CreatedDate = DateTime.Now,
                    ModifiedDate = DateTime.Now,
                };

/*                HotelEntity existed = _hotelBS.GetHotelByName(hotelCreateModel.Name.ToLower());
                if (existed != null) return ReturnError("Name " + hotelCreateModel.Name + " existed");*/

                HotelEntity rs = _hotelBS.Insert(hotelEntity);
                if (rs == null) return ReturnError("Add new Hotel failed");

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
                if (hotel == null) return ReturnError("Hotel does not exist");
                bool rs = _hotelBS.Delete(hotel);
                if (rs == false) return ReturnError("Delete Hotel failed");

                return ReturnSuccess(new { }, "Deleted successfully");               
            }
            catch (Exception ex)
            {
                return ReturnError(ex);
            }
        }

        [Route("update")]
        [HttpPost]
        public IActionResult Update(HotelEntity hotelUpdateModel)
        {
            try
            {
                var hotel = _hotelBS.GetById(hotelUpdateModel.ID);
                if (hotel == null) return ReturnError("Hotel does not exist");

                hotel.ID = hotelUpdateModel.ID;
                hotel.Name = hotelUpdateModel.Name;
                hotel.Address = hotelUpdateModel.Address;
                hotel.PhoneNumber = hotelUpdateModel.PhoneNumber;
                hotel.StarsNumber = hotelUpdateModel.StarsNumber;
                hotel.ManagerName = hotelUpdateModel.ManagerName;
                hotel.ModifiedDate = DateTime.Now;

/*                // check tên đã tồn tại
                if (hotel.Name.ToLower() != hotelUpdateModel.hotel.Name.ToLower())
                {
                    HotelEntity existed = _hotelBS.GetHotelByName(hotelUpdateModel.hotel.Name.ToLower());
                    if (existed != null) return ReturnError("Name " + hotelUpdateModel.hotel.Name + " existed");
                }*/

                bool rs = _hotelBS.Update(hotel);
                if (rs == false) return ReturnError("Update Hotel failed");

                return ReturnSuccess(new { }, "Saved successfully");       
            }
            catch (Exception ex)
            {
                return ReturnError(ex);
            }
        }
    }
}

