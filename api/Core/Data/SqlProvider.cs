using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using Dapper;
using Core.Helper.Extensions;
using System.Data.SqlClient;

namespace Core.Data
{
    /// <summary>
    /// help to gets connection string in .config file
    /// </summary>
    public class SqlProvider : IDisposable
    {
        private bool _disposed = false;
        private IDbTransaction _transaction;

        public IDbConnection Connection
        {
            get
            {
                if (ConnectionString != null && ConnectionString != "")
                {
                    SimpleCRUD.SetDialect(SimpleCRUD.Dialect.SQLServer);
                    return new SqlConnection(ConnectionString);
                }

                throw new ApplicationException("Không tìm thấy chuỗi kết nối");
            }
        }

        public string ConnectionString { get; set; }

        public SqlProvider(string connection)
        {
            ConnectionString = connection;
        }

        public virtual T FindById<T>(int id) where T : class
        {
            T item;
            using (var cn = Connection)
            {
                cn.Open();
                item = null;
                item = cn.Get<T>(id);
                cn.Close();
            }
            return item;
        }

        public virtual T Insert<T>(T item) where T : class
        {
            //http://www.contentedcoder.com/2012/12/creating-data-repository-using-dapper.html
            using (var cn = Connection)
            {
                cn.Open();
                var id = cn.Insert(item);
                var idProps = ObjectExtensions.GetPrimaryKeyFromType(item.GetType());
                item.SetPropValue(idProps.Name, id);
                cn.Close();
            }
            return item;
        }

        public virtual bool Update<T>(T item) where T : class
        {
            var data = false;
            using (var cn = Connection)
            {
                cn.Open();
                data = cn.Update(item) > 0;
                cn.Close();
            }
            return data;
        }

        public virtual bool Delete<T>(T item) where T : class
        {
            var data = false;
            using (var cn = Connection)
            {
                cn.Open();
                data = (item != null && item is int ? cn.Delete<T>(Convert.ToInt32(item)) : cn.Delete<T>(item)) > 0;
                cn.Close();
            }
            return data;
        }

        public virtual bool DeleteList<T>(object predicate = null)
        {
            var data = false;
            using (var cn = Connection)
            {
                cn.Open();
                data = (predicate != null && predicate is string ? cn.DeleteList<T>((string)predicate) : cn.DeleteList<T>(predicate)) > 0;
                cn.Close();
            }
            return data;
        }

        public virtual List<T> GetAll<T>(object predicate = null) where T : class
        {
            List<T> data = new List<T>();
            using (var cn = Connection)
            {
                cn.Open();
                var list = (predicate != null && predicate is string) ?
                    cn.GetList<T>((string)predicate) : cn.GetList<T>(predicate);
                if (list.Any()) data = list.ToList();

                cn.Close();
            }
            return data;
        }

        public virtual List<T> GetPage<T>(string conditions = "", string orderby = "", int pageNumber = 0, int rowsPerPage = 10) where T : class
        {
            //https://github.com/tmsmith/Dapper-Extensions/blob/master/DapperExtensions.Test/IntegrationTests/MySql/CrudFixture.cs
            List<T> data = new List<T>();
            using (var cn = Connection)
            {
                cn.Open();
                var list = cn.GetListPaged<T>(pageNumber, rowsPerPage, conditions, orderby);
                if (list.Any()) data = list.ToList();
                cn.Close();
            }
            return data;
        }

        public virtual int Count<T>(string conditions = "") where T : class
        {
            var data = 0;
            using (var cn = Connection)
            {
                cn.Open();
                data = cn.RecordCount<T>(conditions);
                cn.Close();
            }
            return data;
        }

        public virtual int CreateTable<T>() where T : class
        {
            return 0;
        }
        public virtual int CreateTable(string table, Type type)
        {
            return 0;
        }

        /// <summary>
        /// Queries the specified SQL.
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="sql">The SQL.</param>
        /// <param name="p">The p.</param>
        /// <returns></returns>
        public virtual IEnumerable<T> Query<T>(string sql, object p = null)
        {
            IEnumerable<T> item;
            using (var cn = Connection)
            {
                cn.Open();
                item = p != null ? cn.Query<T>(sql, p) : cn.Query<T>(sql);
                cn.Close();
            }
            return item;
        }

