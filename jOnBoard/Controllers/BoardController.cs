using jOnBoard.Models;
using JonBoard.DAL;
using JonBoard.Model;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace jOnBoard.Controllers
{
    [Authorize]
    public class BoardController : Controller
    {
        ApplicationContext db = new ApplicationContext();
        ApplicationDbContext externalDb = new ApplicationDbContext();

        public DbSet<Board> GetBoards()
        {
            return db.Boards;
        }

        // GET: Canvas
        public ActionResult Index()
        {
            return View();
        }

        [AllowAnonymous]
        public ActionResult Details(string h)
        {
            return View();
        }

        [HttpPost]
        public ActionResult Create(Board board)
        {

            if (!ModelState.IsValid)
            {
                return View("Index");
            }
            board.User = externalDb.Users.Where(p => p.Email == User.Identity.Name).First();
            db.Boards.Add(board);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (BoardExists(board.Id))
                {
                    return View("Index");
                }
                else
                {
                    throw;
                }
            }
            return RedirectToAction("Details", new { h = "A" });
        }

        private bool BoardExists(string p)
        {
            return db.Boards.Any(m => m.Id == p);
        }
    }
}