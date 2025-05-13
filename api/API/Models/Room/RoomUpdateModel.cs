namespace API.Models.Room
{
    public class RoomUpdateModel
    {
        public int ID { get; set; }
        public string Number { get; set; }
        public int Status { get; set; }
        public int HotelId { get; set; }
        public string Type { get; set; }
        public decimal Price { get; set; }
    }
}
