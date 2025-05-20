using System;
using System.IO;
using Microsoft.Extensions.Configuration;

namespace Core.Configuration
{
    /// <summary>
    /// Get config from .config file dynamic key
    /// </summary>
    public class Config
    {
        //https://agirlamonggeeks.com/2017/02/20/asp-net-core-configuration-part-1-appsettings-json-strongly-typed-configuration/
        public static IConfigurationRoot GetConfiguration(string path, string jsonFile = "appsettings.json", string environmentName = null, bool addUserSecrets = false)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(path)
                .AddJsonFile(jsonFile, optional: true, reloadOnChange: true);

            if (!string.IsNullOrWhiteSpace(environmentName))
                builder = builder.AddJsonFile($"appsettings.{environmentName}.json", optional: true);

            //builder = builder.AddEnvironmentVariables();

            if (addUserSecrets)
            {
                //builder.AddUserSecrets(); // requires adding Microsoft.Extensions.Configuration.UserSecrets from NuGet.
            }

            return builder.Build();
        }

        /// <summary>
        /// Gets the config by key.
        /// </summary>
        /// <param name="key">The key.</param>
        /// <returns></returns>
        public static string GetConfigByKey(string key)
        {
            return GetConfigValue<string>(key);
        }

        public static T GetConfigValue<T>(string key)
        {
            try
            {
                var config = GetConfiguration(Directory.GetCurrentDirectory());
                var val = default(T);
                //var val = config.GetValue<T>(key);
                return val;
            }
            catch
            {
                return default(T);
            }
        }

        public static IConfigurationSection GetSection(string key)
        {
            var config = GetConfiguration(Directory.GetCurrentDirectory());
            var val = config.GetSection(key);
            return val;
        }
    }
}
