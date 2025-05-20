using Entities.Users;
using System;
using System.ComponentModel.DataAnnotations;
using System.Security.Claims;
using System.Security.Principal;

namespace API.Models
{
    public class UserLoginModel
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }

    public class UserForgotPassModel
    {
        public string Email { get; set; }
    }

    public class ChangePassForgotModel
    {
        public string Password { get; set; }
    }
    public class UserVerifyModel
    {
        public string Email { get; set; }
        public string Otp { get; set; }
    }
    public class UserModel
    {

        public int ID { get; set; }

        public string Name { get; set; }

        public int Status { get; set; }

        public string Email { get; set; }

        public string Username { get; set; }

        public DateTime Birthday { get; set; }

        public string Address { get; set; }

        public string PhoneNumber { get; set; }

        public string Password { get; set; }

        public int Gender { get; set; }

        public static UserModel genFromPrincipal(UserPrincipal user)
        {
            return new UserModel()
            {
                ID = user.ID,
                Name = user.Name,
                Status = user.Status,
                Email = user.Email,
                Username = user.Email,
                Birthday = user.Birthday,
                Address = user.Address,
                PhoneNumber = user.PhoneNumber,
                Password = user.Password,
                Gender = user.Gender,
            };
        }
    }

    public class UpdateMyInfomationModel
    {
        [Required]
        public string Email { get; set; }
        [Required]
        public string Name { get; set; }
        public string Birthday { get; set; }
        [Required]
        public string PhoneNumber { get; set; }
        [Required]
        public int Gender { get; set; }
        public string Address { get; set; }
    }

    public class UserPrincipal : ClaimsPrincipal
    {
        public IIdentity Identity { get; set; }

        public int ID { get; set; }

        public string Name { get; set; }

        public int Status { get; set; }

        public string Email { get; set; }

        public string Username { get; set; }

        public DateTime Birthday { get; set; }

        public string Address { get; set; }

        public string PhoneNumber { get; set; }

        public string Password { get; set; }

        public int Gender { get; set; }

        public static UserPrincipal genFromModel(UserEntity user)
        {
            return new UserPrincipal()
            {
                Identity = new GenericIdentity(user.Username),
                ID = user.ID,
                Name = user.Name,
                Status = user.Status,
                Email = user.Email,
                Username = user.Email,
                Birthday = user.Birthday,
                Address = user.Address,
                PhoneNumber = user.PhoneNumber,
                Password = user.Password,
                Gender = user.Gender,
            };
        }
    }
    public class ChangePassword
    {
        [Required]
        public string Password { get; set; }
        [Required]
        public string NewPassword { get; set; }
    }

}
