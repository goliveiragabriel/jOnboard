namespace JonBoard.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddBoardUserRelationship : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Boards", "User_Id", c => c.String(nullable: false, maxLength: 128));
            CreateIndex("dbo.Boards", "User_Id");
            AddForeignKey("dbo.Boards", "User_Id", "dbo.Users", "Id", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Boards", "User_Id", "dbo.Users");
            DropIndex("dbo.Boards", new[] { "User_Id" });
            DropColumn("dbo.Boards", "User_Id");
        }
    }
}
