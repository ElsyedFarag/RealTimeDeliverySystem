using RealTimeDeliverySystem.Application.DTOs.Order;

namespace RealTimeDeliverySystem.Application.Interfaces
{
    public interface IOrderService
    {
        Task<OrderDto> CreateOrderAsync(string? customerId, CreateOrderDto dto);
        Task<OrderDto?> GetOrderByIdAsync(int id);
        Task<IEnumerable<OrderDto>> GetUserOrdersAsync(string userId);
        Task<IEnumerable<OrderDto>> GetAllOrdersAsync();
        Task<bool> UpdateOrderStatusAsync(int orderId, string status);
        Task<bool> DeleteOrderAsync(int id);
    }
}