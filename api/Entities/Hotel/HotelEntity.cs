using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Entities.Hotel
{
    [Table("Hotel")]
    public class HotelEntity : BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }

        [Index(IsUnique = true)]
        [Column("Name", TypeName = "nvarchar")]
        public string Name { get; set; }

        public string Address { get; set; }

        [StringLength(20)]
        [Column("PhoneNumber", TypeName = "varchar")]
        public string PhoneNumber { get; set; }

        public int StarsNumber { get; set; }

        public string ManagerName { get; set; }
    }
}
