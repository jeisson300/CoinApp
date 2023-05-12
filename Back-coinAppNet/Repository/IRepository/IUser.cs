using Back_coinAppNet.Models;
using Back_coinAppNet.Models.Dto;
using Microsoft.AspNetCore.Mvc;

namespace Back_coinAppNet.Repository.IRepository
{
    public interface IUser : IRepository<User>
    {
        Task<User> UpdateAsync( User user);

        User DtoToModel(UserDTO userDto);

        Task<LoginResponseDTO> Login(LoginRequestDTO loginRequesDTO);

        string GenerateToken(User user);
        
    }
}
