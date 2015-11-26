using jOnBoard.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JonBoard.Model
{
    public class Board
    {
        public string Id { get; set; }

        public string Canvas { get; set; }

        public virtual ApplicationUser User { get; set; }


    }
}
