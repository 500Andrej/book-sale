using System;
using System.Threading.Tasks;
using BookSale.Business.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace BookSale.Web.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PromoCodeController : ControllerBase
    {
        private readonly IPromoCodeService _promoCodeService;

        public PromoCodeController(IPromoCodeService promoCodeService)
        {
            _promoCodeService = promoCodeService;
        }

        [HttpGet("[action]")]
        public async Task<Guid> GenerateNew()
        {
            var newPromoCode = await _promoCodeService.GenerateNewPromoCode();
            return newPromoCode.PromoCode;
        }
    }
}