using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RealTimeDeliverySystem.Application.DTOs.Order;
using RealTimeDeliverySystem.Application.Interfaces;
using System.Security.Claims;

namespace RealTimeDeliverySystem.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly IOrderService _orderService;

        public OrdersController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        // GET: api/orders
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrderDto>>> GetAll()
        {
            var orders = await _orderService.GetAllOrdersAsync();
            return Ok(orders);
        }

        // GET: api/orders/5
        [HttpGet("{id:int}")]
        public async Task<ActionResult<OrderDto>> GetById(int id)
        {
            var order = await _orderService.GetOrderByIdAsync(id);

            if (order is null)
                return NotFound($"Order with ID {id} not found.");

            return Ok(order);
        }

        // POST: api/orders
        [HttpPost]
        public async Task<ActionResult<OrderDto>> Create([FromBody] CreateOrderDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (string.IsNullOrWhiteSpace(userId))
                return Unauthorized("User is not authenticated.");

            var createdOrder = await _orderService.CreateOrderAsync(userId, dto);

            return CreatedAtAction(
                nameof(GetById),
                new { id = createdOrder.Id },
                createdOrder
            );
        }
    }
}