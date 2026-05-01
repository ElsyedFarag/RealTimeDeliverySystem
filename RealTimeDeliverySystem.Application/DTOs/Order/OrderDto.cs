namespace RealTimeDeliverySystem.Application.DTOs.Order
{
    public class OrderDto
    {
        public int Id { get; set; }

        public string CustomerName { get; set; } = null!;
        public string CustomerEmail { get; set; } = null!;
        public string CustomerPhone { get; set; } = null!;

        public string DeliveryAddress { get; set; } = null!;
        public string? City { get; set; }

        public decimal SubTotal { get; set; }
        public decimal DeliveryFee { get; set; }
        public decimal Discount { get; set; }
        public decimal TotalAmount { get; set; }

        public string Status { get; set; } = null!;
        public string PaymentMethod { get; set; } = null!;

        public bool IsPaid { get; set; }

        public DateTime CreatedAt { get; set; }
    }
}
