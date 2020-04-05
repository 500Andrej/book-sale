using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookSale.Web.ViewModels
{
    public class BookViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime ReleaseDate { get; set; }
        public string ISBN { get; set; }
        public string Picture { get; set; }
        public decimal Amount { get; set; }
        public int Count { get; set; }
        public IEnumerable<string> Authors { get; set; }
    }
}
