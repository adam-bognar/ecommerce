namespace crochet_backend.Models
{
    public partial class Cart
    {
        public Cart()
        {
            CartItems = new HashSet<CartItem>();
        }

        public int Id { get; set; }
        public string UserId { get; set; }
        public virtual User User { get; set; }
        public int TotalPrice { get; set; }
        public ICollection<CartItem> CartItems { get; set; }
    }
}
