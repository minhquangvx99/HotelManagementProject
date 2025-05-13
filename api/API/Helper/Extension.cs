using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Helper
{
    public class Extension
    {
        public static DateTime ConvertDate(string date)
        {
            var arrayDate = date.Split("-");
            return new DateTime(int.Parse(arrayDate[0]), int.Parse(arrayDate[1]), int.Parse(arrayDate[2]));
        }
    }
}
