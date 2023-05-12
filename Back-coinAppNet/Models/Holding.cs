using static System.Runtime.InteropServices.JavaScript.JSType;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Back_coinAppNet.Models
{
    public class Holding
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [MaxLength(300)]
        public string Name { get; set; }
        public float Rate { get; set; }
        public float  Value { get; set; }
     
        public DateTime Date { get; set; }

        public int UserId { get; set; }
    }
}

