using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Q1WebAPI.Models;

namespace Q1WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BooksController : ControllerBase
    {
        private readonly LibraryContext _context;

        public BooksController(LibraryContext context)
        {
            _context = context;
        }

        // ================= GET ALL =================
        // GET: api/books
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Book>>> GetBooks()
        {
            var books = await _context.Books.ToListAsync();
            return Ok(books);
        }

        // ================= GET BY ID =================
        // GET: api/books/5
        [HttpGet("{id:int}")]
        public async Task<ActionResult<Book>> GetBook(int id)
        {
            var book = await _context.Books.FindAsync(id);
            if (book == null)
                return NotFound(new { message = $"Không tìm thấy sách có id = {id}" });

            return Ok(book);
        }

        // ================= POST (CREATE) =================
        // POST: api/books
        [HttpPost]
        public async Task<ActionResult<Book>> CreateBook([FromBody] Book book)
        {
            if (book == null)
                return BadRequest(new { message = "Dữ liệu gửi lên không hợp lệ" });

            // Không cho client set Id thủ công
            book.Id = 0;

            _context.Books.Add(book);
            await _context.SaveChangesAsync();

            // Trả về object + location
            return CreatedAtAction(nameof(GetBook), new { id = book.Id }, book);
        }

        // ================= PUT (UPDATE) =================
        // PUT: api/books/5
        [HttpPut("{id:int}")]
        public async Task<IActionResult> UpdateBook(int id, [FromBody] Book book)
        {
            if (book == null || id != book.Id)
                return BadRequest(new { message = "ID không khớp hoặc dữ liệu trống" });

            var existing = await _context.Books.FindAsync(id);
            if (existing == null)
                return NotFound(new { message = $"Không tìm thấy sách id = {id}" });

            // Cập nhật thủ công từng trường
            existing.Title = book.Title;
            existing.Author = book.Author;
            existing.Year = book.Year;
            existing.Price = book.Price;

            await _context.SaveChangesAsync();
            return Ok(existing);
        }

        // ================= DELETE =================
        // DELETE: api/books/5
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteBook(int id)
        {
            var book = await _context.Books.FindAsync(id);
            if (book == null)
                return NotFound(new { message = $"Không tìm thấy sách id = {id}" });

            _context.Books.Remove(book);
            await _context.SaveChangesAsync();

            return Ok(new { message = $"Đã xóa sách có id = {id}" });
        }
    }
}
