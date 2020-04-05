using System;

namespace BookSale.Data.Entities
{
    public class PromoCodeEntity
    {
        public int Id { get; set; }
        public Guid PromoCode { get; set; }
        public DateTime DateOfCreation { get; set; }
        public PromoCodeState State { get; set; }

    }

    public enum PromoCodeState
    {
        NotActive,
        Active
    }
}
