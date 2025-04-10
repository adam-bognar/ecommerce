namespace crochet_backend.Dtos
{
    public record OrderItemDto
    (
         string ProductName,
         double Price,
         int Quantity
    );
}
