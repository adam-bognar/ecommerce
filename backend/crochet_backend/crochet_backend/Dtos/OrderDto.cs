namespace crochet_backend.Dtos
{
    public record OrderDto
    (
         int Id ,
        string Status ,
         DateTime CreatedAt,
         double TotalPrice,
        List<OrderItemDto> Items 
    );
}
