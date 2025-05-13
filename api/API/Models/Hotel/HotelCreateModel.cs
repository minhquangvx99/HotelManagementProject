using System.ComponentModel.DataAnnotations;

namespace API.Models.Hotel
{
	public class HotelCreateModel
	{
        public string Name { get; set; }

        public string Address { get; set; }

        public string PhoneNumber { get; set; }

        public int StarsNumber { get; set; }

        public string ManagerName { get; set; }
    }
}

