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
using Microsoft.AspNet.Identity;
using System.Data.Entity.Validation;

namespace jOnBoard.Controllers
{
    [Authorize]
    public class BoardController : Controller
    {
        ApplicationContext db = new ApplicationContext();

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
            Board board = db.Boards.FirstOrDefault(p => p.Id == h);
            if (!User.Identity.IsAuthenticated && board.Visibility == Visibility.Private)
            {
                return RedirectToAction("Index", "Home");
            }
            return View(board);
        }

        [HttpPost]
        public ActionResult Create(Board board)
        {

            if (!ModelState.IsValid)
            {
                return View("Index");
            }
            var currentUserId = User.Identity.GetUserId();
            board.User = db.Users.Where(p => p.Id == currentUserId).First();
            board.Id = Guid.NewGuid().ToString();
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
            catch (DbEntityValidationException e)
            {
                throw e;
            }
            return RedirectToAction("Details", new { h = board.Id });
        }
        [HttpPost]
        public ActionResult EditName(string pk, string value)
        {
            Board board = db.Boards.FirstOrDefault(p => p.Id == pk);
            board.Name = value;
            try
            {
                db.SaveChanges();
                db.Entry(board).State = EntityState.Modified;
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
            catch (DbEntityValidationException e)
            {
                throw e;
            }
            return View();
        }

        private bool BoardExists(string p)
        {
            return db.Boards.Any(m => m.Id == p);
        }
    }
}