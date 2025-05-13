namespace Entities.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class taodatabase1 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Room", "HotelId", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Room", "HotelId");
        }
    }
}
