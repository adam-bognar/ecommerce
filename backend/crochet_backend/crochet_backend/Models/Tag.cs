namespace crochet_backend.Models
{
    public partial class Tag
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<ProductTag> ProductTags { get; set; } = new List<ProductTag>();
    }

}
