using System.Collections.Generic;
using System.Threading.Tasks;
using BookSale.Business.Models;

namespace BookSale.Business.Interfaces
{
    public interface IBookService
    {
        Task<IEnumerable<BookModel>> GetAllBooks();

        Task BuyBook(int bookId, int count);
    }
}