using Backend.Data;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repository
{
    public class BookRepository
    {
        public readonly AppDbContext db;
        public BookRepository(AppDbContext dbContext)
        {
            this.db = dbContext;
        }
        public async Task<List<Book>> GetAllBooks()
        {
            return await db.Books.ToListAsync();
        }
        public async Task SaveBook(Book book)
        {
            await db.Books.AddAsync(book);
            await db.SaveChangesAsync();
        }

        public async Task updateBook(int id, Book obj)
        {
            var book = await db.Books.FindAsync(id);
            if (book == null)
            {
                throw new Exception("Book Not Found");

            }
            book.Title = obj.Title;
            book.Author = obj.Author;
            book.ISBN = obj.ISBN;
            book.PublicationDate = obj.PublicationDate;

            await db.SaveChangesAsync();
        }

        public async Task DeleteBook(int id)
        {
            var book = await db.Books.FindAsync(id);
            if (book == null)
            {
                throw new Exception("Book Not Found");

            }
            db.Books.Remove(book);
            await db.SaveChangesAsync();
        }
    }
}
