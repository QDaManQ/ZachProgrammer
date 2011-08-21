using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ZachProgrammer.Web.Modules
{
    public class HomeModule : AppModule
    {
        public HomeModule()
        {
            Get["/"] = x => View["index"];
        }

    }
}