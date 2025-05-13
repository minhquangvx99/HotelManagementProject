using System;
using System.Collections;
using System.Collections.Generic;
using System.Globalization;
using System.Reflection;

namespace Core.Helper.Patterns
{
    public class SingletonIpl
    {
        public static readonly Hashtable _repositories = new Hashtable();

        // static field to hold single instance
        static readonly object padlock = new object();

        public static T GetInstance<T>(params object[] args)
        {
            T inst = default(T);
            var argStrings = new List<string>();

            //instance default for Dbo Schema
            if (typeof(T).Name.Substring(0, 3).ToUpper() == "DBO")
            {
                args = new object[1];
                //args[0] = DataHelper.TenantMain();
            }
            foreach (var arg in args)
            {
                if (arg != null)
                {
                    if (args.GetType().Name == typeof(String).Name)
                    {
                        argStrings.Add((string)arg);
                    }
                    else if (args.GetType().Name == typeof(DateTime).Name)
                    {
                        var dateArg = (DateTime)arg;
                        argStrings.Add(dateArg.ToShortDateString());
                    }
                    else
                    {
                        argStrings.Add(arg.ToString());
                    }
                }
            }

            var subfix = string.Join("_", argStrings.ToArray());
            var theType = typeof(T);

            var type = string.Format("{0}_{1}", typeof(T).FullName, subfix);

            try
            {
                lock (padlock)
                {
                    if (!_repositories.ContainsKey(type))
                    //if (!SingletonPerRequest.ObjectPerRequest.ContainsKey(type))
                    {
                        inst = (T)theType
                        .InvokeMember(theType.Name,
                        BindingFlags.CreateInstance | BindingFlags.Instance
                        | BindingFlags.Public | BindingFlags.NonPublic | BindingFlags.FlattenHierarchy,
                        null, null, args,
                        CultureInfo.InvariantCulture);
                        //SingletonPerRequest.ObjectPerRequest.Add(type, inst);
                        _repositories.Add(type, inst);
                    }
                    //inst = (T)SingletonPerRequest.ObjectPerRequest[type];
                    inst = (T)_repositories[type];
                }
            }
            catch (MissingMethodException ex)
            {
                throw new TypeLoadException(string.Format(
                    CultureInfo.CurrentCulture,
                    "The type '{0}' must have a private constructor to " +
                    "be used in the Singleton pattern.", theType.FullName)
                    , ex);
            }

            return inst;
        }
    }
}
