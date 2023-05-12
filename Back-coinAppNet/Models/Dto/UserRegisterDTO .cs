using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Back_coinAppNet.Models.Dto
{
    public class UserRegisterDTO
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }        
        [DefaultValue(true)]
        public bool State { get; set; }

        public string Token { get; set; }
    }
}
