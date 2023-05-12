using Back_coinAppNet.Models.Dto;
using Back_coinAppNet.Repository.IRepository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Back_coinAppNet.Controllers
{
    [ApiController]
    [Route("api/wallet")]
    public class WalletController : ControllerBase
    {

        private readonly ILogger<UserController> _logger;
        private readonly IWallet _wallet;

        public WalletController(IWallet wallet, ILogger<UserController> logger)
        {
            _wallet = wallet;
            _logger = logger;
        }

        [HttpPost]
        [Authorize]
        public ActionResult<string> WalletTotal([FromBody] WalletDTO walletDto  )
        {
            string json= _wallet.Getwallet(walletDto);
            return Ok(json);   
        }


        [HttpGet("{idUser:int}")]
        [Authorize]
        public ActionResult<string> WalletHistory(int idUser)
        {
            DateTime fecha = DateTime.Now;
            string json = _wallet.GetHistorywallet(idUser);
            return Ok(json);
        }
    }
}
