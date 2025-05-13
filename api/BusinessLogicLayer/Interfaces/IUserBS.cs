using Entities.Users;
using Services;

namespace BusinessLogicLayer.Interfaces
{
    public interface IUserBS : IBaseBS<IUser, UserEntity, int>
    {
        UserEntity GetUserByEmail(string email);
        UserEntity GetUserByUserName(string userName);
    }
}
