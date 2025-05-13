namespace Entities.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<Entities.HotelManagementContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(Entities.HotelManagementContext context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method
            //  to avoid creating duplicate seed data.

            //context.userEntities.AddOrUpdate(new Users.UserEntity { UserName = "QuangNM", FullName = "Ngô Minh Quang", Email = "hd.1999@gmail.com", PhoneNumber = "0989598543" });
            //context.SaveChanges();
        }
    }
}
