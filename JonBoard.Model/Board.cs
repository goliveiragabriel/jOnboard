using jOnBoard.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JonBoard.Model
{
    public enum Visibility
    {
        Public = 0,
        Private = 1
    }
    public class Board
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public string Id { get; set; }

        public string Canvas { get; set; }

        public string Name { get; set; }

        public Visibility Visibility { get; set; }

        public virtual ApplicationUser User { get; set; }




    }
}
