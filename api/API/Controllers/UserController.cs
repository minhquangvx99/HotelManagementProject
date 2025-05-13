using API.Models;
using BusinessLogicLayer.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using API.Helper;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : BaseController
    {
        private readonly IUserBS _userBS;

        public UserController(IUserBS userBS)
        {
            _userBS = userBS;
        }

        [Route("accountInformation")]
        [HttpGet]
        public IActionResult AccountInformation()
        {
            try
            {
                return ReturnSuccess(User);
            }
            catch (Exception ex)
            {
                return ReturnError(ex);
            }
        }

        [Route("changePassword")]
        [HttpPost]
        public IActionResult ChangePassword(ChangePassword model)
        {
            try
            {
                var currentUser = _userBS.GetById(User.ID);
                if (currentUser == null)
                    return ReturnError("User information not found.");
                if (model.Password.Count() < 8 || model.NewPassword.Count() < 8)
                {
                    return ReturnError("Password must contain at least 8 characters.");
                }
                if (currentUser.Password != model.Password)
                    return ReturnError("The old password is incorrect.");
                currentUser.Password = model.NewPassword;
                var result = _userBS.Update(currentUser);
                if (result)
                {
                    return ReturnSuccess(new { }, "You have successfully changed your password. Please log in again.");
                }
                else return ReturnError("Password change failed.");
            }
            catch (Exception ex)
            {
                return ReturnError(ex);
            }
        }

        [Route("updateMyInfomation")]
        [HttpPost]
        public IActionResult UpdateMyInfomation(UpdateMyInfomationModel user)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return ReturnError("Please enter complete information");
                }
                var checkEmail = _userBS.GetUserByEmail(user.Email);
                if (checkEmail != null && checkEmail.ID != User.ID)
                {
                    return ReturnError("Email already exists. Please check again.");
                }
                var currentUser = _userBS.GetById(User.ID);
                currentUser.Name = user.Name.Trim();
                currentUser.Email = user.Email;
                currentUser.Username = user.Email;
                if (!string.IsNullOrEmpty(user.Birthday))
                {
                    currentUser.Birthday = Extension.ConvertDate(user.Birthday);
                }
                else
                {
                    currentUser.Birthday = Extension.ConvertDate("1753-01-01");
                }
                currentUser.Address = user.Address.Trim();
                currentUser.PhoneNumber = user.PhoneNumber;
                currentUser.Gender = user.Gender;
                currentUser.ModifiedDate = DateTime.Now;
                currentUser.ModifiedBy = User.ID;
                var result = _userBS.Update(currentUser);
                if (result)
                {
                    return ReturnSuccess(new { }, "Update successfully.");
                }
                else
                {
                    return ReturnError("Update failed.");
                }
            }
            catch (Exception ex)
            {
                return ReturnError(ex);
            }
        }
        
    }
}