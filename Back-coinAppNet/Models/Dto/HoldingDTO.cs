using System.ComponentModel.DataAnnotations;

namespace Back_coinAppNet.Models.Dto
{
    public class HoldingDTO
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }

        [Required]
        public float Rate { get; set; }
        [Required]
        public float Value { get; set; }

        public int UserId { get; set; }
        public DateTime Date { get; set; } 
    }
}
