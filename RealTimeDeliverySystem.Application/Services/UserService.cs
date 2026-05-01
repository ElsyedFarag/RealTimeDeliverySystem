using Microsoft.AspNetCore.Identity;
using RealTimeDeliverySystem.Application.DTOs.User;
using RealTimeDeliverySystem.Application.Interfaces;
using RealTimeDeliverySystem.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using AutoMapper;

namespace RealTimeDeliverySystem.Application.Services
{
    public class UserService : IUserService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IMapper _mapper;
        public UserService(
            UserManager<ApplicationUser> userManager, IMapper mapper)
        {
            _userManager = userManager;
            _mapper = mapper;
        }

        public async Task<UserDto?> GetUserByIdAsync(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);

            if (user == null)
                return null;

            return _mapper.Map<UserDto>(user);
        }

        public async Task<UserDto?> GetCurrentUserAsync(string userId)
        {
            return await GetUserByIdAsync(userId);
        }

        public async Task<bool> UpdateUserAsync(string userId, UpdateUserDto dto)
        {
            var user = await _userManager.FindByIdAsync(userId);

            if (user == null)
                return false;

            if (!string.IsNullOrWhiteSpace(dto.Name))
                user.Name = dto.Name;

            if (!string.IsNullOrWhiteSpace(dto.PhoneNumber))
                user.PhoneNumber = dto.PhoneNumber;

            if (!string.IsNullOrWhiteSpace(dto.Address))
                user.Address = dto.Address;

            if (!string.IsNullOrWhiteSpace(dto.Email))
                user.Email = dto.Email;

            var result = await _userManager.UpdateAsync(user);

            return result.Succeeded;
        }

        public async Task<bool> SetDriverStatusAsync(string driverId, bool isOnline)
        {
            var user = await _userManager.FindByIdAsync(driverId);

            if (user == null)
                return false;

            user.IsOnline = isOnline;

            var result = await _userManager.UpdateAsync(user);

            return result.Succeeded;
        }

        public async Task<bool> UpdateDriverLocationAsync(string driverId, double lat, double lng)
        {
            var user = await _userManager.FindByIdAsync(driverId);

            if (user == null)
                return false;

            user.Latitude = lat;
            user.Longitude = lng;

            var result = await _userManager.UpdateAsync(user);

            return result.Succeeded;
        }

      
        public async Task<IEnumerable<UserDto>> GetAllUsersAsync()
        {
            var users = await _userManager.Users
                .AsNoTracking()
                .ToListAsync();

            return _mapper.Map<IEnumerable<UserDto>>(users);
        }

        public async Task<IEnumerable<UserDto>> GetUsersByRoleAsync(string role)
        {
            var usersInRole = await _userManager.GetUsersInRoleAsync(role);

            return _mapper.Map<IEnumerable<UserDto>>(usersInRole);
        }
    }
}