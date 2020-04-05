using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using BookSale.Business.Interfaces;
using BookSale.Business.Models;
using BookSale.Data;
using Microsoft.EntityFrameworkCore;

namespace BookSale.Business.Implementations
{
    public class BookService : BaseService, IBookService
    {
        private readonly IMapper _mapper;
        public BookService(BookSaleDbContext dataContext, IMapper mapper) : base(dataContext)
        {
            _mapper = mapper;
        }

        public async Task<CatalogModel> GetBooks(int pageIndex, int pageSize)
        {
            if (pageIndex < 1)
            {
                throw new ArgumentException(nameof(pageIndex));
            }
            if (pageSize < 1)
            {
                throw new ArgumentException(nameof(pageSize));
            }
            var totalCount = await DataContext.Books.CountAsync();

            var books = await DataContext.Books
                .Include(book => book.BookAuthors)
                .ThenInclude(bookAuthors => bookAuthors.Author)
                .ProjectTo<BookModel>(_mapper.ConfigurationProvider)
                .Skip(pageSize * (pageIndex - 1))
                .Take(pageSize)
                .ToListAsync();

            return new CatalogModel
            {
                Books = books,
                TotalCount = totalCount
            };
        }

        public async Task BuyBook(Dictionary<int, int> booksIdsWithCountToBuy)
        {
            if (booksIdsWithCountToBuy == null)
            {
                throw new ArgumentNullException(nameof(booksIdsWithCountToBuy));
            }

            var bookIds = booksIdsWithCountToBuy.Select(bc => bc.Key);
            var targetBook = await DataContext.Books.Where(book => bookIds.Contains(book.Id)).ToListAsync();

            if (targetBook == null || bookIds.Count() != targetBook.Count)
            {
                throw new InvalidOperationException("Target books not founded");
            }
            if (targetBook.Sum(book => book.Amount) <= 2000)
            {
                throw new InvalidOperationException("Insufficient amount to buy");
            }
            if (targetBook.Any(book => book.Count < booksIdsWithCountToBuy[book.Id]))
            {
                throw new InvalidOperationException("Not enough books");
            }

            targetBook.ForEach(book => book.Count -= booksIdsWithCountToBuy[book.Id]);

            await DataContext.SaveChangesAsync();
        }
    }
}
