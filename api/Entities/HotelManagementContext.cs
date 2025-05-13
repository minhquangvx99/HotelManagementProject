using Entities.Users;
using System.Data.Entity;
using Entities.Room;
using Entities.Hotel;

namespace Entities
{
    public class HotelManagementContext : DbContext
    {
        public HotelManagementContext() : base("Server=LAPTOP-7RIGJVQ0\\MSSQLSERVER01;Database=HotelManagementDB;Uid=develop;Pwd=Abc@123$;Max Pool Size=20000;")
        {
        }
        public DbSet<UserEntity> userEntities { get; set; }
        public DbSet<HotelEntity> questionEntities { get; set; }
        public DbSet<RoomEntity> answerEntities { get; set; }

    }
}
