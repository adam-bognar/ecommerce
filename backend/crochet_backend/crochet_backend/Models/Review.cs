namespace crochet_backend.Models
{
    public partial class Review
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public virtual Product Product { get; set; }

        public string UserId { get; set; }
        public virtual User User { get; set; }

        public int Rating { get; set; } // Out of 5
        public string TextReview { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }

}
