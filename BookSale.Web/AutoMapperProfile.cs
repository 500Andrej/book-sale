using System.Linq;
using AutoMapper;
using BookSale.Business.Models;
using BookSale.Web.ViewModels;

namespace BookSale.Web
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<BookModel, BookViewModel>()
                .ForMember(dest => dest.Authors, o => o.MapFrom(src => src.Authors.Select(author => $"{author.FirstName} {author.LastName} {author.Patronymic}")));

            CreateMap<PromoCodeModel, PromoCodeViewModel>();

            CreateMap<CatalogModel, CatalogViewModel>();
        }
    }
}
