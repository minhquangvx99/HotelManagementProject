using System;
using System.Collections.Generic;
using System.Reflection.Emit;
using System.Text;

namespace Entities.Room
{
    public class RoomDetailModel
    {
        public int ID { get; set; }
        public string Number { get; set; }
        public int Status { get; set; }
        public int HotelId { get; set; }
        public string Type { get; set; }
        public decimal Price { get; set; }
    }

}
