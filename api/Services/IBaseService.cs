using Dapper;
using System.Collections.Generic;

namespace Services
{
    public interface IBaseService<T, TKey>
    {
        IEnumerable<T> GetAll(object predicate = null);
        IEnumerable<T> GetPaging(int pageIndex, int pageSize, ref int totalRow, string condition = "", string orderBy = "");
        IEnumerable<T> GetPaging(SqlBuilder.Template selector, SqlBuilder.Template counter, int pageIndex, int pageSize, ref int totalRow);
        int Count<T>(string conditions = "") where T : class;
        T GetById(int id);
        T Insert(T entity);
        bool Update(T entity);
        bool Delete(T entity);
        bool DeleteList<T>(object predicate = null);
    }
}
