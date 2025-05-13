using System.IO;
using log4net.Config;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;

namespace API
{
    public class Program
    {
        private static readonly log4net.ILog logQ =
    log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
        public static void Main(string[] args)
        {
            XmlConfigurator.Configure(new FileInfo("log4net.config"));
            CreateHostBuilder(args).Build().Run();
            logQ.Info("Application started");
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                //.UseServiceProviderFactory(new AutofacServiceProviderFactory())
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseContentRoot(Directory.GetCurrentDirectory())
                    .UseIISIntegration()
                    .UseStartup<Startup>().ConfigureKestrel((context, options) =>
                    {
                        options.AllowSynchronousIO = true;
                    });
                });
    }
}
