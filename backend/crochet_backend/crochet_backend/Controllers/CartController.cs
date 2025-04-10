using crochet_backend.Data;
using crochet_backend.Dtos;
using crochet_backend.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace crochet_backend.Controllers
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly ILogger<CartController> _logger;

        public CartController(ApplicationDbContext context, ILogger<CartController> logger)
        {
            _dbContext = context;
            _logger = logger;
        }

        [HttpGet("me")]
        public ActionResult<CartDto> GetMyCart()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            var cart = _dbContext.Carts
                .Include(c => c.CartItems)
                .ThenInclude(ci => ci.Product)
                .SingleOrDefault(c => c.UserId == userId);

            _logger.LogInformation($"User {userId} requested their cart");



            if (cart == null)
                return NotFound();

            foreach (var item in cart.CartItems)
            {
                _logger.LogInformation($"Item: {item.Product.Name} Quantity: {item.Quantity}");
            }

            var totalPrice = cart.CartItems.Sum(ci => ci.Product.Price * ci.Quantity);

            var cartdto = new CartDto(
                cart.Id,
                cart.UserId,
                totalPrice,
                cart.CartItems.Select(ci => new CartItemDto(
                    ci.ProductId,
                    ci.Product.Name,
                    ci.Product.Price,
                    ci.Quantity
                )).ToList()
            );

            return Ok(cartdto);
        }

        [HttpGet("{userId}")]
        public ActionResult<CartDto> Get(string userId)
        {


            var cart = _dbContext.Carts
                .Include(c => c.CartItems)
                .ThenInclude(ci => ci.Product)
                .SingleOrDefault(c => c.UserId == userId);

            if (cart == null)
            {
                return NotFound();
            }

            var totalPrice = cart.CartItems.Sum(ci => ci.Product.Price * ci.Quantity);

            var cartDto = new CartDto(
                cart.Id,
                cart.UserId,
                totalPrice,
                cart.CartItems.Select(ci => new CartItemDto(
                    ci.ProductId,
                    ci.Product.Name,
                    ci.Product.Price,
                    ci.Quantity
                )).ToList()
            );

            return Ok(cartDto);
        }

        [HttpPost("add")]
        public ActionResult<CartDto> AddToCart([FromBody] NewCartItem newCartItem)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userId == null)
            {
                return Unauthorized();
            }

            var cart = _dbContext.Carts
                .Include(c => c.CartItems)
                .ThenInclude(ci => ci.Product)
                .SingleOrDefault(c => c.UserId == userId);

            if (cart == null)
            {
                cart = new Cart { UserId = userId };
                _dbContext.Carts.Add(cart);
                _dbContext.SaveChanges();
            }

            var cartItem = cart.CartItems.SingleOrDefault(ci => ci.ProductId == newCartItem.ProductId);
            if (cartItem == null)
            {
                cartItem = new CartItem { CartId = cart.Id, ProductId = newCartItem.ProductId, Quantity = 1 };
                _dbContext.CartItems.Add(cartItem);
                _dbContext.SaveChanges();

                cart = _dbContext.Carts
                    .Include(c => c.CartItems)
                    .ThenInclude(ci => ci.Product)
                    .SingleOrDefault(c => c.UserId == userId);

            }
            else
            {
                cartItem.Quantity += 1;
            }

            var totalPrice = cart.CartItems.Sum(ci => ci.Product.Price * ci.Quantity);

            cart.TotalPrice = Convert.ToInt32(totalPrice);




            _dbContext.SaveChanges();
            return Ok(new CartDto(
                        cart.Id,
                        cart.UserId,
                        totalPrice,
                        cart.CartItems.Select(ci => new CartItemDto(
                            ci.ProductId,
                            ci.Product.Name,
                            ci.Product.Price,
                            ci.Quantity
                        )).ToList()
                    ));
        }

        [HttpPut("update")]
        public ActionResult<CartDto> UpdateCartItem([FromBody] UpdateCartItem updateCartItem)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;


            var user = _dbContext.Users.Include(u => u.Cart).ThenInclude(c => c.CartItems).SingleOrDefault(u => u.Id == userId);
            if (user == null) { return NotFound(); }

            var cart = user.Cart;
            if (cart == null) { return NotFound(); }

            var cartItem = cart.CartItems.SingleOrDefault(ci => ci.ProductId == updateCartItem.ProductId);
            if (cartItem == null) { return NotFound(); }

            cartItem.Quantity += updateCartItem.Quantity;

            if (cartItem.Quantity <= 1)
            {
                cartItem.Quantity = 1;
            }
            _dbContext.SaveChanges();

            var cartWithProducts = _dbContext.Carts
                .Include(c => c.CartItems)
                .ThenInclude(ci => ci.Product)
                .FirstOrDefault(c => c.UserId == userId);

            var totalPrice = cartWithProducts.CartItems.Sum(ci => ci.Product.Price * ci.Quantity);

            cartWithProducts.TotalPrice = Convert.ToInt32(totalPrice);

            _dbContext.SaveChanges();

            var cartDto = new CartDto(
                cartWithProducts.Id,
                cartWithProducts.UserId,
                totalPrice,
                cartWithProducts.CartItems.Select(ci => new CartItemDto(
                    ci.ProductId,
                    ci.Product.Name,
                    ci.Product.Price,
                    ci.Quantity
                )).ToList()
            );

            return Ok(cartDto);

        }

        [HttpDelete("me/{productId}")]
        public ActionResult RemoveItemFromCart(int productId)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var cart = _dbContext.Carts.FirstOrDefault(c => c.UserId == userId);

            if (cart == null) { return NotFound(); }

            var cartId = cart.Id;

            var cartItem = _dbContext.CartItems.SingleOrDefault(ci => ci.CartId == cartId && ci.ProductId == productId);
            if (cartItem == null) { return NotFound(); }
            _dbContext.CartItems.Remove(cartItem);
            _dbContext.SaveChanges();
            return Ok();
        }

    }


}
