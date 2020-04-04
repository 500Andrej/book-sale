using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System.IO;
using System.Net;
using System.Threading.Tasks;

namespace BookSale.Web.Middleware
{
    internal class JsonExceptionMiddleware
    {
        /// <summary>
        /// Метод обработки ошибок
        /// </summary>
        /// <param name="context">Контекст запроса</param>
        /// <returns></returns>
        public async Task Invoke(HttpContext context)
        {
            var ex = context.Features.Get<IExceptionHandlerFeature>()?.Error;
            if (ex == null)
            {
                return;
            }

            if (!(context.RequestServices.GetService(typeof(ILogger<JsonExceptionMiddleware>)) is ILogger logger))
            {
                return;
            }

            logger.LogError(ex, "Error occured");

            if (ex.InnerException != null)
            {
                logger.LogError(ex.InnerException, "Inner ixception:");
            }

            context.Response.StatusCode = (int) HttpStatusCode.InternalServerError;
            context.Response.ContentType = "application/json";

            using (var writer = new StreamWriter(context.Response.Body))
            {
                var json = JsonConvert.SerializeObject(new {Message = "Произошла ошибка"}, new JsonSerializerSettings
                {
                    ContractResolver = new CamelCasePropertyNamesContractResolver()
                });
                await writer.WriteAsync(json);
                await writer.FlushAsync().ConfigureAwait(false);

            }
        }
    }
}
