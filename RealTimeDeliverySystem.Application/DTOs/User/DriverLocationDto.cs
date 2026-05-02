namespace RealTimeDeliverySystem.Application.DTOs.User
{
    public class DriverLocationDto
    {
        public string DriverId { get; set; } = null!;
        public double Latitude { get; set; }
        public double Longitude { get; set; }
    }
}
