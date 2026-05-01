using RealTimeDeliverySystem.Domain.Enums;

namespace RealTimeDeliverySystem.Domain.Entities
{
    public class Order
    {
        public int Id { get; set; }

        public string CustomerId { get; set; } = null!;
        public string CustomerName { get; set; } = null!;
        public string CustomerEmail { get; set; } = null!;
        public string CustomerPhone { get; set; } = null!;
        public ApplicationUser Customer { get; set; } = null!;

        public string DeliveryAddress { get; set; } = null!;
        public string? City { get; set; }
        public string? Notes { get; set; }

        public decimal SubTotal { get; set; }
        public decimal DeliveryFee { get; set; }
        public decimal Discount { get; set; }
        public decimal TotalAmount => SubTotal + DeliveryFee - Discount;
        public PaymentMethod PaymentMethod { get; set; }
        public bool IsPaid { get; set; }
        public DateTime? PaidAt { get; set; }

        public OrderStatus Status { get; set; } = OrderStatus.Pending;

        public string? DriverId { get; set; }
        public ApplicationUser? Driver { get; set; }
        public DateTime? DeliveredAt { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }

    }
}
