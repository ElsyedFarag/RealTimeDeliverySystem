using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RealTimeDeliverySystem.Application.DTOs.User;
using RealTimeDeliverySystem.Application.Interfaces;
using System.Security.Claims;

namespace RealTimeDeliverySystem.API.Controllers
{
    [Authorize(Roles = $"{Roles.AdminRole}")]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;

        public UsersController(
            IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _userService.GetAllUsersAsync();
            return Ok(users);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById(string id)
        {
            var user = await _userService.GetUserByIdAsync(id);

            if (user == null)
                return NotFound($"User with id {id} not found");

            return Ok(user);
        }

        [HttpGet("role/{role}")]
        public async Task<IActionResult> GetUsersByRole(string role)
        {
            var users = await _userService.GetUsersByRoleAsync(role);
            return Ok(users);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(string id, [FromBody] UpdateUserDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _userService.UpdateUserAsync(id, dto);

            if (!result)
                return BadRequest("Failed to update user");

            return NoContent();
        }

        [HttpGet("me")]
        [Authorize]
        public async Task<IActionResult> GetCurrentUser()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (userId == null)
                return Unauthorized();

            var user = await _userService.GetCurrentUserAsync(userId);

            return Ok(user);
        }
    }
}