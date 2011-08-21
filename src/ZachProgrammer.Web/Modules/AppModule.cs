using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Nancy;

namespace ZachProgrammer.Web.Modules
{
    public class AppModule : NancyModule
    {
        public AppModule(): base()
        {

        }

        public AppModule(string modulePath) : base(modulePath)
        {

        }

    }
}