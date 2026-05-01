using RealTimeDeliverySystem.Domain.Entities;

namespace RealTimeDeliverySystem.Application.Interfaces
{
    public interface IJwtService
    {
        string GenerateToken(ApplicationUser user, IList<string> roles);
    }
}
