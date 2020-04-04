using BookSale.Business.Interfaces;
using BookSale.Business.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookSale.Web.ViewModels;

namespace BookSale.Web.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BookController : ControllerBase
    {
        private readonly IBookService _bookService;

        public BookController(IBookService bookService)
        {
            _bookService = bookService;
        }

        [HttpGet("[action]")]
        public async Task<IEnumerable<BookModel>> GetAll()
        {
            return await _bookService.GetAllBooks();
        }

        [HttpPost("[action]")]
        public async Task<ActionResult> Buy(BayBookViewModel bayBookModel)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.SelectMany(x => x.Value.Errors);

                return new JsonResult(new { message = string.Join(", ", errors) });
            }
            await _bookService.BuyBook(bayBookModel.BookId, bayBookModel.Count);
            return Ok();
        }
    }
}