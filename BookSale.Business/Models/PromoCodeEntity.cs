using System;
using BookSale.Data.Entities;

namespace BookSale.Business.Models
{
    public class PromoCodeModel
    {
        public int Id { get; set; }
        public Guid PromoCode { get; set; }
        public DateTime DateOfCreation { get; set; }
        public PromoCodeState State { get; set; }
    }
}
