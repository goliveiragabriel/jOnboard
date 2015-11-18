using Microsoft.AspNet.SignalR;
using Microsoft.Owin;
using Newtonsoft.Json;
using Owin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

[assembly: OwinStartup(typeof(jOnBoard.Startup))]
namespace jOnBoard
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            var serializer = new JsonSerializer()
            {
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
                ObjectCreationHandling = ObjectCreationHandling.Replace,
                StringEscapeHandling = StringEscapeHandling.EscapeNonAscii,
                MissingMemberHandling = MissingMemberHandling.Ignore,
                MaxDepth = 5
            };

            // register it so that signalr can pick it up
            GlobalHost.DependencyResolver.Register(typeof(JsonSerializer), () => serializer);
            // Any connection or hub wire up and configuration should go here
            app.MapSignalR();
        }
    }
}