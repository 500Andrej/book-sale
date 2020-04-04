using BookSale.Business.Interfaces;
using BookSale.Business.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using BookSale.Web.ViewModels;

namespace BookSale.Web.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BookController : ControllerBase
    {
        private readonly IBookService _bookService;
        private readonly IMapper _mapper;

        public BookController(IBookService bookService, IMapper mapper)
        {
            _bookService = bookService;
            _mapper = mapper;
        }

        [HttpGet("[action]")]
        public async Task<IEnumerable<BookViewModel>> All()
        {
            var books = await _bookService.GetAllBooks();

            return _mapper.Map<IEnumerable<BookViewModel>>(books);
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