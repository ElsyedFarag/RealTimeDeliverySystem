using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace RealTimeDeliverySystem.Domain.Entities
{
    public class ApplicationUser : IdentityUser
    {
        [Required]
        [MaxLength(100)]
        public string Name { get; set; } = null!;

        [MaxLength(250)]
        public string? Address { get; set; }
    }
}
