using System;
using System.Threading.Tasks;
using AutoMapper;
using BookSale.Business.Interfaces;
using BookSale.Business.Models;
using BookSale.Data;
using BookSale.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace BookSale.Business.Implementations
{
    public class PromoCodeService : BaseService, IPromoCodeService
    {
        private readonly IMapper _mapper;

        public PromoCodeService(BookSaleDbContext dataContext, IMapper mapper) : base(dataContext)
        {
            _mapper = mapper;
        }

        public async Task<PromoCodeModel> GenerateNewPromoCode()
        {
            var promoCodeModel = await DataContext.PromoCodes.AddAsync(new PromoCodeEntity
            {
                State = PromoCodeState.Active
            });

            await DataContext.SaveChangesAsync();

            return _mapper.Map<PromoCodeModel>(promoCodeModel);
        }

        public async Task<bool> ThisCodeIsValid(Guid promoCode)
        {
            var promoCodeModel = await DataContext.PromoCodes.FirstOrDefaultAsync(code => code.PromoCode == promoCode);
            return promoCodeModel != null && promoCodeModel.State == PromoCodeState.Active;
        }
    }
}
