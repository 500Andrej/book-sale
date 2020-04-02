using System;
using System.Collections.Generic;

namespace BookSale.Business.Models
{
    public class BookModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime ReleaseDate { get; set; }
        public string ISBN { get; set; }
        public string Picture { get; set; }
        public decimal Amount { get; set; }
        public int Count { get; set; }
        public IEnumerable<AuthorModel> Authors { get; set; }
    }
}
