using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RealTimeDeliverySystem.Domain.Entities;

public class ApplicationUserConfiguration : IEntityTypeConfiguration<ApplicationUser>
{
    public void Configure(EntityTypeBuilder<ApplicationUser> builder)
    {
        builder.Property(u => u.Name)
            .IsRequired()
            .HasMaxLength(100);

        builder.Property(u => u.Address)
            .HasMaxLength(250);

        builder.Property(u => u.Latitude)
            .HasPrecision(10, 7);

        builder.Property(u => u.Longitude)
            .HasPrecision(10, 7);

        builder.Property(u => u.IsOnline)
            .IsRequired()
            .HasDefaultValue(false);

        builder.Property(u => u.CreatedAt)
            .IsRequired()
            .HasDefaultValueSql("GETUTCDATE()");

        builder.HasMany(u => u.Orders)
            .WithOne(o => o.Customer)
            .HasForeignKey(o => o.CustomerId)
            .OnDelete(DeleteBehavior.Restrict);


        builder.HasIndex(u => u.Email)
            .IsUnique();

        builder.HasIndex(u => u.PhoneNumber);

        builder.HasIndex(u => u.IsOnline);

        builder.HasIndex(u => new { u.Latitude, u.Longitude });
    }
}