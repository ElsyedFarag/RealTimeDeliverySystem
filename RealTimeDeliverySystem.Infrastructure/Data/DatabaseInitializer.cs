using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RealTimeDeliverySystem.Application.Helpers.Constants;
using RealTimeDeliverySystem.Domain.Entities;

namespace RealTimeDeliverySystem.Infrastructure.Data
{
    public class DatabaseInitializer
    {
        private readonly AppDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly ILogger<DatabaseInitializer> _logger;

        public DatabaseInitializer(
            AppDbContext context,
            UserManager<ApplicationUser> userManager,
            RoleManager<IdentityRole> roleManager,
            ILogger<DatabaseInitializer> logger)
        {
            _context = context;
            _userManager = userManager;
            _roleManager = roleManager;
            _logger = logger;
        }

        public async Task InitializeAsync()
        {
            try
            {
                _logger.LogInformation("Starting database initialization...");

                await ApplyMigrationsAsync();
                await CreateRolesAsync();
                await CreateDefaultUsersAsync();

                _logger.LogInformation("Database initialization completed successfully.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Database initialization failed.");
                throw;
            }
        }

        private async Task ApplyMigrationsAsync()
        {
            await _context.Database.MigrateAsync();
        }

        private async Task CreateRolesAsync()
        {
            var roles = new[]
            {
                Roles.AdminRole,
                Roles.CustomerRole,
                Roles.DriverRole
            };

            foreach (var role in roles)
            {
                if (!await _roleManager.RoleExistsAsync(role))
                {
                    await _roleManager.CreateAsync(new IdentityRole(role));
                    _logger.LogInformation("Role created: {Role}", role);
                }
            }
        }

        private async Task CreateDefaultUsersAsync()
        {
            const string password = "P@$$w0rd";

            await CreateUserIfNotExists(
                name: "System Admin",
                email: "admin@realtimedelivery.com",
                role: Roles.AdminRole,
                password: password,
                address: "HQ Office"
            );

            await CreateUserIfNotExists(
                name: "Test Customer",
                email: "customer@realtimedelivery.com",
                role: Roles.CustomerRole,
                password: password,
                address: "Cairo"
            );

            await CreateUserIfNotExists(
                name: "Test Driver",
                email: "driver@realtimedelivery.com",
                role: Roles.DriverRole,
                password: password,
                address: "Giza"
            );
        }

        private async Task CreateUserIfNotExists(
            string name,
            string email,
            string role,
            string password,
            string? address = null)
        {
            var user = await _userManager.FindByEmailAsync(email);

            if (user != null)
            {
                _logger.LogInformation("User already exists: {Email}", email);
                return;
            }

            user = new ApplicationUser
            {
                UserName = email,
                Email = email,
                Name = name,
                Address = address,
                EmailConfirmed = true,
                PhoneNumberConfirmed = true,
                LockoutEnabled = false,
                IsOnline = false,
                CreatedAt = DateTime.UtcNow
            };

            var result = await _userManager.CreateAsync(user, password);

            if (!result.Succeeded)
            {
                var errors = string.Join(", ", result.Errors.Select(e => e.Description));
                throw new Exception($"Failed to create user {email}: {errors}");
            }

            await _userManager.AddToRoleAsync(user, role);

            _logger.LogInformation(
                "User created: {Email} | Role: {Role}",
                email,
                role);
        }
    }
}