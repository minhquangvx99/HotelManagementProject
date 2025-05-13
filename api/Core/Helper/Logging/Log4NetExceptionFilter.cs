using Microsoft.AspNetCore.Mvc.Filters;
using System;

namespace Core.Helper.Logging
{
    public class Log4NetExceptionFilter : IActionFilter
    {
        public void OnActionExecuted(ActionExecutedContext filterContext)
        {
        }

        public void OnActionExecuting(ActionExecutingContext filterContext)
        {
        }

        public void OnException(ExceptionContext context)
        {
            //HttpContext contextRequest =  HttpContext.Current;
            //var urlCurrent = contextRequest.Request.Url.ToString();
            Exception ex = context.Exception;
            //if (!(ex is HttpException)) //ignore "file not found"
            //{
            //    Logging.PutError("Unhandled exception error -> Url: " + urlCurrent, ex);
            //}
            ////http://www.codeproject.com/Articles/422572/Exception-Handling-in-ASP-NET-MVC
        }
    }
}
