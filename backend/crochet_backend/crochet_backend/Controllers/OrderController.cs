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
    public class OrderController : ControllerBase
    {

        private readonly ApplicationDbContext _dbContext;

        public OrderController(ApplicationDbContext context)
        {
            _dbContext = context;
        }

        [HttpGet("me")]
        public ActionResult<List<OrderDto>> GetMyOrders(
            [FromQuery] string? status,
            [FromQuery] string? sort,
            [FromQuery] int? take = 5
            )
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;


            var orders = _dbContext.Orders.Include(o => o.Items).ThenInclude(oi => oi.Product).Where(o => o.UserId == userId).AsQueryable();

            if (status != null)
            {
                orders = orders.Where(o => o.Status.ToString().ToLower() == status.ToLower());
            }
            if (sort != null)
            {
                if (sort.ToLower() == "date")
                {
                    orders = orders.OrderBy(o => o.CreatedAt);
                }
                else if (sort.ToLower() == "total")
                {
                    orders = orders.OrderBy(o => o.TotalPrice);
                }
                else if (sort.ToLower() == "id")
                {
                    orders = orders.OrderBy(o => o.Id);
                }
            }



            var result = orders.Select(o => new OrderDto(
            o.Id,
            o.Status.ToString(),
            o.CreatedAt,
            o.TotalPrice,
            o.Items.Select(oi => new OrderItemDto(
                oi.Product.Name,
                oi.Product.Price,
                oi.Quantity
            )).ToList()
        )).ToList();


            return Ok(result);
        }

        [HttpPost]
        public ActionResult<OrderDto> CreateOrder()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            var cart = _dbContext.Carts.Include(c => c.CartItems).ThenInclude(ci => ci.Product).FirstOrDefault(c => c.UserId == userId);

            if (cart == null || !cart.CartItems.Any())
            {
                return BadRequest("Cart is empty");
            }

            var order = new Order
            {
                UserId = userId,
                Status = OrderStatus.Processing,
                TotalPrice = cart.TotalPrice,
                Items = cart.CartItems.Select(ci => new OrderItem
                {
                    ProductId = ci.ProductId,
                    Quantity = ci.Quantity
                }).ToList()
            };

            _dbContext.Orders.Add(order);

            _dbContext.CartItems.RemoveRange(cart.CartItems);

            _dbContext.SaveChanges();

            return Ok(new OrderDto(
                order.Id,
                order.Status.ToString(),
                order.CreatedAt,
                order.TotalPrice * 1.27,
                order.Items.Select(oi => new OrderItemDto(
                    oi.Product.Name,
                    oi.Product.Price,
                    oi.Quantity
                )).ToList()
            ));
        }
    }


}
