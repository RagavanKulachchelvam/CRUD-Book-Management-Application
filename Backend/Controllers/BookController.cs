using Backend.Models;
using Backend.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly BookRepository book;
        public BookController(BookRepository bookRepository)
        {
            this.book = bookRepository;
        }

        [HttpGet]
        public async Task<ActionResult> BookList()
        {
            var allBooks = await book.GetAllBooks();
            return Ok(allBooks);
        }

        [HttpPost]
        public async Task<ActionResult> AddBook(Book bk)
        {
            await book.SaveBook(bk);
            return Ok(bk);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> updateEmployee(int id, [FromBody] Book bk)
        {
            await book.updateBook(id, bk);
            return Ok(bk);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> deleteBook(int id)
        {
            await book.DeleteBook(id);
            return Ok();
        }
    }
}
