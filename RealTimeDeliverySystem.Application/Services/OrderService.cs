using AutoMapper;
using RealTimeDeliverySystem.Application.DTOs.Order;
using RealTimeDeliverySystem.Application.Interfaces;
using RealTimeDeliverySystem.Domain.Entities;
using RealTimeDeliverySystem.Domain.Enums;

namespace RealTimeDeliverySystem.Application.Services
{
    public class OrderService : IOrderService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public OrderService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<OrderDto> CreateOrderAsync(CreateOrderDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.CustomerName) ||
                string.IsNullOrWhiteSpace(dto.DeliveryAddress))
            {
                throw new ArgumentException("CustomerName and DeliveryAddress are required.");
            }

            var order = new Order
            {
                CustomerName = dto.CustomerName,
                DeliveryAddress = dto.DeliveryAddress,
                OrderTime = dto.OrderTime,
                Status = OrderStatus.Pending
            };

            await _unitOfWork.Repository<Order>().AddAsync(order);
            await _unitOfWork.SaveChangesAsync();

            return _mapper.Map<OrderDto>(order);
        }

        public Task<bool> DeleteOrderAsync(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<OrderDto>> GetAllOrdersAsync()
        {
            var orders = await _unitOfWork.Repository<Order>().GetAllAsync();
            var orderDtos = _mapper.Map<IEnumerable<OrderDto>>(orders);
            return orderDtos;
        }

        public async Task<OrderDto?> GetOrderByIdAsync(int id)
        {
            var order = await _unitOfWork.Repository<Order>().GetByIdAsync(id);
            if (order == null) return null;
            var orderDto = _mapper.Map<OrderDto>(order);
            return orderDto;
        }

        public Task<bool> UpdateOrderStatusAsync(int orderId, string status)
        {
            throw new NotImplementedException();
        }
    }
}
