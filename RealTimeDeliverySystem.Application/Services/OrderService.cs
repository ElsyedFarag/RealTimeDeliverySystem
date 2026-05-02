using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;
using RealTimeDeliverySystem.Application.DTOs.Order;
using RealTimeDeliverySystem.Application.Helpers.Constants;
using RealTimeDeliverySystem.Application.Hubs;
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
        private readonly IHubContext<OrderHub> _hubContext;

        public OrderService(
            IMapper mapper,
            IUnitOfWork unitOfWork,
            UserManager<ApplicationUser> userManager,
            IHubContext<OrderHub> hubContext)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
            _userManager = userManager;
            _hubContext = hubContext;
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
                CustomerName = dto.CustomerName ?? user.Name,
                CustomerEmail = dto.CustomerEmail ?? user.Email ?? "N/A",
                CustomerPhone = dto.CustomerPhone ?? user.PhoneNumber ?? "N/A",

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

            await _hubContext.Clients.Group("Admins")
                .SendAsync("NewOrderCreated", new
                {
                    order.Id,
                    order.CustomerName,
                    order.SubTotal,
                    order.City,
                    order.CreatedAt
                });

            await _hubContext.Clients.Group($"User_{customerId}")
                .SendAsync("OrderCreatedForUser", new
                {
                    order.Id,
                    order.Status,
                    order.CreatedAt
                });

            return _mapper.Map<OrderDto>(order);
        }

        public async Task<IEnumerable<OrderDto>> GetAllOrdersAsync()
        {
            var orders = await _unitOfWork.Repository<Order>().GetAllAsync();
            return _mapper.Map<IEnumerable<OrderDto>>(orders);
        }

        public async Task<OrderDto?> GetOrderByIdAsync(int id)
        {
            var order = await _unitOfWork.Repository<Order>().GetByIdAsync(id);
            return order == null ? null : _mapper.Map<OrderDto>(order);
        }

        public async Task<IEnumerable<OrderDto>> GetUserOrdersAsync(string userId)
        {
            var orders = await _unitOfWork.Repository<Order>()
                .FindAsync(o => o.CustomerId == userId);

            return _mapper.Map<IEnumerable<OrderDto>>(orders);
        }

        public async Task<bool> UpdateOrderStatusAsync(int orderId, string status)
        {
            var order = await _unitOfWork.Repository<Order>().GetByIdAsync(orderId);
            if (order == null) return false;

            if (!Enum.TryParse<OrderStatus>(status, true, out var newStatus))
                return false;

            order.Status = newStatus;

            await _unitOfWork.SaveChangesAsync();

            await _hubContext.Clients.Group("Admins")
                .SendAsync("OrderStatusUpdated", orderId, status);

            await _hubContext.Clients.Group($"User_{order.CustomerId}")
                .SendAsync("OrderStatusUpdated", orderId, status);

            if (!string.IsNullOrEmpty(order.DriverId))
            {
                await _hubContext.Clients.Group($"Driver_{order.DriverId}")
                    .SendAsync("OrderStatusUpdated", orderId, status);
            }

            return true;
        }

        public async Task<bool> AssignOrderToDriverAsync(int orderId, string driverId)
        {
            var order = await _unitOfWork.Repository<Order>().GetByIdAsync(orderId);
            if (order == null) return false;

            var driver = await _userManager.FindByIdAsync(driverId);
            if (driver == null) return false;

            if (!await _userManager.IsInRoleAsync(driver, Roles.DriverRole))
                return false;

            order.DriverId = driverId;
            order.Status = OrderStatus.InProgress;

            await _unitOfWork.SaveChangesAsync();

            await _hubContext.Clients.Group("Admins")
                .SendAsync("OrderAssigned", new
                {
                    order.Id,
                    order.DriverId,
                    order.Status
                });

            await _hubContext.Clients.Group($"Driver_{driverId}")
                .SendAsync("NewOrderAssigned", new
                {
                    order.Id,
                    order.DeliveryAddress,
                    order.City,
                    order.Status
                });

            await _hubContext.Clients.Group($"User_{order.CustomerId}")
                .SendAsync("OrderUpdated", new
                {
                    order.Id,
                    order.Status
                });

            return true;
        }

        public async Task<bool> DeleteOrderAsync(int id)
        {
            var order = await _unitOfWork.Repository<Order>().GetByIdAsync(id);
            if (order == null) return false;

            _unitOfWork.Repository<Order>().Delete(order);
            await _unitOfWork.SaveChangesAsync();

            return true;
        }
    }
}