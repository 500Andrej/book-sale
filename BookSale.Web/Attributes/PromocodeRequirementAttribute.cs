using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookSale.Business.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection;

namespace BookSale.Web.Attributes
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, AllowMultiple = true)]
    public class PromoCodeRequirementAttribute : Attribute, IAsyncAuthorizationFilter
    {
        public async Task OnAuthorizationAsync(AuthorizationFilterContext context)
        {
            context.HttpContext.Request.Headers.TryGetValue("Authorization", out var promoCodeStr);
            if (!promoCodeStr.Any())
            {
                context.Result = new ForbidResult();
                return;
            }
            var promoCodeService = context.HttpContext.RequestServices.GetService<IPromoCodeService>();

            if (!Guid.TryParse(promoCodeStr[0], out var promoCode) || !await promoCodeService.CodeIsValid(promoCode))
            {
                context.Result = new ForbidResult();
            }
        }
    }
}
