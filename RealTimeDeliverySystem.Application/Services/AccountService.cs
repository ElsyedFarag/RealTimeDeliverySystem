using Microsoft.AspNetCore.Identity;
using RealTimeDeliverySystem.Application.DTOs.Account;
using RealTimeDeliverySystem.Application.Interfaces;
using RealTimeDeliverySystem.Domain.Entities;

namespace RealTimeDeliverySystem.Application.Services
{
    public class AccountService : IAccountService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IJwtService _jwtService;
        public AccountService(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            IJwtService jwtService)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _jwtService = jwtService;
        }

        public async Task<string> RegisterAsync(RegisterDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Email) ||
                string.IsNullOrWhiteSpace(dto.Password) ||
                string.IsNullOrWhiteSpace(dto.Name) || string.IsNullOrEmpty(dto.PhoneNumber))
            {
                throw new ArgumentException("Email, Password and Name and PhoneNumber are required.");
            }

            var userExists = await _userManager.FindByEmailAsync(dto.Email);
            if (userExists != null)
                throw new ArgumentException("Email already exists.");

            var user = new ApplicationUser
            {
                UserName = dto.Email,
                Email = dto.Email,
                Name = dto.Name,
                PhoneNumber = dto.PhoneNumber,
            };

            var result = await _userManager.CreateAsync(user, dto.Password);

            if (!result.Succeeded)
            {
                var errors = string.Join(", ", result.Errors.Select(e => e.Description));
                throw new Exception(errors);
            }
            return "User registered successfully";
        }

        public async Task<string> LoginAsync(LoginDto dto)
        {
            var user = await _userManager.FindByEmailAsync(dto.Email);
            if (user == null)
                throw new Exception("Invalid credentials");

            var result = await _signInManager.CheckPasswordSignInAsync(user, dto.Password, false);

            if (!result.Succeeded)
                throw new Exception("Invalid credentials");

            var roles = await _userManager.GetRolesAsync(user);

            var token = _jwtService.GenerateToken(user, roles);

            return token;
        }
    }
}