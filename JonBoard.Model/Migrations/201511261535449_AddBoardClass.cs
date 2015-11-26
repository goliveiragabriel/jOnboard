namespace JonBoard.Model.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddBoardClass : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Boards",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        Canvas = c.String(),
                        User_Id = c.String(maxLength: 128),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.AspNetUsers", t => t.User_Id)
                .Index(t => t.User_Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Boards", "User_Id", "dbo.AspNetUsers");
            DropIndex("dbo.Boards", new[] { "User_Id" });
            DropTable("dbo.Boards");
        }
    }
}
