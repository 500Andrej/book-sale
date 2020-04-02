using BookSale.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace BookSale.Data
{
    public class BookSaleDbContext : DbContext
    {
        public BookSaleDbContext(DbContextOptions<BookSaleDbContext> options) : base(options) { }

        public DbSet<BookAuthor> BookAuthors { get; set; }
        public DbSet<BookEntity> Books { get; set; }
        public DbSet<AuthorEntity> Authors { get; set; }
        public DbSet<PromoCodeEntity> PromoCodes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<BookAuthor>(entity =>
            {
                entity.HasKey(bc => new { bc.BookId, bc.AuthorId });

                entity.HasOne(bc => bc.Book)
                    .WithMany(b => b.BookAuthors)
                    .HasForeignKey(bc => bc.BookId);

                entity.HasOne(bc => bc.Author)
                    .WithMany(c => c.BookAuthors)
                    .HasForeignKey(bc => bc.AuthorId);
            });


            modelBuilder.Entity<BookEntity>(entity =>
            {
                entity.Property(book => book.Id).ValueGeneratedOnAdd();
                entity.Property(book => book.Name).HasMaxLength(256);
                entity.Property(book => book.ISBN).HasMaxLength(128);
                entity.Property(book => book.Amount).HasColumnType("money");
            });

            modelBuilder.Entity<AuthorEntity>(entity =>
            {
                entity.Property(book => book.Id).ValueGeneratedOnAdd();
                entity.Property(book => book.FirstName).HasMaxLength(256);
                entity.Property(book => book.LastName).HasMaxLength(256);
                entity.Property(book => book.Patronymic).HasMaxLength(256);
            });

            modelBuilder.Entity<PromoCodeEntity>(entity =>
            {
                entity.Property(book => book.Id).ValueGeneratedOnAdd();
                entity.Property(book => book.PromoCode).HasDefaultValueSql("NEWID()");
                entity.HasIndex(book => book.PromoCode);
                entity.Property(book => book.DateOfCreation).HasDefaultValueSql("GETDATE()");
            });
        }
    }
}
