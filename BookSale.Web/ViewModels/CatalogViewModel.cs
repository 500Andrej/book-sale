using System.Collections.Generic;

namespace BookSale.Web.ViewModels
{
    public class CatalogViewModel
    {
        public IEnumerable<BookViewModel> Books { get; set; }

        public int TotalCount { get; set; }
    }
}
