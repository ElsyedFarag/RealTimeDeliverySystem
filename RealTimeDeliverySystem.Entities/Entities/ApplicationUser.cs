using Microsoft.AspNetCore.Identity;

namespace RealTimeDeliverySystem.Domain.Entities
{
    public class ApplicationUser : IdentityUser
    {
        public string Name { get; set; } = null!;
        public string? Address { get; set; }
        public bool IsOnline { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public double? Latitude { get; set; }
        public double? Longitude { get; set; }
        public ICollection<Order> Orders { get; set; } = new List<Order>();
    }
}
