namespace crochet_backend.Models
{
    public class OrderItem
    {
        public int Id { get; set; }

        public int OrderId { get; set; }
        public Order Order { get; set; }

        public int ProductId { get; set; } // Optional, for history reference
        public virtual Product Product { get; set; }
        public int Quantity { get; set; }
    }

}
