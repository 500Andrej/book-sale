using AutoMapper;
using BookSale.Business.Interfaces;
using BookSale.Web.ViewModels;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading.Tasks;
using BookSale.Web.Attributes;

namespace BookSale.Web.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [PromoCodeRequirement]
    public class BookController : ControllerBase
    {
        private readonly IBookService _bookService;
        private readonly IMapper _mapper;

        public BookController(IBookService bookService, IMapper mapper)
        {
            _bookService = bookService;
            _mapper = mapper;
        }

        [HttpGet("[action]/{pageIndex}/{pageSize}")]
        public async Task<CatalogViewModel> Catalog(int pageIndex, int pageSize)
        {
            var catalog = await _bookService.GetBooks(pageIndex, pageSize);

            return _mapper.Map<CatalogViewModel>(catalog);
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