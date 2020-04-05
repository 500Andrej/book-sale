using System.ComponentModel.DataAnnotations;

namespace BookSale.Web.ViewModels
{
    public class BuyBookViewModel
    {
        [Required]
        [Range(0, int.MaxValue, ErrorMessage = "Идентификатор книги должен быть положительным")]
        public int BookId { get; set; }
        
        [Required]
        [Range(1, int.MaxValue, ErrorMessage = "Количество книг к покупке должно быть больше 0")]
        public int Count { get; set; }
    }
}
