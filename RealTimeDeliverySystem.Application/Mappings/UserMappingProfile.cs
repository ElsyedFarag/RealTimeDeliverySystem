using AutoMapper;
using RealTimeDeliverySystem.Application.DTOs.User;
using RealTimeDeliverySystem.Domain.Entities;

namespace RealTimeDeliverySystem.Application.Mappings
{
    public class UserMappingProfile : Profile
    {
        public UserMappingProfile()
        { 
           CreateMap<ApplicationUser, UserDto>();
           CreateMap<UserDto, ApplicationUser>();
        }
    }
}
