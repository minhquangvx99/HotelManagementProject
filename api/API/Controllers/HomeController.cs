using System;
using API.Code;
using API.Models;
using BusinessLogicLayer.Interfaces;
using JWT.Algorithms;
using JWT.Builder;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    public class HomeController : BaseController
    {
        private readonly IUserBS _userBS;


        public HomeController(IUserBS userBS)
        {
            _userBS = userBS;
        }

        [Route("login")]
        [HttpPost]
        [AllowAnonymous]
        public IActionResult Login(UserLoginModel userLoginModel)
        {
            try
            {
                var user = _userBS.GetUserByUserName(userLoginModel.Username);
                if (user == null)
                {
                    return ReturnError("Username is incorrect");
                }
                else
                {
                    if (userLoginModel.Password == user.Password)
                    {
                        var token = new JwtBuilder()
                        .WithAlgorithm(new HMACSHA256Algorithm())
                        .WithSecret(AuthorizationAPI.TokenSecret)
                        .AddClaim("User", user)
                        .Encode();
                        string[] arr = user.Name.Split(' ');
                        string shortName;
                        if (arr.Length >= 2)
                        {
                            shortName = arr[0][0].ToString() + arr[arr.Length - 1][0].ToString();
                        }
                        else
                        {
                            shortName = arr[0][0].ToString();
                        }
                        return ReturnSuccess(new
                        {
                            Token = token,
                            ShortName = shortName,
                            User = user
                        });
                    }
                    else
                    {
                        return ReturnError("Password is incorrect");
                    }
                }
            }
            catch (Exception ex)
            {
                return ReturnError(ex);
            }
        }

    }
}