using crochet_backend.Data;
using crochet_backend.Dtos;
using crochet_backend.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace crochet_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]

    public class ReviewController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;

        public ReviewController(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public List<ReviewDto> GetReviews()
        {
            var result = _dbContext.Reviews
                .Include(r => r.User)
                .Include(r => r.Product)
                .Select(r => new ReviewDto(
                    r.Id,
                    r.User.UserName,
                    r.Rating,
                    r.TextReview,
                    r.CreatedAt,
                    r.Product.Name
                ));

            return result.ToList();
        }

        [HttpGet("{id}")]
        public ActionResult<ReviewDto> GetReview(int id)
        {
            var review = _dbContext.Reviews
                .Include(r => r.User)
                .Include(r => r.Product)
                .FirstOrDefault(r => r.Id == id);

            if (review == null)
            {
                return NotFound();
            }

            return Ok(new ReviewDto(
                review.Id,
                review.User.UserName,
                review.Rating,
                review.TextReview,
                review.CreatedAt,
                review.Product.Name
            ));
        }

        [HttpPost]
        public ActionResult<ReviewDto> CreateReview([FromBody] NewReview newReview)
        {
            var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;

            if (userId == null)
            {
                return Unauthorized();
            }

            var user = _dbContext.Users.SingleOrDefault(u => u.Id == userId);

            if (user == null) {
                return Unauthorized();
            }

            var product = _dbContext.Products.SingleOrDefault(p => p.Name == newReview.ProductName);

            if (product == null)
            {
                return BadRequest();
            }

            var review = new Review()
            {
                User = user,
                Product = product,
                Rating = newReview.Rating,
                TextReview = newReview.TextReview,
                CreatedAt = newReview.CreatedAt
            };

            _dbContext.Reviews.Add(review);
            _dbContext.SaveChanges();

            return CreatedAtAction(
                nameof(GetReview), 
                new { id = review.Id }, 
                new ReviewDto(
                review.Id,
                review.User.UserName,
                review.Rating,
                review.TextReview,
                review.CreatedAt,
                review.Product.Name
            ));
        }

        [HttpPut("{id}")]
        public ActionResult<ReviewDto> UpdateReview([FromRoute] int id, [FromBody] ReviewDto updated)
        {
            if(id != updated.Id)
            {
                return BadRequest();
            }

            var review = _dbContext.Reviews.SingleOrDefault(r => r.Id == id);
            if (review == null) {
                return NotFound();
            }

            var product = _dbContext.Products.SingleOrDefault(p => p.Name == updated.ProductName);
            if (product == null)
            {
                return BadRequest();
            }

            var user = _dbContext.Users.SingleOrDefault(u => u.UserName == updated.username);
            if (user == null)
            {
                return BadRequest();
            }

            review.User = user;
            review.Product = product;
            review.Rating = updated.Rating;
            review.TextReview = updated.TextReview;
            review.CreatedAt = updated.CreatedAt;

            _dbContext.SaveChanges();

            return Ok(new ReviewDto(
                review.Id,
                review.User.UserName,
                review.Rating,
                review.TextReview,
                review.CreatedAt,
                review.Product.Name
            ));

        }

        [HttpDelete("{id}")]
        public ActionResult DeleteReview(int id)
        {
            var review = _dbContext.Reviews.SingleOrDefault(r => r.Id == id);
            if (review == null)
            {
                return NotFound();
            }
            _dbContext.Reviews.Remove(review);
            _dbContext.SaveChanges();
            return NoContent();
        }
    }
}
