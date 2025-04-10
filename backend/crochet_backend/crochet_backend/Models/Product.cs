namespace crochet_backend.Models
{
    public partial class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string ImageUrl { get; set; }
        public string Description { get; set; }
        public double Price { get; set; }
        public int CategoryId { get; set; }
        public virtual Category Category { get; set; }
        public DifficultyLevel Difficulty { get; set; }

        public virtual ICollection<ProductTag> ProductTags { get; set; } 
        public ICollection<Review> Reviews { get; set; }
    }
}
