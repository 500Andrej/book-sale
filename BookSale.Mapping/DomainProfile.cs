using System;
using AutoMapper;
using BookSale.Business.Models;
using BookSale.Data.Entities;

namespace BookSale.Mapping
{
    public class DomainProfile : Profile
    {
        public DomainProfile()
        {
            // Domain to entities
            CreateMap<BookModel, BookEntity>();
            CreateMap<AuthorModel, AuthorEntity>();
            CreateMap<PromoCodeModel, PromoCodeEntity>();

            // Entities to domain 
            CreateMap<BookEntity, BookModel>();
            CreateMap<AuthorEntity, AuthorModel>();
            CreateMap<PromoCodeEntity, PromoCodeModel>();
        }
    }
}
