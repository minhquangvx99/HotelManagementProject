using BusinessLogicLayer;
using BusinessLogicLayer.Interfaces;
using Services;
using Autofac;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;

namespace API.Helper.AutofacHelper
{
    public class AutofacModule : Module
    {
        private string _connectionString;

        public AutofacModule(string connectionString)
        {
            _connectionString = connectionString;
        }

        protected override void Load(ContainerBuilder builder)
        {
            //builder.RegisterControllers(Assembly.GetExecutingAssembly());

            //// OPTIONAL: Register the Autofac filter provider.
            //builder.RegisterFilterProvider();

            //services.AddSingleton<IDbConnection>((sp) => new MySqlConnection(connectionString));
            // Register Connection class and expose IConnection 
            // by passing in the Database connection information
            builder.RegisterType<MySqlConnection>() // concrete type
                .As<IDbConnection>() // abstraction
                .WithParameter("connectionString", _connectionString)
                .InstancePerLifetimeScope();

            #region load types base
            //// Scan an assembly for Data layer
            //builder.RegisterAssemblyTypes(typeof(CategoryService).Assembly)
            //    .Where(t => t.Name.EndsWith("Service"))
            //    .AsImplementedInterfaces()
            //    .WithParameter("connection", _connectionString)
            //.InstancePerLifetimeScope();

            // Scan an assembly for Business Service
            builder.RegisterAssemblyTypes(typeof(UserBS).Assembly)
               .Where(t => t.Name.EndsWith("BS"))
               .AsImplementedInterfaces()
            .InstancePerLifetimeScope();
            #endregion

        }
    }
}
