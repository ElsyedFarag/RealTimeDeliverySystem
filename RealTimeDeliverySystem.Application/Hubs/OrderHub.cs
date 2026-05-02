using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using RealTimeDeliverySystem.Application.Helpers.Constants;
using RealTimeDeliverySystem.Application.Interfaces;

namespace RealTimeDeliverySystem.Application.Hubs
{
    [Authorize]
    public class OrderHub : Hub
    {
        private readonly IUserService _userService;

        public OrderHub(IUserService userService)
        {
            _userService = userService;
        }

        public async Task JoinAdminGroup()
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, "Admins");
        }

        public async Task JoinDriverGroup()
        {
            var userId = Context.UserIdentifier;

            if (string.IsNullOrEmpty(userId))
                return;

            await Groups.AddToGroupAsync(Context.ConnectionId, $"Driver_{userId}");
        }

        [Authorize(Roles = Roles.DriverRole)]
        public async Task UpdateLocation(double latitude, double longitude)
        {
            var userId = Context.UserIdentifier;

            if (string.IsNullOrEmpty(userId))
                return;

            // validation
            if (latitude is < -90 or > 90) return;
            if (longitude is < -180 or > 180) return;

            await _userService.UpdateDriverLocationAsync(userId, latitude, longitude);

            await Clients.Group("Admins")
                .SendAsync("DriverLocationUpdated", new
                {
                    DriverId = userId,
                    Latitude = latitude,
                    Longitude = longitude,
                    Timestamp = DateTime.UtcNow
                });
        }

        public override async Task OnConnectedAsync()
        {
            var userId = Context.UserIdentifier;

            if (string.IsNullOrEmpty(userId))
                return;

            var user = await _userService.GetUserByIdAsync(userId);

            if (user == null)
                return;

            await Groups.AddToGroupAsync(Context.ConnectionId, $"User_{userId}");

            if (await _userService.IsInRoleAsync(userId, Roles.DriverRole))
                await Groups.AddToGroupAsync(Context.ConnectionId, $"Driver_{userId}");

            if (await _userService.IsInRoleAsync(userId, Roles.AdminRole))
                await Groups.AddToGroupAsync(Context.ConnectionId, "Admins");

            await base.OnConnectedAsync();
        }
    }
}