using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RealTimeDeliverySystem.Domain.Entities;

public class ApplicationUserConfiguration : IEntityTypeConfiguration<ApplicationUser>
{
    public void Configure(EntityTypeBuilder<ApplicationUser> builder)
    {
        // ===== Basic Info =====
        builder.Property(u => u.Name)
            .IsRequired()
            .HasMaxLength(100);

        builder.Property(u => u.Address)
            .HasMaxLength(250);

        // ===== Location =====
        builder.Property(u => u.Latitude)
            .HasPrecision(10, 7);

        builder.Property(u => u.Longitude)
            .HasPrecision(10, 7);

        builder.Property(u => u.LastLocationUpdate)
            .IsRequired(false);

        // ===== Status =====
        builder.Property(u => u.IsOnline)
            .IsRequired()
            .HasDefaultValue(false);

        builder.Property(u => u.LastSeen)
            .IsRequired(false);

        // ===== Creation =====
        builder.Property(u => u.CreatedAt)
            .IsRequired()
            .HasDefaultValueSql("GETUTCDATE()");

        // ===== Relations =====
        builder.HasMany(u => u.Orders)
            .WithOne(o => o.Customer)
            .HasForeignKey(o => o.CustomerId)
            .OnDelete(DeleteBehavior.Restrict);

        // ===== Indexes =====

        // ⚠️ الأفضل استخدام NormalizedEmail بدل Email في Identity
        builder.HasIndex(u => u.NormalizedEmail)
            .HasDatabaseName("IX_Users_NormalizedEmail")
            .IsUnique();

        builder.HasIndex(u => u.PhoneNumber)
            .HasDatabaseName("IX_Users_PhoneNumber");

        builder.HasIndex(u => u.IsOnline)
            .HasDatabaseName("IX_Users_IsOnline");

        builder.HasIndex(u => new { u.Latitude, u.Longitude })
            .HasDatabaseName("IX_Users_Location");
    }
}