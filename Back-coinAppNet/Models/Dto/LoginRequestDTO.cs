using System.ComponentModel.DataAnnotations;

namespace Back_coinAppNet.Models.Dto
{
    public class LoginRequestDTO
    {
        [Required]
        public string Email { get; set; }
        [Required]
        public string password { get; set; }
    }
}
