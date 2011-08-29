using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Web;

namespace ZachProgrammer.Web.Modules
{
    public class HomeModule : AppModule
    {
        public HomeModule()
        {
            var answer = "No, but he'll work for it ;)";
            Get["/"] = x => View["index", answer];
        }

    }
}