using crochet_backend.Models;

namespace crochet_backend.Dtos
{
    public record NewProduct(
        string Name,
        string ImageUrl,
        string Description,
        double Price,
        string CategoryName,
        string Difficulty,
        List<string> Tags
    );
}
