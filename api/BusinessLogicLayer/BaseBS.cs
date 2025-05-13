using BusinessLogicLayer.Interfaces;
using Services;
using Dapper;
using System.Collections.Generic;

namespace BusinessLogicLayer
{
    //Base Business Logic Service Layer
    public class BaseBS<T, TEntity, TKey> : IBaseBS<T, TEntity, TKey>
    {
        protected T _ctx;
        protected IBaseService<TEntity, TKey> _service;
        public BaseBS(T context)
        {
            _ctx = context;
            _service = (IBaseService<TEntity, TKey>)context;
        }

        public int Count<TEntity>(string conditions = "") where TEntity : class
        {
            return _service.Count<TEntity>(conditions);
        }

        public bool Delete(TEntity entity)
        {
            return _service.Delete(entity);
        }
        public bool DeleteList<TEntity>(object predicate = null)
        {
            return _service.DeleteList<TEntity>(predicate);
        }

        public virtual IEnumerable<TEntity> GetAll(object predicate = null)
        {
            return _service.GetAll(predicate);
        }

        public TEntity GetById(int id)
        {
            return _service.GetById(id);
        }
        public virtual IEnumerable<TEntity> GetPaging(int pageIndex, int pageSize, ref int totalRow, string condition = "", string orderBy = "")
        {
            return _service.GetPaging(pageIndex, pageSize, ref totalRow, condition, orderBy);
        }
        public virtual IEnumerable<TEntity> GetPaging(SqlBuilder.Template selector, SqlBuilder.Template counter, int pageIndex, int pageSize, ref int totalRow)
        {
            return _service.GetPaging(selector, counter, pageIndex, pageSize, ref totalRow);
        }
        

        public TEntity Insert(TEntity entity)
        {
            return _service.Insert(entity);
        }

        public bool Update(TEntity entity)
        {
            return _service.Update(entity);
        }
    }
}
