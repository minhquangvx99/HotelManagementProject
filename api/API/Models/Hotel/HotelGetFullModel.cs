using Entities.Room;
using System.Collections.Generic;

namespace API.Models.Hotel
{
	public class HotelGetFullModel
	{
        public int Id { get; set; }
        public string Name { get; set; }
        public List<RoomEntity> rooms { get; set; }
    }
}

