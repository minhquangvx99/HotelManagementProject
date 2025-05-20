using System;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Reflection;

namespace Core.Helper.Extensions
{
    /// <summary>
    /// Object Extensions
    /// </summary>
    public static class ObjectExtensions
    {
        /// <summary>
        /// Gets the prop value.
        /// </summary>
        /// <param name="src">The SRC.</param>
        /// <param name="propName">Name of the prop.</param>
        /// <returns></returns>
        public static object GetPropValue(this object src, string propName)
        {
            return src.GetType().GetProperty(propName).GetValue(src, null);
        }

        /// <summary>
        /// Sets the prop value.
        /// </summary>
        /// <param name="src">The SRC.</param>
        /// <param name="propName">Name of the prop.</param>
        /// <param name="valueSet">The value set.</param>
        public static void SetPropValue(this object src, string propName, object valueSet)
        {
            var obj = src.GetType().GetProperty(propName);
            if (obj != null) obj.SetValue(src, valueSet, null);
        }

        /// <summary>
        /// Gets the type of the primary key from.
        /// </summary>
        /// <param name="type">The type.</param>
        /// <returns></returns>
        public static PropertyInfo GetPrimaryKeyFromType(Type type)
        {
            var property = type.GetProperties().FirstOrDefault(prop => Attribute.IsDefined(prop, typeof(KeyAttribute)));
            return property;
        }
    }
}
