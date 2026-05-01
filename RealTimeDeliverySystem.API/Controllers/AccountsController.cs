using Microsoft.AspNetCore.Mvc;
using RealTimeDeliverySystem.Application.DTOs.Account;
using RealTimeDeliverySystem.Application.Interfaces;

namespace RealTimeDeliverySystem.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountsController : ControllerBase
    {
        private readonly IAccountService _accountService;
        private readonly ILogger<AccountsController> _logger;

        public AccountsController(IAccountService accountService,
            ILogger<AccountsController> logger)
        {
            _accountService = accountService;
            _logger = logger;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        {
            try
            {
                var result = await _accountService.RegisterAsync(registerDto);
                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                _logger.LogWarning(ex, "Registration failed due to invalid input.");
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred during registration.");
                return StatusCode(500, "An error occurred while processing your request.");
            }
        }
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            try
            {
                var result = await _accountService.LoginAsync(loginDto);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "Login failed due to invalid credentials.");
                return Unauthorized("Invalid email or password.");
            }
        }
    }
}
