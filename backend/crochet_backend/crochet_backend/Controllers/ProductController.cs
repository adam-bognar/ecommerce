using crochet_backend.Data;
using crochet_backend.Dtos;
using crochet_backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System.Linq;

namespace crochet_backend.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;



        public ProductController(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        private string GetBaseUrl() => $"{Request.Scheme}://{Request.Host}";

        [HttpGet]
        public List<Dtos.ProductDto> GetProducts(
           [FromQuery] string? category,
           [FromQuery] string? search,
           [FromQuery] List<string>? difficulty,  // Accept multiple difficulty values
           [FromQuery] int? minPrice,
           [FromQuery] int? maxPrice,
           [FromQuery] string? sort

         )
        {
            var query = _dbContext.Products
                .Include(pt => pt.ProductTags)
                .ThenInclude(t => t.Tag)
                .Include(p => p.Category)
                .AsQueryable();

            if (!string.IsNullOrEmpty(category))
                query = query.Where(p => p.Category.Name == category);

            if (!string.IsNullOrEmpty(search))
                query = query.Where(p => p.Name.Contains(search) || p.ProductTags.Any(pt => pt.Tag.Name.Contains(search)));

            if (difficulty is { Count: > 0 }) 
                query = query.Where(p => difficulty.Contains(p.Difficulty.ToString()));

            if (maxPrice == 0 || (minPrice.HasValue && maxPrice.HasValue && minPrice > maxPrice))
            {
                maxPrice = null;
                minPrice = null;
            }

            if (minPrice.HasValue)
                query = query.Where(p => p.Price >= minPrice);

            if (maxPrice.HasValue)
                query = query.Where(p => p.Price <= maxPrice);

            if (sort == "priceAsc") query = query.OrderBy(p => p.Price);
            else if (sort == "priceDesc") query = query.OrderByDescending(p => p.Price);
            else if (sort == "nameAsc") query = query.OrderBy(p => p.Name);
            else if (sort == "nameDesc") query = query.OrderByDescending(p => p.Name);



            var result = query
                .Select(p => new Dtos.ProductDto(
                    p.Id,
                    p.Name,
                    $"{GetBaseUrl()}/api/Images/{p.ImageUrl}",
                    p.Description,
                    p.Price,
                    p.Category.Name,
                    p.Difficulty.ToString(),
                    p.ProductTags.Select(pt => pt.Tag.Name).ToList(),
                    p.Reviews.Select(r => new ReviewDto(
                        r.Id,
                        r.User.UserName,
                        r.Rating,
                        r.TextReview,
                        r.CreatedAt,
                        null
                    )).ToList(
                ))).ToList();

            return result;
        }


        [HttpGet("{id}/similar")]
        public ActionResult<List<ProductDto>> GetSimilarProducts(int id)
        {
            var product = _dbContext.Products
                .Include(p => p.ProductTags)
                .ThenInclude(pt => pt.Tag)
                .SingleOrDefault(x => x.Id == id);
            if (product == null)
            {
                return NotFound();
            }

            var tagIds = product.ProductTags.Select(pt => pt.TagId).ToList();

            var similarProducts = _dbContext.Products
                .Include(p => p.ProductTags)
                .ThenInclude(pt => pt.Tag)
                .Include(r => r.Reviews)
                .ThenInclude(u => u.User)
                .Where(p => p.Id != id && p.ProductTags.Any(pt => tagIds.Contains(pt.TagId)))
                .Select(p => new ProductDto(
                    p.Id,
                    p.Name,
                    $"{GetBaseUrl()}/api/Images/{p.ImageUrl}",
                    p.Description,
                    p.Price,
                    p.Category.Name,
                    p.Difficulty.ToString(),
                    p.ProductTags.Select(pt => pt.Tag.Name).ToList(),
                    p.Reviews.Select(r => new ReviewDto(
                        r.Id,
                        r.User.UserName,
                        r.Rating,
                        r.TextReview,
                        r.CreatedAt,
                        null
                    )).ToList()
                ))
                .ToList().Take(4);
            return Ok(similarProducts);
        }

        [HttpGet("{id}")]
        public ActionResult<Dtos.ProductDto> GetProduct(int id)
        {
            var product = _dbContext.Products
                .Include(p => p.Category)
                .Include(pt => pt.ProductTags)
                .ThenInclude(t => t.Tag)
                .Include(p => p.Reviews)
                .ThenInclude(r => r.User)
                .SingleOrDefault(x => x.Id == id);

            var reviews = product.Reviews.Select(r => new ReviewDto(
                r.Id,
                r.User.UserName,
                r.Rating,
                r.TextReview,
                r.CreatedAt,
                null
            )).ToList();

            return product == null
                ? NotFound()
                : Ok(new Dtos.ProductDto(
                    product.Id,
                    product.Name,
                   $"{GetBaseUrl()}/api/Images/{product.ImageUrl}",
                    product.Description,
                    product.Price,
                    product.Category.Name,
                    product.Difficulty.ToString(),
                    product.ProductTags.Select(pt => pt.Tag.Name).ToList(),
                    reviews
                ));


        }

        [HttpPost]
        public ActionResult<Dtos.ProductDto> CreateProduct([FromBody] Dtos.NewProduct newProduct)
        {
            var category = _dbContext.Categories.SingleOrDefault(x => x.Name == newProduct.CategoryName);
            if (category == null)
            {
                category = new Category() { Name = newProduct.CategoryName };
            }
            var difficulty = Enum.Parse<DifficultyLevel>(newProduct.Difficulty);

            var product = new Product()
            {
                Name = newProduct.Name,
                ImageUrl = newProduct.ImageUrl,
                Description = newProduct.Description,
                Price = newProduct.Price,
                Category = category,
                Difficulty = difficulty,
                Reviews = new List<Review>(),
                ProductTags = new List<ProductTag>()
            };

            var tags = _dbContext.Tags
                   .Where(t => newProduct.Tags.Contains(t.Name))
                   .ToList();

            foreach (var tagName in newProduct.Tags)
            {
                if (!tags.Any(t => t.Name == tagName))
                {
                    var newTag = new Tag() { Name = tagName };
                    tags.Add(newTag);
                }
            }

            foreach (var tag in tags)
            {
                product.ProductTags.Add(new ProductTag() { Product = product, Tag = tag });
            }

            _dbContext.Products.Add(product);
            _dbContext.SaveChanges();

            return CreatedAtAction(
                nameof(GetProduct),
                new { id = product.Id },
                new Dtos.ProductDto(
                product.Id,
                product.Name,
                product.ImageUrl,
                product.Description,
                product.Price,
                product.Category.Name,
                product.Difficulty.ToString(),
                product.ProductTags.Select(pt => pt.Tag.Name).ToList(),
                null
            ));
        }



        [HttpPut("{id}")]
        public ActionResult<Dtos.ProductDto> UpdateProduct([FromRoute] int id, [FromBody] Dtos.ProductDto updated)
        {
            if (id != updated.Id)
            {
                return BadRequest();
            }

            var product = _dbContext.Products.SingleOrDefault(x => x.Id == id);
            if (product == null)
            {
                return NotFound();
            }

            var category = _dbContext.Categories.SingleOrDefault(x => x.Name == updated.CategoryName);
            if (category == null)
            {
                category = new Category() { Name = updated.CategoryName };
            }

            Enum.TryParse<DifficultyLevel>(updated.Difficulty, true, out var difficulty);

            var productTags = _dbContext.ProductTags
                .Where(pt => pt.ProductId == product.Id).ToList();

            product.Name = updated.Name;
            product.ImageUrl = updated.ImageUrl;
            product.Description = updated.Description;
            product.Price = updated.Price;
            product.CategoryId = category.Id;
            product.Difficulty = difficulty;
            product.ProductTags = updated.Tags.Select(tagName =>
            {
                var tag = _dbContext.Tags.SingleOrDefault(t => t.Name == tagName);
                if (tag == null)
                {
                    tag = new Tag() { Name = tagName };
                }
                if (productTags.Any(pt => pt.TagId == tag.Id)) productTags.SingleOrDefault(pt => pt.TagId == tag.Id);

                return new ProductTag() { Product = product, Tag = tag };


            }).ToList();

            _dbContext.SaveChanges();

            var tags = product.ProductTags.Select(pt => pt.Tag.Name).ToList();

            return Ok(new ProductDto(product.Id,
                product.Name,
                product.ImageUrl,
                product.Description,
                product.Price,
                product.Category.Name
                , product.Difficulty.ToString(),
                tags,
                null
                ));
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            var product = _dbContext.Products.SingleOrDefault(x => x.Id == id);
            if (product == null)
            {
                return NotFound();
            }

            _dbContext.Products.Remove(product);
            _dbContext.SaveChanges();

            return NoContent();
        }

    }
}
