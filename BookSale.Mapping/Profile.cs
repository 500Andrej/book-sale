using System;
using System.Linq;
using AutoMapper;
using BookSale.Business.Models;
using BookSale.Data.Entities;

namespace BookSale.Mapping
{
    public class Profile : AutoMapper.Profile
    {
        public Profile()
        {
            // Domain to entities
            CreateMap<BookModel, BookEntity>();
            CreateMap<AuthorModel, AuthorEntity>();
            CreateMap<PromoCodeModel, PromoCodeEntity>();

            // Entities to domain 
            CreateMap<AuthorEntity, AuthorModel>();
            CreateMap<BookEntity, BookModel>()
                .ForMember(dest => dest.Authors, o => o.MapFrom(src => src.BookAuthors.Select(ba => ba.Author)));
            CreateMap<PromoCodeEntity, PromoCodeModel>();
        }
    }
}
