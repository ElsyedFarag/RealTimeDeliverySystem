using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RealTimeDeliverySystem.Domain.Entities;

namespace RealTimeDeliverySystem.Infrastructure.Configurations
{
    public class OrderConfiguration : IEntityTypeConfiguration<Order>
    {
        public void Configure(EntityTypeBuilder<Order> builder)
        {
            builder.HasKey(o => o.Id);

            // ======================
            // Customer Info
            // ======================
            builder.Property(o => o.CustomerId)
                .IsRequired();

            builder.Property(o => o.CustomerName)
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(o => o.CustomerEmail)
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(o => o.CustomerPhone)
                .IsRequired()
                .HasMaxLength(20);

            builder.HasOne(o => o.Customer)
                .WithMany(u => u.Orders)
                .HasForeignKey(o => o.CustomerId)
                .OnDelete(DeleteBehavior.Restrict);

            // ======================
            // Driver (optional)
            // ======================
            builder.HasOne(o => o.Driver)
                .WithMany()
                .HasForeignKey(o => o.DriverId)
                .OnDelete(DeleteBehavior.SetNull);

            // ======================
            // Delivery Info
            // ======================
            builder.Property(o => o.DeliveryAddress)
                .IsRequired()
                .HasMaxLength(250);

            builder.Property(o => o.City)
                .HasMaxLength(100);

            builder.Property(o => o.Notes)
                .HasMaxLength(500);

            // ======================
            // Money
            // ======================
            builder.Property(o => o.SubTotal)
                .HasColumnType("decimal(18,2)");

            builder.Property(o => o.DeliveryFee)
                .HasColumnType("decimal(18,2)");

            builder.Property(o => o.Discount)
                .HasColumnType("decimal(18,2)");

            builder.Ignore(o => o.TotalAmount);

            // ======================
            // Payment
            // ======================
            builder.Property(o => o.PaymentMethod)
                .HasConversion<string>()
                .IsRequired();

            builder.Property(o => o.IsPaid)
                .IsRequired();

            builder.Property(o => o.PaidAt);

            // ======================
            // Status
            // ======================
            builder.Property(o => o.Status)
                .HasConversion<string>()
                .IsRequired();

            // ======================
            // Dates
            // ======================
            builder.Property(o => o.CreatedAt)
                .IsRequired();

            builder.Property(o => o.UpdatedAt);

            builder.Property(o => o.DeliveredAt);

            // ======================
            // Indexes
            // ======================
            builder.HasIndex(o => o.Status);
            builder.HasIndex(o => o.CustomerId);
            builder.HasIndex(o => o.DriverId);
        }
    }
}