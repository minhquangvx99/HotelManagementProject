using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Reflection;
using System.Text;

namespace Core.Helper.Logging
{
    public static class AuditHelper
    {
        public static string GetDifferent<T>(T obj1, T obj2)
        {
            var strBuilder = new StringBuilder();

            var objProps = obj1.GetType().GetProperties();

            foreach (var objProp in objProps)
            {
                var val1 = objProp.GetValue(obj1, null);
                var val2 = objProp.GetValue(obj2, null);
                if((val1 != null && val2 == null) || (val1 == null && val2 != null))
                {
                    strBuilder.AppendLine($"{objProp.Name}: {val1} => {val2}");
                }
                if(val1 != null && val2 != null && val1.ToString() != val2.ToString())
                {
                    strBuilder.AppendLine($"{objProp.Name}: {val1} => {val2}");
                }
            }

            return strBuilder.ToString();
        }

        public static int GetObjectID<T>(T obj)
        {
            var objProps = obj.GetType().GetProperties();
            var key = objProps.FirstOrDefault(x => x.GetCustomAttributes(true).Any(attr => attr.GetType().Name == typeof(KeyAttribute).Name));
            if(key != null)
            {
                var val = key.GetValue(obj, null);
                if(val == null || val.GetType() != typeof(int))
                {
                    return 0;
                }
                return (int)val;
            }
            return 0;
        }
    }
}
