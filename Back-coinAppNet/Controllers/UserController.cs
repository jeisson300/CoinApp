using Back_coinAppNet.Models;
using Back_coinAppNet.Models.Dto;
using Back_coinAppNet.Repository.IRepository;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Back_coinAppNet.Controllers
{
    [Route("api/user")]
    [ApiController]
    public class UserController: ControllerBase
    {
        private readonly IUser _user;
        private readonly ILogger<UserController> _logger;

        public UserController(IUser user, ILogger<UserController> logger)
        {
              _user = user;
            _logger = logger;
        }

        [HttpPost]
        public async Task<ActionResult<UserDTO>> CreateUser([FromBody] UserDTO userDTO)
        {           
            if(await _user.GetAsync(x => x.Email.ToLower() == userDTO.Email.ToLower()) != null)
            {
                ModelState.AddModelError("Custom Error", "user alredy exists");
                return BadRequest(ModelState);
            }

            if(userDTO == null)
            {
                return BadRequest();
            }
            User userSave = _user.DtoToModel(userDTO);  
            await _user.CreateAsync(userSave);
            User newUser = await _user.GetAsync(x => x.Email.ToLower() == userDTO.Email.ToLower());
            string token = _user.GenerateToken(newUser);
            UserRegisterDTO user = new()
            {
                Name = newUser.Name, Email = newUser.Email,
                Id = newUser.Id, Token = token
            };
            return Ok(JsonConvert.SerializeObject(user));
        }
    }
}
