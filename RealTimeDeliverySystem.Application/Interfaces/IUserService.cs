using RealTimeDeliverySystem.Application.DTOs.User;
using RealTimeDeliverySystem.Application.DTOs.Order;

namespace RealTimeDeliverySystem.Application.Interfaces
{
    public interface IUserService
    {
        Task<UserDto?> GetUserByIdAsync(string userId);
        Task<UserDto?> GetCurrentUserAsync(string userId);

        Task<IEnumerable<UserDto>> GetAllUsersAsync();

        Task<IEnumerable<UserDto>> GetUsersByRoleAsync(string role);

        Task<bool> UpdateUserAsync(string userId, UpdateUserDto dto);


        Task<bool> SetDriverStatusAsync(string driverId, bool isOnline);

        Task<bool> UpdateDriverLocationAsync(string driverId, double lat, double lng);
    }
}