using System;
using System.Collections.Generic;
using System.Text;

namespace BookSale.Data.Entities
{
    public class AuthorEntity
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Patronymic { get; set; }

        public ICollection<BookAuthor> BookAuthors { get; set; }
    }
}
