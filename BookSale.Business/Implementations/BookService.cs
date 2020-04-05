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

        public async Task BuyBook(int bookId, int count)
        {
            if (bookId < 0)
            {
                throw new ArgumentException(nameof(bookId));
            }
            if (count < 0)
            {
                throw new ArgumentException(nameof(count));
            }
            var targetBook = await DataContext.Books.FirstOrDefaultAsync(book => book.Id == bookId);
            if (targetBook == null)
            {
                throw new InvalidOperationException("Target book not fount");
            }
            if (targetBook.Count < count)
            {
                throw new InvalidOperationException("Not enough books");
            }

            targetBook.Count = targetBook.Count - count;

            await DataContext.SaveChangesAsync();
        }
    }
}
