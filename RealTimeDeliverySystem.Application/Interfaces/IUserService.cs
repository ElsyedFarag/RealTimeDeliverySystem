using RealTimeDeliverySystem.Application.DTOs.User;
using RealTimeDeliverySystem.Application.DTOs.Order;
using RealTimeDeliverySystem.Domain.Entities;

namespace RealTimeDeliverySystem.Application.Interfaces
{
    public interface IUserService
    {
        Task<UserDto?> GetUserByIdAsync(string userId);
        Task<IEnumerable<UserDto>> GetAllUsersAsync();
        Task<IEnumerable<UserDto>> GetUsersByRoleAsync(string role);
        Task<bool> IsInRoleAsync(string userId, string role);
        Task<bool> UpdateUserAsync(string userId, UpdateUserDto dto);
        Task<bool> SetDriverStatusAsync(string driverId, bool isOnline);
        Task<bool> UpdateDriverLocationAsync(string driverId, double lat, double lng);
    }
}