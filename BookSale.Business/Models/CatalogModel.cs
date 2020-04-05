using System;
using System.Collections.Generic;
using System.Text;

namespace BookSale.Business.Models
{
    public class CatalogModel
    {
        public IEnumerable<BookModel> Books { get; set; }

        public int TotalCount { get; set; }
    }
}
