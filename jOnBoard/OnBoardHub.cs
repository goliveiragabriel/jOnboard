using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;

namespace jOnBoard
{
    public class OnBoardHub : Hub
    {
        public void AddClick(string x, string y, bool? dragging)
        {
            Clients.All.broadcastMessage(x,y, dragging);
        }
    }
}