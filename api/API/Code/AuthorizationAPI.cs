using API.Models;
using JWT.Algorithms;
using JWT.Builder;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Net;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Controllers;
using Entities.Users;

namespace API.Code
{
    public class AuthorizationAPI : Attribute, IAuthorizationFilter
    {
        public static string TokenSecret = "K8n#7vR!qz3*W@dY$P9lTbXe&MjA6fNc";
        public void OnAuthorization(AuthorizationFilterContext filterContext)
        {
            bool skipAuthorization = (filterContext.ActionDescriptor as ControllerActionDescriptor).MethodInfo.IsDefined(typeof(AllowAnonymousAttribute), true);
            if (skipAuthorization) return;
            Microsoft.Extensions.Primitives.StringValues authTokens;
            filterContext.HttpContext.Request.Headers.TryGetValue("Token", out authTokens);
            var _token = authTokens.FirstOrDefault();
            if (_token != null)
            {
                try
                {
                    var payload = new JwtBuilder()
                        .WithAlgorithm(new HMACSHA256Algorithm()) // symmetric
                        .WithSecret(TokenSecret)
                        .MustVerifySignature()
                        .Decode<IDictionary<string, object>>(_token);

                    var serializeModel = JsonConvert.DeserializeObject<UserEntity>(payload["User"].ToString());
                    UserPrincipal newUser = UserPrincipal.genFromModel(serializeModel);
                    filterContext.HttpContext.User = newUser;
                }
                catch (Exception ex)
                {
                    filterContext.HttpContext.Response.StatusCode = (int)HttpStatusCode.Forbidden;
                    filterContext.HttpContext.Response.HttpContext.Features.Get<IHttpResponseFeature>().ReasonPhrase = "Not Authorized";
                    filterContext.Result = new JsonResult("NotAuthorized")
                    {
                        Value = new
                        {
                            Status = "Error",
                            Message = "Invalid Token"
                        },
                    };
                }
            }
            else
            {
                filterContext.HttpContext.Response.StatusCode = (int)HttpStatusCode.ExpectationFailed;
                filterContext.HttpContext.Response.HttpContext.Features.Get<IHttpResponseFeature>().ReasonPhrase = "Please Provide authToken";
                filterContext.Result = new JsonResult("Missing token")
                {
                    Value = new
                    {
                        Status = "Error",
                        Message = "Missing token"
                    },
                };
            }

        }
    }
}
