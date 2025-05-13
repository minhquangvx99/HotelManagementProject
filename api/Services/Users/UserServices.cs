using Entities.Users;
using System.Linq;

namespace Services
{
    public class UserServices : BaseService<UserEntity, int>, IUser
    {

        public UserServices(string connection = "") : base(connection)
        {
            _connection = connection;
        }

        public UserEntity GetUserByEmail(string email)
        {
            var parameters = new { Email = email };
            var sql = "SELECT TOP 1 * FROM Users au WHERE au.Email = @Email";
            return unitOfWork.Query<UserEntity>(sql, parameters).FirstOrDefault();
        }
  
        public UserEntity GetUserByUserName(string userName)
        {
            var parameters = new { UserName = userName };
            var sql = "SELECT TOP 1 * FROM Users au WHERE au.Username = @UserName";
            return unitOfWork.Query<UserEntity>(sql, parameters).FirstOrDefault();
        }
       
    }
}
