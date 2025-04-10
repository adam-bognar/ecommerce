namespace crochet_backend.Dtos
{
    public record NewOrder
    {
        public List<OrderItemDto> Items { get; set; }
    }
}
