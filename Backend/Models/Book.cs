using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class Book
    {
        [Key]
        public int Id { get; set; }

        public required string Title { get; set; }

        public required string Author { get; set; }

        public string? ISBN { get; set; }

        public DateTime PublicationDate { get; set; }
    }
}
