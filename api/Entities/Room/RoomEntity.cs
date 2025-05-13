using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Entities.Room
{
    [Table("Room")]
    public class RoomEntity : BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }

        public int HotelId { get; set; }

        public string Number { get; set; }    

        public string Type { get; set; }

        public decimal Price { get; set; }

        public int Status { get; set; }
    }
}
