using System;
using System.Collections.Generic;
using System.Text;

namespace BookSale.Data.Entities
{
    public class BookEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime ReleaseDate { get; set; }
        public string ISBN { get; set; }
        public string Picture { get; set; }
        public decimal Amount { get; set; }
        public int Count { get; set; }
        public ICollection<BookAuthor> BookAuthors { get; set; }
    }
}
