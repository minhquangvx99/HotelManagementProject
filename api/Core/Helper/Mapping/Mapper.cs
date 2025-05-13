using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;

namespace Core.Helper.Mapping
{
    public static class Mapper
    {
        public static T2 Map<T1, T2>(T1 obj)
        {
            if (obj == null)
            {
                return default(T2);
            }

            var objProps = obj.GetType().GetProperties();
            var convertedObjProps = (typeof(T2)).GetProperties();

            T2 convertedObj = (T2)Activator.CreateInstance(typeof(T2));

            foreach (var objProp in objProps)
            {
                var convertedObjProp = convertedObjProps.FirstOrDefault(x => x.Name == objProp.Name);
                if(convertedObjProp != null)
                {
                    convertedObjProp.SetValue(convertedObj, objProp.GetValue(obj, null), null);
                }
            }

            return convertedObj;
        }

        public static T Copy<T>(T obj)
        {
            if (obj == null)
            {
                return default(T);
            }

            var objProps = obj.GetType().GetProperties();

            T copyObj = (T)Activator.CreateInstance(typeof(T));

            foreach (var objProp in objProps)
            {
                objProp.SetValue(copyObj, objProp.GetValue(obj, null), null);
            }

            return copyObj;
        }
    }
}
