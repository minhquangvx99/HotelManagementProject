using Dapper;
using System.Collections.Generic;

namespace BusinessLogicLayer.Interfaces
{
    public interface IBaseBS<T, TEntity, TKey>
    {
        IEnumerable<TEntity> GetAll(object predicate = null);
        IEnumerable<TEntity> GetPaging(int pageIndex, int pageSize, ref int totalRow, string condition = "", string orderBy = "");
        IEnumerable<TEntity> GetPaging(SqlBuilder.Template selector, SqlBuilder.Template counter, int pageIndex, int pageSize, ref int totalRow);
        int Count<TEntity>(string conditions = "") where TEntity : class;
        TEntity GetById(int id);
        TEntity Insert(TEntity entity);
        bool Update(TEntity entity);
        bool Delete(TEntity entity);
        bool DeleteList<TEntity>(object predicate = null);
    }
}
