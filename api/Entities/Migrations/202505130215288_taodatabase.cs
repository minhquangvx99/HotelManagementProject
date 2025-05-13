namespace Entities.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class taodatabase : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Room",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        Number = c.String(),
                        Type = c.String(),
                        Price = c.Decimal(nullable: false, precision: 18, scale: 2),
                        Status = c.Int(nullable: false),
                        CreatedDate = c.DateTime(),
                        CreatedBy = c.Int(),
                        ModifiedDate = c.DateTime(),
                        ModifiedBy = c.Int(),
                    })
                .PrimaryKey(t => t.ID);
            
            CreateTable(
                "dbo.Hotel",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        Name = c.String(maxLength: 4000),
                        Address = c.String(),
                        PhoneNumber = c.String(maxLength: 20, unicode: false),
                        StarsNumber = c.Int(nullable: false),
                        ManagerName = c.String(),
                        CreatedDate = c.DateTime(),
                        CreatedBy = c.Int(),
                        ModifiedDate = c.DateTime(),
                        ModifiedBy = c.Int(),
                    })
                .PrimaryKey(t => t.ID)
                .Index(t => t.Name, unique: true);
            
            CreateTable(
                "dbo.Users",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        Name = c.String(maxLength: 255),
                        Status = c.Int(nullable: false),
                        Email = c.String(maxLength: 255),
                        Username = c.String(maxLength: 255),
                        Birthday = c.DateTime(nullable: false),
                        Address = c.String(maxLength: 500),
                        PhoneNumber = c.String(maxLength: 50),
                        Password = c.String(maxLength: 4000),
                        Gender = c.Int(nullable: false),
                        CreatedDate = c.DateTime(),
                        CreatedBy = c.Int(),
                        ModifiedDate = c.DateTime(),
                        ModifiedBy = c.Int(),
                    })
                .PrimaryKey(t => t.ID);
            
        }
        
        public override void Down()
        {
            DropIndex("dbo.Hotel", new[] { "Name" });
            DropTable("dbo.Users");
            DropTable("dbo.Hotel");
            DropTable("dbo.Room");
        }
    }
}
