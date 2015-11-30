namespace JonBoard.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddNameAndVisibilityBoard : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Boards", "Name", c => c.String());
            AddColumn("dbo.Boards", "Visibility", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Boards", "Visibility");
            DropColumn("dbo.Boards", "Name");
        }
    }
}
