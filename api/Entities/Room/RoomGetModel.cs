using System;
using System.Collections.Generic;
using System.Text;

namespace Entities.Room
{
    public class RoomGetModel
    {
        public int ID { get; set; }
        public string Code { get; set; }
        public string Number { get; set; }
        public string Type { get; set; }
        public decimal Price { get; set; }
        public int Status { get; set; }
        public string HotelName { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}