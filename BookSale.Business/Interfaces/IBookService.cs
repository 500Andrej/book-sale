using System.Collections.Generic;
using System.Threading.Tasks;
using BookSale.Business.Models;

namespace BookSale.Business.Interfaces
{
    public interface IBookService
    {
        Task<CatalogModel> GetBooks(int pageIndex, int pageSize);

        Task BuyBook(int bookId, int count);
    }
}