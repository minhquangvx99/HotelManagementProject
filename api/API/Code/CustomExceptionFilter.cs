using Microsoft.AspNetCore.Mvc.Filters;

namespace MNP.Code
{
    public class CustomExceptionFilter : IExceptionFilter
    {
        private static readonly log4net.ILog logQ = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
        public void OnException(ExceptionContext context)
        {
            logQ.ErrorFormat("{0}", "ErrorPosition: " + context.Exception.StackTrace + " - Error: " + context.Exception.Message);
        }
    }
}
