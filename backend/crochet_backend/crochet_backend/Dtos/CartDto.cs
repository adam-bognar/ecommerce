namespace crochet_backend.Dtos
{
    public record CartDto(
        int Id, 
        string UserId,
        double TotalPrice,
        List<CartItemDto> CartItems
        );
}
