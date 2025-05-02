using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingApp.API.Helpers
{
    public static class Extensions
    {
        public static void AddApplicationError(this HttpResponse response, string message)
        {
            response.Headers["Application-Error"] = message;
            response.Headers.Append("Access-Control-Expose-Headers", "Application-Error");
            response.Headers.Append("Access-Control-Allow-Origin", "*");
        }

    }
}