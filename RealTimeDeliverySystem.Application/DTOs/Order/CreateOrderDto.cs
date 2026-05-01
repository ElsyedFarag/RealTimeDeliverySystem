using System.ComponentModel.DataAnnotations;

namespace RealTimeDeliverySystem.Application.DTOs.Order
{
    public class CreateOrderDto
    {
        [Required]
        [MaxLength(100)]
        public string CustomerName { get; set; } = null!;

        [Required]
        [MaxLength(250)]
        public string DeliveryAddress { get; set; } = null!;

        public DateTime OrderTime { get; set; } = DateTime.UtcNow;
    }
}
