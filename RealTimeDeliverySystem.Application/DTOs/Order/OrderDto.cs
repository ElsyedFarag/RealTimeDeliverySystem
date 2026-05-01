using RealTimeDeliverySystem.Domain.Enums;

namespace RealTimeDeliverySystem.Application.DTOs.Order
{
    public class OrderDto
    {
        public int Id { get; set; }

        public string CustomerName { get; set; } = null!;

        public string DeliveryAddress { get; set; } = null!;

        public DateTime OrderTime { get; set; }

        public string Status { get; set; }
    }
}
