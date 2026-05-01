using RealTimeDeliverySystem.Domain.Enums;
using System.ComponentModel.DataAnnotations;

namespace RealTimeDeliverySystem.Application.DTOs.Order
{
    public class CreateOrderDto
    {
        [Required]
        public string CustomerName { get; set; } = null!;

        [Required]
        [EmailAddress]
        public string CustomerEmail { get; set; } = null!;

        [Required]
        public string CustomerPhone { get; set; } = null!;

        [Required]
        public string DeliveryAddress { get; set; } = null!;

        public string? City { get; set; }
        public string? Notes { get; set; }

        [Range(0, double.MaxValue)]
        public decimal SubTotal { get; set; }
        public decimal DeliveryFee { get; set; }
        public decimal Discount { get; set; }

        public PaymentMethod PaymentMethod { get; set; }
    }
}
