using System;
using System.Threading.Tasks;
using BookSale.Business.Models;

namespace BookSale.Business.Interfaces
{
    public interface IPromoCodeService
    {
        Task<PromoCodeModel> GenerateNewPromoCode();

        Task<bool> ThisCodeIsValid(Guid promoCode);
    }
}