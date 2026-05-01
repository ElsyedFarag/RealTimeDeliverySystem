using RealTimeDeliverySystem.Application.DTOs.Account;

namespace RealTimeDeliverySystem.Application.Interfaces
{
    public interface IAccountService
    {
        Task<string> LoginAsync(LoginDto loginDto);
        Task<string> RegisterAsync(RegisterDto registerDto);

    }
}
