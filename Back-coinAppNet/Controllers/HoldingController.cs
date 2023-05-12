using AutoMapper;
using Back_coinAppNet.Models;
using Back_coinAppNet.Models.Dto;
using Back_coinAppNet.Repository.IRepository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Back_coinAppNet.Controllers
{
    [Route("api/holding")]
    [ApiController]
    public class HoldingController :ControllerBase
    {

        private readonly IHolding _holding;
        private readonly IMapper _mapper;

        public HoldingController(IHolding holding, IMapper mapper)
        {
            _holding = holding;
            _mapper = mapper;
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateHolding([FromBody] HoldingDTO holdingDTO)
        {
            bool  resp = false;
            try
            {
                holdingDTO.Date = Convert.ToDateTime(DateTime.Now.ToString("yyyy-MM-dd HH:mm"));             
                Holding holding = _mapper.Map<Holding>(holdingDTO);
                await _holding.CreateAsync(holding);
                resp = true;
            }
            catch (Exception ex)
            {
                resp = false;
            }
            return Ok(new { status = resp });
        }

        [HttpPut("{id:int}", Name ="Update Holding")]
        [Authorize]
        public async Task<ActionResult<Holding>> UpdateHolding(int id,[FromBody]HoldingDTO holdingDTO)
        {
            Holding holding = new();
            try
            {
                if (holdingDTO == null || id != holdingDTO.Id)
                {
                    return BadRequest();
                }
                holding = _mapper.Map<Holding>(holdingDTO);
                holding = await _holding.UpdateAsync(holding);
            }
            catch (Exception ex)
            {

            }
            return holding;
        }

        [HttpDelete("{id:int}")]
        [Authorize]
        public async Task<IActionResult> DeleteHolding(int id)
        {
            bool  resp= false;
            try
            {
                Holding holding = await _holding.GetAsync(x => x.Id == id);
                await _holding.DeleteAsync(holding); 
                resp = true; 
            }catch(Exception ex)
            {
                resp = false;
            }

            return Ok(new { status = resp});
        }

        [HttpGet]
        [Authorize]
        public async Task<ActionResult<List<Holding>>> GetHoldingAll()
        {
            return await _holding.GetAllAsync();
        }

        [HttpGet("{id:int}")]
        [Authorize]
        public async Task<ActionResult<Holding>> getHolgind(int id)
        {
            return await _holding.GetAsync(x => x.Id == id);
        }
    }
}
