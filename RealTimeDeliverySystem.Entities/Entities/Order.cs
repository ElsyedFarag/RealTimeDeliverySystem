using RealTimeDeliverySystem.Domain.Enums;
using System.ComponentModel.DataAnnotations;

namespace RealTimeDeliverySystem.Domain.Entities
{
    public class Order
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string CustomerName { get; set; } = null!;

        [Required]
        [MaxLength(250)]
        public string DeliveryAddress { get; set; } = null!;

        public DateTime OrderTime { get; set; }

        [Required]
        public OrderStatus Status { get; set; } = OrderStatus.Pending;
    }
}
