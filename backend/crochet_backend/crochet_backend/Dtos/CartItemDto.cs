namespace crochet_backend.Dtos
{
    public record CartItemDto(
        int productId,
        string ProductName,
        double Price,
        int Quantity
        );
}
