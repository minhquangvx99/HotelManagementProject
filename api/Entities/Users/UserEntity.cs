using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Entities.Users
{
    [Table("Users")]
    public class UserEntity : BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }

        [StringLength(255)]
        [Column("Name", TypeName = "nvarchar")]
        public string Name { get; set; }

        public int Status { get; set; }

        [StringLength(255)]
        [Column("Email", TypeName = "nvarchar")]
        public string Email { get; set; }

        [StringLength(255)]
        [Column("Username", TypeName = "nvarchar")]
        public string Username { get; set; }

        public DateTime Birthday { get; set; }

        [StringLength(500)]
        [Column("Address", TypeName = "nvarchar")]
        public string Address { get; set; }

        [StringLength(50)]
        [Column("PhoneNumber", TypeName = "nvarchar")]
        public string PhoneNumber { get; set; }

        [Column("Password", TypeName = "nvarchar")]
        public string Password { get; set; }

        public int Gender { get; set; }

    }

    public class UserDetail
    {

        public int ID { get; set; }

        public string Name { get; set; }

        public int Status { get; set; }

        public string Email { get; set; }

        public string Username { get; set; }

        public DateTime Birthday { get; set; }

        public string Address { get; set; }

        public string PhoneNumber { get; set; }

        public string Password { get; set; }

    }

}
