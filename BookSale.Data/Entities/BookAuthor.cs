using System;
using System.Collections.Generic;
using System.Text;

namespace BookSale.Data.Entities
{
    public class BookAuthor
    {
        public int BookId { get; set; }
        public BookEntity Book { get; set; }

        public int AuthorId { get; set; }
        public AuthorEntity Author { get; set; }
    }
}