        /// <summary>
        /// Queries the specified SQL.
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="sql">The SQL.</param>
        /// <param name="p">The p.</param>
        /// <returns></returns>
        public virtual IEnumerable<dynamic> Query(string sql, object p = null)
        {
            IEnumerable<dynamic> item;
            using (var cn = Connection)
            {
                cn.Open();
                item = p != null ? cn.Query(sql, p) : cn.Query(sql);
                cn.Close();
            }
            return item;
        }

        public virtual int Execute(string sql, object p = null)
        {
            int item;
            using (var cn = Connection)
            {
                cn.Open();
                item = p != null ? cn.Execute(sql, p) : cn.Execute(sql);
                cn.Close();
            }
            return item;
        }

        /// <summary>
        /// Procedures the specified procedure.
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="procedure">The procedure.</param>
        /// <param name="oParams">The o params.</param>
        /// <param name="useCache">if set to <c>true</c> [use cache].</param>
        /// <returns></returns>
        public IEnumerable<T> Procedure<T>(string procedure, object oParams = null, bool useCache = false)
        {
            try
            {
                //https://miniprofiler.com/dotnet/ConsoleDotNetCore
                //using (MiniProfiler.Current.Step(procedure))
                {
                    using (Connection)
                    {
                        var items = Connection.Query<T>(procedure, oParams, commandType: CommandType.StoredProcedure);
                        return items;
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }
            return null;
        }

        /// <summary>
        /// Procedures the query multi.
        /// </summary>
        /// <param name="procedure">The procedure.</param>
        /// <param name="oParams">The o params.</param>
        /// <returns></returns>
        public SqlMapper.GridReader ProcedureQueryMulti(string procedure, object oParams = null, bool useCache = true)
        {
            //using (MiniProfiler.Current.Step(procedure))
            {
                using (Connection)
                {
                    var items = Connection.QueryMultiple(procedure, oParams, commandType: CommandType.StoredProcedure);
                    return items;
                }
            }
        }

        /// <summary>
        /// Procedures the execute.
        /// </summary>
        /// <param name="procedure">The procedure.</param>
        /// <param name="oParams">The o params.</param>
        /// <returns></returns>
        public bool ProcedureExecute(string procedure, object oParams = null)
        {
            try
            {
                //using (MiniProfiler.Current.Step(procedure))
                {
                    using (Connection)
                    {
                        Connection.Execute(procedure, oParams, commandType: CommandType.StoredProcedure);
                    }
                }
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                //Logging.PutError("Procedure Error : - " + procedure + "\r\n Exception: " + ex.Message, ex);
                return false;
            }
        }

        public bool ProcedureExecute(string procedure, int commandTimeout, object oParams = null)
        {
            try
            {
                //using (MiniProfiler.Current.Step(procedure))
                {
                    using (Connection)
                    {
                        Connection.Execute(procedure, oParams, commandType: CommandType.StoredProcedure, commandTimeout: commandTimeout);
                    }
                }
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                //Logging.PutError("Procedure Error : - " + procedure + "\r\n Exception: " + ex.Message, ex);
                return false;
            }
        }

        /// <summary>
        /// Rollbacks the transaction.
        /// </summary>
        /// <exception cref="System.SystemException">
        /// </exception>
        public void RollbackTransaction()
        {
            if (_transaction == null)
            {
                return;
            }

            try
            {
                _transaction.Rollback();
            }
            catch (Exception e)
            {
                throw new SystemException(e.Message);
            }
            finally
            {
                Connection.Close();
                _transaction = null;
            }
        }

        /// <summary>
        /// Calls the protected Dispose method.
        /// </summary>
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        /// <summary>
        /// Releases unmanaged and - optionally - managed resources.
        /// </summary>
        /// <param name="disposing"><c>true</c> to release both managed and unmanaged resources; <c>false</c> to release only unmanaged resources.</param>
        protected virtual void Dispose(bool disposing)
        {
            if (!_disposed)
            {
                if (disposing)
                {
                }
                _disposed = true;
            }
        }

        /// <summary>
        /// Finalizes an instance of the <see cref="MysqlProvider"/> class.
        /// </summary>
        ~SqlProvider()
        {
            Dispose(false);
        }
    }
}
