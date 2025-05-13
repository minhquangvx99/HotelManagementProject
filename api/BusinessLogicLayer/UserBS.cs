using BusinessLogicLayer.Interfaces;
using Entities.Users;
using Services;

namespace BusinessLogicLayer
{
    // User Business Service
    public class UserBS : BaseBS<IUser, UserEntity, int>, IUserBS
    {
        /// <summary></summary>
        /// <param name="_ctx"></param>
        public UserBS(IUser _ctx) : base(_ctx)
        {
        }

        public UserEntity GetUserByEmail(string email)
        {
            return _ctx.GetUserByEmail(email);

        }
        public UserEntity GetUserByUserName(string userName)
        {
            return _ctx.GetUserByUserName(userName);
        }
    }
}
