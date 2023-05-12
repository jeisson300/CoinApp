using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Back_coinAppNet.Models
{
    public class Income
    {

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public string Name { get; set; }
        public float Value { get; set; }
        public DateTime Date { get; set; }

        public int UserId { get; set; }

    }
}
