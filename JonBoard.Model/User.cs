using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JonBoard.Model
{
    public class User
    {
        public int ID { get; set; }

        public string Email { get; set; }

        public bool EmailConfirmed { get; set; }

        public string Phone { get; set; }

    }
}
