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

        public static void AddPagination(this HttpResponse response, int currentPage, int itemsPerPage, int totalItems, int totalPages)
        {
            var paginationHeader = new PaginationHeader(currentPage, itemsPerPage, totalItems, totalPages);
            var camelCaseFormatter = new Newtonsoft.Json.JsonSerializerSettings();
            camelCaseFormatter.ContractResolver = new Newtonsoft.Json.Serialization.CamelCasePropertyNamesContractResolver();
            response.Headers.Add("Pagination", Newtonsoft.Json.JsonConvert.SerializeObject(paginationHeader, camelCaseFormatter));
            response.Headers.Append("Access-Control-Expose-Headers", "Pagination");
        }

        public static int CalculateAge(this DateTime theDateTime)
        {
            var age = DateTime.Today.Year - theDateTime.Year;
            if (theDateTime.AddYears(age) > DateTime.Today)
            {
                age--;
            }
            return age;
        }

    }
}