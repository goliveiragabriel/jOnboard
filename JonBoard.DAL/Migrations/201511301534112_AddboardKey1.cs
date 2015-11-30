namespace JonBoard.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddboardKey1 : DbMigration
    {
        public override void Up()
        {
            DropPrimaryKey("dbo.Boards");
            AlterColumn("dbo.Boards", "Id", c => c.String(nullable: false, maxLength: 128));
            AddPrimaryKey("dbo.Boards", "Id");
        }
        
        public override void Down()
        {
            DropPrimaryKey("dbo.Boards");
            AlterColumn("dbo.Boards", "Id", c => c.String(nullable: false, maxLength: 128));
            AddPrimaryKey("dbo.Boards", "Id");
        }
    }
}
