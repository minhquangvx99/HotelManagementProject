using Core.Helper.Patterns;

namespace Core
{
    public class BaseIpl<T>
    {
        public T unitOfWork;
        protected string _schema;
        protected string _connection;
        /// <summary>
        /// Initializes a new instance of the <see cref="BaseIpl{T}" /> class.
        /// </summary>
        /// <param name="schema">The schema.</param>
        public BaseIpl(string schema = "dbo")
        {
            _schema = schema;
            if (!string.IsNullOrEmpty(_connection))
                unitOfWork = SingletonIpl.GetInstance<T>(schema, _connection);
            else
                unitOfWork = SingletonIpl.GetInstance<T>(schema);
        }
    }
}
