using Entities.Users;

namespace Services
{
    public interface IUser : IBaseService<UserEntity, int>
    {
        UserEntity GetUserByEmail(string email);
        UserEntity GetUserByUserName(string userName);
    }
}
