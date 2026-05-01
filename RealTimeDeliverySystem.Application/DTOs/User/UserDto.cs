namespace RealTimeDeliverySystem.Application.DTOs.User
{
    public class UserDto
    {
        public string Id { get; set; } = null!;

        public string Name { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string PhoneNumber { get; set; } = null!;

        public string? Address { get; set; }

        public string Role { get; set; } = null!;

        public bool IsActive { get; set; }

        public DateTime CreatedAt { get; set; }
    }
}