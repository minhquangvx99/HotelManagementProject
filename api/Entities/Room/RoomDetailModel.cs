using System;
using System.Collections.Generic;
using System.Reflection.Emit;
using System.Text;

namespace Entities.Room
{
    public class RoomDetailModel
    {
        public int RoomId { get; set; }
        public string RoomCode { get; set; }
        public string Name { get; set; }
        public int Status { get; set; }
        public int HotelId { get; set; }
    }

}
