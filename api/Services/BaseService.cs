using System;
using System.Linq;
using System.Collections.Generic;
using System.Data;
using Core.Data;
using Core;
using log4net;
using Dapper;

namespace Services
{
    public class BaseService<T, TKey> : BaseIpl<SqlProvider>, IBaseService<T, TKey> where T : class
    {
        public static readonly ILog Log = LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
        public static BaseService<T, TKey> bll = bll ?? new BaseService<T, TKey>();

        /// <summary>
        /// The _table name
        /// </summary>
        private readonly string _tableName;

        public BaseService(string Connection = "") : base(Connection)
        {
            _connection = Connection;
            _tableName = GetTableName();
        }

        #region base command
        /// <summary>Gets all.</summary>
        /// <param name="predicate">The predicate.</param>
        /// <returns></returns>
        public IEnumerable<T> GetAll(object predicate = null)
        {
            return unitOfWork.GetAll<T>(predicate);
        }

        public IEnumerable<dynamic> Query(string sql, object p = null)
        {
            return unitOfWork.Query<dynamic>(sql, p);
        }

        public virtual IEnumerable<T> Query<T>(string sql, object p = null)
        {
            return unitOfWork.Query<T>(sql, p);
        }

        /// <summary>
        /// Get All data by paging
        /// </summary>
        /// <param name="pageIndex">Index of the page.</param>
        /// <param name="pageSize">Size of the page.</param>
        /// <param name="totalRow">The total row.</param>
        /// <returns>IEnumerable&lt;T&gt;.</returns>
        public virtual IEnumerable<T> GetPaging(int pageIndex, int pageSize, ref int totalRow, string condition = "", string orderBy = "")
        {
            var data = unitOfWork.GetPage<T>(condition, orderBy, pageIndex, pageSize);
            totalRow = unitOfWork.Count<T>(condition);
            return data;
        }

        public IEnumerable<T> GetPaging(SqlBuilder.Template selector, SqlBuilder.Template counter, int pageIndex, int pageSize, ref int totalRow)
        {
            var data = unitOfWork.Query<T>(selector.RawSql, selector.Parameters);
            totalRow = unitOfWork.Query<int>(counter.RawSqlTotal, counter.Parameters).FirstOrDefault();
            return data;
            //return _service.GetPaging(selector, ref totalRow);
        }

        public virtual int Count<T>(string predicate = "") where T : class
        {
            var data = unitOfWork.Count<T>(predicate);
            return data;
        }
        public virtual int CreateTable<T>() where T : class
        {
            var data = unitOfWork.CreateTable<T>();
            return data;
        }

        public virtual int CreateTable(string table, Type type)
        {
            var data = unitOfWork.CreateTable(table, type);
            return data;
        }

        public T GetById(int id)
        {
            return unitOfWork.FindById<T>(id);
        }

        public T Insert(T entity)
        {
            try
            {
                unitOfWork.Insert(entity);
                return entity;
            }
            catch (Exception ex)
            {
                //log and return
                Log.Error(ex);
                return default(T);
            }
        }
        public bool Update(T entity)
        {
            return unitOfWork.Update(entity);
        }
        public bool Delete(T entity)
        {
            return unitOfWork.Delete<T>(entity);
        }
        public bool DeleteList<T>(object predicate = null)
        {
            return unitOfWork.DeleteList<T>(predicate);
        }

        #endregion

        /// <summary>
        /// Gets the name of the table.
        /// </summary>
        /// <returns>System.String.</returns>
        /// <exception cref="System.ArgumentNullException">TableAttribute not found</exception>
        private string GetTableName()
        {
            var temp = typeof(T).CustomAttributes.Where(c => c.AttributeType.Name == "TableAttribute").FirstOrDefault();
            if (temp != null)
            {
                return temp.ConstructorArguments[0].Value.ToString();
            }
            return "";
        }

        /// <summary>
        /// Gets the name of the table.
        /// </summary>
        /// <value>The name of the table.</value>
        public string TableName
        {
            get { return _tableName; }
        }

        private string GetPrimaryKeyColumn()
        {
            return GetPrimaryKeyColumns().FirstOrDefault();
        }
        private IEnumerable<string> GetPrimaryKeyColumns()
        {
            return typeof(T).GetProperties().Where(e =>
            {
                return Attribute.IsDefined(e, typeof(System.ComponentModel.DataAnnotations.KeyAttribute));
            }).Select(e => e.Name);
        }


    }
}
