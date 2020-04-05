using BookSale.Data;

namespace BookSale.Business.Implementations
{
    public abstract class BaseService
    {
        protected BookSaleDbContext DataContext { get; set; }

        protected BaseService(BookSaleDbContext dataContext)
        {
            DataContext = dataContext;
        }
    }
}
