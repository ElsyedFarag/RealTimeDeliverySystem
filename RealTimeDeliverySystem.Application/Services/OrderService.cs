using AutoMapper;
using Microsoft.AspNetCore.Identity;
using RealTimeDeliverySystem.Application.DTOs.Order;
using RealTimeDeliverySystem.Application.Interfaces;
using RealTimeDeliverySystem.Domain.Entities;
using RealTimeDeliverySystem.Domain.Enums;

namespace RealTimeDeliverySystem.Application.Services
{
    public class OrderService : IOrderService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public OrderService(
            IMapper mapper,
            IUnitOfWork unitOfWork,
            UserManager<ApplicationUser> userManager)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
            _userManager = userManager;
        }

        public async Task<OrderDto> CreateOrderAsync(string? customerId, CreateOrderDto dto)
        {
            if (string.IsNullOrWhiteSpace(customerId))
                throw new ArgumentException("CustomerId is required");

            var user = await _userManager.FindByIdAsync(customerId)
                ?? throw new ArgumentException("Invalid CustomerId");

            var order = new Order
            {
                CustomerId = customerId,

                CustomerName = string.IsNullOrWhiteSpace(dto.CustomerName)
                    ? user.Name
                    : dto.CustomerName,

                CustomerEmail = string.IsNullOrWhiteSpace(dto.CustomerEmail)
                    ? user.Email ?? "N/A"
                    : dto.CustomerEmail,

                CustomerPhone = string.IsNullOrWhiteSpace(dto.CustomerPhone)
                    ? user.PhoneNumber ?? "N/A"
                    : dto.CustomerPhone,

                DeliveryAddress = dto.DeliveryAddress,
                City = dto.City,
                Notes = dto.Notes,

                SubTotal = dto.SubTotal,
                DeliveryFee = dto.DeliveryFee,
                Discount = dto.Discount,

                PaymentMethod = dto.PaymentMethod,
                Status = OrderStatus.Pending,
                IsPaid = false,

                CreatedAt = DateTime.UtcNow
            };

            await _unitOfWork.Repository<Order>().AddAsync(order);
            await _unitOfWork.SaveChangesAsync();

            return  _mapper.Map<OrderDto>(order);
        }

        public async Task<IEnumerable<OrderDto>> GetAllOrdersAsync()
        {
            var orders = await _unitOfWork.Repository<Order>().GetAllAsync();
            return _mapper.Map<IEnumerable<OrderDto>>(orders);
        }

        public async Task<OrderDto?> GetOrderByIdAsync(int id)
        {
            var order = await _unitOfWork.Repository<Order>().GetByIdAsync(id);
            return order is null ? null : _mapper.Map<OrderDto>(order);
        }

        public Task<bool> DeleteOrderAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<bool> UpdateOrderStatusAsync(int orderId, string status)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<OrderDto>> GetUserOrdersAsync(string userId)
        {
            var orders = await _unitOfWork.Repository<Order>()
                .GetAllAsync();

            var userOrders = orders
                .Where(o => o.CustomerId == userId);

            return _mapper.Map<IEnumerable<OrderDto>>(orders);
        }

    }
}