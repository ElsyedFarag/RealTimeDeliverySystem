using Microsoft.AspNetCore.Mvc;
using RealTimeDeliverySystem.Application.DTOs.Order;
using RealTimeDeliverySystem.Application.Interfaces;
using RealTimeDeliverySystem.Domain.Entities;

namespace RealTimeDeliverySystem.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly IOrderService _orderService;

        public OrdersController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpGet("GetOrders")]
        public async Task<IActionResult> GetOrders()
        {
            var orders = await _orderService.GetAllOrdersAsync();
            return Ok(orders);
        }


        [HttpPost("CreateOrder")]
        public async Task<IActionResult> CreateOrder([FromBody] CreateOrderDto dto)
        {
            try
            {
                var createdOrder = await _orderService.CreateOrderAsync(dto);
                return CreatedAtAction(nameof(GetOrders), new { id = createdOrder.Id }, createdOrder);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
