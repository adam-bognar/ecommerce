namespace crochet_backend.Dtos
{
    public record NewReview(
        string UserId,
        int Rating,
        string TextReview,
        DateTime CreatedAt,
        string ProductName
    );
}
