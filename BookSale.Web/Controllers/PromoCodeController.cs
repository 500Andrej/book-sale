using System;
using System.Threading.Tasks;
using AutoMapper;
using BookSale.Business.Interfaces;
using BookSale.Web.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace BookSale.Web.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PromoCodeController : ControllerBase
    {
        private readonly IPromoCodeService _promoCodeService;
        private readonly IMapper _mapper;

        public PromoCodeController(IPromoCodeService promoCodeService, IMapper mapper)
        {
            _promoCodeService = promoCodeService;
            _mapper = mapper;
        }

        [HttpGet("[action]")]
        public async Task<PromoCodeViewModel> GenerateNew()
        {
            var newPromoCode = await _promoCodeService.GenerateNewPromoCode();
            return _mapper.Map<PromoCodeViewModel>(newPromoCode);
        }

        //public async Task<bool> CodeIsValid()
        //{

        //}
    }
}