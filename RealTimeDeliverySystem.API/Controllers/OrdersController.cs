using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RealTimeDeliverySystem.Application.DTOs.Order;
using RealTimeDeliverySystem.Application.Interfaces;
using System.Security.Claims;

namespace RealTimeDeliverySystem.API.Controllers
{
    [Authorize(Roles = $"{Roles.AdminRole},{Roles.CustomerRole},{Roles.DriverRole}")]
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
        [Authorize(Roles = $"{Roles.AdminRole},{Roles.CustomerRole}")]
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

        [Authorize(Roles = $"{Roles.AdminRole},{Roles.DriverRole}")]
        [HttpPut("{id:int}/status")]
        public async Task<IActionResult> UpdateStatus(int id, [FromBody] UpdateOrderStatusDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _orderService.UpdateOrderStatusAsync(id, dto.Status);

            if (!result)
                return NotFound($"Order with ID {id} not found or invalid status.");

            return Ok(new
            {
                Message = "Order status updated successfully",
                OrderId = id,
                NewStatus = dto.Status
            });
        }

        [HttpPut("{id:int}/assign")]
        [Authorize(Roles = Roles.AdminRole)]
        public async Task<IActionResult> AssignOrder(int id, [FromBody] AssignOrderDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _orderService.AssignOrderToDriverAsync(id, dto.DriverId);

            if (!result)
                return NotFound($"Order {id} not found or invalid driver.");

            return Ok(new
            {
                Message = "Order assigned successfully",
                OrderId = id,
                DriverId = dto.DriverId
            });
        }
    }
}