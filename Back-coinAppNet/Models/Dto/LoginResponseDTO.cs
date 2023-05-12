namespace Back_coinAppNet.Models.Dto
{
    public class LoginResponseDTO
    {

        //user, emailUser, uid, name
        public int  Id { get; set; }
        public string Email { get; set; }
        public string Name { get; set; }
        public string  Token { get; set; }
    }
}
