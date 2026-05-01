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
                .ForMember(d => d.Status,
                    o => o.MapFrom(s => s.Status.ToString()))
                .ForMember(d => d.PaymentMethod,
                    o => o.MapFrom(s => s.PaymentMethod.ToString()))
                .ForMember(d => d.TotalAmount,
                    o => o.MapFrom(s => s.TotalAmount))
                .ForMember(d => d.CustomerName,
                    o => o.MapFrom(s => s.CustomerName ??  s.Customer.Name))
                .ForMember(d => d.CustomerEmail,
                    o => o.MapFrom(s => s.CustomerEmail ?? s.Customer.Email))
                .ForMember(d => d.CustomerPhone,
                    o => o.MapFrom(s => s.CustomerPhone ?? s.Customer.PhoneNumber));
        }
    }
}
