using BusinessLogicLayer;
using BusinessLogicLayer.Interfaces;
using Services;
using Autofac;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;
using System.Data.SqlClient;

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
            // Đăng ký SqlConnection cho SQL Server
            builder.RegisterType<SqlConnection>() // concrete type
                .As<IDbConnection>()              // abstraction
                .WithParameter("connectionString", _connectionString)
                .InstancePerLifetimeScope();

            // Đăng ký các class Business Logic Layer (có hậu tố "BS")
            builder.RegisterAssemblyTypes(typeof(UserBS).Assembly)
               .Where(t => t.Name.EndsWith("BS"))
               .AsImplementedInterfaces()
               .InstancePerLifetimeScope(); 
        }
    }
}
