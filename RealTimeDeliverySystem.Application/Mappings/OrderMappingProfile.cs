using AutoMapper;
using RealTimeDeliverySystem.Application.DTOs.Order;
using RealTimeDeliverySystem.Domain.Entities;

namespace RealTimeDeliverySystem.Application.Mappings
{
    public class OrderMappingProfile : Profile
    {
        public OrderMappingProfile()
        {
            CreateMap<CreateOrderDto, Order>();

            CreateMap<Order, OrderDto>()
                .ForMember(dest => dest.Status,
                    opt => opt.MapFrom(src => src.Status));
        }
    }
}
