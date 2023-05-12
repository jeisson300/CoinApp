using Back_coinAppNet.Models;
using Back_coinAppNet.Models.Dto;
using Back_coinAppNet.Repository.IRepository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Server.Kestrel.Core.Internal.Http;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System.IdentityModel.Tokens.Jwt;

namespace Back_coinAppNet.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUser _user;

        public AuthController(IUser user)
        {
            _user = user;
        }

        [HttpPost]
        public async Task<ActionResult<LoginResponseDTO>> Login([FromBody] LoginRequestDTO loginRequestDTO)
        {
            LoginResponseDTO loginResponseDTO = new();
            try
            {
                loginResponseDTO = await _user.Login(loginRequestDTO);
                if (loginResponseDTO == null)
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
            }

            return Ok(JsonConvert.SerializeObject(loginResponseDTO));
        }


        [HttpGet]
        public async Task<ActionResult<LoginResponseDTO>> GenerateTokenSession()
        {
            string authHeader = HttpContext.Request.Headers["Authorization"].ToString();
            if (authHeader != null && authHeader.StartsWith("Bearer "))
            {
                var tokenString = authHeader.Substring("Bearer ".Length);
                var handler = new JwtSecurityTokenHandler();
                var token = handler.ReadJwtToken(tokenString);
                LoginResponseDTO loginResponseDTO = new();
                try
                {
                    int userId = Convert.ToInt32( token.Claims.FirstOrDefault(c => c.Type == "unique_name")?.Value);
                   User user = await _user.GetAsync(x => x.Id == userId);
                    LoginRequestDTO loginRequestDTO = new()
                    {
                        Email = user.Email,
                        password = user.Password
                    };
                    loginResponseDTO = await _user.Login(loginRequestDTO);
                }   
                catch  (Exception ex)
                {

                }
                // Aquí es donde procesarías la información del token
                
                return Ok(JsonConvert.SerializeObject(loginResponseDTO));
            }
            else
            {
                return BadRequest("El token no está presente o no es válido");
            }
        }
    }
}
