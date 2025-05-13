using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.AspNetCore.Mvc.ModelBinding.Metadata;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace API.Code
{
    public class PostMultipleParams : ModelBinderAttribute
    {

    }
    public class ModelMultipleBinder : IModelBinder
    {
        public ModelMultipleBinder()
        {
        }
        public Task BindModelAsync(ModelBindingContext bindingContext)
        {
            if (bindingContext == null)
                throw new ArgumentNullException(nameof(bindingContext));

            try
            {
                bindingContext.HttpContext.Request.EnableBuffering();
                var stream = new MemoryStream();
                bindingContext.HttpContext.Request.Body.Position = 0;
                bindingContext.HttpContext.Request.Body.Seek(0, SeekOrigin.Begin);
                bindingContext.HttpContext.Request.Body.CopyTo(stream);
                stream.Position = 0;
                stream.Seek(0, SeekOrigin.Begin);

                var valueFromBody = "";
                using (var sr = new StreamReader(stream))
                {
                    valueFromBody = sr.ReadToEnd();
                }
                var paramObj = JObject.Parse(valueFromBody);

                var param = paramObj[bindingContext.ModelMetadata.Name];

                var p = param.ToObject(bindingContext.ModelMetadata.ModelType);

                bindingContext.Result = ModelBindingResult.Success(p);
            }
            catch (Exception ex)
            {
                bindingContext.Result = ModelBindingResult.Success(null);
            }

            return Task.CompletedTask;
        }
    }

    public class ModelMultipleBinderProvider : IModelBinderProvider
    {
        public IModelBinder GetBinder(ModelBinderProviderContext context)
        {
            if (context == null)
            {
                throw new ArgumentNullException(nameof(context));
            }

            var defaultModelMeta = (DefaultModelMetadata)context.Metadata;
            if (defaultModelMeta != null && defaultModelMeta.Attributes != null && defaultModelMeta.Attributes.Attributes != null && defaultModelMeta.Attributes.Attributes.Select(e => e.GetType()).Contains(typeof(PostMultipleParams)))
            {
                return new ModelMultipleBinder();
            }

            return null;
        }
    }
}
