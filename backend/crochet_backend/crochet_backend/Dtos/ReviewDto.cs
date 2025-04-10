namespace crochet_backend.Dtos
{
    public record ReviewDto(
     int Id,
     string username,
     int Rating,
     string TextReview,
     DateTime CreatedAt,
     string? ProductName
 );

}
