using API.Models;
using BusinessLogicLayer;
using Services;
using Autofac;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using NetCore.AutoRegisterDi;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Data.SqlClient;

namespace API
{
    public class Startup
    {
        public Startup(IConfiguration configuration, IWebHostEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                            .SetBasePath(env.ContentRootPath)
                            .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                            .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                            .AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDetection();

            // Add CORS policy
            services.AddCors(options =>
            {
                options.AddPolicy("AllowAll",
                    builder =>
                    {
                        builder.AllowAnyOrigin()
                               .AllowAnyHeader()
                               .AllowAnyMethod();
                    });
            });

            services.AddControllers().AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.PropertyNamingPolicy = null;
            })
            .ConfigureApiBehaviorOptions(options =>
            {
                options.InvalidModelStateResponseFactory = context =>
                {
                    Func<ModelError, string> GetErrorMessage = (ModelError error) =>
                    {
                        return string.IsNullOrEmpty(error.ErrorMessage) ? "The input was not valid." : error.ErrorMessage;
                    };
                    var Errors = new Dictionary<string, string[]>();
                    foreach (var keyModelStatePair in context.ModelState)
                    {
                        var key = keyModelStatePair.Key;
                        var errors = keyModelStatePair.Value.Errors;
                        if (errors != null && errors.Count > 0)
                        {
                            if (errors.Count == 1)
                            {
                                var errorMessage = GetErrorMessage(errors[0]);
                                Errors.Add(key, new[] { errorMessage });
                            }
                            else
                            {
                                var errorMessages = new string[errors.Count];
                                for (var i = 0; i < errors.Count; i++)
                                {
                                    errorMessages[i] = GetErrorMessage(errors[i]);
                                }

                                Errors.Add(key, errorMessages);
                            }
                        }
                    }
                    return new OkObjectResult(new
                    {
                        Data = Errors,
                        Success = false,
                        Message = "ModelStateError."
                    });
                };
            }
            );
            services.Configure<IISServerOptions>(options =>
            {
                options.AllowSynchronousIO = true;
            });

            // Identity Services
            string connectionString = Configuration.GetConnectionString("DefaultConnection");
            //Inject IDbConnection, with implementation from SqlConnection class.
            services.AddSingleton<IDbConnection>((sp) => new SqlConnection(connectionString));
            services.AddSingleton<string>(e => connectionString);
            // Add functionality to inject IOptions<T>
            services.AddOptions();

            services.AddHttpContextAccessor();

            var assemblies = Assembly.GetExecutingAssembly();

            //ServiceLifetime defaults to Transient lifetime
            services.RegisterAssemblyPublicNonGenericClasses(typeof(UserServices).Assembly)
                        .Where(x => x.Name.EndsWith("Services"))
                        .AsPublicImplementedInterfaces(ServiceLifetime.Singleton);

            //ServiceLifetime defaults to Transient lifetime
            services.RegisterAssemblyPublicNonGenericClasses(typeof(UserBS).Assembly)
                        .Where(x => x.Name.EndsWith("BS"))
                        .AsPublicImplementedInterfaces(ServiceLifetime.Singleton);

            services.AddSwaggerGen(options =>
            {
                options.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
                {
                    Title = "Hotel Management API",
                    Version = "v1",
                    Description = "Document Hotel Management API",
                });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment() && false)
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler(errorApp =>
                {
                    errorApp.Run(async context =>
                    {
                        var exception = context.Features.Get<IExceptionHandlerPathFeature>();
                        context.Response.StatusCode = 200;
                        context.Response.ContentType = "application/json";
                        await context.Response.WriteAsync(JsonConvert.SerializeObject(new
                        {
                            Success = false,
                            Message = exception.Error.Message,
                            Trace = exception.Error.StackTrace.ToString(),
                        }));
                    });
                });
            }

            app.Use(next => context =>
            {
                context.Request.EnableBuffering();
                return next(context);
            });

            app.UseHsts();

            // Enable CORS
            app.UseCors("AllowAll");
            app.UseStaticFiles(); // Enable serving static files (wwwroot)

            app.UseDirectoryBrowser(); // Enable directory browsing for static files (wwwroot)

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapGet("/", async context =>
                {
                    await context.Response.WriteAsync("Api Service!");
                });
                endpoints.MapControllers();
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
            });

            app.UseSwagger();
            app.UseSwaggerUI(options => options.SwaggerEndpoint("/swagger/v1/swagger.json", "Hotel Management"));
        }
    }
}
