using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace jOnBoard.Controllers
{
    [Authorize]
    public class CanvasController : Controller
    {
        // GET: Canvas
        public ActionResult Index()
        {
            return View();
        }
    }
}