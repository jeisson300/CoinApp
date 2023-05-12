using Back_coinAppNet.DB;
using Back_coinAppNet.Models;
using Back_coinAppNet.Models.Dto;
using Back_coinAppNet.Repository.IRepository;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Back_coinAppNet.Repository
{
    public class UserRepository : Repository<User>, IUser
    {
        private readonly ContextDB _db;
        private string secretKey = "";
        public UserRepository(ContextDB db, IConfiguration configuration) : base(db)
        {
            _db = db;
            this.secretKey = configuration.GetValue<string>("ApiSettings:Secret");

        }

        public User DtoToModel(UserDTO userDto)
        {
            User user = new()
            {
                Name = userDto.Name,
                Email = userDto.Email,
                Password = userDto.Password
            };

            return user;
        }

        public string GenerateToken(User user)
        {
            // if user was found generetae JWT token
            var tokenHanlder = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(secretKey);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString()),
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHanlder.CreateToken(tokenDescriptor);

            return tokenHanlder.WriteToken(token);
        }

        public async Task<LoginResponseDTO> Login(LoginRequestDTO loginRequesDTO)
        {
            var user = await _db.Users.FirstOrDefaultAsync(x => x.Email.ToLower() == loginRequesDTO.Email.ToLower());
            if (user == null)
            {
                return null;
            }
            string token = GenerateToken(user);
            LoginResponseDTO loginResponseDTO = new LoginResponseDTO()
            {
                Id = user.Id,
                Email = user.Email,
                Name = user.Name,
                Token = token
            };
            return loginResponseDTO;
        }

        public async Task<User> UpdateAsync(User user)
        {
            _db.Update(user);
            await _db.SaveChangesAsync();
            return user;
        }
    }
}
